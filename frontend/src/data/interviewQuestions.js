/**
 * 50 High-Value React Interview Questions
 * Curated for internships, technical rounds, fresher interviews, and frontend assessments.
 * Static dataset — runs locally without API quota or network dependencies.
 */

export const INTERVIEW_TOPICS = [
  {
    id: 'react',
    name: 'React',
    description: 'Components, Virtual DOM, Hooks, Lifecycle, State & Performance Optimization',
    questionCount: 50,
    active: true,
    badge: 'Popular',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Event Loop, Closures, Prototypes, Async/Await, Memory & ES6+',
    questionCount: 40,
    active: false,
    badge: 'Coming Soon',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Data Structures, Generators, OOP, GIL, Concurrency & Decorators',
    questionCount: 35,
    active: false,
    badge: 'Coming Soon',
  },
  {
    id: 'sql',
    name: 'SQL & DBMS',
    description: 'Indexing, ACID, Query Optimization, Joins, Normalization & Transactions',
    questionCount: 30,
    active: false,
    badge: 'Coming Soon',
  }
];

export const CATEGORIES = [
  'All',
  'Fundamentals',
  'Rendering',
  'Hooks',
  'State',
  'Performance',
  'Architecture',
  'Advanced'
];

export const REACT_QUESTIONS = [
  {
    id: 1,
    question: "What is the Virtual DOM, and how does React use it to optimize UI updates?",
    category: "Rendering",
    difficulty: "Easy",
    explanation: "The Virtual DOM is a lightweight in-memory JavaScript representation of the real DOM tree. When state changes occur, React creates a new virtual tree, diffs it with the previous virtual tree (reconciliation), computes the minimal set of changes, and batches updates to the real DOM in a single pass to avoid expensive browser layout and repaint operations."
  },
  {
    id: 2,
    question: "What is JSX, and what happens to it during the build/compilation step?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "JSX is a syntax extension for JavaScript that allows writing HTML-like structures inside code. Browsers cannot execute JSX directly; transpilers like Babel or Vite's SWC compile JSX into standard JavaScript calls—traditionally React.createElement() or the modern JSX runtime call _jsx(), which evaluate to plain JavaScript element objects."
  },
  {
    id: 3,
    question: "Why do list items require unique and stable `key` props in React?",
    category: "Rendering",
    difficulty: "Medium",
    explanation: "React's reconciliation algorithm uses keys to identify which items in a dynamic list have changed, been added, or been removed across renders. Stable keys prevent entire list re-renders and preserve component state. Using array indices as keys can cause subtle UI glitches, state leakage, and broken animations when items are reordered, inserted, or filtered."
  },
  {
    id: 4,
    question: "What is the difference between props and state?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Props (short for properties) are read-only inputs passed from parent to child components, making data flow predictable and unidirectional. State is private, mutable data managed internally by a component over time. When state changes via its setter, the component schedules a re-render to update the UI."
  },
  {
    id: 5,
    question: "Why does React require state to be treated as immutable?",
    category: "State",
    difficulty: "Medium",
    explanation: "React relies on shallow object equality (`Object.is`) to detect state changes. Directly mutating an object or array keeps the same memory reference, causing React to assume nothing changed and skip re-renders. Immutable updates (e.g., via spread operators `...` or mapping) produce new references, enabling predictable re-renders, undo/redo features, and optimized memoization."
  },
  {
    id: 6,
    question: "How does React 18 automatic batching work for state updates?",
    category: "State",
    difficulty: "Medium",
    explanation: "Batching groups multiple state updates into a single re-render for better performance. Before React 18, batching only occurred inside React event handlers. React 18 introduced Automatic Batching across all contexts—including promises, setTimeout, native event listeners, and asynchronous callbacks—without manual ReactDOM.unstable_batchedUpdates."
  },
  {
    id: 7,
    question: "What are the rules of React Hooks and why do they exist?",
    category: "Hooks",
    difficulty: "Easy",
    explanation: "The two fundamental rules are: 1) Only call Hooks at the top level (not inside loops, conditions, or nested functions), and 2) Only call Hooks from React function components or custom Hooks. React tracks Hook state by relying on a strict, deterministic call order (an internal linked list/array) between renders."
  },
  {
    id: 8,
    question: "What is the difference between `useEffect`, `useLayoutEffect`, and `useInsertionEffect`?",
    category: "Hooks",
    difficulty: "Hard",
    explanation: "`useEffect` runs asynchronously after the browser paints the screen, making it ideal for non-blocking side effects like data fetching. `useLayoutEffect` runs synchronously after all DOM mutations but before the browser paints, preventing visual flicker during direct DOM measurements. `useInsertionEffect` runs before DOM mutations and is specifically intended for CSS-in-JS libraries injecting dynamic style tags."
  },
  {
    id: 9,
    question: "Why should you use the updater function form in `setState(prev => prev + 1)`?",
    category: "State",
    difficulty: "Easy",
    explanation: "Because state updates in React are batched and asynchronous, accessing the `state` variable directly inside consecutive calls (e.g., `setCount(count + 1)`) can read stale values captured in the current render closure. The functional updater form `setCount(prev => prev + 1)` guarantees access to the most up-to-date pending state value."
  },
  {
    id: 10,
    question: "What problem does `useCallback` solve, and when is using it unnecessary?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`useCallback` memoizes a function definition between renders, returning the same reference unless its dependencies change. It is primarily useful when passing callbacks to memoized child components (`React.memo`) or as dependencies in `useEffect`. Using `useCallback` on inline handlers without memoized children introduces unnecessary overhead without performance benefit."
  },
  {
    id: 11,
    question: "What is `useMemo`, and how does it differ from `useCallback`?",
    category: "Performance",
    difficulty: "Easy",
    explanation: "`useMemo` caches the calculated *result* of an expensive function between renders, whereas `useCallback` caches the *function definition* itself. In fact, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is designed for CPU-heavy transformations or keeping referential stability for complex objects/arrays passed down as props."
  },
  {
    id: 12,
    question: "How does `useRef` differ from `useState`, and when should you use it?",
    category: "Hooks",
    difficulty: "Easy",
    explanation: "Both preserve values across renders, but mutating `useRef.current` does *not* trigger a re-render, whereas `useState` schedules a re-render. Use `useRef` to hold direct DOM element references (focus, scrolling, measuring) or mutable instance variables (timer IDs, previous state values, render counts) that do not directly affect UI output."
  },
  {
    id: 13,
    question: "What causes a React component to re-render?",
    category: "Rendering",
    difficulty: "Easy",
    explanation: "A React component re-renders when: 1) Its internal state changes via `useState` or `useReducer`, 2) Its parent component re-renders (unless wrapped in `React.memo`), 3) A Context value it subscribes to via `useContext` changes, or 4) A custom Hook it uses triggers a state update."
  },
  {
    id: 14,
    question: "What is `React.memo` (Higher-Order Component) and how does it prevent renders?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`React.memo` is a higher-order component that wraps a functional component and performs a shallow comparison (`Object.is`) of its incoming props against the previous props. If all props are identical, React skips rendering the component and reuses its last rendered output. A custom comparison function can be supplied as the second argument if deep comparison is needed."
  },
  {
    id: 15,
    question: "What is the difference between controlled and uncontrolled components?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "In a controlled component, form input values are driven entirely by React state via `value` and `onChange` props, making React the single source of truth. In an uncontrolled component, form data is handled directly by the browser's DOM, and React accesses values on-demand using refs (`inputRef.current.value`). Controlled components are preferred for instant validation and dynamic inputs."
  },
  {
    id: 16,
    question: "How does React's Context API work, and what is its main performance pitfall?",
    category: "State",
    difficulty: "Medium",
    explanation: "Context provides a way to pass data through the component tree without manually passing props down through every level (prop drilling). Its main performance pitfall is that *every* component consuming that context via `useContext` will re-render whenever the Provider's value reference changes, even if the component only cares about an unchanged subset of the context object. Splitting contexts or memoizing values mitigates this."
  },
  {
    id: 17,
    question: "What is the difference between Context API and dedicated state managers like Redux or Zustand?",
    category: "State",
    difficulty: "Medium",
    explanation: "Context is a dependency-injection/prop-transport mechanism built into React, not a specialized state management engine. Libraries like Redux, Zustand, or Jotai offer fine-grained selector-based subscriptions (preventing unnecessary re-renders), middleware support, devtools, action dispatching, and optimized handling of high-frequency state updates."
  },
  {
    id: 18,
    question: "What is an Error Boundary in React, and what types of errors can it NOT catch?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "An Error Boundary is a React class component implementing `componentDidCatch` or `static getDerivedStateFromError` that catches JavaScript errors anywhere in its child component tree, logs them, and displays a fallback UI. Error Boundaries cannot catch: 1) Errors inside event handlers (use try/catch), 2) Asynchronous code (e.g., setTimeout or fetch callbacks), 3) Server-side rendering errors, and 4) Errors thrown inside the boundary itself."
  },
  {
    id: 19,
    question: "How do you clean up side effects in `useEffect`, and why is it critical?",
    category: "Hooks",
    difficulty: "Easy",
    explanation: "A cleanup function is returned from the `useEffect` callback: `return () => { /* cleanup */ }`. React executes this cleanup function before re-running the effect on dependency change and when the component unmounts. Cleanup prevents memory leaks, dangling network connections, duplicate event listeners, and race conditions from uncancelled subscriptions."
  },
  {
    id: 20,
    question: "How do you handle race conditions when fetching data in `useEffect`?",
    category: "Hooks",
    difficulty: "Medium",
    explanation: "When state changes trigger multiple rapid fetches, responses can arrive out of order. You can prevent stale responses from overwriting current state by using a boolean `ignore` flag in the effect cleanup (`let ignore = false; ... return () => { ignore = true; }`) or by utilizing the `AbortController` API to cancel pending fetch requests when dependencies change or the component unmounts."
  },
  {
    id: 21,
    question: "What is the React Fiber architecture and why was React rewritten with Fiber in v16?",
    category: "Rendering",
    difficulty: "Hard",
    explanation: "Fiber is React's internal reconciliation engine. The original stack reconciler was synchronous and recursive, meaning large updates could block the JavaScript main thread and cause UI stutter. Fiber broke rendering into incremental, interruptible units of work (fibers), allowing React to pause, resume, prioritize user interactions (like typing) over background renders, and enable Concurrent features."
  },
  {
    id: 22,
    question: "What is Concurrent React and what do `useTransition` and `useDeferredValue` do?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Concurrent React allows rendering to be interruptible. `useTransition` marks specific state updates as non-urgent transitions (e.g., filtering large lists), keeping the UI responsive to urgent inputs (like typing) without freezing. `useDeferredValue` accepts a value and defers updating a secondary piece of UI until higher-priority renders have completed."
  },
  {
    id: 23,
    question: "What is the difference between `React.Fragment` and standard `<div>` wrappers?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`React.Fragment` (or the shorthand `<>...</>`) groups a list of children without adding extra DOM nodes to the document tree. Standard `<div>` wrappers introduce unnecessary DOM depth, which can break CSS layouts (like CSS Grid or Flexbox child semantics), table structures (`<tr>`/`<td>`), and slightly degrade rendering performance."
  },
  {
    id: 24,
    question: "How does React's SyntheticEvent system work?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "React wraps native browser events in a cross-browser `SyntheticEvent` wrapper to ensure consistent event properties across all browsers. In React 17+, React delegates all event listeners to the root DOM container where the React tree is attached (e.g., `<div id='root'>`) rather than attaching listeners to individual DOM nodes or the document object, improving performance and micro-frontend integration."
  },
  {
    id: 25,
    question: "What is a custom Hook, and what are the primary reasons to build one?",
    category: "Hooks",
    difficulty: "Easy",
    explanation: "A custom Hook is a standard JavaScript function whose name starts with `use` and can call other React Hooks. Custom Hooks encapsulate and share reusable stateful logic (e.g., window resize tracking, local storage synchronization, API polling, or form management) across multiple components without duplicating lifecycle code or restructuring component hierarchies."
  },
  {
    id: 26,
    question: "What is Prop Drilling and what are the best techniques to avoid it?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "Prop drilling is the process of passing props through several intermediate components that do not need the data themselves, merely to reach a deeply nested child. Techniques to avoid it include: 1) Component Composition (passing children or component slots directly), 2) React Context API for cross-cutting global data (auth, theme), and 3) Dedicated state management stores (Zustand, Redux)."
  },
  {
    id: 27,
    question: "What is the difference between Server-Side Rendering (SSR), Client-Side Rendering (CSR), and Static Site Generation (SSG)?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "In CSR, the browser downloads a blank HTML shell and builds the entire UI using JavaScript on the client. In SSR, the server renders HTML on every incoming request, returning fully formed content for fast initial view and SEO. In SSG, HTML pages are generated once at build time and served statically via CDN for maximum speed. Frameworks like Next.js combine these paradigms."
  },
  {
    id: 28,
    question: "What is Hydration in modern React frameworks, and what causes Hydration Mismatch errors?",
    category: "Architecture",
    difficulty: "Hard",
    explanation: "Hydration is the process where client-side React attaches event listeners and boots up interactivity on top of the static HTML markup generated by the server. A Hydration Mismatch error occurs when the server-rendered HTML does not match the initial client-side render (e.g., using `typeof window !== 'undefined'`, random numbers, or current timestamp differences between server and browser)."
  },
  {
    id: 29,
    question: "What is `React.lazy` and `Suspense`, and how do they enable Code Splitting?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`React.lazy` dynamically imports components on-demand (`import('./Component')`), splitting them into separate JavaScript bundle chunks loaded over the network only when needed. `Suspense` wraps lazy components and renders a fallback UI (like a skeleton or spinner) while the network chunk is being downloaded, drastically reducing initial bundle size and initial load time."
  },
  {
    id: 30,
    question: "Why can referencing an object or array in a `useEffect` dependency array trigger an infinite loop?",
    category: "Hooks",
    difficulty: "Medium",
    explanation: "React checks `useEffect` dependencies using shallow reference equality (`Object.is`). If an object or array is declared directly inside the component body, a brand new memory reference is created on every single render. The effect sees a changed reference, executes its callback, updates state, triggers a re-render, and repeats infinitely. Fix this using `useMemo`, `useRef`, or primitive dependencies."
  },
  {
    id: 31,
    question: "What is the difference between `useReducer` and `useState`, and when is `useReducer` preferred?",
    category: "State",
    difficulty: "Medium",
    explanation: "`useState` is best for simple, independent state primitives. `useReducer` is preferred when: 1) State logic is complex with multiple sub-values, 2) The next state depends intimately on previous state and specific action types, 3) Related state variables update together, or 4) You want to pass `dispatch` down through deep trees instead of passing multiple callback functions."
  },
  {
    id: 32,
    question: "What is React StrictMode, and why does it run effects and renders twice in development?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`StrictMode` is a development-only tool that highlights potential problems without rendering visible UI. In React 18+, it intentionally mounts, unmounts, and re-mounts components and double-invokes reducers and pure functions. This uncovers missing effect cleanups, impure render calculations, and outdated lifecycle assumptions before shipping to production."
  },
  {
    id: 33,
    question: "What is the difference between Component Composition and Inheritance in React?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "React officially favors Composition over Inheritance. Composition uses props (such as `children`, render props, or explicit slots like `header={<Nav />}`) to assemble flexible, modular components without rigid parent-child class hierarchies. Inheritance creates tightly coupled class chains that are difficult to refactor and maintain."
  },
  {
    id: 34,
    question: "How do React Portals (`ReactDOM.createPortal`) work, and where are they commonly used?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "Portals render a child component into a different DOM node outside the parent component's DOM hierarchy, while still preserving its place in the React virtual tree for event bubbling and context propagation. They are standard for UI elements that must escape `overflow: hidden` or `z-index` stacking contexts, such as modals, tooltips, dialogs, and toast notifications."
  },
  {
    id: 35,
    question: "What is the 'stale closure' problem in React Hooks, and how do you resolve it?",
    category: "Hooks",
    difficulty: "Hard",
    explanation: "A stale closure occurs when an asynchronous callback (such as inside `useEffect`, `setTimeout`, or an event listener) captures state or prop values from the render in which it was created, rather than the latest values. It is resolved by: 1) Adding all referenced variables to the Hook's dependency array, 2) Using functional state updaters `setVal(prev => ...)`, or 3) Storing the latest value in a `useRef`."
  },
  {
    id: 36,
    question: "What is `forwardRef` and `useImperativeHandle`, and when should they be used?",
    category: "Hooks",
    difficulty: "Hard",
    explanation: "By default, functional components cannot receive `ref` props. `React.forwardRef` allows a parent component to pass a ref down through a child to an underlying DOM node. `useImperativeHandle` customizes and limits the instance value exposed to the parent ref, exposing only explicit public methods (e.g., `focus()`, `scrollToBottom()`) instead of the raw DOM node."
  },
  {
    id: 37,
    question: "What are React Server Components (RSC) and how do they differ from traditional Client Components?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "React Server Components (RSC) execute and render strictly on the server and never ship their JavaScript code to the client bundle. They can directly access databases, file systems, and internal microservices with zero client overhead. Client Components (`'use client'`) ship JavaScript to the browser to provide client-side interactivity, state (`useState`), and event handlers."
  },
  {
    id: 38,
    question: "How does React determine whether two elements in the diffing algorithm represent the same DOM node?",
    category: "Rendering",
    difficulty: "Hard",
    explanation: "During reconciliation, React applies heuristic rules: 1) If two elements have different component/element types (e.g., `<div>` vs `<span>` or `<Header>` vs `<Footer>`), React completely unmounts the old subtree and builds the new one from scratch. 2) If the types are identical, React retains the underlying DOM node and updates only modified attributes/props. 3) In lists, keys determine persistent node identity."
  },
  {
    id: 39,
    question: "What is the difference between throttling and debouncing in React input/scroll handlers?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Debouncing delays function execution until a specified quiet period has elapsed after the last event trigger (ideal for auto-complete search inputs). Throttling ensures a function executes at most once in a given interval (ideal for scroll listeners or window resizing). In React, ensure debounced/throttled functions are memoized with `useCallback` or `useRef` to prevent recreation on every render."
  },
  {
    id: 40,
    question: "What is `useId` and why should you use it instead of generating random IDs with `Math.random()`?",
    category: "Hooks",
    difficulty: "Easy",
    explanation: "`useId` is a React Hook for generating unique, stable accessibility identifiers across client and server renders. Generating IDs with `Math.random()` or manual counters causes hydration mismatches because the server and browser produce differing strings. `useId` guarantees deterministic, collision-free IDs across both environments."
  },
  {
    id: 41,
    question: "Why should you NOT update state directly inside the body of a functional component?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "The component body is the render phase. Calling `setState` directly inside the body schedules another render immediately before the current one finishes. This triggers an infinite render loop, causing React to throw the 'Too many re-renders. React limits the number of renders to prevent an infinite loop' error. State updates must live inside event handlers or `useEffect`."
  },
  {
    id: 42,
    question: "How do you optimize a large list with thousands of items in React?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Rendering thousands of DOM nodes causes memory bloat and slow scrolling. The primary technique is **Windowing/Virtualization** (using libraries like `react-window` or `@tanstack/react-virtual`), which calculates visible viewport dimensions and renders only the 10-20 items currently on screen, swapping DOM nodes dynamically as the user scrolls."
  },
  {
    id: 43,
    question: "What is the difference between mounting, updating, and unmounting in React lifecycle?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "1) **Mounting**: The component is initialized, rendered for the first time, and inserted into the real DOM (`useEffect(..., [])`). 2) **Updating**: The component re-renders due to changes in props, state, or context (`useEffect(..., [deps])`). 3) **Unmounting**: The component is removed from the DOM and its effects/listeners are cleaned up (`return () => cleanup`)."
  },
  {
    id: 44,
    question: "What is `useDebugValue` and when should library authors use it?",
    category: "Hooks",
    difficulty: "Medium",
    explanation: "`useDebugValue` is a Hook used inside custom Hooks to display custom formatted labels and diagnostic values in React DevTools. It helps library authors and developers inspect internal custom Hook state without littering production consoles. It accepts an optional formatting function as a second argument for deferred formatting."
  },
  {
    id: 45,
    question: "How do you properly profile and identify slow re-renders in a React application?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Use the **React Developer Tools Profiler** tab to record user interactions. The flamegraph and ranked charts show exactly which components rendered, how long they took, and why they rendered (e.g., 'props changed: onClick', 'hook 2 changed'). You can also wrap suspected component trees in `<React.Profiler id='...' onRender={callback}>` to measure render durations in code."
  },
  {
    id: 46,
    question: "What is the difference between shallow rendering and full DOM rendering in React unit testing?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "Shallow rendering renders only the parent component one level deep, asserting on its output without instantiating child components (isolating unit tests). Full DOM rendering (standard in React Testing Library with jsdom) renders the complete component hierarchy and tests real user interactions and accessible DOM output, matching real browser behavior."
  },
  {
    id: 47,
    question: "How do you share state between two sibling components in React?",
    category: "State",
    difficulty: "Easy",
    explanation: "By **Lifting State Up**: Move the shared state to their closest common parent component. The parent manages the state via `useState` and passes the value down to one sibling as a prop and the state updater function (or callback) to the other sibling. For distant siblings across separate trees, use Context API or a store."
  },
  {
    id: 48,
    question: "What is the purpose of `displayName` in React components?",
    category: "Architecture",
    difficulty: "Easy",
    explanation: "`displayName` is a static property on React component functions or classes used to set the readable label shown in React DevTools and error stack traces. It is especially useful when creating Higher-Order Components (HOCs) or components wrapped with `forwardRef` and `React.memo` that would otherwise appear as `Anonymous` or `_c`."
  },
  {
    id: 49,
    question: "What is the difference between default props and ES6 default parameter values in functional components?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "In modern functional React components, standard ES6 destructuring default values (`function Card({ title = 'Default' })`) are the official recommendation. `Component.defaultProps` was originally designed for class components and is deprecated for functional components in modern React because standard JavaScript defaults are cleaner and typed naturally."
  },
  {
    id: 50,
    question: "What is the difference between optimistic UI updates and pessimistic UI updates?",
    category: "Architecture",
    difficulty: "Medium",
    explanation: "In pessimistic updates, the UI waits for the server API response before updating the screen (showing loading spinners). In optimistic updates (supported in modern React via `useOptimistic`), the UI updates immediately assuming the server request will succeed, providing instant feedback. If the network request fails, the UI automatically rolls back to the previous state and shows an error alert."
  }
];
