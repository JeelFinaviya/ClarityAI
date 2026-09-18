import logging
from django.core import signing
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DiagnosticRecord
from .serializers import (
    AnalyzeRequestSerializer,
    FinalDiagnoseRequestSerializer,
    DiagnosticRecordListSerializer,
    DiagnosticRecordDetailSerializer,
    MCQGenerateRequestSerializer,
    MCQSubmitRequestSerializer,
)
from .gemini_service import (
    GeminiAnalysisService,
    GeminiConfigurationError,
    GeminiResponseValidationError,
    GeminiAPIError,
    GeminiServiceError,
)

MCQ_TOKEN_SALT = 'clarity.mcq.assessment.v1'

logger = logging.getLogger(__name__)


def _save_completed_diagnostic(
    topic: str,
    initial_explanation: str,
    confidence: int,
    diagnostic_result: dict,
    initial_score: int = None,
    probe_question: str = "",
    probe_reason: str = "",
    probe_answer: str = "",
) -> DiagnosticRecord:
    """
    Safely persist a validated completed diagnostic to the database.
    """
    dims = diagnostic_result.get("diagnostic_dimensions", {})
    final_score = diagnostic_result.get("understanding_score", 0)
    verdict = diagnostic_result.get("understanding_level", "Evaluated")
    summary = diagnostic_result.get("summary", "")

    record = DiagnosticRecord.objects.create(
        topic=topic,
        initial_explanation=initial_explanation,
        confidence=confidence,
        initial_score=initial_score if initial_score is not None else final_score,
        final_score=final_score,
        verdict=verdict,
        summary=summary,
        core_accuracy=dims.get("core_accuracy", 0),
        causal_depth=dims.get("causal_depth", 0),
        relational_coherence=dims.get("relational_coherence", 0),
        diagnostic_dimensions=dims,
        demonstrated_concepts=diagnostic_result.get("concepts_understood", []),
        missing_concepts=diagnostic_result.get("missing_concepts", []),
        possible_misconceptions=diagnostic_result.get("possible_misconceptions", []),
        confidence_calibration=diagnostic_result.get("confidence_calibration", {}),
        probe_question=probe_question,
        probe_reason=probe_reason,
        probe_answer=probe_answer,
        diagnostic_journey=diagnostic_result.get("diagnostic_journey", {}),
        full_result=diagnostic_result,
    )
    logger.info(f"Successfully saved DiagnosticRecord {record.id} for topic '{topic}'")
    return record


class AnalyzeExplanationView(APIView):
    """
    POST /api/analyze/
    Accepts: { topic: str, explanation: str, confidence: int }
    Returns: Initial Understanding Analysis JSON with Probe Decision.
    If no probe is required, automatically persists the completed diagnostic.
    """

    def post(self, request, *args, **kwargs):
        serializer = AnalyzeRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "error": "Validation Error",
                    "message": "The submitted payload failed input validation.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data
        topic = validated_data["topic"]
        explanation = validated_data["explanation"]
        confidence = validated_data["confidence"]

        try:
            analysis_result = GeminiAnalysisService.analyze_initial(
                topic=topic,
                explanation=explanation,
                confidence=confidence,
            )

            # If no probe is required, the diagnostic is complete and validated. Save it immediately!
            probe_info = analysis_result.get("probe", {})
            if not probe_info.get("needs_probe", False):
                try:
                    record = _save_completed_diagnostic(
                        topic=topic,
                        initial_explanation=explanation,
                        confidence=confidence,
                        diagnostic_result=analysis_result,
                    )
                    analysis_result["saved_record_id"] = str(record.id)
                except Exception as save_err:
                    logger.error(f"Failed to auto-save completed diagnostic: {str(save_err)}", exc_info=True)

            return Response(analysis_result, status=status.HTTP_200_OK)

        except GeminiConfigurationError as ce:
            logger.error(f"Configuration error: {str(ce)}")
            return Response(
                {
                    "error": "AI Service Unconfigured",
                    "message": "The AI service is not properly configured on the server. Please ensure GEMINI_API_KEY is configured in backend/.env",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except GeminiResponseValidationError as re:
            logger.error(f"Gemini response validation failed: {str(re)}")
            return Response(
                {
                    "error": "Invalid AI Response",
                    "message": "The AI service returned an incomplete or malformed response schema. Please retry your submission.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiAPIError as ae:
            logger.error(f"Gemini API communication error: {str(ae)}")
            return Response(
                {
                    "error": "AI Service Unavailable",
                    "message": "Unable to reach the AI analysis service. Please verify your connection or retry in a few moments.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiServiceError as ge:
            logger.error(f"Gemini service pipeline failure: {str(ge)}", exc_info=True)
            return Response(
                {
                    "error": "AI Analysis Error",
                    "message": "An error occurred during AI cognitive evaluation. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception as e:
            logger.error(f"Unexpected analysis processing error: {str(e)}", exc_info=True)
            return Response(
                {
                    "error": "Internal Server Error",
                    "message": "An unexpected server error occurred while processing your analysis request.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class FinalDiagnoseExplanationView(APIView):
    """
    POST /api/diagnose/final/
    Accepts: { topic: str, initial_explanation: str, confidence: int, probe_question: str, probe_answer: str }
    Returns: Final Synthesized Conceptual Diagnostic with Diagnostic Journey.
    Automatically persists the validated completed diagnostic.
    """

    def post(self, request, *args, **kwargs):
        serializer = FinalDiagnoseRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "error": "Validation Error",
                    "message": "The submitted payload failed input validation.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data
        topic = validated_data["topic"]
        initial_explanation = validated_data["initial_explanation"]
        confidence = validated_data["confidence"]
        probe_question = validated_data["probe_question"]
        probe_answer = validated_data["probe_answer"]

        try:
            synthesized_result = GeminiAnalysisService.synthesize_final_diagnostic(
                topic=topic,
                initial_explanation=initial_explanation,
                confidence=confidence,
                probe_question=probe_question,
                probe_answer=probe_answer,
            )

            # Save the synthesized final diagnostic
            try:
                record = _save_completed_diagnostic(
                    topic=topic,
                    initial_explanation=initial_explanation,
                    confidence=confidence,
                    diagnostic_result=synthesized_result,
                    probe_question=probe_question,
                    probe_answer=probe_answer,
                )
                synthesized_result["saved_record_id"] = str(record.id)
            except Exception as save_err:
                logger.error(f"Failed to auto-save synthesized diagnostic: {str(save_err)}", exc_info=True)

            return Response(synthesized_result, status=status.HTTP_200_OK)

        except GeminiConfigurationError as ce:
            logger.error(f"Configuration error: {str(ce)}")
            return Response(
                {
                    "error": "AI Service Unconfigured",
                    "message": "The AI service is not properly configured on the server. Please ensure GEMINI_API_KEY is configured in backend/.env",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except GeminiResponseValidationError as re:
            logger.error(f"Gemini final response validation failed: {str(re)}")
            return Response(
                {
                    "error": "Invalid AI Response",
                    "message": "The AI service returned an incomplete or malformed final response schema. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiAPIError as ae:
            logger.error(f"Gemini API communication error: {str(ae)}")
            return Response(
                {
                    "error": "AI Service Unavailable",
                    "message": "Unable to reach the AI analysis service. Please verify your connection or retry in a few moments.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiServiceError as ge:
            logger.error(f"Gemini final service pipeline failure: {str(ge)}", exc_info=True)
            return Response(
                {
                    "error": "AI Synthesis Error",
                    "message": "An error occurred during final diagnostic synthesis. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception as e:
            logger.error(f"Unexpected final synthesis processing error: {str(e)}", exc_info=True)
            return Response(
                {
                    "error": "Internal Server Error",
                    "message": "An unexpected server error occurred while synthesizing your final diagnostic.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DiagnosticHistoryListView(APIView):
    """
    GET /api/history/
    Lists all completed diagnostic records, with support for search and sorting.
    """

    def get(self, request, *args, **kwargs):
        queryset = DiagnosticRecord.objects.all()

        # Search by topic
        search_query = request.query_params.get("search", "").strip()
        if search_query:
            queryset = queryset.filter(topic__icontains=search_query)

        # Sort order
        sort_by = request.query_params.get("sort", "newest")
        if sort_by == "highest":
            queryset = queryset.order_by("-final_score", "-created_at")
        elif sort_by == "lowest":
            queryset = queryset.order_by("final_score", "-created_at")
        else:
            queryset = queryset.order_by("-created_at")

        serializer = DiagnosticRecordListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        POST /api/history/
        Allows saving a diagnostic result (e.g. when a user chooses to skip probe).
        """
        topic = request.data.get("topic")
        initial_explanation = request.data.get("initial_explanation") or request.data.get("explanation", "")
        confidence = request.data.get("confidence", 50)
        diagnostic_result = request.data.get("diagnostic_result")

        if not topic or not diagnostic_result:
            return Response(
                {"error": "Invalid Payload", "message": "topic and diagnostic_result are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            record = _save_completed_diagnostic(
                topic=topic,
                initial_explanation=initial_explanation,
                confidence=int(confidence),
                diagnostic_result=diagnostic_result,
            )
            return Response(
                {"id": str(record.id), "message": "Diagnostic successfully archived."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            logger.error(f"Error saving diagnostic record: {str(e)}", exc_info=True)
            return Response(
                {"error": "Save Failed", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DiagnosticHistoryDetailView(APIView):
    """
    GET /api/history/<uuid:pk>/ - Retrieve full diagnostic report
    DELETE /api/history/<uuid:pk>/ - Delete diagnostic record
    """

    def get(self, request, pk, *args, **kwargs):
        record = get_object_or_404(DiagnosticRecord, pk=pk)
        serializer = DiagnosticRecordDetailSerializer(record)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        record = get_object_or_404(DiagnosticRecord, pk=pk)
        record.delete()
        return Response(
            {"message": f"Diagnostic record for '{record.topic}' successfully deleted."},
            status=status.HTTP_200_OK,
        )


class MCQGenerateView(APIView):
    """
    POST /api/mcq/generate/
    Accepts: { topic: str, explanation: str, confidence: int, question_count?: int, initial_diagnostic?: dict }
    Returns: Sanitized MCQ assessment for frontend rendering with a secure signed assessment token.
    Answer keys are NEVER sent to the frontend.
    """

    def post(self, request, *args, **kwargs):
        serializer = MCQGenerateRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "error": "Validation Error",
                    "message": "The submitted payload failed input validation.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data
        topic = validated_data["topic"]
        explanation = validated_data["explanation"]
        confidence = validated_data["confidence"]
        question_count = validated_data.get("question_count")
        initial_diagnostic = validated_data.get("initial_diagnostic")

        try:
            assessment_raw = GeminiAnalysisService.generate_mcq_assessment(
                topic=topic,
                explanation=explanation,
                confidence=confidence,
                initial_diagnostic=initial_diagnostic,
                question_count=question_count,
            )

            # Generate secure cryptographic token containing the full assessment with answer keys
            assessment_token = signing.dumps(assessment_raw, salt=MCQ_TOKEN_SALT)

            # Sanitize questions: strip correct_answer and explanation for secure client delivery
            sanitized_questions = []
            for q in assessment_raw.get("questions", []):
                sanitized_questions.append({
                    "id": q["id"],
                    "question": q["question"],
                    "options": q["options"],
                    "concept": q.get("concept", ""),
                    "difficulty": q.get("difficulty", "medium"),
                })

            return Response(
                {
                    "assessment_token": assessment_token,
                    "topic": topic,
                    "question_count": len(sanitized_questions),
                    "questions": sanitized_questions,
                },
                status=status.HTTP_200_OK,
            )

        except GeminiConfigurationError as ce:
            logger.error(f"Configuration error during MCQ generation: {str(ce)}")
            return Response(
                {
                    "error": "AI Service Unconfigured",
                    "message": "The AI service is not properly configured on the server. Please ensure GEMINI_API_KEY is configured in backend/.env",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except GeminiResponseValidationError as re:
            logger.error(f"Gemini MCQ response validation failed: {str(re)}")
            return Response(
                {
                    "error": "Invalid AI Response",
                    "message": "The AI service returned an incomplete or malformed assessment schema. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiAPIError as ae:
            logger.error(f"Gemini API communication error during MCQ generation: {str(ae)}")
            return Response(
                {
                    "error": "AI Service Unavailable",
                    "message": "Unable to reach the AI assessment service. Please verify your connection or retry in a few moments.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiServiceError as ge:
            logger.error(f"Gemini service pipeline failure during MCQ generation: {str(ge)}", exc_info=True)
            return Response(
                {
                    "error": "AI Generation Error",
                    "message": "An error occurred while generating the assessment. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception as e:
            logger.error(f"Unexpected MCQ generation processing error: {str(e)}", exc_info=True)
            return Response(
                {
                    "error": "Internal Server Error",
                    "message": "An unexpected server error occurred while preparing your assessment.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class MCQSubmitView(APIView):
    """
    POST /api/mcq/submit/
    Accepts: { assessment_token: str, topic: str, initial_explanation: str, confidence: int, answers: list, initial_diagnostic?: dict }
    Verifies the server-side answer key from token, computes empirical evidence, and synthesizes final diagnostic.
    Persists the validated completed diagnostic.
    """

    def post(self, request, *args, **kwargs):
        serializer = MCQSubmitRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "error": "Validation Error",
                    "message": "The submitted answers payload failed validation.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data
        assessment_token = validated_data["assessment_token"]
        topic = validated_data["topic"]
        initial_explanation = validated_data["initial_explanation"]
        confidence = validated_data["confidence"]
        user_answers = validated_data["answers"]
        initial_diagnostic = validated_data.get("initial_diagnostic")

        # 1. Cryptographically decode and verify assessment token
        try:
            assessment_data = signing.loads(
                assessment_token,
                salt=MCQ_TOKEN_SALT,
                max_age=3600 * 24  # 24 hour expiry
            )
        except signing.SignatureExpired:
            return Response(
                {"error": "Session Expired", "message": "The assessment session has expired. Please restart your evaluation."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except signing.BadSignature:
            return Response(
                {"error": "Invalid Token", "message": "The assessment signature is invalid or has been tampered with."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        original_questions = assessment_data.get("questions", [])
        if not original_questions:
            return Response(
                {"error": "Invalid Assessment", "message": "Assessment data contains no questions."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        question_map = {q["id"]: q for q in original_questions}

        # 2. Validate submitted question IDs and answer completeness
        submitted_qids = {ans["question_id"] for ans in user_answers}
        expected_qids = set(question_map.keys())

        if submitted_qids != expected_qids:
            missing_ids = list(expected_qids - submitted_qids)
            invalid_ids = list(submitted_qids - expected_qids)
            error_msg = []
            if missing_ids:
                error_msg.append(f"Missing answers for questions: {', '.join(missing_ids)}.")
            if invalid_ids:
                error_msg.append(f"Unrecognized question IDs: {', '.join(invalid_ids)}.")
            return Response(
                {"error": "Incomplete or Invalid Submission", "message": " ".join(error_msg)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 3. Grade each answer server-side against secure answer keys
        mcq_evidence = []
        for ans in user_answers:
            qid = ans["question_id"]
            selected_option = ans["selected_option"]
            orig_q = question_map[qid]

            options = orig_q.get("options", [])
            if selected_option < 0 or selected_option >= len(options):
                return Response(
                    {
                        "error": "Invalid Option Index",
                        "message": f"Selected option {selected_option} is out of range for question '{qid}'.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            correct_option = orig_q.get("correct_answer", 0)
            is_correct = (selected_option == correct_option)

            mcq_evidence.append({
                "id": qid,
                "question": orig_q.get("question", ""),
                "options": options,
                "selected_option": selected_option,
                "correct_answer": correct_option,
                "is_correct": is_correct,
                "concept": orig_q.get("concept", ""),
                "difficulty": orig_q.get("difficulty", "medium"),
                "explanation": orig_q.get("explanation", ""),
            })

        # 4. Synthesize final conceptual diagnostic with empirical MCQ evidence
        try:
            synthesized_result = GeminiAnalysisService.synthesize_final_diagnostic_with_mcq(
                topic=topic,
                initial_explanation=initial_explanation,
                confidence=confidence,
                mcq_evidence=mcq_evidence,
                initial_diagnostic=initial_diagnostic,
            )

            # Auto-save completed diagnostic
            try:
                record = _save_completed_diagnostic(
                    topic=topic,
                    initial_explanation=initial_explanation,
                    confidence=confidence,
                    diagnostic_result=synthesized_result,
                )
                synthesized_result["saved_record_id"] = str(record.id)
            except Exception as save_err:
                logger.error(f"Failed to auto-save MCQ synthesized diagnostic: {str(save_err)}", exc_info=True)

            return Response(synthesized_result, status=status.HTTP_200_OK)

        except GeminiConfigurationError as ce:
            logger.error(f"Configuration error during MCQ final synthesis: {str(ce)}")
            return Response(
                {
                    "error": "AI Service Unconfigured",
                    "message": "The AI service is not properly configured on the server. Please ensure GEMINI_API_KEY is configured in backend/.env",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except GeminiResponseValidationError as re:
            logger.error(f"Gemini final response validation failed during MCQ synthesis: {str(re)}")
            return Response(
                {
                    "error": "Invalid AI Response",
                    "message": "The AI service returned an incomplete or malformed diagnostic schema. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiAPIError as ae:
            logger.error(f"Gemini API communication error during MCQ synthesis: {str(ae)}")
            return Response(
                {
                    "error": "AI Service Unavailable",
                    "message": "Unable to reach the AI analysis service. Please verify your connection or retry in a few moments.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiServiceError as ge:
            logger.error(f"Gemini service pipeline failure during MCQ synthesis: {str(ge)}", exc_info=True)
            return Response(
                {
                    "error": "AI Synthesis Error",
                    "message": "An error occurred during final diagnostic synthesis. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception as e:
            logger.error(f"Unexpected MCQ final synthesis processing error: {str(e)}", exc_info=True)
            return Response(
                {
                    "error": "Internal Server Error",
                    "message": "An unexpected server error occurred while synthesizing your final diagnostic.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

