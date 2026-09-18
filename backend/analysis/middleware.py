from django.http import HttpResponse


class OpenCorsMiddleware:
    """
    Guarantees that every request (including OPTIONS preflights and error responses)
    receives universal CORS headers for seamless cross-origin communication.
    Dynamically mirrors the origin header to allow credentials while maintaining full cross-origin compatibility.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get('Origin') or request.META.get('HTTP_ORIGIN')

        if request.method == 'OPTIONS':
            response = HttpResponse(status=200)
            self._apply_cors_headers(response, origin)
            return response

        response = self.get_response(request)
        self._apply_cors_headers(response, origin)
        return response

    def _apply_cors_headers(self, response, origin):
        if origin:
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Credentials'] = 'true'
            response['Vary'] = 'Origin'
        else:
            response['Access-Control-Allow-Origin'] = '*'

        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = (
            'Content-Type, Authorization, Accept, X-Requested-With, Origin, '
            'x-csrftoken, X-CSRFToken, Cache-Control, Pragma'
        )
        response['Access-Control-Max-Age'] = '86400'

