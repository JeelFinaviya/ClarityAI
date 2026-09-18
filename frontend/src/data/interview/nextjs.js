/**
 * 50 High-Value Next.js Interview Questions
 */

export const NEXTJS_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between the Next.js App Router and the legacy Pages Router?",
    category: "Architecture & Routing",
    difficulty: "Medium",
    explanation: "The Pages Router (`pages/`) relies on file-based routes where components are client-rendered by default with SSR/SSG via `getServerSideProps`/`getStaticProps`. The App Router (`app/`) uses React Server Components (RSC) by default, supports nested layouts, streaming with Suspense, Server Actions, parallel routes, and colocated loading/error files."
  },
  {
    id: 2,
    question: "What is the difference between Server Components and Client Components (`'use client'`) in Next.js?",
    category: "Server Components (RSC)",
    difficulty: "Medium",
    explanation: "Server Components execute only on the server, have direct access to backend resources (DB, files), ship zero JavaScript bundle to the client, but cannot use hooks (`useState`, `useEffect`) or browser event listeners. Client Components (`'use client'`) are hydrated on the browser to provide interactivity, state, and event listeners."
  },
  {
    id: 3,
    question: "What is the difference between SSR, SSG, and ISR in Next.js?",
    category: "Rendering Strategies",
    difficulty: "Medium",
    explanation: "**SSR** generates HTML on every request. **SSG** pre-renders HTML at build time for fast CDN caching. **ISR (Incremental Static Regeneration)** pre-renders static pages at build time and regenerates them in the background after a specified revalidation window (`revalidate: 60`) or on-demand without rebuilding the entire app."
  },
  {
    id: 4,
    question: "How do Server Actions work in Next.js and how do they eliminate boilerplate API endpoints?",
    category: "Data Fetching & Actions",
    difficulty: "Medium",
    explanation: "Server Actions are asynchronous functions marked with `'use server'` that execute securely on the server. They can be invoked directly from HTML forms or client handlers, automatically mutating server state, revalidating cached paths (`revalidatePath()`), and updating the UI without writing manual REST API endpoints."
  },
  {
    id: 5,
    question: "What is `revalidatePath` vs `revalidateTag` in Next.js caching?",
    category: "Data Fetching & Actions",
    difficulty: "Hard",
    explanation: "`revalidatePath('/dashboard')` purges the Data Cache and Full Route Cache for a specific URL path. `revalidateTag('collection-tag')` purges the Data Cache for all fetch requests across the entire application tagged with `fetch(url, { next: { tags: ['collection-tag'] } })`, enabling fine-grained cache invalidation."
  },
  {
    id: 6,
    question: "How does the Next.js `<Image>` component optimize images over standard `<img>` tags?",
    category: "Optimization",
    difficulty: "Easy",
    explanation: "`next/image` automatically converts images to modern formats (WebP/AVIF), resizes images on-demand based on device viewport, prevents Cumulative Layout Shift (CLS) via forced width/height or fill, and lazy-loads offscreen images by default."
  },
  {
    id: 7,
    question: "What is the Next.js Middleware and in what runtime environment does it execute?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "Middleware (`middleware.ts`) runs before a request is completed, executing on the lightweight V8 Edge Runtime. It intercepts incoming requests to handle authentication redirects, header modifications, geo-routing, A/B testing, and URL rewrites with sub-millisecond cold starts."
  },
  {
    id: 8,
    question: "What are Route Handlers (`app/api/.../route.ts`) in the App Router?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "Route Handlers replace legacy API routes. They export named HTTP functions (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) that accept the web-standard `Request` and return `Response` or `NextResponse.json()`, supporting both Edge and Node.js runtimes."
  },
  {
    id: 9,
    question: "What is Next.js Dynamic Routing and how are catch-all routes created?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "Dynamic segments use brackets: `app/blog/[slug]/page.tsx`. Catch-all routes use `[...slug]` (matches `/blog/a`, `/blog/a/b`). Optional catch-all routes use `[[...slug]]` (also matches the root `/blog` without params)."
  },
  {
    id: 10,
    question: "What are Parallel Routes (`@slot`) and Intercepting Routes (`(.)`, `(..)`) in the App Router?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "**Parallel Routes** (`@analytics`, `@team`) render multiple independent sub-pages simultaneously in the same layout. **Intercepting Routes** intercept routes within the current context to show modal views (e.g., photo modal over a feed) while preserving shareable deep URLs on page refresh."
  },
  {
    id: 11,
    question: "What is Streaming and how does `loading.tsx` work with React Suspense?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Streaming breaks the server-rendered HTML into chunks streamed to the client over HTTP. `loading.tsx` automatically wraps the page in a React `<Suspense fallback={<Loading />}>` boundary, instantly showing skeleton UI while slow database/API queries stream in without blocking the entire page."
  },
  {
    id: 12,
    question: "What is `error.tsx` in Next.js and why must it be a Client Component?",
    category: "Architecture & Routing",
    difficulty: "Medium",
    explanation: "`error.tsx` automatically wraps route segments in a React Error Boundary. It must be a Client Component (`'use client'`) because Error Boundaries need client-side lifecycle hooks and state to catch runtime errors and provide interactive recovery functions like `reset()`."
  },
  {
    id: 13,
    question: "How does `next/font` optimize web font loading and eliminate layout shifts?",
    category: "Optimization",
    difficulty: "Easy",
    explanation: "`next/font` automatically downloads Google Fonts or local fonts at build time and hosts them with your static assets (zero external requests to Google). It automatically inlines optimal fallback font metrics (size-adjust) in CSS, eliminating font-swap layout shifts."
  },
  {
    id: 14,
    question: "What are the 4 caching layers in Next.js App Router?",
    category: "Performance",
    difficulty: "Hard",
    explanation: "1) **Request Memoization**: Deduplicates identical `fetch` calls in a single render pass. 2) **Data Cache**: Persists fetched data across server requests/deployments. 3) **Full Route Cache**: Caches static HTML and RSC payload at build/revalidation time. 4) **Router Cache**: Client-side in-memory cache of RSC payloads during user navigation."
  },
  {
    id: 15,
    question: "How do you pass data from a Server Component to a Client Component?",
    category: "Server Components (RSC)",
    difficulty: "Easy",
    explanation: "By passing data as props from the parent Server Component to the child Client Component. All props passed across the server-client boundary must be JSON-serializable (primitives, plain objects, arrays; no functions, classes, or symbols)."
  },
  {
    id: 16,
    question: "What is the Next.js `generateStaticParams()` function?",
    category: "Rendering Strategies",
    difficulty: "Medium",
    explanation: "`generateStaticParams()` replaces `getStaticPaths` in the App Router. It defines the list of dynamic route parameters to be statically pre-rendered at build time (e.g. returning `[{ slug: 'post-1' }, { slug: 'post-2' }]`)."
  },
  {
    id: 17,
    question: "What is `dynamicParams` and `dynamic = 'force-dynamic'` route segment config?",
    category: "Rendering Strategies",
    difficulty: "Medium",
    explanation: "`dynamicParams = true/false` controls whether dynamic segments not generated at build time are rendered on-demand. `export const dynamic = 'force-dynamic'` disables all static caching for the route, forcing SSR on every incoming request."
  },
  {
    id: 18,
    question: "What is the difference between `cookies()` and `headers()` in Next.js Server Components?",
    category: "Data Fetching & Actions",
    difficulty: "Medium",
    explanation: "`cookies()` and `headers()` are server-only async utilities to read request cookies and HTTP headers. Invoking either utility automatically opt the route into dynamic rendering (SSR), as the response now depends on incoming request headers."
  },
  {
    id: 19,
    question: "How do you handle SEO metadata with the Next.js Metadata API?",
    category: "SEO & Metadata",
    difficulty: "Easy",
    explanation: "By exporting a static `metadata: Metadata` object or an async `generateMetadata({ params }): Promise<Metadata>` function from `layout.tsx` or `page.tsx`. Next.js automatically dedupes and injects `<title>`, `<meta>`, Open Graph, and Twitter tags into `<head>`."
  },
  {
    id: 20,
    question: "What is the purpose of `template.tsx` vs `layout.tsx`?",
    category: "Architecture & Routing",
    difficulty: "Medium",
    explanation: "`layout.tsx` preserves state, does not re-mount, and avoids re-rendering when navigating between sibling routes. `template.tsx` creates a new instance on every navigation, re-mounting components and resetting state (useful for page entrance animations or page-view logging)."
  },
  {
    id: 21,
    question: "What is Route Group (`(folder)`) in Next.js?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "Folders enclosed in parentheses `(auth)`, `(marketing)` organize routes and assign different nested layouts without affecting the URL path (e.g., `(auth)/login/page.tsx` maps to `/login`)."
  },
  {
    id: 22,
    question: "How does client-side navigation with `<Link>` work in Next.js?",
    category: "Performance",
    difficulty: "Easy",
    explanation: "`next/link` intercepts anchor clicks to perform fast client-side transitions without full browser refreshes. When a `<Link>` appears in the viewport, Next.js automatically prefetches the route's RSC payload in the background for near-instant transitions."
  },
  {
    id: 23,
    question: "What is the `useRouter` hook in the App Router (`next/navigation`)?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "Imported from `next/navigation` (not `next/router`), `useRouter` provides programmatic navigation methods (`router.push()`, `router.replace()`, `router.refresh()`, `router.back()`) for Client Components."
  },
  {
    id: 24,
    question: "What is `router.refresh()` in Next.js?",
    category: "Data Fetching & Actions",
    difficulty: "Medium",
    explanation: "`router.refresh()` refreshes the current route by requesting updated RSC payloads from the server, re-rendering Server Components with fresh database data without losing client-side React state (e.g., form focus, scroll position)."
  },
  {
    id: 25,
    question: "What is the `useSearchParams` and `usePathname` hook?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "`usePathname()` reads the current URL path string (`/dashboard`). `useSearchParams()` reads the query string params (`?tab=settings`), returning a read-only instance of `URLSearchParams`."
  },
  {
    id: 26,
    question: "What is Partial Prerendering (PPR) in Next.js?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "PPR combines static and dynamic rendering in the same route. The static shell (navigation, product layout) is served instantly from edge CDN, while dynamic holes wrapped in Suspense (user cart, personalized recommendations) stream in concurrently."
  },
  {
    id: 27,
    question: "What are Server-Only and Client-Only packages (`import 'server-only'`)?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Importing `import 'server-only'` in a module containing private API keys or database connections causes the build to fail if a developer accidentally imports that module into a Client Component (`'use client'`), preventing data leaks."
  },
  {
    id: 28,
    question: "What is `next.config.js` and what are common configurations?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "The central configuration file for Next.js. Common options include: `images.remotePatterns` (allowing external image CDN domains), `redirects()`, `rewrites()`, `headers()`, `experimental` flags, and environment variables."
  },
  {
    id: 29,
    question: "What is the difference between redirects and rewrites in `next.config.js`?",
    category: "Architecture & Routing",
    difficulty: "Medium",
    explanation: "**Redirects** return HTTP 307/308 status codes, instructing the browser to change the visible URL in the address bar. **Rewrites** act as internal proxies, mapping the destination URL onto the source route while keeping the address bar URL unchanged."
  },
  {
    id: 30,
    question: "How do you generate dynamic sitemaps and `robots.txt` in the App Router?",
    category: "SEO & Metadata",
    difficulty: "Medium",
    explanation: "By creating `app/sitemap.ts` and `app/robots.ts` files that export functions returning structured objects (`MetadataRoute.Sitemap` / `MetadataRoute.Robots`), which Next.js automatically compiles into XML and TXT endpoints."
  },
  {
    id: 31,
    question: "What is the difference between `useFormStatus` and `useActionState` in Next.js Server Actions?",
    category: "Data Fetching & Actions",
    difficulty: "Hard",
    explanation: "`useFormStatus` tracks whether a parent `<form>` is currently submitting (`pending: true`), enabling loading spinners in submit buttons. `useActionState` manages the state returned by a Server Action (e.g., validation error messages, success data) across invocations."
  },
  {
    id: 32,
    question: "What is the Next.js `notFound()` function and `not-found.tsx` file?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "Calling `notFound()` inside a Server Component or Route Handler terminates execution and renders the closest `not-found.tsx` boundary, returning a proper HTTP 404 status code for SEO crawlers."
  },
  {
    id: 33,
    question: "What is Next.js OpenTelemetry instrumentation (`instrumentation.ts`)?",
    category: "Optimization",
    difficulty: "Hard",
    explanation: "The `instrumentation.ts` file in the project root exports a `register()` hook executed when a new Next.js server instance boots up, used to initialize monitoring, logging, and APM tools (Datadog, OpenTelemetry, Sentry)."
  },
  {
    id: 34,
    question: "How do you configure dynamic API route caching in Next.js?",
    category: "Data Fetching & Actions",
    difficulty: "Medium",
    explanation: "In Route Handlers, `export const dynamic = 'force-static'` caches `GET` responses. You can also specify `export const revalidate = 60` or return standard `Cache-Control` HTTP headers."
  },
  {
    id: 35,
    question: "What is the difference between the Node.js runtime and Edge runtime in Next.js?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "The **Node.js runtime** supports all Node APIs (`fs`, `child_process`, native C++ modules) with standard container boot times. The **Edge runtime** is a lightweight V8 isolate with no Node native modules, designed for ultra-fast startup and execution at CDN edge nodes."
  },
  {
    id: 36,
    question: "What is `unstable_noStore` / `connection()` in Next.js?",
    category: "Data Fetching & Actions",
    difficulty: "Medium",
    explanation: "`unstable_noStore()` opts out of static rendering inside a specific component or data fetch without having to mark the entire page route as `force-dynamic`."
  },
  {
    id: 37,
    question: "How do you implement internationalization (i18n) in the Next.js App Router?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "Using dynamic route prefix segments `app/[lang]/page.tsx` combined with `middleware.ts` to detect user language preferences from `Accept-Language` headers and rewrite/redirect users to localized route segments."
  },
  {
    id: 38,
    question: "How does Next.js handle environment variables (`.env.local` vs `.env.production`)?",
    category: "Configuration",
    difficulty: "Easy",
    explanation: "Variables without prefixes are server-only (`DATABASE_URL`). Variables intended for the client bundle must be prefixed with `NEXT_PUBLIC_` (`NEXT_PUBLIC_API_URL`), inlined into the client JavaScript bundle at build time."
  },
  {
    id: 39,
    question: "What is the purpose of `useOptimistic` hook with Server Actions?",
    category: "Data Fetching & Actions",
    difficulty: "Hard",
    explanation: "`useOptimistic` allows updating the UI state immediately while a Server Action is in flight. If the Server Action throws an error or rejects, the state automatically rolls back to the actual server state."
  },
  {
    id: 40,
    question: "What is the `bundle-analyzer` plugin for Next.js?",
    category: "Optimization",
    difficulty: "Medium",
    explanation: "`@next/bundle-analyzer` generates an interactive zoomable treemap visualization of production JavaScript chunks, allowing developers to identify oversized third-party libraries and code-splitting opportunities."
  },
  {
    id: 41,
    question: "What is the difference between `default.tsx` and `page.tsx` in Parallel Routes?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "`default.tsx` provides a fallback view to render inside an unmatched parallel slot (`@slot`) when Next.js cannot recover the slot's active state during hard browser refreshes."
  },
  {
    id: 42,
    question: "What is the Next.js Script component (`next/script`) strategies?",
    category: "Optimization",
    difficulty: "Medium",
    explanation: "`<Script>` manages third-party scripts (analytics, ads). Strategies include: `beforeInteractive` (injected before hydration), `afterInteractive` (default, loaded after page is interactive), `lazyOnload` (loaded during idle time), and `worker` (offloaded to Web Worker via Partytown)."
  },
  {
    id: 43,
    question: "How do you implement authentication in Next.js using NextAuth / Auth.js?",
    category: "Security",
    difficulty: "Medium",
    explanation: "By configuring an Auth.js Route Handler in `app/api/auth/[...nextauth]/route.ts` with OAuth providers or credentials, validating sessions in Server Components via `auth()`, and protecting routes via `middleware.ts`."
  },
  {
    id: 44,
    question: "What is the purpose of `global-error.tsx`?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "`global-error.tsx` catches unhandled errors in the root `app/layout.tsx`. Because it replaces the root layout, it must define its own `<html>` and `<body>` tags."
  },
  {
    id: 45,
    question: "How does Next.js handle CSS Modules vs Tailwind CSS?",
    category: "Optimization",
    difficulty: "Easy",
    explanation: "CSS Modules (`.module.css`) scope class names locally with unique hash suffixes. Tailwind CSS utilizes utility classes processed by PostCSS, purging unused styles at build time for tiny production CSS bundles."
  },
  {
    id: 46,
    question: "What is Next.js standalone output mode (`output: 'standalone'`)?",
    category: "Configuration",
    difficulty: "Hard",
    explanation: "In `next.config.js`, `output: 'standalone'` builds a minimal self-contained Node.js server bundle with only the exact `node_modules` dependencies needed, shrinking Docker container sizes by up to 80%."
  },
  {
    id: 47,
    question: "How do you create custom error pages for 500 and 404 in Next.js?",
    category: "Architecture & Routing",
    difficulty: "Easy",
    explanation: "By creating `app/not-found.tsx` for 404 errors and `app/error.tsx` for 500/unhandled server errors, providing custom brand styling and recovery buttons."
  },
  {
    id: 48,
    question: "What is the difference between static metadata and dynamic metadata in Next.js?",
    category: "SEO & Metadata",
    difficulty: "Easy",
    explanation: "Static metadata is an object `export const metadata = { title: '...' }`. Dynamic metadata is an async function `export async function generateMetadata({ params })` that fetches database data (e.g. blog title) before generating tags."
  },
  {
    id: 49,
    question: "What is the `interception` route token syntax (`(.)`, `(..)`, `(..)(..)`, `(...)`)?",
    category: "Architecture & Routing",
    difficulty: "Hard",
    explanation: "`src` directory relative matchers: `(.)` matches segments on the same level, `(..)` matches one level above, `(..)(..)` matches two levels above, and `(...)` matches segments starting from the root `app` directory."
  },
  {
    id: 50,
    question: "What is the difference between TurboPack and Webpack in Next.js?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Webpack is the JavaScript-based legacy bundler. **Turbopack** is the Rust-based bundler written specifically for Next.js, delivering up to 10x faster HMR (Hot Module Replacement) and up to 4x faster initial build times."
  }
];
