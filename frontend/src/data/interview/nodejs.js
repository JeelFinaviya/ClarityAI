/**
 * 50 High-Value Node.js Interview Questions
 */

export const NODEJS_QUESTIONS = [
  {
    id: 1,
    question: "What is the Node.js Event Loop and what are its main execution phases?",
    category: "Event Loop & Runtime",
    difficulty: "Hard",
    explanation: "Node's event loop (powered by libuv) processes non-blocking I/O across 6 phases: 1) **Timers** (`setTimeout`, `setInterval`), 2) **Pending Callbacks** (I/O errors), 3) **Idle/Prepare** (internal), 4) **Poll** (retrieves new I/O events and executes scripts), 5) **Check** (`setImmediate`), and 6) **Close Callbacks** (`socket.on('close')`). `process.nextTick` and microtasks drain between every phase."
  },
  {
    id: 2,
    question: "What is `process.nextTick()` and how does it differ from `setImmediate()`?",
    category: "Event Loop & Runtime",
    difficulty: "Medium",
    explanation: "`process.nextTick()` runs immediately after the current operation finishes, before the event loop advances to the next phase or queue. `setImmediate()` schedules callbacks into the Check phase of the event loop. Starving the event loop with recursive `nextTick` calls can freeze all I/O."
  },
  {
    id: 3,
    question: "What is Libuv and what role does it play in Node.js?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "Libuv is a multi-platform C library that powers Node.js. It manages the Event Loop, asynchronous I/O event polling (epoll on Linux, kqueue on macOS, IOCP on Windows), and provides an internal thread pool (default 4 threads) for blocking tasks like filesystem I/O, DNS lookups, and crypto."
  },
  {
    id: 4,
    question: "What are Node.js Streams and what are the 4 main types?",
    category: "Streams & Buffers",
    difficulty: "Medium",
    explanation: "Streams process data sequentially chunk-by-chunk without loading entire files into memory. The 4 types are: 1) **Readable** (`fs.createReadStream`), 2) **Writable** (`fs.createWriteStream`), 3) **Duplex** (both readable/writable, e.g., TCP socket), and 4) **Transform** (modifies data while reading/writing, e.g., `zlib.createGzip`)."
  },
  {
    id: 5,
    question: "What is Stream Backpressure and how is it handled in Node.js?",
    category: "Streams & Buffers",
    difficulty: "Hard",
    explanation: "Backpressure occurs when the Writable stream consumes data slower than the Readable stream produces it, risking buffer overflow and RAM exhaustion. Calling `.pipe()` or `pipeline()` automatically pauses the reader until the writer's internal buffer drains (`drain` event)."
  },
  {
    id: 6,
    question: "What is a `Buffer` in Node.js and why is it needed?",
    category: "Streams & Buffers",
    difficulty: "Easy",
    explanation: "A `Buffer` is a global class for handling raw binary data directly in memory outside the V8 heap. Buffers are essential for processing TCP streams, file operations, image manipulation, and network packets."
  },
  {
    id: 7,
    question: "What is the difference between Worker Threads, Child Processes, and Cluster module in Node.js?",
    category: "Concurrency & Scaling",
    difficulty: "Hard",
    explanation: "**Worker Threads** (`worker_threads`) share memory via `SharedArrayBuffer` for CPU-intensive JavaScript tasks. **Child Processes** (`child_process.fork/spawn`) spawn separate OS processes with isolated memory. The **Cluster Module** forks multiple instances of the Node process sharing the same server port to utilize all CPU cores."
  },
  {
    id: 8,
    question: "How does the Node.js Cluster module distribute incoming connections?",
    category: "Concurrency & Scaling",
    difficulty: "Medium",
    explanation: "On all platforms except Windows, the primary master process uses a **Round-Robin** algorithm to accept incoming TCP connections on the shared port and hand them off evenly to active worker processes to balance CPU load."
  },
  {
    id: 9,
    question: "What is the `EventEmitter` class and how does the Publisher-Subscriber pattern work in Node.js?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "Found in the `events` module, `EventEmitter` allows objects to emit named events (`emitter.emit('event', data)`) and register synchronous listener callbacks (`emitter.on('event', fn)`). Core modules like HTTP, streams, and file watchers inherit from `EventEmitter`."
  },
  {
    id: 10,
    question: "What causes the 'MaxListenersExceededWarning' and how is it fixed?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "By default, Node emits a warning if more than 10 listeners are added to a single event on an `EventEmitter`, designed to detect potential memory leaks (e.g. adding listeners in loops). It can be adjusted via `emitter.setMaxListeners(n)` or fixed by cleaning up listeners with `.off()`."
  },
  {
    id: 11,
    question: "What is the difference between `fs.readFile()` vs `fs.createReadStream()`?",
    category: "Streams & Buffers",
    difficulty: "Easy",
    explanation: "`fs.readFile()` buffers the entire file contents into memory at once before firing the callback (crashes if file size exceeds available RAM). `fs.createReadStream()` streams the file in small 64KB chunks, maintaining minimal constant memory usage."
  },
  {
    id: 12,
    question: "How does Node.js handle unhandled promise rejections and uncaught exceptions?",
    category: "Error Handling & Debugging",
    difficulty: "Medium",
    explanation: "By listening to `process.on('uncaughtException', handler)` and `process.on('unhandledRejection', handler)`. In production, after logging the error, the Node process should gracefully restart (e.g. via PM2 or Kubernetes) because the process memory state is corrupt."
  },
  {
    id: 13,
    question: "What is the Thread Pool size in Node.js and how can you configure it?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "The default libuv thread pool size is **4 threads**. It can be increased up to 1024 by setting the environment variable `UV_THREADPOOL_SIZE=8` before launching the application to handle high-concurrency crypto, fs, or compression tasks."
  },
  {
    id: 14,
    question: "What is the difference between `fork()`, `spawn()`, and `exec()` in `child_process`?",
    category: "Concurrency & Scaling",
    difficulty: "Hard",
    explanation: "`spawn()` launches a process and streams stdio in real-time (best for large outputs). `exec()` spawns a shell and buffers the entire output into a string callback (maxBuffer limit). `fork()` is a special `spawn()` for Node.js modules that establishes an IPC communication channel between parent and child."
  },
  {
    id: 15,
    question: "How do you profile memory leaks in Node.js applications?",
    category: "Error Handling & Debugging",
    difficulty: "Hard",
    explanation: "Using the `--inspect` flag to connect Chrome DevTools, taking **Heap Snapshots** before and after load tests, and comparing object retention trees. Alternatively, using tools like `clinic.js` or `memwatch-next`."
  },
  {
    id: 16,
    question: "What is the purpose of `package-lock.json`?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "`package-lock.json` records the exact resolved dependency versions, integrity hashes, and dependency trees downloaded during installation, guaranteeing deterministic, identical installs across all development machines and CI/CD environments."
  },
  {
    id: 17,
    question: "What is the difference between `dependencies`, `devDependencies`, and `peerDependencies`?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "`dependencies` are required at runtime in production. `devDependencies` are only needed during local development and build (linters, test frameworks, compilers). `peerDependencies` declare that a plugin/package expects the host application to install a specific major version of a library (e.g., `react`)."
  },
  {
    id: 18,
    question: "What is the difference between CommonJS `require()` and ES6 `import` in Node.js?",
    category: "Tooling & Modules",
    difficulty: "Medium",
    explanation: "`require()` is synchronous, dynamic, can be called inside conditions, and resolves via module cache. `import` is asynchronous, static, validated at parse-time, supports top-level `await`, and enables tree-shaking."
  },
  {
    id: 19,
    question: "How does Node.js resolve module paths during `require()`?",
    category: "Tooling & Modules",
    difficulty: "Medium",
    explanation: "1) Core modules (`fs`, `path`). 2) File paths (`./`, `../`, `/`). 3) Traverses up the directory hierarchy looking inside `node_modules` folders until the root filesystem. 4) Resolves extensions (`.js`, `.json`, `.node`) or `package.json` main/exports field."
  },
  {
    id: 20,
    question: "What is top-level `await` in ES Modules in Node.js?",
    category: "Event Loop & Runtime",
    difficulty: "Easy",
    explanation: "In ECMAScript Modules (`type: 'module'` or `.mjs`), `await` can be used directly at the root level of a file outside of async functions, enabling clean asynchronous initialization (e.g. database connections) before exporting modules."
  },
  {
    id: 21,
    question: "What is the Node.js `crypto` module and how is password hashing handled securely?",
    category: "Security",
    difficulty: "Medium",
    explanation: "The `crypto` module provides native cryptographic functionality. Password hashing should never use fast hashes (MD5, SHA256); instead, use slow, salted, work-factor based functions like `crypto.scrypt()` or `bcrypt` / `argon2` to protect against brute-force attacks."
  },
  {
    id: 22,
    question: "What is the difference between `util.promisify()` and creating manual promises?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`util.promisify(fn)` takes a standard Node.js error-first callback function `(err, value) => {}` and automatically converts it into a function returning a native Promise, making it compatible with `async/await`."
  },
  {
    id: 23,
    question: "What are V8 Heap Memory Limits and how can you increase them in Node.js?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "By default, 64-bit Node.js has a V8 heap limit of ~1.4GB to 2GB to keep GC pauses short. It can be increased by passing the CLI flag `--max-old-space-size=4096` (for 4GB) when starting the node process."
  },
  {
    id: 24,
    question: "What is the `path` module and why should you use `path.join()` instead of string concatenation?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`path.join()` correctly normalizes directory separators across different operating systems (`\\` on Windows, `/` on Linux/macOS), resolves `..` relative segments, and eliminates double slashes."
  },
  {
    id: 25,
    question: "What is the purpose of the `cluster` module's zero-downtime reload?",
    category: "Concurrency & Scaling",
    difficulty: "Hard",
    explanation: "During code updates, the cluster master forks a new worker with fresh code, waits for it to start listening, and then sends a graceful shutdown signal (`SIGTERM` / `worker.disconnect()`) to the old worker, cycling through workers one by one with zero downtime."
  },
  {
    id: 26,
    question: "What is the `AsyncLocalStorage` class in Node.js?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "Part of `async_hooks`, `AsyncLocalStorage` stores data that persists across asynchronous execution chains (similar to ThreadLocal in Java). It is widely used to track request-scoped metadata (like correlation IDs, trace IDs, auth user) across deep async helper functions without prop drilling."
  },
  {
    id: 27,
    question: "What is the difference between `spawn()` and `execFile()`?",
    category: "Concurrency & Scaling",
    difficulty: "Medium",
    explanation: "`execFile()` directly invokes an executable file without spawning a system shell (unlike `exec()`), making it faster and immune to shell injection vulnerabilities. `spawn()` is used when streaming large I/O."
  },
  {
    id: 28,
    question: "What is the `os` module and what useful metrics does it provide?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "The `os` module exposes operating system hardware and network metrics, such as `os.cpus()` (number of CPU cores), `os.totalmem()`, `os.freemem()`, `os.loadavg()`, and `os.uptime()`."
  },
  {
    id: 29,
    question: "What is the difference between `fs.stat()`, `fs.lstat()`, and `fs.fstat()`?",
    category: "Streams & Buffers",
    difficulty: "Hard",
    explanation: "`fs.stat()` retrieves file metadata following symbolic links. `fs.lstat()` inspects the symbolic link itself rather than the target file. `fs.fstat()` retrieves status using an open file descriptor integer."
  },
  {
    id: 30,
    question: "What is the `diagnostics_channel` module in Node.js?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "`diagnostics_channel` provides a high-performance pub/sub channel for telemetry and instrumentation libraries to publish diagnostic data with near-zero overhead when no subscribers are active."
  },
  {
    id: 31,
    question: "What is the `pipeline()` function in the `stream/promises` module?",
    category: "Streams & Buffers",
    difficulty: "Medium",
    explanation: "`pipeline(source, transform, destination)` securely pipes data across multiple streams, automatically forwarding errors and cleaning up all stream handles/file descriptors if any stream in the chain fails."
  },
  {
    id: 32,
    question: "What is graceful shutdown in Node.js and how is it implemented?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "Listening to `process.on('SIGTERM', ...)` and `SIGINT`. It stops accepting new connections (`server.close()`), waits for inflight HTTP requests and background queues to finish, closes database pools, and exits with `process.exit(0)`."
  },
  {
    id: 33,
    question: "What is the difference between `npm ci` and `npm install`?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "`npm install` updates `package-lock.json` if version ranges allow it. `npm ci` strictly adheres to `package-lock.json`, deletes existing `node_modules` before installing, and throws an error if lockfile is out of sync, making it faster and safer for CI/CD."
  },
  {
    id: 34,
    question: "What are Node.js core security best practices against ReDoS (Regular Expression Denial of Service)?",
    category: "Security",
    difficulty: "Hard",
    explanation: "ReDoS occurs when vulnerable regexes with nested quantifiers exhibit exponential backtracking on non-matching inputs, freezing the single-threaded event loop. Solved using safe regex validators (`safe-regex`), timeout limits, or the `re2` linear-time engine."
  },
  {
    id: 35,
    question: "What is the purpose of the `--watch` flag in Node.js 18+?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "`node --watch index.js` provides built-in native file watching that automatically restarts the process whenever source files change, removing the need for external dev tools like `nodemon`."
  },
  {
    id: 36,
    question: "What is the `http` module's Keep-Alive and Agent connection pooling?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "`http.Agent({ keepAlive: true })` reuses underlying TCP connections across multiple outgoing HTTP requests, eliminating the latency and CPU overhead of repeated 3-way TCP handshakes and TLS negotiations."
  },
  {
    id: 37,
    question: "What is the difference between synchronous file methods (`fs.readFileSync`) and async methods?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Synchronous methods block the entire JavaScript execution thread until disk I/O finishes, preventing the server from handling any other concurrent network requests. They should only be used during application startup."
  },
  {
    id: 38,
    question: "What is the `perf_hooks` module in Node.js?",
    category: "Error Handling & Debugging",
    difficulty: "Medium",
    explanation: "`perf_hooks` provides high-resolution time measurements (`performance.now()`) and performance observer APIs to benchmark specific functions, event loop lag, and GC execution intervals accurately."
  },
  {
    id: 39,
    question: "What is the `vm` module in Node.js and what are its security caveats?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "The `vm` module allows compiling and running code inside isolated V8 contexts. However, the official Node documentation explicitly warns that the `vm` module is NOT a secure sandbox for executing untrusted user code, as sandboxes can be broken via prototype traversal."
  },
  {
    id: 40,
    question: "How do you handle binary file uploads efficiently in Node.js?",
    category: "Streams & Buffers",
    difficulty: "Medium",
    explanation: "Using streaming multipart form parsers (such as `busboy` or `formidable`) that stream incoming file chunks directly to cloud object storage (S3) or disk via Writable streams without buffering the entire file into RAM."
  },
  {
    id: 41,
    question: "What is the `zlib` module used for?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "The `zlib` module provides compression and decompression (Gzip, Deflate, Brotli), used to compress HTTP response payloads to reduce network bandwidth and speed up page load times."
  },
  {
    id: 42,
    question: "What is the `dns` module's `dns.lookup()` vs `dns.resolve()`?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "`dns.lookup()` calls the underlying OS `getaddrinfo` function synchronously inside the libuv thread pool (subject to thread contention). `dns.resolve()` uses c-ares to perform asynchronous network DNS queries directly without blocking thread pool workers."
  },
  {
    id: 43,
    question: "What are Node.js Permission Models (`--experimental-permission`)?",
    category: "Security",
    difficulty: "Hard",
    explanation: "Introduced in Node 20, it restricts script capabilities at startup, enabling granular control over filesystem access (`--allow-fs-read/write`), child process spawning (`--allow-child-process`), and worker thread creation."
  },
  {
    id: 44,
    question: "What is `npx` and how does it differ from `npm`?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "`npm` is a package manager for installing packages into `node_modules`. `npx` is a package runner that downloads and executes CLI binaries (e.g., `create-vite`, `prisma`) temporarily in a sandbox without installing them globally."
  },
  {
    id: 45,
    question: "What is the difference between `process.env` and using `.env` configuration files?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`process.env` is the global object exposing OS environment variables. Packages like `dotenv` or Node 20's `--env-file=.env` parse key-value pairs from `.env` files into `process.env` at startup."
  },
  {
    id: 46,
    question: "What is the `net` module in Node.js?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "The `net` module provides an asynchronous network API for creating raw TCP servers (`net.createServer`) and socket clients, serving as the foundation for higher-level protocols like HTTP, WebSocket, and database drivers."
  },
  {
    id: 47,
    question: "What is the difference between `setImmediate()` and `setTimeout(fn, 0)`?",
    category: "Event Loop & Runtime",
    difficulty: "Hard",
    explanation: "When called from within an I/O callback cycle, `setImmediate()` will *always* execute before any `setTimeout` timer because the Check phase immediately follows the Poll phase in the libuv loop."
  },
  {
    id: 48,
    question: "What is the purpose of `inspector` module in Node.js?",
    category: "Error Handling & Debugging",
    difficulty: "Medium",
    explanation: "The `inspector` module provides an API for interacting with the V8 inspector protocol programmatically, taking CPU profiles and heap snapshots dynamically in production without restarting."
  },
  {
    id: 49,
    question: "What is the purpose of `.npmrc` file?",
    category: "Tooling & Modules",
    difficulty: "Easy",
    explanation: "The `.npmrc` file configures npm behavior, defining custom private package registries, authentication tokens, proxy settings, and package installation flags (e.g., `save-exact=true`)."
  },
  {
    id: 50,
    question: "What is the native `fetch` API in Node.js 18+ and what is Undici?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "Node 18+ provides standard global `fetch()`, `Request`, `Response`, and `FormData` built on top of **Undici**—a high-performance HTTP/1.1 client written from scratch for Node.js that outperforms legacy `node-fetch` and `axios`."
  }
];
