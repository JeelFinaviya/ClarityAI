/**
 * 50 High-Value Python Interview Questions
 */

export const PYTHON_QUESTIONS = [
  {
    id: 1,
    question: "What is the Global Interpreter Lock (GIL) in CPython and how does it affect multithreading?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "The GIL is a mutex that prevents multiple native OS threads from executing Python bytecodes concurrently within a single process. It protects CPython memory management (reference counting) from race conditions. Consequently, CPU-bound tasks do not benefit from Python multithreading; developers use `multiprocessing` or native C extensions instead. I/O-bound tasks still benefit from threading because the GIL is released during I/O."
  },
  {
    id: 2,
    question: "What is the difference between mutable and immutable types in Python?",
    category: "Data Structures & Memory",
    difficulty: "Easy",
    explanation: "**Mutable** objects (lists, dicts, sets, bytearrays) can have their in-memory contents modified after creation without changing their object `id()`. **Immutable** objects (integers, floats, strings, tuples, frozensets, booleans) cannot be altered; modifying them creates a new object in memory."
  },
  {
    id: 3,
    question: "How does Python handle memory management and Garbage Collection?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "Python primarily uses **Reference Counting**: each object tracks how many references point to it; when count hits 0, its memory is deallocated immediately. To handle circular reference cycles (e.g., A references B and B references A), Python includes a generational cyclic garbage collector (`gc` module) that inspects 3 generations (Gen 0, 1, 2) based on collection thresholds."
  },
  {
    id: 4,
    question: "What are Python Generators and how does the `yield` keyword work?",
    category: "Generators & Iterators",
    difficulty: "Medium",
    explanation: "Generators are functions that return an iterator yielding values on-demand using `yield` instead of `return`. When `yield` is encountered, the function's execution state (local variables, instruction pointer) is suspended and resumed on the next `next()` call, maintaining memory efficiency for massive datasets."
  },
  {
    id: 5,
    question: "What are Decorators in Python and how do you write a decorator with arguments?",
    category: "Functions & Decorators",
    difficulty: "Medium",
    explanation: "A decorator is a callable that takes a function as input, extends its behavior, and returns a modified function (`@decorator` is syntactic sugar for `fn = decorator(fn)`). Decorators with arguments require a 3-tier nested closure: the outermost function accepts arguments, the middle accepts the target function, and the innermost (`functools.wraps`) executes the logic."
  },
  {
    id: 6,
    question: "Why should you use `@functools.wraps` when creating decorators?",
    category: "Functions & Decorators",
    difficulty: "Medium",
    explanation: "Without `@functools.wraps(fn)`, the decorated function loses its original metadata (its `__name__`, `__doc__`, `__module__`, and `__annotations__` are overwritten with the wrapper's name), breaking introspection, debugging tools, and documentation generators."
  },
  {
    id: 7,
    question: "What is the difference between `is` and `==` in Python?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`==` tests for **value equality** (calling the object's `__eq__` method to check if contents match). `is` tests for **identity equality** (checking if both variables point to the exact same memory address using `id(a) == id(b)`)."
  },
  {
    id: 8,
    question: "Why is using a mutable default argument (like `def append_to(item, target=[])`) a dangerous anti-pattern?",
    category: "Functions & Decorators",
    difficulty: "Medium",
    explanation: "Default parameter values are evaluated and instantiated **once at function definition time**, not each time the function is called. Mutating `target.append(item)` modifies the single shared list across all subsequent invocations. The correct idiom is `target=None`, initializing `target = []` inside the function body."
  },
  {
    id: 9,
    question: "What are `*args` and `**kwargs` in Python function definitions?",
    category: "Functions & Decorators",
    difficulty: "Easy",
    explanation: "`*args` collects arbitrary positional arguments into a `tuple`. `**kwargs` collects arbitrary keyword arguments into a `dict`. They allow functions to accept flexible arguments and forward parameters to underlying functions."
  },
  {
    id: 10,
    question: "What is the difference between `list.sort()` and the built-in `sorted()` function?",
    category: "Data Structures & Memory",
    difficulty: "Easy",
    explanation: "`list.sort()` modifies the original list in-place and returns `None` (O(1) auxiliary space). `sorted(iterable)` accepts any iterable (list, tuple, dict, set) and returns a brand new sorted list, leaving the original data unchanged."
  },
  {
    id: 11,
    question: "How does Python's `asyncio` module and event loop work?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "`asyncio` provides single-threaded cooperative multitasking using coroutines (`async def`), tasks, and an event loop. Coroutines yield control to the loop when hitting `await` on non-blocking I/O operations (sockets, DB connections), allowing thousands of concurrent connections on a single OS thread."
  },
  {
    id: 12,
    question: "What are Magic Methods (Dunder Methods) in Python?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "Dunder methods (starting and ending with double underscores, e.g., `__init__`, `__str__`, `__repr__`, `__len__`, `__getitem__`) allow custom classes to hook into Python's core language syntax, operator overloading (`+` via `__add__`), indexing, and context managers."
  },
  {
    id: 13,
    question: "What is the difference between `__str__` and `__repr__`?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "`__str__` is intended for end-users, returning an informal, readable string representation. `__repr__` is intended for developers and debugging, returning an unambiguous string representation that ideally looks like valid Python code to recreate the object (`eval(repr(obj)) == obj`)."
  },
  {
    id: 14,
    question: "What is a Context Manager and how does the `with` statement work?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "Context managers ensure deterministic resource allocation and cleanup (closing files, DB connections, releasing locks). They implement `__enter__()` (sets up resource and returns target) and `__exit__(exc_type, exc_val, exc_tb)` (guaranteed to execute even if exceptions occur), or use `@contextlib.contextmanager`."
  },
  {
    id: 15,
    question: "What are Python Dataclasses (`@dataclass`) and how do they differ from NamedTuples and standard classes?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "`@dataclass` auto-generates boilerplate dunder methods (`__init__`, `__repr__`, `__eq__`) based on type annotations. Unlike `namedtuple` (which is a tuple subclass, immutable, and indexable), dataclasses are true classes supporting inheritance, mutability (or `frozen=True`), and default factories."
  },
  {
    id: 16,
    question: "What is the Method Resolution Order (MRO) and the C3 Linearization algorithm in Python multiple inheritance?",
    category: "OOP",
    difficulty: "Hard",
    explanation: "MRO determines the order in which base classes are searched when resolving a method or attribute in multiple inheritance. Python uses the **C3 Linearization** algorithm to construct MRO, ensuring local precedence ordering and monotonicity. Inspected via `ClassName.mro()` or `ClassName.__mro__`."
  },
  {
    id: 17,
    question: "What is the difference between `@staticmethod` and `@classmethod`?",
    category: "OOP",
    difficulty: "Easy",
    explanation: "`@classmethod` receives the class itself as its first argument (`cls`), allowing it to access and modify class state or act as alternative factory constructors. `@staticmethod` receives neither `self` nor `cls`, behaving like a plain utility function scoped inside the class namespace."
  },
  {
    id: 18,
    question: "What is `__slots__` and how does it optimize class memory usage?",
    category: "OOP",
    difficulty: "Hard",
    explanation: "By default, Python stores instance attributes in a dynamic dictionary `self.__dict__`, which consumes significant memory overhead. Defining `__slots__ = ('name', 'age')` allocates a fixed-size compact array for attributes, preventing arbitrary dynamic attributes and drastically reducing RAM usage for millions of instances."
  },
  {
    id: 19,
    question: "What is the difference between `deepcopy` and `copy` in Python's `copy` module?",
    category: "Data Structures & Memory",
    difficulty: "Easy",
    explanation: "`copy.copy(x)` creates a shallow copy: it constructs a new compound object and inserts references to the original child objects. `copy.deepcopy(x)` constructs a new compound object and recursively duplicates all nested child objects and lists inside it."
  },
  {
    id: 20,
    question: "What are List, Dictionary, and Set Comprehensions?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Comprehensions provide concise syntax for creating collections from iterables: List `[x**2 for x in nums if x > 0]`, Dict `{k: v for k, v in pairs}`, Set `{x for x in items}`. They execute faster than equivalent `for` loops because loop mechanics are optimized at C-level in bytecode."
  },
  {
    id: 21,
    question: "What is the Walrus Operator (`:=`) introduced in Python 3.8?",
    category: "Modern Python",
    difficulty: "Medium",
    explanation: "The assignment expression operator `:=` assigns values to variables as part of a larger expression (e.g., `if (n := len(data)) > 10: print(f'Length is {n}')` or `while (chunk := file.read(1024)):`), eliminating redundant function calls."
  },
  {
    id: 22,
    question: "What are Metaclasses in Python and what is `type`?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "A metaclass is a 'class of a class' that defines how classes are constructed. In Python, `type` is the default metaclass for all classes. Custom metaclasses inherit from `type` and override `__new__` or `__init__` to intercept, validate, or auto-modify class definitions (used heavily in Django ORM and Pydantic)."
  },
  {
    id: 23,
    question: "What is the difference between `Iterator` and `Iterable` in Python?",
    category: "Generators & Iterators",
    difficulty: "Medium",
    explanation: "An **Iterable** is an object with an `__iter__()` method that returns an iterator (e.g., lists, strings). An **Iterator** is an object with a `__next__()` method that returns the next item and raises `StopIteration` when finished, as well as an `__iter__()` returning itself."
  },
  {
    id: 24,
    question: "How does Python handle integer caching (Small Integer Caching / Interning)?",
    category: "CPython & Concurrency",
    difficulty: "Medium",
    explanation: "CPython pre-allocates and caches an array of integer objects for integers in the range **-5 to 256** at startup. Any integer assignment in this range reuses the same memory address (`a = 250; b = 250; a is b` is `True`). Numbers outside this range create distinct objects."
  },
  {
    id: 25,
    question: "What is String Interning in Python?",
    category: "CPython & Concurrency",
    difficulty: "Medium",
    explanation: "String interning ensures that only one copy of distinct immutable string objects is stored in memory. CPython automatically interns strings that look like valid Python identifiers, and developers can manually intern strings using `sys.intern()`, allowing fast O(1) pointer comparison instead of O(N) character comparison."
  },
  {
    id: 26,
    question: "What is the `collections` module and what data structures does it provide?",
    category: "Data Structures & Memory",
    difficulty: "Easy",
    explanation: "The `collections` module provides specialized containers: `defaultdict` (auto-initializes missing keys), `Counter` (counts hashable elements), `deque` (O(1) double-ended queue), `OrderedDict` (maintains insertion order), and `namedtuple`."
  },
  {
    id: 27,
    question: "What is the time complexity of common Python `list` vs `dict` operations?",
    category: "Data Structures & Memory",
    difficulty: "Medium",
    explanation: "List: `append()` is O(1) amortized, `pop()` is O(1), `insert(0)` and `pop(0)` are O(N), `in` lookup is O(N). Dict: Key lookup, insertion, and deletion are **O(1) average** based on hash table lookups (O(N) worst case during hash collisions)."
  },
  {
    id: 28,
    question: "How does Python handle Hash Collisions in Dictionaries?",
    category: "Data Structures & Memory",
    difficulty: "Hard",
    explanation: "Python uses **Open Addressing with Perturbation Probe Sequence**: when a hash collision occurs at an index, rather than chaining linked lists, it calculates the next slot index using a pseudorandom perturbation formula `next_idx = (5 * idx + 1 + perturb) & mask`, ensuring full table exploration."
  },
  {
    id: 29,
    question: "What is the `itertools` module and what are its most useful functions?",
    category: "Generators & Iterators",
    difficulty: "Medium",
    explanation: "`itertools` provides memory-efficient iterator building blocks: `chain()` (concatenates iterables), `cycle()` (infinite repetition), `islice()` (slice iterators), `permutations()` / `combinations()` (combinatorics), `groupby()`, and `product()` (Cartesian product)."
  },
  {
    id: 30,
    question: "What is Structural Pattern Matching (`match / case`) introduced in Python 3.10?",
    category: "Modern Python",
    difficulty: "Medium",
    explanation: "`match/case` provides pattern matching beyond simple C-style switches. It matches literal values, sequences, mappings, object attributes (`case Point(x=0, y=y):`), and supports capture variables, wildcards (`_`), and conditional guards (`if`)."
  },
  {
    id: 31,
    question: "What is the difference between `multiprocessing.Process` and `concurrent.futures.ProcessPoolExecutor`?",
    category: "CPython & Concurrency",
    difficulty: "Medium",
    explanation: "`Process` provides low-level control for managing individual processes. `ProcessPoolExecutor` is a high-level API that manages a pool of worker processes, providing simple `.submit()` and `.map()` interfaces that return `Future` objects for concurrent task scheduling."
  },
  {
    id: 32,
    question: "What is `__new__` vs `__init__` in Python classes?",
    category: "OOP",
    difficulty: "Hard",
    explanation: "`__new__(cls, ...)` is the static constructor method responsible for *creating and returning* a new instance in memory. `__init__(self, ...)` is the initializer method responsible for *populating instance attributes* on the newly created instance. `__new__` is used when subclassing immutable types (like `int`, `str`) or implementing Singletons."
  },
  {
    id: 33,
    question: "How do you implement the Singleton Design Pattern in Python?",
    category: "OOP",
    difficulty: "Medium",
    explanation: "1) Overriding `__new__` on the class with a stored `_instance` class attribute. 2) Using a class decorator. 3) Using a custom Metaclass. 4) The pythonic way: creating a module, as Python modules are cached on first import (`sys.modules`) and act as natural singletons."
  },
  {
    id: 34,
    question: "What are Python Type Hints and how does `mypy` perform static type checking?",
    category: "Modern Python",
    difficulty: "Easy",
    explanation: "Type hints (`def greet(name: str) -> str:`) annotate variables and function signatures with types (using the `typing` module: `Union`, `Optional`, `Callable`, `Generic`). They have zero runtime performance cost and are validated at build/CI time using static type checkers like `mypy` or `pyright`."
  },
  {
    id: 35,
    question: "What is the `property` decorator (`@property`)?",
    category: "OOP",
    difficulty: "Easy",
    explanation: "`@property` defines getter, setter (`@prop.setter`), and deleter methods that can be accessed like standard instance attributes (`obj.area` instead of `obj.area()`), enabling encapsulation and validation without breaking existing public attribute APIs."
  },
  {
    id: 36,
    question: "What is the `functools.lru_cache` decorator?",
    category: "Functions & Decorators",
    difficulty: "Easy",
    explanation: "`@functools.lru_cache(maxsize=128)` wraps a function with a Least Recently Used (LRU) memoization cache. It caches return values based on positional and keyword arguments, drastically accelerating recursive or expensive deterministic functions."
  },
  {
    id: 37,
    question: "What is the difference between `raise` and `raise Exception from e` (Exception Chaining)?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "`raise NewException from orig_exc` explicitly chains exceptions, setting `__cause__` and displaying 'The above exception was the direct cause of the following exception' in tracebacks. `raise ... from None` suppresses the context, hiding internal underlying exceptions."
  },
  {
    id: 38,
    question: "What is the difference between `os.fork()` and `multiprocessing.fork`?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "`os.fork()` is a raw Unix system call that duplicates the current process (POSIX only). `multiprocessing` provides a cross-platform wrapper supporting multiple start methods (`fork`, `spawn`, `forkserver`) and sets up IPC pipes, queues, and locks safely across Linux, macOS, and Windows."
  },
  {
    id: 39,
    question: "What is `sys.getrefcount(obj)`?",
    category: "CPython & Concurrency",
    difficulty: "Medium",
    explanation: "It returns the current reference count of an object. Note that the count returned is always **1 higher** than expected because passing the object as an argument to `sys.getrefcount()` temporarily creates an additional reference."
  },
  {
    id: 40,
    question: "What is the difference between `@classmethod` and class attribute assignment?",
    category: "OOP",
    difficulty: "Easy",
    explanation: "Class attributes (`cls.count = 0`) store shared state across all instances. `@classmethod` methods are functions bound to the class namespace that can inspect or alter class state and instantiate new subclass instances polymorphically."
  },
  {
    id: 41,
    question: "What is the `threading.Lock` and `threading.RLock` (Reentrant Lock)?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "A standard `Lock` can only be acquired once; a thread attempting to acquire it a second time will deadlock with itself. An `RLock` (Reentrant Lock) tracks the acquiring thread ID and recursion level, allowing the same thread to acquire it multiple times without deadlocking, requiring equal release calls."
  },
  {
    id: 42,
    question: "What is the `zip()` function and `itertools.zip_longest()`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`zip(a, b)` aggregates elements from multiple iterables into tuples, terminating when the *shortest* iterable is exhausted. `itertools.zip_longest(a, b, fillvalue=None)` continues until the *longest* iterable is exhausted, filling missing values with `fillvalue`."
  },
  {
    id: 43,
    question: "What is the `lambda` function and what are its limitations?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`lambda x, y: x + y` defines an anonymous inline function. Limitations: it can only contain a single expression (no statements like `while`, `for`, `try/except`, or multiple lines), and complex lambdas degrade code readability."
  },
  {
    id: 44,
    question: "What is Duck Typing in Python ('EAFP' vs 'LBYL')?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "Duck typing says 'if it walks like a duck and quacks like a duck, it's a duck'. Python strongly encourages **EAFP** ('Easier to Ask for Forgiveness than Permission') using `try/except`, over **LBYL** ('Look Before You Leap') using nested `if hasattr()` or `isinstance()` checks."
  },
  {
    id: 45,
    question: "What are Python Virtual Environments (`venv`) and why are they necessary?",
    category: "Tooling & Ecosystem",
    difficulty: "Easy",
    explanation: "Virtual environments create isolated Python directory trees with their own independent `site-packages` directory. They prevent dependency version conflicts between different projects and avoid polluting the system-wide global Python installation."
  },
  {
    id: 46,
    question: "What is the difference between `pip` and `poetry` / `pipenv`?",
    category: "Tooling & Ecosystem",
    difficulty: "Easy",
    explanation: "`pip` installs packages directly from PyPI into the active environment using `requirements.txt`. `poetry` manages virtual environments, handles complex dependency resolution with deterministic `poetry.lock` files, and builds/publishes packages using standard `pyproject.toml`."
  },
  {
    id: 47,
    question: "What is the `__all__` variable in `__init__.py`?",
    category: "Tooling & Ecosystem",
    difficulty: "Medium",
    explanation: "`__all__ = ['func1', 'ClassA']` defines the public interface of a module or package, explicitly specifying which symbols are exported when a consumer executes `from package import *`."
  },
  {
    id: 48,
    question: "What is `dis` module and how is it used to inspect Python bytecode?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "The `dis` module is a disassembler that translates Python functions into readable CPython bytecode instructions (`LOAD_FAST`, `BINARY_ADD`, `STORE_NAME`), used to analyze execution performance, variable lookups, and compiler optimizations."
  },
  {
    id: 49,
    question: "What is the difference between `pass`, `continue`, and `break`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`pass` is a null statement (no-op placeholder). `continue` skips the rest of the current loop iteration and proceeds to the next iteration. `break` terminates the loop immediately and jumps to code following the loop."
  },
  {
    id: 50,
    question: "What is the Free-Threaded CPython (No-GIL) feature in Python 3.13+?",
    category: "CPython & Concurrency",
    difficulty: "Hard",
    explanation: "PEP 703 introduces an experimental build option in Python 3.13 that completely disables the Global Interpreter Lock (No-GIL), replacing it with mimalloc thread-safe memory allocation, biased reference counting, and immortal objects to enable true multi-core parallel execution on native Python threads."
  }
];
