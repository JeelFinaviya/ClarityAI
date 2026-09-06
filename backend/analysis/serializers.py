from rest_framework import serializers

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

