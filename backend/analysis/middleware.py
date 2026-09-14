from django.http import HttpResponse


class OpenCorsMiddleware:
    """
    Guarantees that every request (including OPTIONS preflights and error responses)
    receives universal CORS headers for seamless cross-origin communication.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'OPTIONS':
            response = HttpResponse()
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept, X-Requested-With, Origin, x-csrftoken'
            response['Access-Control-Max-Age'] = '86400'
            return response

        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept, X-Requested-With, Origin, x-csrftoken'
        return response
