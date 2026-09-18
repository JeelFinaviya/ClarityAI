/**
 * 50 High-Value Django REST Framework (DRF) Interview Questions
 */

export const DRF_QUESTIONS = [
  {
    id: 1,
    question: "What is a Serializer in DRF and how does it handle serialization vs deserialization?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "A Serializer converts complex data types (Django model instances, QuerySets) into native Python datatypes that can easily be rendered into JSON/XML (**serialization**). It also takes validated incoming JSON data, validates it against schema rules, and converts it into complex types or model instances (**deserialization**)."
  },
  {
    id: 2,
    question: "What is the difference between `Serializer` and `ModelSerializer` in DRF?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "`Serializer` is a generic class where you must manually declare all fields and write explicit `create()` and `update()` methods. `ModelSerializer` automatically inspects a Django model, generates matching serializer fields with correct validators, and provides default `create()` and `update()` implementations."
  },
  {
    id: 3,
    question: "What is the difference between `APIView`, `GenericAPIView`, and `ViewSet`?",
    category: "Views & ViewSets",
    difficulty: "Medium",
    explanation: "`APIView` is the basic class handling HTTP method handlers (`get()`, `post()`). `GenericAPIView` adds helper attributes (`queryset`, `serializer_class`, `lookup_field`) and mixins (`ListModelMixin`, `CreateModelMixin`). `ViewSet` bundles standard REST actions (`list()`, `create()`, `retrieve()`, `update()`, `destroy()`) without tying them to explicit HTTP methods, mapped automatically by a `Router`."
  },
  {
    id: 4,
    question: "What is the difference between `ModelViewSet` and `ReadOnlyModelViewSet`?",
    category: "Views & ViewSets",
    difficulty: "Easy",
    explanation: "`ModelViewSet` inherits mixins for full CRUD operations (`list`, `create`, `retrieve`, `update`, `partial_update`, `destroy`). `ReadOnlyModelViewSet` provides only read operations (`list` and `retrieve`), preventing state-changing mutations."
  },
  {
    id: 5,
    question: "How does validation work in DRF serializers (`validate_<field_name>()` vs `validate()`)?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "`validate_<field_name>(self, value)` performs field-level validation, returning the cleaned value or raising `serializers.ValidationError`. `validate(self, attrs)` performs object-level cross-validation across multiple fields at once, accessing the full dictionary of input attributes."
  },
  {
    id: 6,
    question: "What is the difference between `read_only=True` and `write_only=True` on serializer fields?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "`read_only=True` fields are included in serialized API output (responses) but ignored during deserialization (creates/updates), ideal for IDs, timestamps, and calculated fields. `write_only=True` fields are accepted in requests but never exposed in response output, standard for passwords."
  },
  {
    id: 7,
    question: "How do DRF Routers (`DefaultRouter` vs `SimpleRouter`) work?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "Routers automatically generate URL patterns for ViewSets. `SimpleRouter` registers basic standard routes (`/prefix/`, `/prefix/{pk}/`). `DefaultRouter` does the same and also generates a default root API index view displaying hyperlinks to all registered endpoints, with optional format suffixes (`.json`)."
  },
  {
    id: 8,
    question: "How do you add custom actions to a `ModelViewSet` using the `@action` decorator?",
    category: "Views & ViewSets",
    difficulty: "Medium",
    explanation: "By decorating a method with `@action(detail=True/False, methods=['post'], url_path='custom-path')`. Setting `detail=True` creates an instance-level route (`/users/1/set-password/`); setting `detail=False` creates a collection-level route (`/users/recent/`)."
  },
  {
    id: 9,
    question: "How do DRF Permission Classes work and what is `has_permission()` vs `has_object_permission()`?",
    category: "Permissions & Auth",
    difficulty: "Medium",
    explanation: "`has_permission(self, request, view)` runs before the view executes to check global access (e.g. `IsAuthenticated`). `has_object_permission(self, request, view, obj)` runs after the specific model instance is retrieved from the database to check row-level access (e.g., verifying `obj.author == request.user`)."
  },
  {
    id: 10,
    question: "What are the common Authentication classes in DRF?",
    category: "Permissions & Auth",
    difficulty: "Easy",
    explanation: "1) `SessionAuthentication` (uses Django session cookies and CSRF), 2) `BasicAuthentication` (HTTP Basic credentials), 3) `TokenAuthentication` (simple static DB token), 4) `JWTAuthentication` (stateless tokens via `djangorestframework-simplejwt`)."
  },
  {
    id: 11,
    question: "How does JWT Authentication work in DRF using `djangorestframework-simplejwt`?",
    category: "Permissions & Auth",
    difficulty: "Medium",
    explanation: "Clients authenticate at `TokenObtainPairView`, receiving a short-lived **Access Token** (e.g. 15 min) and long-lived **Refresh Token** (e.g. 7 days). Requests include `Authorization: Bearer <access_token>`. When expired, `TokenRefreshView` exchanges the refresh token for a new access token without re-entering credentials."
  },
  {
    id: 12,
    question: "How do you handle Nested Serializers for related models in DRF?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "By nesting child serializers inside parent serializers (e.g., `author = UserSerializer(read_only=True)` or `comments = CommentSerializer(many=True)`). For writable nested serializers, you must override the parent serializer's `create()` and `update()` methods to pop nested dictionaries and create child models explicitly."
  },
  {
    id: 13,
    question: "What is `SerializerMethodField` and what are its performance implications?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "`SerializerMethodField()` defines a read-only field whose value is calculated by calling a method `get_<field_name>(self, obj)`. While flexible, performing database queries inside a `SerializerMethodField` triggers N+1 query bottlenecks for large QuerySets."
  },
  {
    id: 14,
    question: "What are DRF Throttling classes and how is Rate Limiting enforced?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "Throttles (`AnonRateThrottle`, `UserRateThrottle`, `ScopedRateThrottle`) restrict request rates (e.g., `'anon': '100/day'`, `'user': '1000/hour'`). They track request rates against client IP or user ID in the cache backend, returning `429 Too Many Requests` with a `Retry-After` header when exceeded."
  },
  {
    id: 15,
    question: "What are the standard Pagination classes in DRF?",
    category: "Performance & Caching",
    difficulty: "Easy",
    explanation: "1) `PageNumberPagination` (e.g., `?page=2&page_size=20`), 2) `LimitOffsetPagination` (e.g., `?limit=20&offset=40`), 3) `CursorPagination` (opaque encoded cursor for ordering by unchanging keys, optimal for high-write tables and infinite scrolling)."
  },
  {
    id: 16,
    question: "Why is `CursorPagination` better than `PageNumberPagination` for large or high-frequency tables?",
    category: "Performance & Caching",
    difficulty: "Hard",
    explanation: "`PageNumberPagination` uses SQL `OFFSET`, which degrades to O(N) as the page number increases (database must scan and discard all preceding rows) and suffers from duplicate/missed records if items are inserted while paging. `CursorPagination` uses indexed `WHERE id < cursor` lookups (constant O(1) performance)."
  },
  {
    id: 17,
    question: "What is `source` argument on DRF Serializer fields?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "The `source` argument specifies the attribute used to populate a field. It can point to a model field with a different name (`client_email = serializers.EmailField(source='email')`), traverse relationships (`author_name = serializers.CharField(source='author.username')`), or point to a model method."
  },
  {
    id: 18,
    question: "How do you customize the response format for unhandled exceptions in DRF?",
    category: "Error Handling",
    difficulty: "Medium",
    explanation: "By creating a custom exception handler function `custom_exception_handler(exc, context)` configured in `REST_FRAMEWORK['EXCEPTION_HANDLER']`. It calls DRF's default handler and wraps the response data in a standardized JSON envelope (`{ 'success': false, 'error': ..., 'status_code': 400 }`)."
  },
  {
    id: 19,
    question: "What is the purpose of `extra_kwargs` in `ModelSerializer.Meta`?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "`extra_kwargs` modifies metadata options on automatically generated model serializer fields (e.g. `extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}`) without having to explicitly redefine the entire field declaration."
  },
  {
    id: 20,
    question: "What are DRF Filters (`django-filter`, `SearchFilter`, `OrderingFilter`)?",
    category: "Filtering & Search",
    difficulty: "Easy",
    explanation: "Configured on generic views via `filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]`. `SearchFilter` allows full-text substring queries via `?search=term`. `OrderingFilter` allows dynamic sorting via `?ordering=-created_at`. `django-filter` provides declarative multi-field filters."
  },
  {
    id: 21,
    question: "What is `HyperlinkedModelSerializer` vs `ModelSerializer`?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "`HyperlinkedModelSerializer` uses hyperlinked URLs (`url` field linking to `/api/items/1/`) to represent relationships and primary keys instead of raw integer IDs, adhering to REST HATEOAS architectural principles."
  },
  {
    id: 22,
    question: "What is `depth` option in `ModelSerializer.Meta`?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "Setting `depth = 1` automatically serializes nested foreign key and many-to-many relationships up to 1 level deep as nested objects instead of simple ID integers. However, nested representations generated by `depth` are strictly read-only."
  },
  {
    id: 23,
    question: "What is the purpose of `to_representation()` and `to_internal_value()` in DRF serializers?",
    category: "Serializers",
    difficulty: "Hard",
    explanation: "`to_internal_value(data)` transforms raw incoming primitive request data into validated Python types for deserialization. `to_representation(instance)` transforms the Python model instance into outbound serialized JSON primitive types for responses."
  },
  {
    id: 24,
    question: "How do you handle file uploads in DRF and what Parsers are used?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "By configuring `parser_classes = [MultiPartParser, FormParser]` on the view or globally in settings, and using `serializers.FileField` / `ImageField` in serializers to validate file size, dimensions, and mime types."
  },
  {
    id: 25,
    question: "What is the difference between `save()` on a Form vs `save()` on a DRF Serializer?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "In DRF, `serializer.save(**extra_kwargs)` calls `create()` or `update()` depending on whether an existing instance was passed. You can inject extra attributes (e.g. `serializer.save(author=request.user)`) that were not part of the incoming request body."
  },
  {
    id: 26,
    question: "What is `get_serializer_class()` and `get_queryset()` dynamic overriding in Generic Views?",
    category: "Views & ViewSets",
    difficulty: "Medium",
    explanation: "Overriding `get_queryset(self)` dynamically filters QuerySets based on the active user (e.g. `return Product.objects.filter(owner=self.request.user)`). Overriding `get_serializer_class(self)` returns different serializers based on the action (e.g. `UserDetailSerializer` for retrieve, `UserListSerializer` for list)."
  },
  {
    id: 27,
    question: "How do you implement API schema generation and OpenAPI/Swagger in DRF?",
    category: "Tooling & Documentation",
    difficulty: "Easy",
    explanation: "Using `drf-spectacular` (the modern OpenAPI 3 standard for DRF). It inspects serializers, viewsets, and filters to generate automated `/api/schema/`, Swagger UI (`/api/docs/`), and Redoc interactive API documentation."
  },
  {
    id: 28,
    question: "What is the `lookup_field` attribute in DRF Generic Views?",
    category: "Views & ViewSets",
    difficulty: "Easy",
    explanation: "`lookup_field` specifies the model field used to look up individual object instances in detail routes (default is `'pk'`). Setting `lookup_field = 'slug'` routes detail views via `/articles/<slug>/` instead of integer IDs."
  },
  {
    id: 29,
    question: "What is `PrimaryKeyRelatedField` vs `SlugRelatedField`?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "`PrimaryKeyRelatedField` represents a related model by its primary key ID integer. `SlugRelatedField(slug_field='slug', ...)` represents the relationship using a unique slug or string field (e.g., category name) instead of its ID."
  },
  {
    id: 30,
    question: "What is `Serializer(many=True)` and how does list serialization work?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "Passing `many=True` instantiates a `ListSerializer` class that iterates over an iterable/QuerySet, serializing each element through the child serializer class and returning a JSON array of objects."
  },
  {
    id: 31,
    question: "What is `perform_create(self, serializer)` in Generic Views?",
    category: "Views & ViewSets",
    difficulty: "Easy",
    explanation: "`perform_create()` is a lifecycle hook called by `CreateModelMixin` when saving a new instance, commonly used to attach the authenticated user: `serializer.save(created_by=self.request.user)`."
  },
  {
    id: 32,
    question: "How do you test DRF APIs using `APITestCase` and `APIClient`?",
    category: "Testing",
    difficulty: "Medium",
    explanation: "Inheriting from `rest_framework.test.APITestCase`, using `self.client.force_authenticate(user=user)` to simulate authenticated sessions, and asserting JSON response structures: `response = self.client.get(url); self.assertEqual(response.status_code, 200)`."
  },
  {
    id: 33,
    question: "What is the `request.data` attribute in DRF?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`request.data` is DRF's flexible replacement for Django's `request.POST` and `request.FILES`. It seamlessly parses JSON payloads, form data, and multipart file uploads into a uniform dictionary-like object."
  },
  {
    id: 34,
    question: "What is `request.user` when a request is unauthenticated in DRF?",
    category: "Permissions & Auth",
    difficulty: "Easy",
    explanation: "If no authentication credentials are provided, `request.user` is set to an instance of `django.contrib.auth.models.AnonymousUser`, and `request.auth` is set to `None`."
  },
  {
    id: 35,
    question: "What is `partial=True` in serializer validation?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "Passing `partial=True` to a serializer instance (`serializer = UserSerializer(instance, data=request.data, partial=True)`) allows HTTP `PATCH` partial updates, validating only the fields present in the payload without requiring all mandatory model fields."
  },
  {
    id: 36,
    question: "What is the `validators` attribute on Serializer classes and fields?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "Explicit validator callables attached to fields or serializer `Meta.validators` (e.g., `UniqueTogetherValidator(queryset=..., fields=['user', 'email'])`) to enforce database constraints and validation before calling `.save()`."
  },
  {
    id: 37,
    question: "What is `BrowsableAPIRenderer` vs `JSONRenderer`?",
    category: "Renderers",
    difficulty: "Easy",
    explanation: "`JSONRenderer` renders raw JSON strings. `BrowsableAPIRenderer` renders an interactive, human-friendly HTML web interface where developers can browse API endpoints, inspect headers, and submit test form data in the browser."
  },
  {
    id: 38,
    question: "What is Content Negotiation in DRF and how is `DEFAULT_RENDERER_CLASSES` used?",
    category: "Renderers",
    difficulty: "Medium",
    explanation: "DRF inspects the incoming request's `Accept` HTTP header and URL format suffixes (`.json`, `.api`) to select the appropriate renderer class from `DEFAULT_RENDERER_CLASSES` to format the response payload."
  },
  {
    id: 39,
    question: "What is `ListCreateAPIView` vs `RetrieveUpdateDestroyAPIView`?",
    category: "Views & ViewSets",
    difficulty: "Easy",
    explanation: "`ListCreateAPIView` handles collection endpoints (`GET` for listing, `POST` for creation). `RetrieveUpdateDestroyAPIView` handles individual item detail endpoints (`GET` detail, `PUT`/`PATCH` updates, `DELETE` removal)."
  },
  {
    id: 40,
    question: "How do you optimize DRF APIs against database serialization bottlenecks?",
    category: "Performance & Caching",
    difficulty: "Hard",
    explanation: "1) Apply `select_related` / `prefetch_related` on the view `queryset`, 2) Avoid heavy calculations in `SerializerMethodField`, 3) Use `only()` or `defer()` to skip unused columns, 4) For massive read endpoints, serialize directly with `.values()` bypass."
  },
  {
    id: 41,
    question: "What is the purpose of `context` parameter passed to serializers (`UserSerializer(data, context={'request': request})`)?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "The `context` dictionary provides arbitrary extra context to the serializer instance, accessible inside serializer methods via `self.context['request']` (used for building absolute URLs or checking the active user)."
  },
  {
    id: 42,
    question: "What is `django-rest-knox`?",
    category: "Permissions & Auth",
    difficulty: "Medium",
    explanation: "An enhanced token authentication library for DRF that stores encrypted tokens in the database, supports multiple tokens per user (multi-device login), token expiration timestamps, and per-token permission scopes."
  },
  {
    id: 43,
    question: "What is `initial_data` vs `validated_data` on a Serializer?",
    category: "Serializers",
    difficulty: "Medium",
    explanation: "`serializer.initial_data` contains the raw, untrusted data passed to the serializer. `serializer.validated_data` is available only after calling `.is_valid()`, containing cleaned, type-cast Python objects ready for storage."
  },
  {
    id: 44,
    question: "What is `is_valid(raise_exception=True)` in DRF?",
    category: "Serializers",
    difficulty: "Easy",
    explanation: "Passing `raise_exception=True` causes DRF to automatically raise a `serializers.ValidationError(serializer.errors)` if validation fails, which DRF's exception handler translates into an HTTP `400 Bad Request` JSON response."
  },
  {
    id: 45,
    question: "What is `ListSerializer` and how do you customize bulk creations in DRF?",
    category: "Serializers",
    difficulty: "Hard",
    explanation: "By defining a custom `ListSerializer` with a customized `create()` method utilizing `Model.objects.bulk_create()` and linking it in the child serializer's `Meta.list_serializer_class`."
  },
  {
    id: 46,
    question: "What is `rest_framework.decorators.api_view`?",
    category: "Views & ViewSets",
    difficulty: "Easy",
    explanation: "A decorator for Function-Based Views (`@api_view(['GET', 'POST'])`) that wraps the function in an `APIView` instance, ensuring it receives a DRF `Request`, processes authentication/permissions, and handles exceptions."
  },
  {
    id: 47,
    question: "What is `django-cors-headers` role in a decoupled DRF + React/Next.js architecture?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "It intercepts preflight `OPTIONS` requests from browser single-page applications running on different ports/domains and sets the appropriate `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` response headers."
  },
  {
    id: 48,
    question: "What is the `rest_framework.status` module?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "A module providing explicit human-readable named constants for HTTP status codes (e.g. `status.HTTP_200_OK`, `status.HTTP_201_CREATED`, `status.HTTP_400_BAD_REQUEST`, `status.HTTP_404_NOT_FOUND`)."
  },
  {
    id: 49,
    question: "What is the difference between `ModelSerializer.Meta.fields = '__all__'` vs explicit list?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Explicitly listing fields (`fields = ['id', 'name', 'email']`) is a security best practice to prevent accidental exposure of sensitive internal model fields (e.g. password hashes, internal flags) when new columns are added to models."
  },
  {
    id: 50,
    question: "How does DRF integrate with Redis caching via `drf-extensions` / `django-redis`?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "By applying `@method_decorator(cache_page(60 * 15))` on view actions or using `drf-extensions` `CacheResponseMixin` to cache serialized JSON payloads in Redis key-value stores for lightning-fast reads."
  }
];
