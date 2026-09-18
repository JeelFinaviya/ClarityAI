/**
 * 50 High-Value Java Interview Questions
 */

export const JAVA_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between JDK, JRE, and JVM?",
    category: "JVM & Architecture",
    difficulty: "Easy",
    explanation: "**JVM (Java Virtual Machine)** is the abstract runtime engine that executes compiled Java bytecode (`.class` files). **JRE (Java Runtime Environment)** bundles the JVM along with core Java class libraries required to run Java applications. **JDK (Java Development Kit)** is the complete SDK containing the JRE, compiler (`javac`), debugger, and development tools."
  },
  {
    id: 2,
    question: "How does Garbage Collection work in the JVM (Generational Hypothesis)?",
    category: "Memory & GC",
    difficulty: "Hard",
    explanation: "The JVM heap is divided into: **Young Generation** (Eden + Survivor Spaces S0/S1) and **Old (Tenured) Generation**. Most objects die young (Minor GC in Eden). Surviving objects are promoted to Old Gen after reaching an age threshold. Old Gen is collected via Major/Full GC algorithms (G1GC, ZGC, Parallel GC)."
  },
  {
    id: 3,
    question: "What is the difference between `==` and `.equals()` in Java?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`==` compares **reference identity** (whether two object references point to the exact same memory address). `.equals()` is a method meant to be overridden to compare **content/logical equality** (e.g., verifying if two `String` objects hold the same characters)."
  },
  {
    id: 4,
    question: "Why must you override `hashCode()` whenever you override `equals()`?",
    category: "Collections Framework",
    difficulty: "Medium",
    explanation: "The Java Hash Contract mandates: if two objects are equal according to `equals()`, they **must have the same `hashCode()`**. If `hashCode()` is not overridden, hash-based collections (`HashMap`, `HashSet`) will place equal objects into different buckets, causing lookup failures and duplicate keys."
  },
  {
    id: 5,
    question: "How does `HashMap` work internally in Java 8+?",
    category: "Collections Framework",
    difficulty: "Hard",
    explanation: "`HashMap` uses an array of Node buckets. A key's `hashCode()` is hashed and mapped to an index. If a collision occurs, entries form a linked list. In Java 8+, if a bucket's linked list exceeds **8 elements** (and table capacity >= 64), it converts into a **Red-Black Tree** (TREEIFY_THRESHOLD), improving search time from O(N) to **O(log N)**."
  },
  {
    id: 6,
    question: "What is the difference between `HashMap`, `HashTable`, and `ConcurrentHashMap`?",
    category: "Collections Framework",
    difficulty: "Medium",
    explanation: "`HashMap` is non-synchronized and allows `null` keys/values (fast, not thread-safe). `HashTable` synchronizes entire methods (slow, legacy). `ConcurrentHashMap` uses fine-grained locking (CAS operations and synchronized tree/node buckets in Java 8+), allowing concurrent reads and thread-safe writes without global table locks."
  },
  {
    id: 7,
    question: "What is String Immutability and what is the String Constant Pool in Java?",
    category: "Memory & GC",
    difficulty: "Medium",
    explanation: "`String` objects in Java are immutable (backed by a `final` byte/char array). The **String Constant Pool** is a special memory region in the Heap. When string literals are declared (`String s = 'hello'`), JVM reuses identical instances from the pool to save memory and ensure thread safety."
  },
  {
    id: 8,
    question: "What is the difference between `String`, `StringBuilder`, and `StringBuffer`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`String` is immutable (concatenation creates new objects). `StringBuilder` is mutable and **non-synchronized** (fast, single-threaded). `StringBuffer` is mutable and **synchronized** (thread-safe, but has synchronization overhead)."
  },
  {
    id: 9,
    question: "What are the 4 Access Modifiers in Java and what are their visibility scopes?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "1) `private`: accessible only within the same class. 2) Default (no keyword / package-private): accessible within the same package. 3) `protected`: accessible within the same package and subclasses in other packages. 4) `public`: accessible everywhere."
  },
  {
    id: 10,
    question: "What is the difference between Method Overloading and Method Overriding?",
    category: "OOP",
    difficulty: "Easy",
    explanation: "**Overloading** (Compile-time Polymorphism) occurs in the same class with identical method names but different parameter lists. **Overriding** (Runtime Polymorphism) occurs in a child subclass that redefines a base class method with the exact same signature and return type."
  },
  {
    id: 11,
    question: "What is the difference between `final`, `finally`, and `finalize` in Java?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`final` is a modifier: makes variables constant, methods un-overridable, and classes un-inheritable. `finally` is a block after `try-catch` that always executes for cleanup. `finalize()` is a deprecated method on `Object` called by GC before reclaiming an object."
  },
  {
    id: 12,
    question: "What is the difference between Checked and Unchecked Exceptions?",
    category: "Exception Handling",
    difficulty: "Medium",
    explanation: "**Checked Exceptions** (subclasses of `Exception` excluding `RuntimeException`, e.g., `IOException`, `SQLException`) must be declared with `throws` or handled in a `try-catch` block at compile time. **Unchecked Exceptions** (subclasses of `RuntimeException` and `Error`, e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`) occur at runtime and do not require mandatory handling."
  },
  {
    id: 13,
    question: "What is the Java Memory Model (Stack vs Heap)?",
    category: "Memory & GC",
    difficulty: "Medium",
    explanation: "**Stack Memory** stores primitive local variables and references to heap objects within the current thread's method call frames (thread-private, fast LIFO, auto-deallocated on return). **Heap Memory** stores all object instances and arrays, shared across all threads and managed by the Garbage Collector."
  },
  {
    id: 14,
    question: "What is the `volatile` keyword and how does it prevent instruction reordering and caching issues?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`volatile` ensures **visibility** and prevents instruction reordering across threads. Writes to a volatile variable are flushed immediately to main memory (not cached in CPU registers), and reads are always loaded from main memory, establishing a *happens-before* relationship."
  },
  {
    id: 15,
    question: "What is the difference between `synchronized` method and `synchronized` block?",
    category: "Concurrency & Multithreading",
    difficulty: "Medium",
    explanation: "A `synchronized` method locks the entire method on `this` (or `ClassName.class` for static methods). A `synchronized(lockObj)` block locks only a specific critical section of code on a designated object monitor, minimizing lock contention and improving throughput."
  },
  {
    id: 16,
    question: "What is the difference between `Comparable` and `Comparator` interfaces?",
    category: "Collections Framework",
    difficulty: "Easy",
    explanation: "`Comparable` defines natural sorting order inside the class itself via `compareTo(Object o)`. `Comparator` defines external custom sorting logic via `compare(Object o1, Object o2)`, allowing multiple distinct sorting strategies for the same class."
  },
  {
    id: 17,
    question: "What is Java 8 Stream API and what are intermediate vs terminal operations?",
    category: "Java 8+ Features",
    difficulty: "Medium",
    explanation: "Streams process collections declaratively. **Intermediate operations** (`filter`, `map`, `sorted`) are lazy, return a new Stream, and do not execute until a **terminal operation** (`collect`, `forEach`, `reduce`, `count`) is invoked to trigger pipeline execution and produce a result."
  },
  {
    id: 18,
    question: "What is an `Optional<T>` in Java 8 and how does it prevent `NullPointerException`?",
    category: "Java 8+ Features",
    difficulty: "Easy",
    explanation: "`Optional<T>` is a container object that may or may not contain a non-null value. It replaces risky `null` returns with explicit functional API methods (`.orElse()`, `.map()`, `.ifPresent()`, `.orElseThrow()`), forcing callers to handle the empty case explicitly."
  },
  {
    id: 19,
    question: "What is an Abstract Class vs an Interface in Java 8+?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "An abstract class can have instance state (fields), constructors, and any method access modifiers. An interface defines a behavioral contract. Since Java 8/9, interfaces can include `default` methods (with implementations), `static` methods, and `private` helper methods, but cannot maintain mutable instance state."
  },
  {
    id: 20,
    question: "What is the difference between `ArrayList` and `LinkedList`?",
    category: "Collections Framework",
    difficulty: "Easy",
    explanation: "`ArrayList` is backed by a dynamic resizable array (O(1) random index access, O(N) insertions in the middle). `LinkedList` is backed by a doubly-linked list (O(1) insertion/deletion at ends, O(N) element access due to pointer traversal, higher memory overhead per node)."
  },
  {
    id: 21,
    question: "What is ThreadPoolExecutor and what are the standard Java Thread Pools (`Executors`)?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`ThreadPoolExecutor` manages a queue of tasks and a pool of worker threads. Factory types: `newFixedThreadPool(n)` (fixed thread count), `newCachedThreadPool()` (creates threads as needed, reuses idle threads), `newSingleThreadExecutor()`, and `newScheduledThreadPool()`."
  },
  {
    id: 22,
    question: "What is the difference between `Callable` and `Runnable`?",
    category: "Concurrency & Multithreading",
    difficulty: "Easy",
    explanation: "`Runnable` defines `run()`: takes no arguments, returns `void`, and cannot throw checked exceptions. `Callable<V>` defines `call()`: returns a generic value `V` and can throw checked exceptions, consumed via `Future<V>`."
  },
  {
    id: 23,
    question: "What is a `CompletableFuture` in Java 8?",
    category: "Java 8+ Features",
    difficulty: "Hard",
    explanation: "`CompletableFuture<T>` implements `Future` and `CompletionStage`, enabling non-blocking asynchronous pipeline chaining (`thenApply`, `thenCompose`, `thenCombine`, `exceptionally`) without blocking threads with `.get()`."
  },
  {
    id: 24,
    question: "What are Java Functional Interfaces and the `@FunctionalInterface` annotation?",
    category: "Java 8+ Features",
    difficulty: "Easy",
    explanation: "A functional interface is an interface with **exactly one abstract method (SAM)**, used as the target for Lambda expressions and Method References (`::`). Common examples in `java.util.function`: `Predicate<T>`, `Function<T, R>`, `Consumer<T>`, `Supplier<T>`."
  },
  {
    id: 25,
    question: "What is the Double-Checked Locking pattern for Singletons in Java?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "It checks `instance == null` twice: first without locking, and second inside a `synchronized(Singleton.class)` block. The instance variable **must be declared `volatile`** to prevent the compiler from reordering object construction before memory pointer assignment."
  },
  {
    id: 26,
    question: "What is Reflection in Java and what are its performance and security costs?",
    category: "Advanced",
    difficulty: "Medium",
    explanation: "Java Reflection (`java.lang.reflect`) inspects and modifies classes, fields, methods, and constructors at runtime. Costs: it bypasses compile-time type safety, breaks encapsulation (`setAccessible(true)`), and is significantly slower than direct method invocation due to JVM JIT optimization misses."
  },
  {
    id: 27,
    question: "What are Java Records introduced in Java 14/16?",
    category: "Modern Java",
    difficulty: "Easy",
    explanation: "`record User(String name, int age) {}` is a concise immutable data carrier class. The compiler automatically generates private final fields, a canonical constructor, getters (`name()`), `equals()`, `hashCode()`, and `toString()`."
  },
  {
    id: 28,
    question: "What are Sealed Classes (`sealed` / `permits`) in Java 17?",
    category: "Modern Java",
    difficulty: "Medium",
    explanation: "Sealed classes (`public sealed class Shape permits Circle, Square {}`) restrict which specific subclasses can extend or implement them, providing compile-time algebraic data types and exhaustive pattern matching in switch statements."
  },
  {
    id: 29,
    question: "What is Virtual Threads (Project Loom) in Java 21?",
    category: "Modern Java",
    difficulty: "Hard",
    explanation: "Virtual Threads are lightweight, user-mode threads managed by the JVM rather than the OS kernel. Millions of virtual threads can run on a small pool of carrier OS threads; when a virtual thread blocks on I/O, the JVM unmounts it, enabling high-throughput synchronous programming without reactive complexity."
  },
  {
    id: 30,
    question: "What is the difference between `fail-fast` and `fail-safe` Iterators in Java Collections?",
    category: "Collections Framework",
    difficulty: "Medium",
    explanation: "**Fail-fast** iterators (`ArrayList`, `HashMap`) throw `ConcurrentModificationException` immediately if the collection is structurally modified during iteration (detected via `modCount`). **Fail-safe** iterators (`CopyOnWriteArrayList`, `ConcurrentHashMap`) operate on a clone or snapshot of the collection, allowing concurrent modifications."
  },
  {
    id: 31,
    question: "What is `try-with-resources` statement and the `AutoCloseable` interface?",
    category: "Exception Handling",
    difficulty: "Easy",
    explanation: "`try (BufferedReader br = new BufferedReader(...)) { ... }` automatically closes resources at the end of the block in reverse order of declaration, requiring the resource to implement `java.lang.AutoCloseable`."
  },
  {
    id: 32,
    question: "What is the Diamond Problem in multiple inheritance and how does Java handle it with interfaces?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "Java does not support multiple class inheritance. With Java 8 default interface methods, if class `C` implements interfaces `A` and `B` which both define the same default method, compiler forces class `C` to explicitly override the method: `A.super.methodName()`."
  },
  {
    id: 33,
    question: "What is the difference between `ReentrantLock` and `synchronized` keyword?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`ReentrantLock` from `java.util.concurrent.locks` provides advanced locking: `tryLock()` (timed/non-blocking lock acquisition), fairness policies (`new ReentrantLock(true)`), multiple `Condition` variables (`await/signal`), and interruptible lock waits."
  },
  {
    id: 34,
    question: "What is the `AtomicInteger` class and Compare-And-Swap (CAS)?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`AtomicInteger` provides lock-free thread-safe operations (`incrementAndGet()`). It relies on hardware-level **Compare-And-Swap (CAS)** atomic CPU instructions (via `VarHandle` / `Unsafe`), updating values without thread-blocking mutex overhead."
  },
  {
    id: 35,
    question: "What is the difference between `poll()` and `remove()` in Java `Queue`?",
    category: "Collections Framework",
    difficulty: "Easy",
    explanation: "Both retrieve and remove the head element of the queue. If the queue is empty, `poll()` returns `null`, whereas `remove()` throws a `NoSuchElementException`."
  },
  {
    id: 36,
    question: "What is Java ClassLoader hierarchy?",
    category: "JVM & Architecture",
    difficulty: "Hard",
    explanation: "ClassLoaders load `.class` bytecode using Delegation Principle: 1) **Bootstrap ClassLoader** (core Java runtime classes in `java.base`), 2) **Platform (Extension) ClassLoader**, 3) **Application (System) ClassLoader** (classpath). A child loader always delegates to its parent before attempting to load a class itself."
  },
  {
    id: 37,
    question: "What is `transient` keyword in Java Serialization?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Variables marked `transient` are skipped during object serialization (`Serializable`), preventing sensitive data (passwords, encryption keys) or non-serializable references from being written to byte streams."
  },
  {
    id: 38,
    question: "What is the difference between `CountDownLatch` and `CyclicBarrier`?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`CountDownLatch` is a one-time countdown latch (threads wait until count reaches 0; cannot be reset). `CyclicBarrier` allows a set of threads to all wait for each other to reach a common barrier point, and can be **reused/reset** repeatedly in cyclic phases."
  },
  {
    id: 39,
    question: "What is the `ThreadLocal` class and what are its memory leak risks?",
    category: "Concurrency & Multithreading",
    difficulty: "Hard",
    explanation: "`ThreadLocal` provides thread-scoped variables where each thread has its own independently initialized copy. Memory leak risk: in thread pools (Tomcat/Netty), threads live indefinitely; failing to call `threadLocal.remove()` causes retained objects to leak via `Thread.threadLocals`."
  },
  {
    id: 40,
    question: "What is the Java Module System (JPMS / Project Jigsaw) introduced in Java 9?",
    category: "Modern Java",
    difficulty: "Medium",
    explanation: "Configured via `module-info.java`, JPMS provides strong encapsulation across packages using `module com.example { requires java.sql; exports com.example.api; }`, preventing access to internal private APIs even via reflection."
  },
  {
    id: 41,
    question: "What is Pattern Matching for `switch` and `instanceof` in Java 17-21?",
    category: "Modern Java",
    difficulty: "Medium",
    explanation: "`if (obj instanceof String s)` casts automatically without manual casting. In `switch(shape)`: `case Circle c -> c.radius(); case Square s -> s.side(); case null -> ...` provides type-safe matching with guards (`when`)."
  },
  {
    id: 42,
    question: "What is the difference between JIT Compiler (Just-In-Time) and AOT (Ahead-Of-Time) compilation (GraalVM)?",
    category: "JVM & Architecture",
    difficulty: "Hard",
    explanation: "JIT (HotSpot C1/C2) compiles bytecode to machine code at runtime based on profiling metrics. AOT (GraalVM Native Image) compiles Java code directly into a standalone platform executable at build time, achieving instant startup (<10ms) and low memory usage for microservices."
  },
  {
    id: 43,
    question: "What is the difference between `shallowCopy` and `deepCopy` in Java `clone()`?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "Default `Object.clone()` creates a shallow copy, duplicating primitive fields but copying object memory references. Deep copying requires manually implementing custom clone logic or serialization to instantiate distinct copies of all referenced objects."
  },
  {
    id: 44,
    question: "What is `CopyOnWriteArrayList` and when is it efficient?",
    category: "Collections Framework",
    difficulty: "Medium",
    explanation: "A thread-safe variant of `ArrayList` where all mutating operations (`add`, `set`, `remove`) make a fresh copy of the underlying array. It is extremely fast for **read-heavy, write-rare** workloads (like event listeners) with zero locking on reads."
  },
  {
    id: 45,
    question: "What is Deadlock and how can it be detected and prevented in Java?",
    category: "Concurrency & Multithreading",
    difficulty: "Medium",
    explanation: "Deadlock occurs when 2+ threads are blocked forever, each holding a lock the other needs (circular wait). Detected via `jstack` thread dumps. Prevented by: 1) Acquiring locks in a strict global hierarchy order, 2) Using `lock.tryLock(timeout)`, 3) Minimizing nested synchronized locks."
  },
  {
    id: 46,
    question: "What is the difference between `Collectors.toList()` and `Stream.toList()` in Java 16+?",
    category: "Java 8+ Features",
    difficulty: "Easy",
    explanation: "`stream.collect(Collectors.toList())` returns a mutable `ArrayList`. Java 16's `stream.toList()` directly returns an **unmodifiable list** with lower allocation overhead."
  },
  {
    id: 47,
    question: "What is the `Enum` class in Java and can Enums implement interfaces or have constructors?",
    category: "OOP",
    difficulty: "Easy",
    explanation: "Java enums are full classes extending `java.lang.Enum`. They can have private constructors, instance fields, methods, abstract methods, and can implement interfaces, but cannot inherit from other classes."
  },
  {
    id: 48,
    question: "What is `Unsafe` class in Java?",
    category: "JVM & Architecture",
    difficulty: "Hard",
    explanation: "`sun.misc.Unsafe` provides low-level, unsafe operations bypassing JVM safety checks (direct off-heap memory allocation, raw pointer arithmetic, atomic CAS). Modern Java replaces it with safe standard APIs like `VarHandle` and the Foreign Function & Memory API (FFM)."
  },
  {
    id: 49,
    question: "What is the difference between `BigInteger` and `BigDecimal`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`BigInteger` represents immutable arbitrary-precision integers. `BigDecimal` represents immutable arbitrary-precision signed decimal numbers, essential for financial and monetary calculations where float/double rounding errors are unacceptable."
  },
  {
    id: 50,
    question: "What is the G1 Garbage Collector (Garbage-First) in JVM?",
    category: "Memory & GC",
    difficulty: "Hard",
    explanation: "G1 is the default collector for modern JVMs. It divides the heap into equal-sized virtual memory regions (1MB–32MB) and performs concurrent global marking to identify regions with the most garbage ('Garbage-First'), reclaiming them within a user-specified pause time target (`-XX:MaxGCPauseMillis`)."
  }
];
