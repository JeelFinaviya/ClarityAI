from django.urls import path
from .views import AnalyzeExplanationView, FinalDiagnoseExplanationView

urlpatterns = [
    path('analyze/', AnalyzeExplanationView.as_view(), name='analyze_explanation'),
    path('diagnose/final/', FinalDiagnoseExplanationView.as_view(), name='final_diagnose_explanation'),
]
