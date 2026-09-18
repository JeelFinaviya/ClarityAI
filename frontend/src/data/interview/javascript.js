/**
 * 50 High-Value JavaScript Interview Questions
 */

export const JAVASCRIPT_QUESTIONS = [
  {
    id: 1,
    question: "What is the JavaScript Event Loop and how does it coordinate the Call Stack, Microtask Queue, and Macrotask Queue?",
    category: "Runtime & Async",
    difficulty: "Medium",
    explanation: "The JavaScript engine executes synchronous code on a single Call Stack. Asynchronous callbacks are scheduled into queues: Microtasks (Promises, `queueMicrotask`, `MutationObserver`) have higher priority and are completely drained after each synchronous tick before the Event Loop dequeues a single Macrotask (`setTimeout`, `setInterval`, I/O, UI rendering)."
  },
  {
    id: 2,
    question: "What is a Closure in JavaScript, and what are practical use cases for it?",
    category: "Scope & Closures",
    difficulty: "Medium",
    explanation: "A closure is a function that retains access to its lexical scope (outer variables) even after the outer function has finished executing and returned. Practical use cases include data privacy (private state variables), function factories, memoization, currying, and partial application."
  },
  {
    id: 3,
    question: "What is the difference between `var`, `let`, and `const`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`var` is function-scoped, hoisted and initialized with `undefined`, and allows re-declaration. `let` and `const` are block-scoped (`{ ... }`), hoisted into a Temporal Dead Zone (TDZ) where accessing before declaration throws a ReferenceError. `const` prevents re-assignment of the variable identifier."
  },
  {
    id: 4,
    question: "How does Prototypal Inheritance work and what is the Prototype Chain?",
    category: "Prototypes & OOP",
    difficulty: "Hard",
    explanation: "In JavaScript, objects have an internal link (`[[Prototype]]`, accessed via `Object.getPrototypeOf()` or `__proto__`) to another object. When accessing a property, the engine searches the object itself; if missing, it traverses up the prototype chain until it finds the property or reaches `null`."
  },
  {
    id: 5,
    question: "How does the `this` keyword determine its execution context?",
    category: "Scope & Closures",
    difficulty: "Medium",
    explanation: "The value of `this` depends on how a function is called: 1) Method invocation: `obj.fn()` binds `this` to `obj`. 2) Plain invocation: `fn()` binds to `window`/`global` (or `undefined` in strict mode). 3) Explicit binding: `.call()`, `.apply()`, `.bind()`. 4) Constructor: `new Fn()` binds to newly created instance. 5) Arrow functions: inherit `this` lexically from enclosing scope."
  },
  {
    id: 6,
    question: "What is the Temporal Dead Zone (TDZ)?",
    category: "Scope & Closures",
    difficulty: "Medium",
    explanation: "The TDZ is the time between entering the scope where a `let` or `const` variable is declared and the actual line of code where it is initialized. Attempting to read or write the variable during the TDZ throws a `ReferenceError`."
  },
  {
    id: 7,
    question: "What is the difference between `==` (loose equality) and `===` (strict equality)?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`===` compares both value and type without type coercion. `==` performs implicit type coercion (converting operands according to abstract equality comparison algorithm, e.g. `0 == '0'` is `true`, `false == []` is `true`) before comparing, which can introduce subtle bugs."
  },
  {
    id: 8,
    question: "What is the difference between `call()`, `apply()`, and `bind()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`call(thisArg, arg1, arg2)` invokes the function immediately with arguments passed individually. `apply(thisArg, [argsArray])` invokes the function immediately with arguments passed as an array. `bind(thisArg, ...args)` does NOT invoke immediately; it returns a new function with `this` permanently bound."
  },
  {
    id: 9,
    question: "What are JavaScript Promises and what are their three states?",
    category: "Runtime & Async",
    difficulty: "Easy",
    explanation: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. Its three immutable states are: 1) `pending` (initial), 2) `fulfilled` (operation succeeded with a value), and 3) `rejected` (operation failed with an error reason)."
  },
  {
    id: 10,
    question: "What is the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`?",
    category: "Runtime & Async",
    difficulty: "Hard",
    explanation: "`Promise.all` resolves when all succeed (fails fast if any rejects). `Promise.allSettled` waits for all to finish regardless of success/failure. `Promise.race` settles as soon as the first promise settles (resolves OR rejects). `Promise.any` resolves as soon as the first promise resolves successfully (rejects only if all reject)."
  },
  {
    id: 11,
    question: "How does `async`/`await` work under the hood with Generators and Promises?",
    category: "Runtime & Async",
    difficulty: "Hard",
    explanation: "`async/await` is syntactic sugar over generator functions (`function*`) and Promises. An `async` function automatically returns a Promise. When `await` is encountered, it pauses execution and yields control to the Event Loop, resuming execution via the microtask queue once the awaited Promise settles."
  },
  {
    id: 12,
    question: "What is Event Bubbling and Event Capturing (Trickling) in the DOM?",
    category: "DOM & Browser APIs",
    difficulty: "Medium",
    explanation: "When a DOM event fires, it undergoes 3 phases: 1) **Capturing Phase**: Travels down from `window` through ancestors to target. 2) **Target Phase**: Fires at the target element. 3) **Bubbling Phase**: Bubbles up from target to `window`. `addEventListener(type, listener, true)` listens in capture phase; default `false` listens in bubble phase."
  },
  {
    id: 13,
    question: "What is Event Delegation and why is it beneficial?",
    category: "DOM & Browser APIs",
    difficulty: "Medium",
    explanation: "Event delegation is attaching a single event listener to a parent container instead of attaching separate listeners to dozens of child elements. Utilizing event bubbling (`e.target`), the parent handles events for current and dynamically added children, saving significant memory."
  },
  {
    id: 14,
    question: "What is the difference between Shallow Copy and Deep Copy?",
    category: "Data Structures & Types",
    difficulty: "Medium",
    explanation: "A shallow copy (`{ ...obj }`, `Object.assign()`) duplicates the top-level properties, but nested objects/arrays share memory references. A deep copy (`structuredClone(obj)` or `JSON.parse(JSON.stringify(obj))`) duplicates all nested levels recursively, producing independent memory copies."
  },
  {
    id: 15,
    question: "What is `structuredClone()` and what limitations does `JSON.parse(JSON.stringify())` have?",
    category: "Data Structures & Types",
    difficulty: "Medium",
    explanation: "`JSON.stringify` drops functions, `undefined`, `Symbol`, converts `Date` to strings, fails on circular references, and loses `Map`/`Set`/`BigInt`. Native `structuredClone()` handles circular references, `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, and `BigInt` correctly."
  },
  {
    id: 16,
    question: "How does JavaScript Garbage Collection (Mark-and-Sweep) work?",
    category: "Memory & Performance",
    difficulty: "Hard",
    explanation: "V8 and modern JS engines use the Mark-and-Sweep algorithm. Starting from 'Roots' (global variables, current stack frame variables), GC traverses references and marks all reachable objects. In the sweep phase, memory allocated to unmarked (unreachable) objects is reclaimed."
  },
  {
    id: 17,
    question: "What are common causes of Memory Leaks in JavaScript applications?",
    category: "Memory & Performance",
    difficulty: "Medium",
    explanation: "1) Accidental global variables (`window.leaked = ...`), 2) Forgotten timers or intervals (`setInterval`), 3) Uncleared event listeners on unmounted elements, 4) Closures retaining heavy variables, 5) Detached DOM nodes retained in JavaScript arrays."
  },
  {
    id: 18,
    question: "What is the difference between `Map`, `Set`, `WeakMap`, and `WeakSet`?",
    category: "Data Structures & Types",
    difficulty: "Hard",
    explanation: "`Map` holds key-value pairs (keys can be any type). `Set` stores unique values. `WeakMap` and `WeakSet` only accept objects as keys/elements and hold them as *weak references*. If no other reference to an object exists, GC reclaims it, making WeakMaps ideal for private instance metadata and caches."
  },
  {
    id: 19,
    question: "What are Generator functions and how does the `yield` keyword work?",
    category: "Modern ES6+",
    difficulty: "Medium",
    explanation: "A generator (`function*`) can pause execution at `yield` expressions and resume when `.next()` is called on its iterator object. It enables custom lazy iterables, memory-efficient infinite streams, and cooperative multitasking."
  },
  {
    id: 20,
    question: "What are Symbols in JavaScript and what is their primary use case?",
    category: "Data Structures & Types",
    difficulty: "Medium",
    explanation: "`Symbol('desc')` creates a unique and immutable primitive value. Symbols are primarily used to create collision-free unique object property keys and hook into engine internals via well-known symbols (e.g., `Symbol.iterator`, `Symbol.toPrimitive`)."
  },
  {
    id: 21,
    question: "What is Debouncing vs Throttling and how do their implementations differ?",
    category: "Memory & Performance",
    difficulty: "Medium",
    explanation: "Debounce waits for a pause in events before executing (resets a `setTimeout` on every call; ideal for search input typing). Throttle guarantees execution at fixed maximum frequency (e.g., once every 200ms using timestamps; ideal for window resize and scroll handlers)."
  },
  {
    id: 22,
    question: "What is Currying in JavaScript and how is it implemented?",
    category: "Scope & Closures",
    difficulty: "Medium",
    explanation: "Currying transforms a function taking multiple arguments `f(a, b, c)` into a sequence of nested unary functions `f(a)(b)(c)`. It is implemented using closures that collect arguments until the required arity is met: `const curry = (fn) => (...args) => args.length >= fn.length ? fn(...args) : (...more) => curry(fn)(...args, ...more)`."
  },
  {
    id: 23,
    question: "What is the difference between arrow functions and regular functions?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Arrow functions: 1) Do NOT have their own `this` (lexical binding), 2) Do NOT have `arguments` object, 3) Cannot be used as constructors with `new`, 4) Do NOT have a `prototype` property, 5) Cannot be used as generator functions."
  },
  {
    id: 24,
    question: "What is `Object.freeze()` vs `Object.seal()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`Object.freeze()` makes an object completely immutable (prevents adding, deleting, and modifying existing properties). `Object.seal()` prevents adding or deleting properties, but allows modifying existing writable property values."
  },
  {
    id: 25,
    question: "What is the difference between `null`, `undefined`, and `NaN`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`undefined` means a variable has been declared but not assigned a value. `null` is an explicit intentional assignment representing 'no value' or 'empty object'. `NaN` ('Not a Number') is a numeric type result of invalid math operations (e.g., `0 / 0`, `parseInt('abc')`)."
  },
  {
    id: 26,
    question: "Why is `typeof null === 'object'` in JavaScript?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "This is a historical bug from the first version of JavaScript (1995). Values were stored with a type tag in low-order bits; objects had type tag `000`, and the `null` pointer had null bits (`0x00`), causing `typeof` to mistakenly report `'object'`."
  },
  {
    id: 27,
    question: "What is the difference between `for...in` and `for...of` loops?",
    category: "Modern ES6+",
    difficulty: "Easy",
    explanation: "`for...in` iterates over the enumerable *keys/property names* of an object (including prototype chain properties). `for...of` iterates over the *values* of iterable collections (Arrays, Strings, Maps, Sets, NodeLists) using their `[Symbol.iterator]`."
  },
  {
    id: 28,
    question: "What is the JavaScript Proxy and Reflect API?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "A `Proxy` wraps a target object and intercepts fundamental operations (property lookup `get`, assignment `set`, function invocation `apply`). `Reflect` provides standard static methods matching proxy traps to forward default operations cleanly, used in reactivity systems (Vue 3, MobX)."
  },
  {
    id: 29,
    question: "How does JavaScript handle floating-point arithmetic precision (e.g., `0.1 + 0.2 !== 0.3`)?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "JavaScript represents all numbers using the IEEE 754 standard for binary 64-bit double-precision floats. Base-10 fractions like `0.1` and `0.2` become repeating binary fractions, causing small rounding errors (`0.30000000000000004`). Solved using `Number.EPSILON`, rounding, or integer cents."
  },
  {
    id: 30,
    question: "What is the difference between Function Declaration and Function Expression?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Function declarations (`function foo() {}`) are fully hoisted (both identifier and body), allowing them to be called before their definition line. Function expressions (`const foo = function() {}`) are treated as variable assignments and cannot be called before definition."
  },
  {
    id: 31,
    question: "What are ES Modules (ESM) vs CommonJS (CJS)?",
    category: "Modern ES6+",
    difficulty: "Medium",
    explanation: "CommonJS (`require()`, `module.exports`) is synchronous, dynamic, and runs at runtime (Node.js legacy). ES Modules (`import`, `export`) are asynchronous, statically analyzed at compile-time, enable Tree Shaking, and are native to modern browsers."
  },
  {
    id: 32,
    question: "What is Tree Shaking and how does it optimize JavaScript bundles?",
    category: "Memory & Performance",
    difficulty: "Medium",
    explanation: "Tree Shaking is dead-code elimination performed by bundlers (Webpack, Rollup, Vite). Because ESM `import/export` syntax is static, bundlers determine which exported functions are never imported across the project and exclude them from the production bundle."
  },
  {
    id: 33,
    question: "What is the purpose of `queueMicrotask()`?",
    category: "Runtime & Async",
    difficulty: "Medium",
    explanation: "`queueMicrotask(fn)` schedules a function into the microtask queue to run immediately after the current synchronous script finishes and before the browser renders or yields to the next macrotask (faster than `setTimeout(fn, 0)`)."
  },
  {
    id: 34,
    question: "What is the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`Object.keys(obj)` returns an array of the object's own enumerable property names. `Object.values(obj)` returns an array of values. `Object.entries(obj)` returns an array of `[key, value]` pairs."
  },
  {
    id: 35,
    question: "What is the Nullish Coalescing Operator (`??`) vs Logical OR (`||`)?",
    category: "Modern ES6+",
    difficulty: "Easy",
    explanation: "`||` returns the right operand if the left is *falsy* (`false`, `0`, `''`, `null`, `undefined`, `NaN`). `??` only returns the right operand if the left is strictly *nullish* (`null` or `undefined`), preserving valid falsy values like `0` or `false`."
  },
  {
    id: 36,
    question: "What is Optional Chaining (`?.`) in modern JavaScript?",
    category: "Modern ES6+",
    difficulty: "Easy",
    explanation: "Optional chaining (`user?.profile?.address?.zip`) reads deeply nested properties without throwing a `TypeError: Cannot read property of undefined` if an intermediate reference is `null` or `undefined`, immediately short-circuiting to `undefined`."
  },
  {
    id: 37,
    question: "What is the difference between `Array.prototype.map()`, `forEach()`, `filter()`, and `reduce()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`forEach` executes a callback for each item (returns `undefined`). `map` transforms each item and returns a new array. `filter` returns a new array with items passing a predicate. `reduce` accumulates array values into a single output value (object, array, number)."
  },
  {
    id: 38,
    question: "What is the difference between `slice()` and `splice()` on JavaScript Arrays?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`slice(start, end)` is an immutable operation returning a shallow copy of a portion of the array without modifying the original. `splice(start, count, ...items)` is a mutable operation that adds/removes items directly in the original array."
  },
  {
    id: 39,
    question: "What is the `IntersectionObserver` API and where is it used?",
    category: "DOM & Browser APIs",
    difficulty: "Medium",
    explanation: "`IntersectionObserver` asynchronously monitors when a target DOM element enters or exits the viewport or a parent element. It replaces expensive scroll event listeners for infinite scrolling, image lazy-loading, and tracking ad viewability."
  },
  {
    id: 40,
    question: "What is the `MutationObserver` API?",
    category: "DOM & Browser APIs",
    difficulty: "Hard",
    explanation: "`MutationObserver` provides a high-performance mechanism to watch for DOM tree changes (added/removed child nodes, attribute modifications, text content changes) without polling or legacy DOM mutation events."
  },
  {
    id: 41,
    question: "What is the `AbortController` API and how is it used to cancel fetch requests?",
    category: "DOM & Browser APIs",
    difficulty: "Medium",
    explanation: "An `AbortController` creates an `AbortSignal` (`controller.signal`) passed into `fetch(url, { signal })` or event listeners. Calling `controller.abort()` cancels the inflight HTTP network request or removes listeners immediately."
  },
  {
    id: 42,
    question: "What is Tail Call Optimization (TCO) in JavaScript engines?",
    category: "Memory & Performance",
    difficulty: "Hard",
    explanation: "TCO is a compiler optimization where recursive function calls in tail position reuse the current stack frame instead of allocating a new one, preventing Call Stack Overflow errors on deep recursion."
  },
  {
    id: 43,
    question: "What is Memoization and how is it implemented in JavaScript?",
    category: "Scope & Closures",
    difficulty: "Medium",
    explanation: "Memoization caches the results of function calls based on input arguments using a cache object or `Map`. When called with identical arguments, it returns the cached result without recalculating expensive operations."
  },
  {
    id: 44,
    question: "What is the difference between `Object.create()` and object literal `{}`?",
    category: "Prototypes & OOP",
    difficulty: "Medium",
    explanation: "`{}` creates an object inheriting from `Object.prototype`. `Object.create(proto)` creates a new object with its prototype explicitly set to `proto` (e.g., `Object.create(null)` creates a dictionary with no prototype or default methods)."
  },
  {
    id: 45,
    question: "How does `BigInt` differ from standard `Number` in JavaScript?",
    category: "Data Structures & Types",
    difficulty: "Easy",
    explanation: "Standard `Number` is limited to `2^53 - 1` (`Number.MAX_SAFE_INTEGER`). `BigInt` (`100n` or `BigInt('100')`) can represent arbitrarily large integers without precision loss, but cannot be mixed directly in math with regular `Number` without explicit casting."
  },
  {
    id: 46,
    question: "What is the difference between `Array.prototype.find()` and `Array.prototype.filter()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`find(predicate)` searches the array and returns the *first single element* that matches, stopping iteration immediately. `filter(predicate)` searches the entire array and returns an array of *all matching elements*."
  },
  {
    id: 47,
    question: "What is the purpose of `use strict` ('strict mode') in JavaScript?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`'use strict'` enables Strict Mode, which: 1) Throws errors for accidental global variables, 2) Disallows deleting undeletable properties, 3) Prohibits duplicate parameter names, 4) Makes `this` inside plain functions `undefined` instead of `window`."
  },
  {
    id: 48,
    question: "What is a polyfill vs a transpiler?",
    category: "Modern ES6+",
    difficulty: "Easy",
    explanation: "A **transpiler** (Babel, SWC) converts modern syntax (arrow functions, optional chaining, JSX) into backward-compatible syntax. A **polyfill** (core-js) provides code implementations for missing runtime APIs/methods (`Promise`, `Array.prototype.flat`, `fetch`) on older browser engines."
  },
  {
    id: 49,
    question: "What is the difference between synchronous and asynchronous iteration (`for await...of`)?",
    category: "Runtime & Async",
    difficulty: "Hard",
    explanation: "Synchronous iteration uses `[Symbol.iterator]` where `.next()` returns `{ value, done }`. Asynchronous iteration uses `[Symbol.asyncIterator]` where `.next()` returns a `Promise<{ value, done }>`, consumed using `for await (const chunk of stream)` for processing data streams."
  },
  {
    id: 50,
    question: "How does the V8 engine optimize JavaScript code using JIT compilation (Ignition and TurboFan)?",
    category: "Memory & Performance",
    difficulty: "Hard",
    explanation: "V8 parses JavaScript into an AST and compiles it to bytecode via the **Ignition** interpreter for fast initial execution. As functions run repeatedly ('hot code'), type feedback is collected, and **TurboFan** JIT-compiles the bytecode into highly optimized native machine code. If assumptions change (deoptimization), it falls back to bytecode."
  }
];
