from rest_framework import serializers
from .models import DiagnosticRecord


class AnalyzeRequestSerializer(serializers.Serializer):
    topic = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=2,
        max_length=255,
        error_messages={
            'required': 'Topic is required.',
            'blank': 'Topic cannot be blank.',
            'min_length': 'Topic must contain at least 2 characters.',
            'max_length': 'Topic must not exceed 255 characters.',
        }
    )
    explanation = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=30,
        max_length=5000,
        error_messages={
            'required': 'Explanation is required.',
            'blank': 'Explanation cannot be blank.',
            'min_length': 'Explanation must contain at least 30 characters.',
            'max_length': 'Explanation must not exceed 5000 characters.',
        }
    )
    confidence = serializers.IntegerField(
        required=True,
        min_value=0,
        max_value=100,
        error_messages={
            'required': 'Confidence score is required.',
            'min_value': 'Confidence must be between 0 and 100.',
            'max_value': 'Confidence must be between 0 and 100.',
            'invalid': 'Confidence must be a valid integer between 0 and 100.',
        }
    )


class FinalDiagnoseRequestSerializer(serializers.Serializer):
    topic = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=2,
        max_length=255,
        error_messages={
            'required': 'Topic is required.',
            'blank': 'Topic cannot be blank.',
            'min_length': 'Topic must contain at least 2 characters.',
            'max_length': 'Topic must not exceed 255 characters.',
        }
    )
    initial_explanation = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=30,
        max_length=5000,
        error_messages={
            'required': 'Initial explanation is required.',
            'blank': 'Initial explanation cannot be blank.',
            'min_length': 'Initial explanation must contain at least 30 characters.',
            'max_length': 'Initial explanation must not exceed 5000 characters.',
        }
    )
    confidence = serializers.IntegerField(
        required=True,
        min_value=0,
        max_value=100,
        error_messages={
            'required': 'Confidence score is required.',
            'min_value': 'Confidence must be between 0 and 100.',
            'max_value': 'Confidence must be between 0 and 100.',
            'invalid': 'Confidence must be a valid integer between 0 and 100.',
        }
    )
    probe_question = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=5,
        max_length=1000,
        error_messages={
            'required': 'Probe question is required.',
            'blank': 'Probe question cannot be blank.',
        }
    )
    probe_answer = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=10,
        max_length=5000,
        error_messages={
            'required': 'Probe response is required.',
            'blank': 'Probe response cannot be blank.',
            'min_length': 'Probe response must contain at least 10 characters.',
            'max_length': 'Probe response must not exceed 5000 characters.',
        }
    )


class DiagnosticRecordListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for displaying the diagnostic archive list.
    """
    class Meta:
        model = DiagnosticRecord
        fields = [
            'id',
            'topic',
            'confidence',
            'initial_score',
            'final_score',
            'verdict',
            'summary',
            'core_accuracy',
            'causal_depth',
            'relational_coherence',
            'created_at',
        ]


class DiagnosticRecordDetailSerializer(serializers.ModelSerializer):
    """
    Complete serializer for full diagnostic report inspection.
    """
    class Meta:
        model = DiagnosticRecord
        fields = '__all__'


class MCQGenerateRequestSerializer(serializers.Serializer):
    topic = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=2,
        max_length=255,
        error_messages={
            'required': 'Topic is required.',
            'blank': 'Topic cannot be blank.',
            'min_length': 'Topic must contain at least 2 characters.',
            'max_length': 'Topic must not exceed 255 characters.',
        }
    )
    explanation = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=30,
        max_length=5000,
        error_messages={
            'required': 'Explanation is required.',
            'blank': 'Explanation cannot be blank.',
            'min_length': 'Explanation must contain at least 30 characters.',
            'max_length': 'Explanation must not exceed 5000 characters.',
        }
    )
    confidence = serializers.IntegerField(
        required=True,
        min_value=0,
        max_value=100,
        error_messages={
            'required': 'Confidence score is required.',
            'min_value': 'Confidence must be between 0 and 100.',
            'max_value': 'Confidence must be between 0 and 100.',
            'invalid': 'Confidence must be a valid integer between 0 and 100.',
        }
    )
    question_count = serializers.IntegerField(
        required=False,
        allow_null=True,
        min_value=3,
        max_value=7,
        error_messages={
            'min_value': 'Question count must be 3, 5, or 7.',
            'max_value': 'Question count must be 3, 5, or 7.',
        }
    )
    initial_diagnostic = serializers.DictField(
        required=False,
        allow_null=True,
        default=dict
    )

    def validate_question_count(self, value):
        if value is not None and value not in (3, 5, 7):
            raise serializers.ValidationError("Question count must be 3 (Quick), 5 (Standard), or 7 (Deep).")
        return value


class MCQAnswerItemSerializer(serializers.Serializer):
    question_id = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        max_length=64,
        error_messages={
            'required': 'question_id is required.',
            'blank': 'question_id cannot be blank.',
        }
    )
    selected_option = serializers.IntegerField(
        required=True,
        min_value=0,
        max_value=3,
        error_messages={
            'required': 'selected_option is required.',
            'min_value': 'selected_option must be an option index between 0 and 3.',
            'max_value': 'selected_option must be an option index between 0 and 3.',
            'invalid': 'selected_option must be an integer between 0 and 3.',
        }
    )


class MCQSubmitRequestSerializer(serializers.Serializer):
    assessment_token = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        error_messages={
            'required': 'assessment_token is required.',
            'blank': 'assessment_token cannot be blank.',
        }
    )
    topic = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=2,
        max_length=255,
        error_messages={
            'required': 'Topic is required.',
            'blank': 'Topic cannot be blank.',
        }
    )
    initial_explanation = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=30,
        max_length=5000,
        error_messages={
            'required': 'Initial explanation is required.',
            'blank': 'Initial explanation cannot be blank.',
        }
    )
    confidence = serializers.IntegerField(
        required=True,
        min_value=0,
        max_value=100,
        error_messages={
            'required': 'Confidence score is required.',
            'min_value': 'Confidence must be between 0 and 100.',
            'max_value': 'Confidence must be between 0 and 100.',
        }
    )
    answers = serializers.ListField(
        child=MCQAnswerItemSerializer(),
        allow_empty=False,
        min_length=1,
        error_messages={
            'required': 'answers list is required.',
            'empty': 'answers list cannot be empty.',
        }
    )
    initial_diagnostic = serializers.DictField(
        required=False,
        allow_null=True,
        default=dict
    )

