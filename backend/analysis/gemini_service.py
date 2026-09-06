import json
import logging
import os
import time
from pathlib import Path
from typing import Optional
from django.conf import settings
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import ServerError, APIError
from pydantic import BaseModel, Field, ValidationError

logger = logging.getLogger(__name__)


# Custom Exceptions for AI Pipeline
class GeminiServiceError(Exception):
    """Base exception for all Gemini analysis service issues."""
    pass


class GeminiConfigurationError(GeminiServiceError):
    """Raised when the API key or model configuration is missing or invalid."""
    pass


class GeminiAPIError(GeminiServiceError):
    """Raised when the external Gemini API fails (quota, network, timeouts, server errors)."""
    pass


class GeminiResponseValidationError(GeminiServiceError):
    """Raised when Gemini returns malformed JSON, incomplete data, or schema violations."""
    pass


# Base Diagnostic Sub-Schemas
class ConceptDemonstrated(BaseModel):
    concept: str = Field(description="The key concept or principle demonstrated")
    depth: str = Field(
        description="Depth level: 'surface_familiarity', 'causal_mechanism', or 'deep_mastery'"
    )
    evidence: str = Field(
        description="Direct quote or paraphrase from the explanation demonstrating this level of understanding"
    )


class MissingConcept(BaseModel):
    concept: str = Field(description="The omitted concept, prerequisite condition, or deeper mechanism")
    why_it_matters: str = Field(
        description="Why this mechanism is essential for a complete first-principles understanding of the topic"
    )


class PossibleMisconception(BaseModel):
    statement: str = Field(description="The specific claim reflecting an oversimplification or inaccurate model")
    underlying_fallacy: str = Field(
        description="The erroneous mental model or faulty assumption behind this claim"
    )
    correction: str = Field(
        description="Clear, scientifically/technically grounded correction of the concept"
    )


class DiagnosticDimensions(BaseModel):
    core_accuracy: int = Field(
        ge=0,
        le=100,
        description="Accuracy score (0-100) evaluating correctness of factual definitions and assertions"
    )
    causal_depth: int = Field(
        ge=0,
        le=100,
        description="Causal depth score (0-100) evaluating whether 'how' and 'why' mechanisms are articulated rather than just keywords"
    )
    relational_coherence: int = Field(
        ge=0,
        le=100,
        description="Relational coherence score (0-100) evaluating grasp of prerequisite conditions, component relationships, and boundary limits"
    )


class ConfidenceCalibration(BaseModel):
    status: str = Field(
        description="Calibration state: 'calibrated' (confidence aligns with understanding), 'overconfident' (confidence exceeds demonstrated depth), or 'underconfident' (understanding exceeds self-rating)"
    )
    gap_analysis: str = Field(
        description="A constructive 1-2 sentence diagnostic comparing self-assessed confidence with actual demonstrated mechanical depth"
    )


class ProbeDecision(BaseModel):
    needs_probe: bool = Field(
        description="True if a targeted follow-up question is needed to clarify an ambiguous mechanism or verify understanding. False if the student already demonstrated comprehensive first-principles depth."
    )
    probe_question: str = Field(
        default="",
        description="ONE highly targeted question probing the single most important missing mechanism or causal 'why/how'. Never a generic definition or quiz. Leave empty if needs_probe is false."
    )
    probe_reason: str = Field(
        default="",
        description="The exact diagnostic ambiguity or omitted mechanism this probe investigates."
    )


class DiagnosticJourney(BaseModel):
    initial_hypothesis: str = Field(
        description="Brief summary of the student's initial conceptual standing and what was uncertain."
    )
    investigated_gap: str = Field(
        description="What specific causal mechanism or invariant the follow-up question investigated."
    )
    followup_finding: str = Field(
        description="What the student's follow-up response revealed (e.g. demonstrated clear causal mechanics, exposed a misconception, or repeated surface buzzwords)."
    )
    synthesis_summary: str = Field(
        description="How the follow-up answer influenced the final evaluation and calibrated score."
    )


# Schema 1: Initial Analysis & Probe Decision
class InitialAnalysisSchema(BaseModel):
    topic: str = Field(description="The topic being analyzed")
    understanding_score: int = Field(
        ge=0,
        le=100,
        description="Preliminary calibrated conceptual score (0-100) based strictly on factual accuracy, causal mechanisms, and depth"
    )
    understanding_level: str = Field(
        description="Conceptual tier: 'Surface Familiarity' (0-45), 'Developing Working Grasp' (46-70), 'Solid Mechanical Understanding' (71-88), or 'Deep First-Principles Mastery' (89-100)"
    )
    diagnostic_dimensions: DiagnosticDimensions = Field(
        description="Granular evaluation across Core Accuracy, Causal Depth, and Relational Coherence"
    )
    confidence_calibration: ConfidenceCalibration = Field(
        description="Diagnostic assessment comparing the student's self-assessed confidence with measured conceptual grasp"
    )
    concepts_understood: list[ConceptDemonstrated] = Field(
        default_factory=list,
        description="Concepts correctly demonstrated in the explanation with depth categorization and evidence"
    )
    missing_concepts: list[MissingConcept] = Field(
        default_factory=list,
        description="Key concepts, mechanisms, or prerequisites omitted from the explanation"
    )
    possible_misconceptions: list[PossibleMisconception] = Field(
        default_factory=list,
        description="Identified misconceptions or flawed mental models. Return empty list if none."
    )
    summary: str = Field(
        description="A concise, constructive 1-2 sentence diagnostic assessment of the student's initial conceptual foundation."
    )
    probe: ProbeDecision = Field(
        description="Decision and generated targeted probe question to resolve diagnostic uncertainty."
    )


# Schema 2: Final Synthesized Diagnostic
class FinalDiagnosticSchema(BaseModel):
    topic: str = Field(description="The topic being analyzed")
    understanding_score: int = Field(
        ge=0,
        le=100,
        description="Final synthesized conceptual diagnostic score (0-100) based on both the original explanation and follow-up answer"
    )
    understanding_level: str = Field(
        description="Final conceptual tier: 'Surface Familiarity', 'Developing Working Grasp', 'Solid Mechanical Understanding', or 'Deep First-Principles Mastery'"
    )
    diagnostic_dimensions: DiagnosticDimensions = Field(
        description="Final granular evaluation across Core Accuracy, Causal Depth, and Relational Coherence"
    )
    confidence_calibration: ConfidenceCalibration = Field(
        description="Final assessment comparing self-assessed confidence with synthesized understanding depth"
    )
    concepts_understood: list[ConceptDemonstrated] = Field(
        default_factory=list,
        description="All confirmed concepts demonstrated across both responses"
    )
    missing_concepts: list[MissingConcept] = Field(
        default_factory=list,
        description="Remaining conceptual gaps after both responses"
    )
    possible_misconceptions: list[PossibleMisconception] = Field(
        default_factory=list,
        description="Misconceptions identified across both responses"
    )
    summary: str = Field(
        description="A comprehensive, constructive synthesis of the student's conceptual grasp."
    )
    diagnostic_journey: Optional[DiagnosticJourney] = Field(
        default=None,
        description="Summary of the diagnostic journey showing how the follow-up investigation impacted the diagnosis."
    )


INITIAL_SYSTEM_PROMPT = """You are an expert Educational Understanding Diagnostic Analyst for ClarityAI.
Your mission is to perform a rigorous conceptual diagnostic on a student's written explanation to detect the difference between surface familiarity (buzzwords/memorization) and genuine causal understanding (first-principles mechanisms).

CRITICAL DIAGNOSTIC PRINCIPLES:

1. Surface Familiarity vs. Causal Mechanism:
   - Surface Familiarity: The student knows definitions, acronyms, or high-level buzzwords without underlying mechanics.
   - Causal Mechanism: The student explains HOW and WHY the underlying process works step-by-step.
   - Do NOT reward keyword stuffing without operational mechanisms.

2. Diagnostic Dimensions:
   - Core Accuracy (0-100): Are the definitions and assertions factually correct?
   - Causal Depth (0-100): Did the student explain the invariant, step-by-step causality, and internal mechanics?
   - Relational Coherence (0-100): Did the student articulate prerequisite constraints and component interactions?

3. Targeted Probe Formulation (Single Question):
   - Determine if a follow-up probe is needed (needs_probe = true).
   - Set needs_probe = false ONLY if the student already demonstrated comprehensive first-principles depth with no major missing mechanisms.
   - When generating a probe question:
     * Focus on the single most critical missing causal mechanism or ambiguity in their explanation.
     * Ask "WHY" or "HOW" the mechanism works.
     * Make it direct, conversational, and grounded in their specific explanation.
     * NEVER ask a generic textbook definition, trivia, or multiple-choice question.
     * NEVER reveal the answer in the question.

4. Epistemic Confidence Calibration:
   - Compare Self-Assessed Confidence with demonstrated Understanding Score:
   - If confidence > understanding_score + 15: "overconfident" (confidence exceeds demonstrated depth).
   - If confidence < understanding_score - 15: "underconfident" (understanding exceeds self-rating).
   - Otherwise: "calibrated".
   - Provide a constructive, encouraging gap_analysis.

5. Tone:
   - Academic, encouraging, constructive, and objective. Frame all outputs strictly as an AI Conceptual Diagnostic of the written text.
"""


FINAL_SYNTHESIS_SYSTEM_PROMPT = """You are an expert Educational Understanding Diagnostic Analyst for ClarityAI.
Your mission is to synthesize a student's INITIAL EXPLANATION and their FOLLOW-UP PROBE ANSWER into a comprehensive, final conceptual diagnostic.

SYNTHESIS PRINCIPLES:
1. Joint Evaluation: Evaluate both responses together as a continuous diagnostic session.
2. Probe Impact:
   - Did the follow-up answer successfully explain the missing causal mechanism? (Upgrade causal_depth & overall score).
   - Did it repeat buzzwords without substance? (Confirm surface familiarity).
   - Did it introduce an erroneous claim? (Identify new misconception).
3. Diagnostic Journey:
   - Provide a 4-part concise diagnostic narrative:
     * initial_hypothesis: What was the student's initial baseline and uncertainty?
     * investigated_gap: What specific causal mechanism or invariant did the probe target?
     * followup_finding: What did the follow-up answer demonstrate or expose?
     * synthesis_summary: How did the probe answer impact the final diagnosis and score calibration?
4. Final Scoring:
   - Recalibrate Core Accuracy, Causal Depth, Relational Coherence, and Overall Understanding Score based on the total demonstrated grasp across both responses.
5. Tone:
   - Rigorous, encouraging, and constructive AI conceptual diagnostic.
"""


def _get_api_key() -> str:
    """Safely retrieves the Gemini API key from environment or settings."""
    key = os.getenv('GEMINI_API_KEY') or getattr(settings, 'GEMINI_API_KEY', '')
    if not key:
        base_dir = getattr(settings, 'BASE_DIR', Path(__file__).resolve().parent.parent)
        load_dotenv(base_dir / '.env', override=True)
        load_dotenv(override=True)
        key = os.getenv('GEMINI_API_KEY') or getattr(settings, 'GEMINI_API_KEY', '')

    if key:
        key = key.strip("'\" \t\n\r")

    return key


def _get_candidate_models() -> list[str]:
    """Returns preferred model list with reliable fallbacks."""
    configured = os.getenv('GEMINI_MODEL') or getattr(settings, 'GEMINI_MODEL', 'gemini-3.6-flash')
    configured = configured.strip("'\" \t\n\r")
    if configured in ('gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'):
        configured = 'gemini-3.6-flash'

    models = [configured]
    for fallback in ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.5-flash']:
        if fallback not in models:
            models.append(fallback)
    return models


class GeminiAnalysisService:
    @staticmethod
    def is_configured() -> bool:
        return bool(_get_api_key())

    @classmethod
    def analyze_explanation(cls, topic: str, explanation: str, confidence: int) -> dict:
        """Alias for initial analysis to preserve backward compatibility."""
        return cls.analyze_initial(topic=topic, explanation=explanation, confidence=confidence)

    @classmethod
    def analyze_initial(cls, topic: str, explanation: str, confidence: int) -> dict:
        api_key = _get_api_key()
        if not api_key:
            raise GeminiConfigurationError(
                "Gemini API key is not configured. Please set GEMINI_API_KEY in backend/.env"
            )

        client = genai.Client(api_key=api_key)
        candidate_models = _get_candidate_models()

        prompt = f"""Perform a conceptual understanding diagnostic and probe decision on the following student submission:

Target Topic: {topic}
Student Self-Assessed Confidence: {confidence}%

Student Explanation:
\"\"\"{explanation}\"\"\"

Evaluate the explanation across core accuracy, causal depth, relational coherence, and confidence calibration. If an operational gap exists, formulate ONE targeted probe question. Return the complete structured diagnostic according to the required schema."""

        last_exception = None

        for model_name in candidate_models:
            for attempt in range(2):
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=INITIAL_SYSTEM_PROMPT,
                            temperature=0.2,
                            response_mime_type="application/json",
                            response_schema=InitialAnalysisSchema,
                        ),
                    )

                    if not response or not hasattr(response, 'text') or not response.text:
                        raise GeminiResponseValidationError("Gemini returned an empty response.")

                    raw_text = response.text.strip()
                    if not raw_text:
                        raise GeminiResponseValidationError("Gemini returned blank text content.")

                    try:
                        parsed_data = json.loads(raw_text)
                    except json.JSONDecodeError as json_err:
                        raise GeminiResponseValidationError(f"Invalid JSON received from Gemini: {str(json_err)}")

                    try:
                        validated_result = InitialAnalysisSchema(**parsed_data)
                    except ValidationError as val_err:
                        raise GeminiResponseValidationError(f"Gemini response did not conform to schema: {str(val_err)}")

                    return validated_result.model_dump()

                except (ServerError, APIError) as api_err:
                    last_exception = api_err
                    logger.warning(
                        f"Attempt {attempt + 1} with model {model_name} encountered temporary API error: {str(api_err)}"
                    )
                    time.sleep(1.0)
                except GeminiResponseValidationError as val_err:
                    logger.error(f"Validation error with model {model_name}: {str(val_err)}")
                    last_exception = val_err
                    break
                except Exception as e:
                    logger.error(f"Gemini generation error with {model_name}: {str(e)}", exc_info=True)
                    last_exception = e
                    break

        if isinstance(last_exception, GeminiResponseValidationError):
            raise last_exception
        elif isinstance(last_exception, (ServerError, APIError)):
            raise GeminiAPIError(f"Gemini upstream API communication failed: {str(last_exception)}")
        else:
            raise GeminiServiceError(f"Gemini analysis pipeline failed: {str(last_exception)}")

    @classmethod
    def synthesize_final_diagnostic(
        cls,
        topic: str,
        initial_explanation: str,
        confidence: int,
        probe_question: str,
        probe_answer: str,
    ) -> dict:
        api_key = _get_api_key()
        if not api_key:
            raise GeminiConfigurationError(
                "Gemini API key is not configured. Please set GEMINI_API_KEY in backend/.env"
            )

        client = genai.Client(api_key=api_key)
        candidate_models = _get_candidate_models()

        prompt = f"""Synthesize a final conceptual understanding diagnostic across both the initial explanation and follow-up probe answer:

Target Topic: {topic}
Self-Assessed Confidence: {confidence}%

INITIAL EXPLANATION:
\"\"\"{initial_explanation}\"\"\"

TARGETED PROBE INVESTIGATION:
Question Asked: \"{probe_question}\"

STUDENT PROBE RESPONSE:
\"\"\"{probe_answer}\"\"\"

Evaluate whether the follow-up response confirmed genuine causal understanding, revealed surface familiarity, or exposed misconceptions. Return the final synthesized diagnostic schema with the complete diagnostic journey."""

        last_exception = None

        for model_name in candidate_models:
            for attempt in range(2):
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=FINAL_SYNTHESIS_SYSTEM_PROMPT,
                            temperature=0.2,
                            response_mime_type="application/json",
                            response_schema=FinalDiagnosticSchema,
                        ),
                    )

                    if not response or not hasattr(response, 'text') or not response.text:
                        raise GeminiResponseValidationError("Gemini returned an empty response.")

                    raw_text = response.text.strip()
                    if not raw_text:
                        raise GeminiResponseValidationError("Gemini returned blank text content.")

                    try:
                        parsed_data = json.loads(raw_text)
                    except json.JSONDecodeError as json_err:
                        raise GeminiResponseValidationError(f"Invalid JSON received from Gemini: {str(json_err)}")

                    try:
                        validated_result = FinalDiagnosticSchema(**parsed_data)
                    except ValidationError as val_err:
                        raise GeminiResponseValidationError(f"Gemini response did not conform to schema: {str(val_err)}")

                    return validated_result.model_dump()

                except (ServerError, APIError) as api_err:
                    last_exception = api_err
                    logger.warning(
                        f"Attempt {attempt + 1} with model {model_name} encountered temporary API error: {str(api_err)}"
                    )
                    time.sleep(1.0)
                except GeminiResponseValidationError as val_err:
                    logger.error(f"Validation error with model {model_name}: {str(val_err)}")
                    last_exception = val_err
                    break
                except Exception as e:
                    logger.error(f"Gemini final synthesis error with {model_name}: {str(e)}", exc_info=True)
                    last_exception = e
                    break

        if isinstance(last_exception, GeminiResponseValidationError):
            raise last_exception
        elif isinstance(last_exception, (ServerError, APIError)):
            raise GeminiAPIError(f"Gemini upstream API communication failed: {str(last_exception)}")
        else:
            raise GeminiServiceError(f"Gemini final synthesis pipeline failed: {str(last_exception)}")
