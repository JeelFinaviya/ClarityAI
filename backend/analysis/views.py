import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AnalyzeRequestSerializer, FinalDiagnoseRequestSerializer
from .gemini_service import (
    GeminiAnalysisService,
    GeminiConfigurationError,
    GeminiResponseValidationError,
    GeminiAPIError,
    GeminiServiceError,
)

logger = logging.getLogger(__name__)


class AnalyzeExplanationView(APIView):
    """
    POST /api/analyze/
    Accepts: { topic: str, explanation: str, confidence: int }
    Returns: Initial Understanding Analysis JSON with Probe Decision
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
    Returns: Final Synthesized Conceptual Diagnostic with Diagnostic Journey
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
                    "message": "The AI service returned an incomplete or malformed final diagnostic schema. Please retry your submission.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiAPIError as ae:
            logger.error(f"Gemini API communication error in final synthesis: {str(ae)}")
            return Response(
                {
                    "error": "AI Service Unavailable",
                    "message": "Unable to reach the AI analysis service for diagnostic synthesis. Please verify your connection or retry in a few moments.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except GeminiServiceError as ge:
            logger.error(f"Gemini final synthesis pipeline failure: {str(ge)}", exc_info=True)
            return Response(
                {
                    "error": "AI Analysis Error",
                    "message": "An error occurred during final AI diagnostic synthesis. Please retry.",
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception as e:
            logger.error(f"Unexpected final synthesis error: {str(e)}", exc_info=True)
            return Response(
                {
                    "error": "Internal Server Error",
                    "message": "An unexpected server error occurred while processing final diagnostic synthesis.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

