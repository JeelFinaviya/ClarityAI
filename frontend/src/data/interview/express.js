/**
 * 50 High-Value Express.js Interview Questions
 */

export const EXPRESS_QUESTIONS = [
  {
    id: 1,
    question: "What is Middleware in Express.js and what do `req`, `res`, and `next` represent?",
    category: "Middleware",
    difficulty: "Easy",
    explanation: "Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the next middleware in the request-response cycle (`next()`). They can execute code, modify `req`/`res`, end the request-response cycle, or pass control to the next middleware via `next()`."
  },
  {
    id: 2,
    question: "How do Error-Handling Middleware functions differ from standard Middleware?",
    category: "Error Handling",
    difficulty: "Medium",
    explanation: "Error-handling middleware functions are defined with **4 arguments** instead of 3: `(err, req, res, next)`. Express recognizes this 4-argument signature and routes errors passed into `next(err)` directly to this handler, skipping all intermediate standard middlewares."
  },
  {
    id: 3,
    question: "What is the difference between `app.use()` and route methods like `app.get()` or `app.post()`?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "`app.use()` applies middleware to all HTTP methods matching a specified path prefix (or all routes if path is omitted). Method-specific handlers (`app.get`, `app.post`) match only that exact HTTP method and route path."
  },
  {
    id: 4,
    question: "What is `express.Router()` and how does it enable modular routing?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "`express.Router()` creates an isolated mini-application/router instance capable of performing middleware and routing functions. Routers are organized into separate files (e.g. `userRoutes.js`) and mounted onto the main app via `app.use('/users', userRoutes)`."
  },
  {
    id: 5,
    question: "Why is `express.json()` (or `body-parser`) required to read POST request bodies?",
    category: "Middleware",
    difficulty: "Easy",
    explanation: "Raw HTTP request bodies arrive as incoming data streams (`Buffer` chunks). `express.json()` intercepts incoming requests with `Content-Type: application/json`, streams and buffers the chunks, parses the JSON string, and populates `req.body` with the resulting object."
  },
  {
    id: 6,
    question: "What is the purpose of `express.urlencoded({ extended: true })`?",
    category: "Middleware",
    difficulty: "Easy",
    explanation: "It parses incoming requests formatted with URL-encoded payloads (submitted from HTML forms). Setting `extended: true` uses the `qs` library (allowing rich nested objects and arrays in form data); `extended: false` uses the built-in `querystring` module."
  },
  {
    id: 7,
    question: "What is CORS and how do you configure it in an Express.js backend?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Cross-Origin Resource Sharing (CORS) is a browser security mechanism that restricts cross-origin HTTP requests. In Express, the `cors` middleware configures `Access-Control-Allow-Origin`, allowed methods, headers, and `credentials: true` to permit authorized frontend domains (like Vercel apps) to access the API."
  },
  {
    id: 8,
    question: "What is the Helmet middleware and how does it protect Express applications?",
    category: "Security",
    difficulty: "Medium",
    explanation: "`helmet()` sets critical HTTP security headers automatically, including: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security` (HSTS), `X-Frame-Options: SAMEORIGIN` (clickjacking protection), and disables `X-Powered-By: Express` to prevent tech stack fingerprinting."
  },
  {
    id: 9,
    question: "What is the difference between `req.params`, `req.query`, and `req.body`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`req.params` contains route path parameters (`/users/:id` -> `req.params.id`). `req.query` contains URL query string parameters (`/users?role=admin` -> `req.query.role`). `req.body` contains the payload parsed from the HTTP request body (`POST`/`PUT`)."
  },
  {
    id: 10,
    question: "How do you handle asynchronous errors in Express 4 vs Express 5?",
    category: "Error Handling",
    difficulty: "Hard",
    explanation: "In Express 4, asynchronous errors inside `async` route handlers must be wrapped in `try/catch` with `next(err)` or use an async wrapper (`express-async-errors`), otherwise unhandled promise rejections occur. In Express 5, route handlers and middleware that return rejected Promises automatically forward errors to the error middleware without manual wrappers."
  },
  {
    id: 11,
    question: "What is the purpose of `next('route')` in Express routing?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "Inside a route handler on an `app.METHOD()` or `router.METHOD()` with multiple callback handlers, calling `next('route')` skips all remaining middleware functions in the *current* route stack and passes control directly to the *next matching route*."
  },
  {
    id: 12,
    question: "How do you implement Rate Limiting in Express.js?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Using `express-rate-limit` (backed by in-memory or Redis stores), which tracks client IP addresses and enforces a threshold (e.g. max 100 requests per 15-minute window), returning an HTTP `429 Too Many Requests` status code with `Retry-After` headers."
  },
  {
    id: 13,
    question: "What is the difference between `res.send()`, `res.json()`, and `res.end()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.send()` sends various response types (Buffer, string, object, boolean) and sets `Content-Type` automatically. `res.json()` explicitly converts objects/arrays to JSON strings and enforces `Content-Type: application/json`. `res.end()` terminates the response immediately without writing a body or setting extra headers."
  },
  {
    id: 14,
    question: "What is the difference between `res.status(404).send()` and `res.sendStatus(404)`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.status(404)` only sets the HTTP response status code (chaining further response methods). `res.sendStatus(404)` sets the status code AND immediately sends the default HTTP status message string (e.g., `'Not Found'`) as the response body, closing the connection."
  },
  {
    id: 15,
    question: "How does Express serve static files and what options does `express.static()` support?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`app.use(express.static('public'))` serves static assets (HTML, CSS, images). Options include: `maxAge` (Cache-Control headers), `etag` (ETag generation), `index` (default file, e.g. `index.html`), and `dotfiles` handling."
  },
  {
    id: 16,
    question: "What is the purpose of the `morgan` logging middleware?",
    category: "Middleware",
    difficulty: "Easy",
    explanation: "`morgan` is an HTTP request logger middleware that logs incoming request methods, URLs, status codes, response times, and payload sizes to the console or log files using formats like `'dev'`, `'combined'`, or custom tokens."
  },
  {
    id: 17,
    question: "What is JWT Authentication and how is it verified in an Express middleware?",
    category: "Security",
    difficulty: "Medium",
    explanation: "The client includes a signed token in the `Authorization: Bearer <token>` header. An auth middleware extracts the token, verifies its cryptographic signature using `jsonwebtoken.verify(token, SECRET)`, attaches decoded user payload to `req.user`, and calls `next()` (or returns 401 if invalid/expired)."
  },
  {
    id: 18,
    question: "What is the difference between Cookie-based sessions and JWTs in Express?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Cookie sessions (`express-session`) store session state on the server (Redis/DB) and send an opaque session ID cookie (stateful, easily revocable). JWTs store user claims directly inside the signed token on the client (stateless, horizontally scalable, but harder to revoke before expiration)."
  },
  {
    id: 19,
    question: "What is Request Validation and why use libraries like `zod` or `express-validator`?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "Request validation sanitizes and validates incoming `req.body`, `req.query`, and `req.params` against strict schemas before passing data to business logic. It prevents SQL/NoSQL injection, unexpected types, and returns consistent 400 Bad Request error schemas."
  },
  {
    id: 20,
    question: "What is the `app.set('trust proxy', 1)` setting and when is it required?",
    category: "Routing & Architecture",
    difficulty: "Hard",
    explanation: "When running behind reverse proxies (Nginx, AWS ALB, Render, Heroku, Cloudflare), client requests arrive from internal proxy IPs. Enabling `trust proxy` instructs Express to read the true client IP from `X-Forwarded-For` and protocol from `X-Forwarded-Proto`."
  },
  {
    id: 21,
    question: "What is SQL Injection and NoSQL Injection, and how do you prevent them in Express?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Injection happens when untrusted user input is concatenated directly into database queries. In SQL, use parameterized queries / ORMs (Prisma, Sequelize). In MongoDB/Mongoose, use input sanitization (`express-mongo-sanitize`) to prevent operator injection (`{ username: { $ne: null } }`)."
  },
  {
    id: 22,
    question: "What is CSRF (Cross-Site Request Forgery) and how is it mitigated in Express?",
    category: "Security",
    difficulty: "Hard",
    explanation: "CSRF tricks an authenticated user's browser into sending unauthorized requests with saved cookies. Mitigated by using `SameSite=Strict/Lax` on cookies, anti-CSRF token validation (`csurf` or double-submit cookies), and custom authorization headers."
  },
  {
    id: 23,
    question: "What is the difference between `res.redirect()` and `res.location()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.redirect('/home')` sets the `Location` header AND sends an HTTP redirect status (default 302) to instruct the browser to navigate immediately. `res.location('/home')` only sets the `Location` header without sending a response or status code."
  },
  {
    id: 24,
    question: "What is the `compression` middleware in Express?",
    category: "Performance",
    difficulty: "Easy",
    explanation: "`app.use(compression())` automatically compresses HTTP response bodies using Gzip or Deflate for clients supporting the `Accept-Encoding` header, significantly reducing response sizes and transfer latency."
  },
  {
    id: 25,
    question: "How do you handle file uploads in Express using Multer?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "`multer` is a middleware for handling `multipart/form-data`. It parses uploaded files to disk or memory (`multer.diskStorage`), validates file size and mime types, and populates `req.file` (or `req.files`) and `req.body`."
  },
  {
    id: 26,
    question: "What is the difference between `app.param()` and standard route parameters?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "`app.param('userId', (req, res, next, id) => {})` registers pre-condition trigger middleware that automatically runs whenever a route contains `:userId`, centralizing database lookup, validation, and 404 handling in one place."
  },
  {
    id: 27,
    question: "What is Graceful Shutdown in an Express application?",
    category: "Routing & Architecture",
    difficulty: "Hard",
    explanation: "Listening for `SIGTERM`/`SIGINT`, calling `server.close()` to stop accepting new requests, allowing active requests to finish within a timeout, closing database connections, and exiting with `process.exit(0)`."
  },
  {
    id: 28,
    question: "How do you structure an Enterprise/Production Express project?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "Using a layered **Controller-Service-Repository** pattern: 1) **Routes** (define endpoints), 2) **Controllers** (handle `req`/`res` and validate input), 3) **Services** (business logic), 4) **Repositories / Models** (database access), and 5) **Middleware** (auth, error handling, logging)."
  },
  {
    id: 29,
    question: "What is the difference between `res.render()` and `res.sendFile()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.render('profile', data)` compiles a server-side template (EJS, Pug, Handlebars) with dynamic view data and returns the resulting HTML. `res.sendFile('/path/file.pdf')` transfers an existing static file from disk directly to the client."
  },
  {
    id: 30,
    question: "What is the `cookie-parser` middleware and how does signed cookies work?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "`cookie-parser(SECRET)` parses the `Cookie` header into `req.cookies`. When `signed: true` is passed to `res.cookie()`, it signs the cookie with an HMAC hash; `req.signedCookies` verifies the signature to ensure the client has not tampered with the value."
  },
  {
    id: 31,
    question: "What is the difference between Application-level and Router-level middleware?",
    category: "Middleware",
    difficulty: "Easy",
    explanation: "Application-level middleware is bound to the main `app` instance (`app.use()`). Router-level middleware is bound to a specific `express.Router()` instance (`router.use()`), allowing scoped middleware (like authentication) to apply only to a subset of routes."
  },
  {
    id: 32,
    question: "What is the `express.raw()` and `express.text()` middleware?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "`express.raw()` parses incoming payloads into a `Buffer` on `req.body` (used for webhook signatures like Stripe). `express.text()` parses payloads into plain text strings."
  },
  {
    id: 33,
    question: "How do you implement Health Check endpoints in Express for Kubernetes/Docker?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "By exposing `/healthz` (liveness: returns 200 if process is running) and `/ready` (readiness: checks if database connection pools and external caches are responsive before routing live traffic)."
  },
  {
    id: 34,
    question: "What is HTTP Parameter Pollution (HPP) and how is it prevented in Express?",
    category: "Security",
    difficulty: "Hard",
    explanation: "HPP occurs when query parameters are supplied multiple times (`?user=1&user=2`), turning `req.query.user` from a string into an array and breaking logic. Prevented using the `hpp` middleware, which retains only the last value or whitelists specific array parameters."
  },
  {
    id: 35,
    question: "What is the difference between Server-Sent Events (SSE) and WebSockets in Express?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "SSE (`text/event-stream`) is a unidirectional server-to-client streaming protocol over standard HTTP with automatic browser reconnects. WebSockets (`ws`) is a full-duplex, bidirectional binary protocol requiring an initial HTTP upgrade handshake."
  },
  {
    id: 36,
    question: "What is the `res.locals` object and where is it useful?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.locals` is an object scoped exclusively to the lifetime of the current request. Middleware can attach request-scoped data (like authenticated user or requestId) to `res.locals`, which is accessible across all downstream middlewares and template engines."
  },
  {
    id: 37,
    question: "What is the purpose of `express.response` and `express.request` prototype extension?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Extending `express.response.customHelper = function() {}` modifies Express's base prototype, adding custom helper methods (e.g. `res.apiSuccess()`, `res.apiError()`) accessible across all route handlers application-wide."
  },
  {
    id: 38,
    question: "What is the difference between a 401 Unauthorized and 403 Forbidden status in Express?",
    category: "Security",
    difficulty: "Easy",
    explanation: "`401 Unauthorized` means the client has not provided valid authentication credentials (user is unauthenticated). `403 Forbidden` means the server knows who the user is, but the user lacks permissions/roles to access the requested resource (unauthorized)."
  },
  {
    id: 39,
    question: "How do you implement API Versioning in Express?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "Common approaches: 1) **URI path versioning**: `app.use('/api/v1', v1Router); app.use('/api/v2', v2Router)` (most popular), 2) **Header versioning**: `Accept: application/vnd.company.v1+json`, or 3) **Query parameter**: `?version=1`."
  },
  {
    id: 40,
    question: "What is the `res.set()` vs `res.get()` method in Express?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`res.set('X-Custom-Header', 'value')` sets HTTP response headers (or accepts an object of headers). `res.get('Header-Name')` retrieves the current value of an outgoing response header before it is sent."
  },
  {
    id: 41,
    question: "What is the purpose of `res.format()` in Content Negotiation?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "`res.format({ 'text/html': () => res.render('page'), 'application/json': () => res.json(data), 'default': () => res.status(406).send('Not Acceptable') })` performs content negotiation based on the incoming request's `Accept` header."
  },
  {
    id: 42,
    question: "How do you handle unhandled route 404s in Express?",
    category: "Routing & Architecture",
    difficulty: "Easy",
    explanation: "By placing a catch-all middleware function at the very end of all route definitions: `app.use((req, res, next) => { res.status(404).json({ error: 'Route not found' }); })`."
  },
  {
    id: 43,
    question: "What is the difference between `app.all()` and `app.use()`?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "`app.all('/secret', fn)` matches *all HTTP methods* (`GET`, `POST`, `PUT`, `DELETE`) but strictly for the *exact path* `/secret`. `app.use('/secret', fn)` matches all methods for `/secret` AND any nested subpaths (`/secret/sub`, `/secret/item/1`)."
  },
  {
    id: 44,
    question: "What is OpenTelemetry tracing in Express?",
    category: "Performance",
    difficulty: "Hard",
    explanation: "Integrating OpenTelemetry SDKs with `@opentelemetry/instrumentation-express` to automatically create distributed trace spans for every incoming HTTP request, measuring routing, middleware, and database query durations."
  },
  {
    id: 45,
    question: "What is the purpose of `res.attachment()` vs `res.download()`?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "`res.attachment('file.pdf')` sets the `Content-Disposition: attachment; filename='file.pdf'` header without sending data. `res.download('/path/file.pdf')` sets the header AND streams the file to the client in a single call."
  },
  {
    id: 46,
    question: "How do you implement pagination in Express API endpoints?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "Parsing `page` and `limit` from `req.query`, calculating `skip = (page - 1) * limit`, querying database with `skip` and `limit`, and returning data along with metadata (`totalRecords`, `totalPages`, `currentPage`, `hasNextPage`)."
  },
  {
    id: 47,
    question: "What is the `express-validator` `matchedData()` function?",
    category: "Middleware",
    difficulty: "Medium",
    explanation: "`matchedData(req)` extracts only the fields that were explicitly validated and sanitized by express-validator chains, discarding all unvalidated excess properties to prevent mass assignment vulnerabilities."
  },
  {
    id: 48,
    question: "What are Security Headers like Permissions-Policy and Referrer-Policy in Express?",
    category: "Security",
    difficulty: "Hard",
    explanation: "`Permissions-Policy` restricts browser feature access (camera, microphone, geolocation). `Referrer-Policy` (`strict-origin-when-cross-origin`) controls how much referrer information is leaked in external link clicks and API fetches."
  },
  {
    id: 49,
    question: "How do you test Express routes with Jest and Supertest?",
    category: "Routing & Architecture",
    difficulty: "Medium",
    explanation: "By exporting the `app` instance without calling `app.listen()`, and using `supertest(app).get('/api/users').expect(200)` to execute simulated HTTP requests against the application without binding to real network ports."
  },
  {
    id: 50,
    question: "What is the difference between Express.js and Fastify / Nest.js?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "**Express** is unopinionated, minimalist, and uses callback/middleware pipelines. **Fastify** is built for extreme throughput using schema-based JSON serialization and async pipelines. **Nest.js** is a TypeScript framework built on top of Express/Fastify using Angular-like architectural patterns (dependency injection, decorators, modules)."
  }
];
