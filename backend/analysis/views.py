import logging
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
)
from .gemini_service import (
    GeminiAnalysisService,
    GeminiConfigurationError,
    GeminiResponseValidationError,
    GeminiAPIError,
    GeminiServiceError,
)

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
