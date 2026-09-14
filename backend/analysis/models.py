import uuid
from django.db import models


class DiagnosticRecord(models.Model):
    """
    Stores completed conceptual understanding diagnostics.
    Persists only validated, final diagnostic results.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.CharField(max_length=255, db_index=True)
    initial_explanation = models.TextField()
    confidence = models.IntegerField(help_text="Self-assessed confidence score (0-100)")
    
    # Scores & Verdict
    initial_score = models.IntegerField(null=True, blank=True, help_text="Initial understanding score (0-100)")
    final_score = models.IntegerField(help_text="Final synthesized understanding score (0-100)")
    verdict = models.CharField(max_length=150, help_text="Conceptual classification / understanding level")
    summary = models.TextField(help_text="Executive diagnostic summary / verdict")

    # Diagnostic Dimensions
    core_accuracy = models.IntegerField(default=0)
    causal_depth = models.IntegerField(default=0)
    relational_coherence = models.IntegerField(default=0)
    diagnostic_dimensions = models.JSONField(default=dict, blank=True)

    # Cartography & Concepts
    demonstrated_concepts = models.JSONField(default=list, blank=True)
    missing_concepts = models.JSONField(default=list, blank=True)
    possible_misconceptions = models.JSONField(default=list, blank=True)

    # Calibration
    confidence_calibration = models.JSONField(default=dict, blank=True)

    # Probe details (if probe was conducted)
    probe_question = models.TextField(blank=True, default="")
    probe_reason = models.TextField(blank=True, default="")
    probe_answer = models.TextField(blank=True, default="")
    diagnostic_journey = models.JSONField(default=dict, blank=True)

    # Full raw result object (to guarantee 100% fidelity when rendering the report)
    full_result = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Diagnostic Record"
        verbose_name_plural = "Diagnostic Records"

    def __str__(self):
        return f"{self.topic} ({self.final_score}/100) - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
