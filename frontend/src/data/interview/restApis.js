/**
 * 50 High-Value REST APIs Interview Questions
 */

export const REST_APIS_QUESTIONS = [
  {
    id: 1,
    question: "What are the 6 architectural constraints of REST (Representational State Transfer)?",
    category: "REST Architecture",
    difficulty: "Medium",
    explanation: "1) **Client-Server** architecture (separated concerns), 2) **Statelessness** (no client context stored on server between requests), 3) **Cacheability** (responses must declare themselves cacheable or not), 4) **Uniform Interface** (resource identification, HATEOAS), 5) **Layered System** (intermediaries like proxies/gateways transparent to client), 6) **Code-on-Demand** (optional, e.g. JavaScript)."
  },
  {
    id: 2,
    question: "What is Idempotency in HTTP methods and which methods are idempotent?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Medium",
    explanation: "An HTTP method is **idempotent** if making multiple identical requests has the exact same server side-effects as making a single request. `GET`, `PUT`, `DELETE`, `HEAD`, and `OPTIONS` are idempotent. `POST` is **NOT idempotent** because submitting multiple identical POST requests creates duplicate resources."
  },
  {
    id: 3,
    question: "What is the difference between `PUT` and `PATCH` methods?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`PUT` is an idempotent full replacement of a resource (the request payload contains the complete updated entity; missing fields are reset or overwritten). `PATCH` is a partial update (the payload contains only the specific fields to be modified, leaving unmentioned fields untouched)."
  },
  {
    id: 4,
    question: "What are the standard HTTP Status Code categories (2xx, 3xx, 4xx, 5xx)?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "**1xx (Informational)**: Request received, continuing. **2xx (Success)**: `200 OK`, `201 Created`, `204 No Content`. **3xx (Redirection)**: `301 Moved Permanently`, `304 Not Modified`, `307/308 Temporary/Permanent Redirect`. **4xx (Client Error)**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests`. **5xx (Server Error)**: `500 Internal Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`."
  },
  {
    id: 5,
    question: "What is the difference between `401 Unauthorized` and `403 Forbidden`?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`401 Unauthorized` means the client is unauthenticated (missing or invalid credentials/token; should prompt login). `403 Forbidden` means the server knows who the client is, but the client does not possess the permissions/roles required to access the resource."
  },
  {
    id: 6,
    question: "What is HATEOAS (Hypermedia As The Engine Of Application State)?",
    category: "REST Architecture",
    difficulty: "Hard",
    explanation: "HATEOAS is a level-3 constraint of the Richardson Maturity Model where API responses include hypermedia links (`_links`) describing all possible follow-up actions and state transitions available to the client (e.g. an unpaid order response includes links to `/pay`, `/cancel`, `/edit`), decoupling frontend navigation from hardcoded URLs."
  },
  {
    id: 7,
    question: "How does HTTP Caching work with `Cache-Control`, `ETag`, and `If-None-Match`?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "The server returns an `ETag: 'hash123'` header representing the resource version. In subsequent requests, the client sends `If-None-Match: 'hash123'`. If the resource has not changed, the server responds with a lightweight `304 Not Modified` with zero response body, instructing the client to reuse its local cache."
  },
  {
    id: 8,
    question: "What is the Richardson Maturity Model for REST APIs?",
    category: "REST Architecture",
    difficulty: "Hard",
    explanation: "**Level 0**: Single URI and single HTTP POST method (RPC / SOAP style, e.g. `/api?action=getUser`). **Level 1**: Individual Resources with distinct URIs (`/users/1`). **Level 2**: Standard HTTP Verbs and Status Codes (`GET`, `POST`, `DELETE`, `201 Created`). **Level 3**: Hypermedia Controls (HATEOAS)."
  },
  {
    id: 9,
    question: "What is CORS (Cross-Origin Resource Sharing) and what is a Preflight `OPTIONS` Request?",
    category: "Security",
    difficulty: "Medium",
    explanation: "CORS is a browser security policy restricting cross-origin HTTP requests. For non-simple requests (using `PUT`/`DELETE`, custom headers like `Authorization`, or JSON content-types), the browser automatically sends a preflight `OPTIONS` request to ask the server for permission before sending the actual request."
  },
  {
    id: 10,
    question: "What is the difference between Session-Based Authentication and JWT (Token-Based) Authentication?",
    category: "Security & Auth",
    difficulty: "Medium",
    explanation: "**Session Auth**: Stateful; server stores session data in memory/Redis and sends a session ID cookie to the browser (easy revocation, harder to scale across microservices). **JWT Auth**: Stateless; server signs a cryptographically verified token containing user claims sent in `Authorization: Bearer` (horizontally scalable, but cannot be revoked before expiry without a blacklist)."
  },
  {
    id: 11,
    question: "What are common API Versioning strategies (URI, Header, Query Param)?",
    category: "API Design Best Practices",
    difficulty: "Easy",
    explanation: "1) **URI Path** (`/api/v1/users`, most common, readable, easy caching). 2) **Custom Header** (`X-API-Version: 2` or `Accept: application/vnd.company.v2+json`). 3) **Query Parameter** (`/api/users?version=2`)."
  },
  {
    id: 12,
    question: "How do you handle API Rate Limiting (Token Bucket / Leaky Bucket algorithms)?",
    category: "Performance & Caching",
    difficulty: "Hard",
    explanation: "**Token Bucket**: Tokens are added to a bucket at a constant rate up to maximum capacity; requests consume tokens, allowing bursts of traffic up to bucket capacity. **Leaky Bucket**: Requests enter a queue and are processed at a constant leak rate, smoothing out traffic spikes. Responses return `429 Too Many Requests` with `Retry-After`, `X-RateLimit-Limit`, and `X-RateLimit-Remaining`."
  },
  {
    id: 13,
    question: "What is the difference between REST and GraphQL?",
    category: "API Comparison",
    difficulty: "Medium",
    explanation: "**REST**: Resource-based, multiple endpoints (`/users`, `/posts`), fixed data structures per endpoint (leads to over-fetching or under-fetching, requiring multiple roundtrips). **GraphQL**: Single endpoint (`/graphql`), schema-driven query language where the client requests the exact fields needed in a single query, preventing over-fetching."
  },
  {
    id: 14,
    question: "What is the difference between REST and gRPC?",
    category: "API Comparison",
    difficulty: "Hard",
    explanation: "**REST**: Uses text-based JSON/XML over HTTP/1.1 or HTTP/2 (human-readable, universal browser support). **gRPC**: Uses high-performance binary Protocol Buffers (Protobuf) over HTTP/2 multiplexing, supporting bidirectional streaming, code generation across languages, and up to 7x faster serialization for internal microservices."
  },
  {
    id: 15,
    question: "What are Webhooks and how do they differ from REST Polling?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "**Polling**: The client repeatedly makes HTTP `GET` requests to check for new updates (wastes bandwidth and server CPU). **Webhooks**: Reverse APIs (Push-based); the server makes an HTTP `POST` request to a client-configured URL as soon as an event occurs (e.g., Stripe payment succeeded)."
  },
  {
    id: 16,
    question: "What is Idempotency Key in payment and order APIs?",
    category: "API Design Best Practices",
    difficulty: "Hard",
    explanation: "Clients generate a unique UUID `Idempotency-Key: <uuid>` in `POST` request headers. The server saves the key in Redis/DB during processing. If network drops and the client retries, the server recognizes the key and returns the saved result without executing duplicate payment charges."
  },
  {
    id: 17,
    question: "What is the difference between Offset Pagination and Cursor-Based (Keyset) Pagination?",
    category: "API Design Best Practices",
    difficulty: "Medium",
    explanation: "**Offset Pagination** (`?page=2&limit=20`): Simple, but degrades to O(N) at high page numbers and skips/duplicates items on concurrent inserts. **Cursor Pagination** (`?after=cursor_id&limit=20`): Fast O(1) indexed lookups, stable against real-time insertions, ideal for mobile infinite feeds."
  },
  {
    id: 18,
    question: "What is an API Gateway and what responsibilities does it handle in microservices?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "An API Gateway (Kong, AWS API Gateway, Nginx) acts as the single reverse-proxy entry point for clients. It centralizes: SSL termination, authentication/authorization, rate limiting, request routing, telemetry, protocol translation (gRPC to REST), and response caching."
  },
  {
    id: 19,
    question: "What is OpenAPI / Swagger Specification?",
    category: "API Design Best Practices",
    difficulty: "Easy",
    explanation: "OpenAPI is a standard, language-agnostic interface description format for REST APIs (in JSON/YAML). It documents endpoints, parameters, request bodies, and responses, enabling auto-generated interactive documentation (Swagger UI), client SDK generation, and automated contract testing."
  },
  {
    id: 20,
    question: "What is Content Negotiation (`Accept`, `Content-Type`) in REST APIs?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`Content-Type` describes the media type of the payload being *sent* in the request body (e.g. `application/json`). `Accept` specifies the media type the client *expects to receive* in the response (e.g. `Accept: application/json` or `application/pdf`)."
  },
  {
    id: 21,
    question: "What are the common HTTP Security Headers for REST APIs?",
    category: "Security",
    difficulty: "Medium",
    explanation: "`Strict-Transport-Security` (HSTS), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy` (CSP), `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`."
  },
  {
    id: 22,
    question: "What is OAuth 2.0 and what is the Authorization Code Flow with PKCE?",
    category: "Security & Auth",
    difficulty: "Hard",
    explanation: "OAuth 2.0 is an authorization delegation framework. **Authorization Code Flow with PKCE (Proof Key for Code Exchange)** uses dynamic code verifiers and SHA-256 code challenges, preventing authorization code interception attacks on single-page apps (SPAs) and mobile apps where client secrets cannot be securely stored."
  },
  {
    id: 23,
    question: "What is the difference between Authentication (AuthN) and Authorization (AuthZ)?",
    category: "Security & Auth",
    difficulty: "Easy",
    explanation: "**Authentication (AuthN)** verifies *who you are* (verifying identity via password, 2FA, biometric, SSO). **Authorization (AuthZ)** determines *what you are allowed to do* (checking user roles, permissions, scopes)."
  },
  {
    id: 24,
    question: "What is OpenID Connect (OIDC) vs OAuth 2.0?",
    category: "Security & Auth",
    difficulty: "Medium",
    explanation: "OAuth 2.0 is strictly for **Authorization** (accessing APIs on behalf of a user via Access Tokens). **OIDC** is an identity layer built on top of OAuth 2.0 that provides **Authentication** by issuing an **ID Token** (JWT containing user profile claims) and a standard `/userinfo` endpoint."
  },
  {
    id: 25,
    question: "What is Mutual TLS (mTLS) in zero-trust REST microservices?",
    category: "Security",
    difficulty: "Hard",
    explanation: "In standard TLS, only the server proves its identity with a certificate. In **mTLS**, both the client and server present and verify each other's X.509 digital certificates during the handshake, ensuring encrypted, cryptographically authenticated communication between internal microservices."
  },
  {
    id: 26,
    question: "What is API Idempotency in DELETE requests?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Medium",
    explanation: "`DELETE /items/1` is idempotent: the first call deletes the item and returns `204 No Content` (or `200 OK`); subsequent identical delete calls leave the server state unchanged (item remains absent), even if the response status returned is `404 Not Found`."
  },
  {
    id: 27,
    question: "What is the difference between `204 No Content` and `200 OK`?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`200 OK` indicates success and includes a response payload body. `204 No Content` indicates success but explicitly guarantees that the response body is empty (commonly used for `DELETE` or `PUT` actions where no data needs to be returned)."
  },
  {
    id: 28,
    question: "What is Circuit Breaker Pattern in REST API integrations?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "Prevents cascading failures when a downstream API fails. States: 1) **Closed** (normal traffic flows), 2) **Open** (failures exceed threshold; fails fast immediately without making network calls), 3) **Half-Open** (sends test requests after a timeout to check if the downstream service has recovered)."
  },
  {
    id: 29,
    question: "What is Exponential Backoff with Jitter in API retries?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "When an API request fails, exponential backoff doubles wait times between retries (`1s, 2s, 4s, 8s`). Adding **Jitter** introduces random variance to the delay, preventing all failing client instances from retrying simultaneously and causing a thundering herd spike on the recovering server."
  },
  {
    id: 30,
    question: "What is Bulkhead Pattern in microservice REST APIs?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "Isolates resources (thread pools, connection pools) into distinct pools for each downstream dependency. If one downstream API becomes slow or unresponsive, only its dedicated pool exhausts, leaving other API routes operating normally."
  },
  {
    id: 31,
    question: "What is the purpose of the `Retry-After` HTTP header?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "Returned with `429 Too Many Requests` or `503 Service Unavailable` responses to inform the client exactly how many seconds (or what date) it must wait before attempting to retry the request."
  },
  {
    id: 32,
    question: "What is JSON:API specification?",
    category: "API Design Best Practices",
    difficulty: "Medium",
    explanation: "A formalized specification (`application/vnd.api+json`) for structuring JSON responses, defining standard top-level keys: `data` (primary resources), `included` (side-loaded related resources), `meta` (metadata), `errors`, and `links`."
  },
  {
    id: 33,
    question: "What is the difference between Synchronous and Asynchronous REST APIs?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "**Synchronous**: Client waits for processing to complete before receiving a response. **Asynchronous**: For long-running operations (video encoding), server returns `202 Accepted` with a `Location: /jobs/123` header; client polls the job status endpoint or listens via webhooks."
  },
  {
    id: 34,
    question: "What is Mass Assignment Vulnerability in REST APIs?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Occurs when an API binds incoming JSON payloads directly to database models without whitelisting fields. Attackers can inject extra fields (e.g. `{ 'isAdmin': true, 'role': 'admin' }`) into update endpoints. Prevented using DTOs, Zod schemas, or DRF serializers."
  },
  {
    id: 35,
    question: "What is BOLA (Broken Object Level Authorization) / IDOR in REST APIs?",
    category: "Security",
    difficulty: "Hard",
    explanation: "OWASP API Security Top 1 vulnerability where the API relies on user-supplied IDs (`/documents/123`) without verifying that the authenticated user actually owns that document, allowing attackers to access arbitrary records by iterating ID numbers."
  },
  {
    id: 36,
    question: "What is the purpose of the `Vary` HTTP header in REST responses?",
    category: "Performance & Caching",
    difficulty: "Hard",
    explanation: "`Vary: Accept-Encoding, Origin` instructs intermediary caches (CDNs, browser caches) that they must store separate cached copies of the resource for different values of the specified request headers."
  },
  {
    id: 37,
    question: "What is the difference between `301 Moved Permanently` and `302 Found` (or `307/308`)?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`301` tells browsers and search engines that the URL has permanently changed (caches redirect indefinitely). `302` is temporary. `307` (temporary) and `308` (permanent) guarantee that the HTTP method (e.g. POST) is NOT changed to GET during redirect."
  },
  {
    id: 38,
    question: "What is SSE (Server-Sent Events) vs REST Long Polling?",
    category: "API Comparison",
    difficulty: "Medium",
    explanation: "**Long Polling**: Client sends request, server holds connection open until data arrives, closes connection; client re-initiates request. **SSE**: A single persistent HTTP connection (`text/event-stream`) where the server continuously streams text updates to the client with automatic browser reconnection."
  },
  {
    id: 39,
    question: "What is gRPC Gateway (REST to gRPC transcoding)?",
    category: "API Comparison",
    difficulty: "Hard",
    explanation: "A reverse-proxy plugin that translates incoming standard RESTful JSON HTTP requests into internal gRPC protocol buffer calls based on annotations in `.proto` service definition files, giving developers REST compatibility with gRPC backends."
  },
  {
    id: 40,
    question: "What is the difference between State-Transfer and RPC (Remote Procedure Call)?",
    category: "REST Architecture",
    difficulty: "Easy",
    explanation: "**REST** focuses on *Resources (Nouns)* (`/orders/1`, `DELETE`) and uniform operations on resource representations. **RPC** focuses on *Actions (Verbs)* (`/cancelOrder?id=1`, `/calculateTax`), executing remote functions."
  },
  {
    id: 41,
    question: "What is API Mocking and why is it useful during frontend-backend parallel development?",
    category: "Tooling & Documentation",
    difficulty: "Easy",
    explanation: "Tools like MSW (Mock Service Worker) or Prism intercept network requests and return simulated responses matching the OpenAPI schema, allowing frontend engineers to build and test UI before backend endpoints are deployed."
  },
  {
    id: 42,
    question: "What is the purpose of Correlation ID (Request ID) in REST microservices?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "A unique UUID generated at the API Gateway and passed in the `X-Request-ID` or `X-Correlation-ID` header across all downstream microservice HTTP calls, allowing distributed log aggregation tools (Elasticsearch, Datadog) to trace an entire request journey."
  },
  {
    id: 43,
    question: "What is JSON Web Key Set (JWKS) in JWT verification?",
    category: "Security & Auth",
    difficulty: "Hard",
    explanation: "A JWKS endpoint (`/.well-known/jwks.json`) published by an OAuth identity provider (Auth0, Cognito, Keycloak) containing public cryptographic keys used by APIs to verify the digital signatures of incoming asymmetric JWTs (`RS256`)."
  },
  {
    id: 44,
    question: "What is the difference between `502 Bad Gateway` and `504 Gateway Timeout`?",
    category: "HTTP Methods & Status Codes",
    difficulty: "Easy",
    explanation: "`502 Bad Gateway` means the proxy/gateway received an invalid or crashed response from the upstream server. `504 Gateway Timeout` means the gateway waited for the upstream server to reply, but the upstream request timed out."
  },
  {
    id: 45,
    question: "What is JSON Schema and how is it used for request validation?",
    category: "API Design Best Practices",
    difficulty: "Medium",
    explanation: "A JSON-based format for declaratively describing the required structure, types, regex patterns, minimums/maximums, and required properties of API payloads, validated automatically using high-speed engines like Ajv."
  },
  {
    id: 46,
    question: "What is GraphQL Federation vs REST Orchestration Layer (BFF)?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "**BFF (Backend For Frontend)**: Dedicated REST service tailoring responses for specific clients (Mobile BFF, Web BFF). **GraphQL Federation**: Composes multiple underlying domain subgraph schemas (Apollo Federation) into a unified global supergraph schema."
  },
  {
    id: 47,
    question: "What is API Throttling vs Rate Limiting?",
    category: "Performance & Caching",
    difficulty: "Medium",
    explanation: "**Rate Limiting** rejects requests exceeding hard quotas (returning 429). **Throttling** controls the speed and bandwidth of request consumption (queuing or slowing down requests to match processing capacity without immediate rejection)."
  },
  {
    id: 48,
    question: "What is HSTS (HTTP Strict Transport Security)?",
    category: "Security",
    difficulty: "Medium",
    explanation: "A response header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` instructing browsers that the domain must *only* be accessed over HTTPS, preventing SSL-stripping man-in-the-middle attacks."
  },
  {
    id: 49,
    question: "What is Contract Testing (Pact framework)?",
    category: "Testing",
    difficulty: "Hard",
    explanation: "Contract testing verifies that independent microservices can communicate by testing consumer-defined expectations against provider implementations without requiring end-to-end integration environments."
  },
  {
    id: 50,
    question: "What is API Deprecation best practice in REST?",
    category: "API Design Best Practices",
    difficulty: "Easy",
    explanation: "Setting the standard `Deprecation: @1735689600` (timestamp) and `Sunset: Wed, 11 Nov 2026 00:00:00 GMT` HTTP response headers, logging client user-agents, and providing a migration path in documentation before removing legacy endpoints."
  }
];
