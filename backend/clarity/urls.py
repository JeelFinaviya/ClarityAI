from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok", "service": "ClarityAI Backend"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),
    path('api/', include('analysis.urls')),
    path('', include('analysis.urls')),  # Allows direct routes e.g. /analyze/ and /diagnose/final/
]
