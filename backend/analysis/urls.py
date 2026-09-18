from django.urls import path
from .views import (
    AnalyzeExplanationView,
    FinalDiagnoseExplanationView,
    DiagnosticHistoryListView,
    DiagnosticHistoryDetailView,
    MCQGenerateView,
    MCQSubmitView,
)

urlpatterns = [
    path('analyze/', AnalyzeExplanationView.as_view(), name='analyze_explanation'),
    path('diagnose/final/', FinalDiagnoseExplanationView.as_view(), name='final_diagnose_explanation'),
    path('mcq/generate/', MCQGenerateView.as_view(), name='mcq_generate'),
    path('mcq/submit/', MCQSubmitView.as_view(), name='mcq_submit'),
    path('history/', DiagnosticHistoryListView.as_view(), name='diagnostic_history_list'),
    path('history/<uuid:pk>/', DiagnosticHistoryDetailView.as_view(), name='diagnostic_history_detail'),
]
