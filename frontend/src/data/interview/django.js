/**
 * 50 High-Value Django Interview Questions
 */

export const DJANGO_QUESTIONS = [
  {
    id: 1,
    question: "What is Django's MVT (Model-View-Template) architectural pattern and how does it compare to MVC?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "Django follows MVT: **Model** handles data layer and database schema; **View** (equivalent to Controller in MVC) executes business logic and retrieves data; **Template** (equivalent to View in MVC) handles presentation and HTML rendering. Django itself acts as the overall Controller routing requests via `urls.py`."
  },
  {
    id: 2,
    question: "What is the N+1 Query Problem in Django ORM and how do `select_related` and `prefetch_related` resolve it?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "N+1 happens when querying 1 parent record makes N separate queries for related records inside a loop. `select_related` uses an SQL **INNER/LEFT JOIN** to fetch single-valued relationships (`ForeignKey`, `OneToOne`) in a single query. `prefetch_related` performs **2 separate SQL queries** and joins many-to-many or reverse foreign keys in Python memory."
  },
  {
    id: 3,
    question: "How does Django Middleware work and in what order are `process_request` and `process_response` executed?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "Middleware is a framework of hooks into Django's request/response processing. Middleware executes in **top-to-bottom order** during the incoming request phase, and in **bottom-to-top reverse order** during the outgoing response phase. Middlewares can short-circuit the request cycle by returning an `HttpResponse` directly."
  },
  {
    id: 4,
    question: "What are Django Signals (`post_save`, `pre_delete`) and what are their architectural drawbacks?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "Signals allow decoupled applications to get notified when certain model actions occur. Drawbacks: 1) They execute synchronously inside the request thread (can slow down response times), 2) They obscure business logic flow and create hidden side effects, 3) Bulk operations (`QuerySet.bulk_create`, `update()`) bypass signals entirely."
  },
  {
    id: 5,
    question: "What is the difference between `null=True` and `blank=True` on Django Model Fields?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "`null=True` is **database-related**: it sets `NULL` constraints in the database column. `blank=True` is **validation-related**: it allows the field to be empty in forms and Django admin. For text fields (`CharField`, `TextField`), avoid `null=True` to prevent having two representations for 'no data' (`NULL` vs empty string `''`)."
  },
  {
    id: 6,
    question: "How do Django Migrations work (`makemigrations` vs `migrate`) and what does `django_migrations` table track?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "`makemigrations` inspects model changes and writes new Python migration files. `migrate` executes unapplied migration files against the database in dependency order. The `django_migrations` database table records which migration files have been successfully executed."
  },
  {
    id: 7,
    question: "What is the difference between Class-Based Views (CBVs) and Function-Based Views (FBVs)?",
    category: "Views & Routing",
    difficulty: "Easy",
    explanation: "FBVs are explicit, straightforward functions taking `request` and returning `HttpResponse`. CBVs (`ListView`, `DetailView`, `CreateView`) leverage OOP inheritance, mixins, and standard lifecycle methods (`get()`, `post()`, `form_valid()`), reducing repetitive CRUD boilerplate."
  },
  {
    id: 8,
    question: "How does Django's CSRF protection mechanism work?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Django sets an encrypted CSRF cookie on the client. For state-changing requests (`POST`, `PUT`, `DELETE`), the client must supply a matching CSRF token via `{% csrf_token %}` form input or `X-CSRFToken` header. `CsrfViewMiddleware` compares the cookie and token using HMAC to reject unauthorized cross-origin submissions."
  },
  {
    id: 9,
    question: "What is the difference between `F()` expressions and `Q()` objects in Django ORM?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`F()` expressions refer directly to database column values without loading them into Python memory (e.g. `Product.objects.update(views=F('views') + 1)`), preventing race conditions. `Q()` objects encapsulate SQL conditions that can be combined with boolean operators (`|` OR, `&` AND, `~` NOT) for complex filtering."
  },
  {
    id: 10,
    question: "What is `transaction.atomic()` and how do database transactions work in Django?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`transaction.atomic()` creates an atomic database transaction context/decorator. If any exception occurs within the block, all database operations are rolled back (`ROLLBACK`). It supports nested savepoints: inner atomic blocks create savepoints that can roll back without failing the outer transaction."
  },
  {
    id: 11,
    question: "Why should you always create a Custom User Model (`AbstractUser` / `AbstractBaseUser`) at the start of a Django project?",
    category: "Authentication & Security",
    difficulty: "Medium",
    explanation: "Django's default `auth.User` hardcodes username-based login and schema. Switching to a custom user model mid-project requires painful database migrations and foreign key rewrites. Extending `AbstractUser` on day one allows custom fields (email login, profile fields) without breaking built-in auth."
  },
  {
    id: 12,
    question: "What is the difference between `AbstractUser` and `AbstractBaseUser`?",
    category: "Authentication & Security",
    difficulty: "Medium",
    explanation: "`AbstractUser` includes full default fields (username, first_name, last_name, email, permissions, groups) and allows adding extra fields. `AbstractBaseUser` provides only the bare minimum authentication framework (`password`, `last_login`), requiring you to define all fields and a custom `UserManager` from scratch."
  },
  {
    id: 13,
    question: "What is Django Caching Framework and what cache backends are supported?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "Django supports per-site, per-view, template fragment, and low-level API caching (`cache.get/set`). Supported backends include: **Redis** (`django.core.cache.backends.redis.RedisCache`), **Memcached**, Database cache, Filesystem cache, and Local-memory cache."
  },
  {
    id: 14,
    question: "How do Django Database Routers work in multi-database setups?",
    category: "ORM & Database",
    difficulty: "Hard",
    explanation: "A Database Router class defines `db_for_read(model)`, `db_for_write(model)`, `allow_relation(obj1, obj2)`, and `allow_migrate(db, app_label)` to route specific app models or read/write queries to separate database replicas (e.g. primary-replica read/write splitting)."
  },
  {
    id: 15,
    question: "What is the difference between `only()` and `defer()` in Django QuerySets?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`only('name', 'email')` fetches *only* the specified fields from the database, deferring all others. `defer('heavy_text_field')` fetches all fields *except* the deferred ones. If deferred fields are later accessed in code, Django executes an individual SQL query to load them lazily."
  },
  {
    id: 16,
    question: "What are Django Model Managers and when should you write a custom Manager?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "Managers (`objects = models.Manager()`) provide the database query interface for Django models. Custom managers encapsulate table-level queries and custom filters (e.g., `Article.published.all()` returning only published articles with `status='published'`)."
  },
  {
    id: 17,
    question: "What is the difference between Model Inheritance styles (`Abstract Base Class`, `Multi-table Inheritance`, `Proxy Models`)?",
    category: "ORM & Database",
    difficulty: "Hard",
    explanation: "1) **Abstract Base Class** (`abstract=True`): parent has no DB table; fields are copied into child tables. 2) **Multi-table**: parent and child both have DB tables linked via automatic `OneToOneField` (adds JOIN overhead). 3) **Proxy Model** (`proxy=True`): modifies Python behavior/managers of a model without creating a new DB table."
  },
  {
    id: 18,
    question: "How does Django handle Session Management and what session engines exist?",
    category: "Authentication & Security",
    difficulty: "Easy",
    explanation: "Django stores session data on the backend and sends an opaque `sessionid` cookie to the browser. Backends include: `django.contrib.sessions.backends.db` (database, default), `cache_db` (cached database), `cache` (Redis/Memcached), and `signed_cookies`."
  },
  {
    id: 19,
    question: "What is the purpose of `get_object_or_404()` in Django views?",
    category: "Views & Routing",
    difficulty: "Easy",
    explanation: "It executes `Model.objects.get(**kwargs)` and catches `Model.DoesNotExist` exceptions, automatically raising an `Http404` exception instead of an unhandled 500 server error."
  },
  {
    id: 20,
    question: "What is the difference between `auto_now` and `auto_now_add` on `DateTimeField`?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "`auto_now_add=True` sets the timestamp *only once when the object is first created*. `auto_now=True` updates the timestamp *every time the object is saved (`.save()`)*, ideal for `updated_at` fields."
  },
  {
    id: 21,
    question: "What is the Django Context Processor and how does it inject global variables into templates?",
    category: "Views & Routing",
    difficulty: "Medium",
    explanation: "Context processors are Python functions that take `request` and return a dictionary. Django automatically merges this dictionary into every template rendering context (e.g., injecting `request.user`, global settings, or cart totals)."
  },
  {
    id: 22,
    question: "How does Django prevent SQL Injection attacks?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Django ORM uses **parameterized queries**: user input passed to `.filter()`, `.exclude()`, or `.annotate()` is passed separately as parameters to the database driver rather than concatenated into the SQL string, preventing SQL injection."
  },
  {
    id: 23,
    question: "What is the purpose of `reverse()` and `reverse_lazy()` in Django?",
    category: "Views & Routing",
    difficulty: "Easy",
    explanation: "`reverse('view_name', args=[...])` dynamically generates URL paths from route names. `reverse_lazy()` defers URL resolution until the URL is actually accessed, required when assigning URLs to class attributes in CBVs before URLconf is loaded."
  },
  {
    id: 24,
    question: "What is `django.contrib.auth.models.Permission` and how does Django's RBAC system work?",
    category: "Authentication & Security",
    difficulty: "Medium",
    explanation: "Django automatically generates 4 permissions (`add`, `change`, `delete`, `view`) for every model. Users can be assigned permissions directly or inherit permissions through `Group` membership, checked via `user.has_perm('app_label.add_model')` or `@permission_required`."
  },
  {
    id: 25,
    question: "What is `QuerySet.bulk_create()` and `QuerySet.bulk_update()`?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "`bulk_create(objects)` inserts a list of model instances in a single SQL `INSERT` statement instead of N individual inserts. `bulk_update(objects, ['field1'])` updates specific fields for multiple objects in a single query. Note: model `.save()` and signals are bypassed."
  },
  {
    id: 26,
    question: "What is the purpose of `django-cors-headers` and how is it configured?",
    category: "Security",
    difficulty: "Easy",
    explanation: "`django-cors-headers` is a middleware that handles CORS headers. Configured via `CORS_ALLOWED_ORIGINS = ['https://app.example.com']` or `CORS_ALLOW_ALL_ORIGINS = True` (dev only), adding `Access-Control-Allow-Origin` to responses."
  },
  {
    id: 27,
    question: "What is the difference between `aggregate()` and `annotate()` in Django ORM?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`aggregate(Avg('price'))` computes a summary value across the *entire QuerySet*, returning a single dictionary. `annotate(total_sales=Sum('orders__price'))` calculates aggregate values *per object in the QuerySet* (equivalent to SQL `GROUP BY`), attaching calculated fields to each model instance."
  },
  {
    id: 28,
    question: "What is `select_for_update()` in Django ORM?",
    category: "ORM & Database",
    difficulty: "Hard",
    explanation: "`Entry.objects.select_for_update().filter(id=1)` executes SQL `SELECT ... FOR UPDATE` inside an atomic transaction, locking the matching database rows until the transaction commits, preventing concurrent race conditions and double-spending."
  },
  {
    id: 29,
    question: "What is the difference between `on_delete=models.CASCADE`, `PROTECT`, `SET_NULL`, and `DO_NOTHING`?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "`CASCADE`: deletes related child objects when parent is deleted. `PROTECT`: blocks deletion and raises `ProtectedError`. `SET_NULL`: sets foreign key to `NULL` (requires `null=True`). `DO_NOTHING`: takes no action (can violate database integrity constraints)."
  },
  {
    id: 30,
    question: "How do you run asynchronous background tasks in Django with Celery and Redis?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "By defining `@shared_task` functions executed via `.delay(*args)`. Celery serializes task payloads into a Redis/RabbitMQ message broker, and background Celery worker processes execute the tasks asynchronously outside the HTTP request loop."
  },
  {
    id: 31,
    question: "What are Django Forms and ModelForms, and what is `clean_<fieldname>()`?",
    category: "Views & Routing",
    difficulty: "Easy",
    explanation: "Forms manage HTML form generation, data conversion, and validation. `ModelForm` auto-creates forms from model fields. `clean_fieldname()` defines custom field-level validation; `clean()` defines multi-field cross-validation, raising `forms.ValidationError` on failure."
  },
  {
    id: 32,
    question: "What is the `django-admin` command and how do you create custom Management Commands?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "By creating a file inside `app/management/commands/my_command.py` inheriting from `BaseCommand` and implementing `handle(self, *args, **options)`. It is executed via `python manage.py my_command` and used for cron jobs, database backups, and batch scripts."
  },
  {
    id: 33,
    question: "What is the purpose of `settings.py` `ALLOWED_HOSTS`?",
    category: "Security",
    difficulty: "Easy",
    explanation: "`ALLOWED_HOSTS` is a list of valid domain/host names that this Django site can serve. It prevents HTTP Host header poisoning attacks, which attackers use to poison password reset links and cache poisonings."
  },
  {
    id: 34,
    question: "What is the difference between WSGI (`wsgi.py`) and ASGI (`asgi.py`) in Django?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "**WSGI** (Web Server Gateway Interface) is synchronous (Gunicorn, uWSGI). **ASGI** (Asynchronous Server Gateway Interface) supports async Python (`async/await`), WebSockets (via Django Channels), and HTTP/2 (Daphne, Uvicorn)."
  },
  {
    id: 35,
    question: "What is `db_index=True` and `models.Index` in Django models?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`db_index=True` creates a B-Tree index on a single column. `Meta.indexes = [models.Index(fields=['last_name', 'first_name'])]` creates composite, partial, or specialized indexes across multiple columns for faster multi-field filter queries."
  },
  {
    id: 36,
    question: "What is `Exists()` and `Subquery()` in Django ORM?",
    category: "ORM & Database",
    difficulty: "Hard",
    explanation: "`Subquery` embeds an SQL subquery into an annotation or filter. `Exists` is an optimized boolean subquery that uses SQL `EXISTS(SELECT 1 ...)` to check if matching related records exist without fetching them into memory."
  },
  {
    id: 37,
    question: "How does Django handle File Uploads and what is `MEDIA_ROOT` vs `STATIC_ROOT`?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "`STATIC_ROOT` is the directory where `collectstatic` gathers CSS/JS/images for production deployment. `MEDIA_ROOT` is the filesystem directory where user-uploaded dynamic files (`FileField`, `ImageField`) are saved."
  },
  {
    id: 38,
    question: "What is Django's `SECURE_SSL_REDIRECT` and `SESSION_COOKIE_SECURE`?",
    category: "Security",
    difficulty: "Easy",
    explanation: "`SECURE_SSL_REDIRECT = True` redirects all non-HTTPS requests to HTTPS. `SESSION_COOKIE_SECURE = True` and `CSRF_COOKIE_SECURE = True` instruct browsers to transmit cookies strictly over encrypted HTTPS connections."
  },
  {
    id: 39,
    question: "What is the `django.db.models.signals.m2m_changed` signal?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "A signal sent whenever a `ManyToManyField` on a model instance is modified (`add`, `remove`, `clear`), providing `action`, `instance`, and `pk_set` arguments."
  },
  {
    id: 40,
    question: "What is the difference between `values()` and `values_list()` in Django ORM?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "`values('id', 'name')` returns a QuerySet of dictionaries (`[{'id': 1, 'name': 'A'}]`). `values_list('id', 'name')` returns a QuerySet of tuples (`[(1, 'A')]`). Passing `flat=True` with a single field returns a flat list of primitive values (`[1, 2, 3]`)."
  },
  {
    id: 41,
    question: "What is the purpose of `django.utils.timezone.now` vs `datetime.now`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`datetime.now()` returns a naive datetime object with no timezone information. `timezone.now()` returns an aware datetime object adjusted to the configured `TIME_ZONE` and UTC settings in `settings.py`."
  },
  {
    id: 42,
    question: "What is `prefetch_related(Prefetch(...))` with custom QuerySets?",
    category: "ORM & Database",
    difficulty: "Hard",
    explanation: "The `Prefetch` object allows customizing the lookup query used by `prefetch_related`, applying custom filters, ordering, or `.select_related()` to the preloaded related objects before they are attached to parent instances."
  },
  {
    id: 43,
    question: "What is `django.test.TestCase` vs `TransactionTestCase`?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "`TestCase` wraps each test method in an atomic database transaction that is rolled back at the end of the test (very fast). `TransactionTestCase` resets the database by truncating tables after each test, required when testing code that relies on explicit transaction commits."
  },
  {
    id: 44,
    question: "What is the difference between `get_user_model()` and `from django.contrib.auth.models import User`?",
    category: "Authentication & Security",
    difficulty: "Easy",
    explanation: "`get_user_model()` dynamically returns the active User model configured in `AUTH_USER_MODEL`, ensuring code works with custom user models. Importing `User` directly hardcodes the legacy auth model."
  },
  {
    id: 45,
    question: "How do you optimize slow Django ORM queries using `django-debug-toolbar`?",
    category: "Performance & Caching",
    difficulty: "Easy",
    explanation: "`django-debug-toolbar` displays panels showing the exact SQL queries executed per HTTP request, their execution times, stack traces, and duplicate/N+1 queries, identifying missing `select_related` or missing database indexes."
  },
  {
    id: 46,
    question: "What is `QuerySet.iterator()` and when should you use it for large datasets?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "By default, QuerySets cache results in memory. Calling `.iterator(chunk_size=2000)` disables result caching and streams rows from the database driver cursor in batches, preventing Out-Of-Memory errors when iterating over millions of records."
  },
  {
    id: 47,
    question: "What is `django.core.exceptions.PermissionDenied` and what HTTP status does it trigger?",
    category: "Views & Routing",
    difficulty: "Easy",
    explanation: "Raising `PermissionDenied` inside a view triggers Django's 403 Forbidden handler, rendering `403.html` and returning an HTTP 403 status code."
  },
  {
    id: 48,
    question: "What is the purpose of `models.UniqueConstraint` vs `unique_together`?",
    category: "ORM & Database",
    difficulty: "Medium",
    explanation: "`UniqueConstraint(fields=['user', 'event'], condition=Q(status='active'))` replaces legacy `unique_together`. It supports partial unique indexes, custom violation error messages, and advanced database constraints."
  },
  {
    id: 49,
    question: "What is the `django.db.connection.queries` list?",
    category: "ORM & Database",
    difficulty: "Easy",
    explanation: "When `DEBUG = True`, `django.db.connection.queries` stores a list of dictionaries containing the raw SQL strings and execution times for every query executed in the current thread."
  },
  {
    id: 50,
    question: "What is `django-storages` and how is it used for AWS S3 file hosting?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "`django-storages` provides custom storage backends (AWS S3, Google Cloud Storage, Azure). Configuring `DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'` automatically uploads all user `FileField` files to S3 buckets."
  }
];
