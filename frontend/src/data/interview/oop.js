/**
 * 50 High-Value Object-Oriented Programming (OOP) Interview Questions
 */

export const OOP_QUESTIONS = [
  {
    id: 1,
    question: "What are the 4 fundamental pillars of Object-Oriented Programming?",
    category: "4 Pillars of OOP",
    difficulty: "Easy",
    explanation: "1) **Encapsulation**: Bundling data (attributes) and methods that operate on that data into a single class while restricting direct access to internal state (getters/setters). 2) **Abstraction**: Hiding complex implementation details and exposing only essential interfaces. 3) **Inheritance**: Mechanism where a child class acquires properties and behaviors of a parent class. 4) **Polymorphism**: Ability of different classes to respond to the same interface or method call in their own specific ways."
  },
  {
    id: 2,
    question: "What are the SOLID principles of Object-Oriented Design?",
    category: "SOLID Principles",
    difficulty: "Medium",
    explanation: "**S (Single Responsibility)**: A class should have only one reason to change. **O (Open/Closed)**: Software entities should be open for extension, but closed for modification. **L (Liskov Substitution)**: Subclasses must be substitutable for their base classes without altering program correctness. **I (Interface Segregation)**: Clients should not be forced to depend on methods they do not use. **D (Dependency Inversion)**: High-level modules should depend on abstractions, not concrete implementations."
  },
  {
    id: 3,
    question: "What is the difference between Method Overloading (Static Polymorphism) and Method Overriding (Dynamic Polymorphism)?",
    category: "4 Pillars of OOP",
    difficulty: "Easy",
    explanation: "**Overloading (Compile-Time / Static)**: Multiple methods in the same class share the same name but differ in parameter types or counts (resolved at compile-time). **Overriding (Run-Time / Dynamic)**: A child subclass provides a specific implementation of a method already defined in its parent class with the exact same signature (resolved at runtime via virtual method tables)."
  },
  {
    id: 4,
    question: "Why is 'Composition over Inheritance' a fundamental design recommendation?",
    category: "Design Principles",
    difficulty: "Medium",
    explanation: "Inheritance creates tight coupling ('is-a' relationship) where changes in the parent class can break child subclasses across deep hierarchies (fragile base class problem) and violates encapsulation. Composition ('has-a' relationship) bundles references to objects, allowing dynamic behavior switching at runtime, easier mocking, and higher modularity."
  },
  {
    id: 5,
    question: "What is an Abstract Class vs an Interface, and when should you choose one over the other?",
    category: "Design Principles",
    difficulty: "Medium",
    explanation: "Choose an **Abstract Class** when creating closely related classes that share common state (instance variables), non-public methods, and constructor logic. Choose an **Interface** to define a loose behavioral contract (e.g., `Comparable`, `Serializable`) implemented by completely unrelated classes across different modules."
  },
  {
    id: 6,
    question: "What is the Singleton Design Pattern and how do you prevent breaking it via Reflection and Serialization?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Ensures a class has only one instance and provides a global access point (`getInstance()`). To prevent breaking: 1) In constructors, throw an exception if an instance already exists (prevents reflection). 2) Implement `readResolve()` to return the existing instance during deserialization. 3) The most robust implementation in Java is a single-element `Enum`."
  },
  {
    id: 7,
    question: "What is the Factory Method Pattern vs Abstract Factory Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "**Factory Method**: Defines an interface for creating a single object, allowing subclasses to decide which concrete class to instantiate. **Abstract Factory**: Provides an interface for creating *families of related or dependent objects* (e.g., creating DarkThemeButton, DarkThemeCheckbox vs LightThemeButton, LightThemeCheckbox) without specifying their concrete classes."
  },
  {
    id: 8,
    question: "What is the Observer Design Pattern and how does it support Event-Driven Architecture?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Defines a one-to-many dependency between objects where when one object (Subject) changes state, all its registered dependents (Observers) are notified automatically (`notifyObservers()`). It is the foundation of MVC architectures, DOM event listeners, and Reactive programming (RxJS/RxJava)."
  },
  {
    id: 9,
    question: "What is the Strategy Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Defines a family of interchangeable algorithms, encapsulates each one in a separate class implementing a common interface, and allows clients to swap algorithms dynamically at runtime (e.g. swapping payment strategies: `CreditCardPayment`, `PayPalPayment`, `CryptoPayment`)."
  },
  {
    id: 10,
    question: "What is the Decorator Design Pattern and how does it differ from Inheritance?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "The Decorator pattern attaches additional responsibilities and behaviors to an object dynamically at runtime by wrapping it inside decorator classes that implement the same interface (e.g., Java `BufferedInputStream(FileInputStream(...))`). It avoids creating an explosion of static subclasses for every combination of features."
  },
  {
    id: 11,
    question: "What is the Adapter Design Pattern vs Facade Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "**Adapter**: Converts the incompatible interface of an existing class into another interface clients expect (acting as a translator wrapper between two systems). **Facade**: Provides a simplified, unified high-level interface to a complex subsystem of many classes (e.g., a `VideoConverter` facade managing audio encoders, bitrates, and file streams)."
  },
  {
    id: 12,
    question: "What is the Proxy Design Pattern and what are its common variants?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "A Proxy provides a surrogate or placeholder object that controls access to the original object. Variants: 1) **Virtual Proxy** (lazy-loads heavy objects like high-res images on demand), 2) **Protection Proxy** (validates user authorization before forwarding method calls), 3) **Remote Proxy** (handles network RPC communication), 4) **Logging/Caching Proxy**."
  },
  {
    id: 13,
    question: "What is Dependency Injection (DI) and Inversion of Control (IoC)?",
    category: "Design Principles",
    difficulty: "Medium",
    explanation: "**Inversion of Control (IoC)**: Transferring control of object creation and program flow from the class itself to an external framework or container. **Dependency Injection (DI)**: A design pattern implementing IoC where an object's dependencies (e.g., database service) are supplied (injected via constructor or setter) from the outside rather than created internally with `new`."
  },
  {
    id: 14,
    question: "What is the Builder Design Pattern and when is it preferred over Constructors?",
    category: "Design Patterns",
    difficulty: "Easy",
    explanation: "Separates the construction of a complex object from its representation, using method chaining (`User.builder().name('John').age(30).build()`). It is preferred over 'Telescoping Constructors' when an object has many optional parameters, making instantiation readable and preventing parameter ordering mistakes."
  },
  {
    id: 15,
    question: "What is the Template Method Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Defines the skeleton of an algorithm in a base class method (the template method), deferring specific step implementations to subclasses without altering the overall algorithm structure or execution order."
  },
  {
    id: 16,
    question: "What is the Command Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Encapsulates a request as a standalone object containing all information about the request (the receiver, method, and arguments). This decouples the invoker from the receiver, enabling undo/redo operations, request queuing, logging, and macro recording."
  },
  {
    id: 17,
    question: "What is the State Design Pattern vs Strategy Pattern?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Both use polymorphism and encapsulation of behaviors. In **Strategy**, the client chooses an algorithm independently. In **State**, the object's internal state machine automatically transitions from one state to another (e.g., `OrderPlacedState -> ShippedState -> DeliveredState`), altering its behavior as state changes without giant `switch/case` statements."
  },
  {
    id: 18,
    question: "What is the Chain of Responsibility Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Passes a request along a dynamic chain of potential handler objects. Each handler decides either to process the request and/or pass it to the next handler in the chain (the exact pattern used in Express/Django middleware pipelines and UI event bubbling)."
  },
  {
    id: 19,
    question: "What is the difference between Cohesion and Coupling in software architecture?",
    category: "Design Principles",
    difficulty: "Easy",
    explanation: "**Cohesion** refers to how closely related and focused the responsibilities of a single class or module are (aim for **High Cohesion**). **Coupling** refers to the degree of interdependence between different modules (aim for **Loose/Low Coupling** to ensure changes in one module do not break others)."
  },
  {
    id: 20,
    question: "What is the Law of Demeter (Principle of Least Knowledge)?",
    category: "Design Principles",
    difficulty: "Medium",
    explanation: "A module should not know the internal details of the objects it manipulates: 'Only talk to your immediate friends'. A method `m` of object `A` should only call methods on `A` itself, parameters passed into `m`, objects created within `m`, or direct component properties of `A` (prevents method chaining like `a.getB().getC().getD().doSomething()`)."
  },
  {
    id: 21,
    question: "What is the Flyweight Design Pattern and how does it optimize memory?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Minimizes memory usage by sharing common immutable state (**Intrinsic State**, e.g., font glyphs, tree texture models) across thousands of similar objects, passing variable dynamic state (**Extrinsic State**, e.g., (x,y) screen coordinates) externally during rendering."
  },
  {
    id: 22,
    question: "What is the Composite Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Composes objects into tree structures to represent part-whole hierarchies. It allows clients to treat individual leaf objects (e.g. a single `File`) and composite container objects (e.g. a `Folder` containing files and subfolders) uniformly through a common component interface."
  },
  {
    id: 23,
    question: "What is the Mediator Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Restricts direct communications between objects and forces them to collaborate solely through a central Mediator object (e.g., an Air Traffic Control tower coordinating airplanes, or a dialog box mediator coordinating buttons, inputs, and checkboxes), reducing chaotic many-to-many dependencies into one-to-many."
  },
  {
    id: 24,
    question: "What is the Memento Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Captures and externalizes an object's internal state snapshot without violating encapsulation, so that the object can be restored to this exact state later (used for implementing undo/redo functionality in editors)."
  },
  {
    id: 25,
    question: "What is the Prototype Design Pattern?",
    category: "Design Patterns",
    difficulty: "Easy",
    explanation: "Creates new objects by cloning an existing prototype object instance (`clone()`) rather than instantiating new objects via constructors, useful when direct object creation is computationally expensive (e.g., requiring complex database reads)."
  },
  {
    id: 26,
    question: "What is the Visitor Design Pattern?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Separates an algorithm from the object structure on which it operates using **Double Dispatch** (`element.accept(visitor)`). It allows adding new operations to existing complex object structures (AST nodes, document elements) without modifying the element classes themselves."
  },
  {
    id: 27,
    question: "What is the difference between Shallow Copy and Deep Copy in OOP?",
    category: "4 Pillars of OOP",
    difficulty: "Easy",
    explanation: "A **Shallow Copy** duplicates the top-level object fields; any reference type fields still point to the original objects in memory. A **Deep Copy** recursively instantiates duplicates of all referenced child objects, creating completely independent object graphs."
  },
  {
    id: 28,
    question: "What is a Virtual Method and Virtual Method Table (vtable)?",
    category: "4 Pillars of OOP",
    difficulty: "Hard",
    explanation: "A virtual method allows overridden subclass behavior to be invoked at runtime even when accessed via a base class pointer. The compiler creates a **vtable** (array of function pointers) for each class; object instances store a hidden pointer (`vptr`) to their class's vtable, resolving method calls via runtime pointer dereference (dynamic dispatch)."
  },
  {
    id: 29,
    question: "What is the difference between Aggregation and Composition in class relationships?",
    category: "Design Principles",
    difficulty: "Easy",
    explanation: "**Composition**: Strong ownership ('death relationship'); child cannot exist without parent (e.g., `House` and `Room`—destroying house destroys rooms). **Aggregation**: Weak ownership; child exists independently of parent (e.g., `Department` and `Professor`—deleting department does not delete professors)."
  },
  {
    id: 30,
    question: "What is the Open-Closed Principle (OCP) and how is it violated and fixed?",
    category: "SOLID Principles",
    difficulty: "Medium",
    explanation: "Violated when adding a new feature requires modifying existing working classes using `if-else` or `switch` chains on type codes. Fixed by introducing an abstraction/interface and creating new polymorphic subclasses that extend behavior without touching existing code."
  },
  {
    id: 31,
    question: "What is Liskov Substitution Principle (LSP) and the classic Square-Rectangle problem?",
    category: "SOLID Principles",
    difficulty: "Medium",
    explanation: "LSP requires subclasses to satisfy all behavioral contracts of base classes. If a `Square` inherits from `Rectangle` and overrides `setWidth()` to also set height, it breaks code that expects changing rectangle width to leave height unchanged, proving that geometric subtyping does not always translate to OOP class inheritance."
  },
  {
    id: 32,
    question: "What is Interface Segregation Principle (ISP)?",
    category: "SOLID Principles",
    difficulty: "Easy",
    explanation: "No client should be forced to depend on methods it does not use. Instead of one bloated 'fat interface' (`WorkerInterface` containing `work()`, `eat()`, `sleep()`), split into focused cohesive interfaces (`Workable`, `Eatable`), allowing robot workers to implement only `Workable` without empty stub methods."
  },
  {
    id: 33,
    question: "What is Dependency Inversion Principle (DIP)?",
    category: "SOLID Principles",
    difficulty: "Medium",
    explanation: "High-level policy modules should not import low-level detail modules; both should depend on abstractions/interfaces. For example, a `NotificationService` should depend on a generic `MessageSender` interface rather than a concrete `TwilioSMSService` class, allowing easy swapping of providers."
  },
  {
    id: 34,
    question: "What is the difference between an Object and a Class?",
    category: "4 Pillars of OOP",
    difficulty: "Easy",
    explanation: "A **Class** is a blueprint, template, or user-defined data type defining attributes and methods. An **Object** is a concrete instance of that class allocated in heap memory containing real values."
  },
  {
    id: 35,
    question: "What is Multiple Inheritance and why do many languages disallow it?",
    category: "4 Pillars of OOP",
    difficulty: "Medium",
    explanation: "Multiple inheritance allows a class to inherit from 2+ parent classes. Disallowed in Java, C#, and JS because of the **Diamond Problem** (ambiguity when two parent classes inherit from a common grandparent and override the same method), solved in modern languages via multiple interface implementation or mixins."
  },
  {
    id: 36,
    question: "What is the difference between Early Binding and Late Binding?",
    category: "4 Pillars of OOP",
    difficulty: "Medium",
    explanation: "**Early Binding (Static)**: Method call is resolved to a specific memory address at compile-time (overloaded methods, private/static/final methods). **Late Binding (Dynamic)**: Method call is resolved at runtime based on the actual object instance type (overridden virtual methods)."
  },
  {
    id: 37,
    question: "What is an Anonymous Class and Inner Class?",
    category: "Design Principles",
    difficulty: "Easy",
    explanation: "An **Inner Class** is a class defined inside the body of another enclosing class, having direct access to the outer class's private members. An **Anonymous Class** is an inner class declared and instantiated inline without a name, commonly used for quick one-off listener implementations."
  },
  {
    id: 38,
    question: "What is the difference between a Copy Constructor and Assignment Operator?",
    category: "4 Pillars of OOP",
    difficulty: "Medium",
    explanation: "A **Copy Constructor** (`ClassName(const ClassName& other)`) creates and initializes a *brand new object* as a copy of an existing object. An **Assignment Operator** (`operator=`) copies data into an *already existing object* in memory, requiring handling of self-assignment and existing resource deallocation."
  },
  {
    id: 39,
    question: "What is the Null Object Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Instead of using a `null` reference to convey the absence of an object, you supply a concrete object implementing the expected interface with empty or default do-nothing behavior, eliminating repetitive `if (obj != null)` null checks across the codebase."
  },
  {
    id: 40,
    question: "What is the Service Locator Pattern and why is it often considered an Anti-Pattern compared to Dependency Injection?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "A Service Locator acts as a central registry that classes query to obtain dependencies. It is considered an anti-pattern because it hides class dependencies inside method implementations (obscuring what the class needs to function), makes unit testing harder, and tightly couples code to the locator registry."
  },
  {
    id: 41,
    question: "What is Domain-Driven Design (DDD) Entity vs Value Object?",
    category: "Design Principles",
    difficulty: "Hard",
    explanation: "**Entity**: An object defined by its distinct continuous identity and lifecycle (two Users with the same name are distinct entities with different IDs). **Value Object**: An immutable object defined entirely by its attributes with no identity (two `Money($50, USD)` objects are identical and interchangeable)."
  },
  {
    id: 42,
    question: "What is an Aggregate Root in Domain-Driven Design?",
    category: "Design Principles",
    difficulty: "Hard",
    explanation: "An Aggregate is a cluster of associated domain objects treated as a single unit for data changes. The **Aggregate Root** is the primary Entity gateway through which all external access and modifications to child entities within the aggregate must pass to enforce business invariants."
  },
  {
    id: 43,
    question: "What is the difference between Active Record Pattern and Data Mapper Pattern?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "**Active Record** (Django ORM, Rails): The entity class contains both data attributes AND database access methods (`user.save()`), simple but couples domain logic with database schema. **Data Mapper** (Hibernate, SQLAlchemy, Prisma): Domain entities are pure in-memory classes; a separate mapper layer handles database persistence, strictly decoupling domain logic from database schema."
  },
  {
    id: 44,
    question: "What is Object Slicing in C++ / object-oriented languages?",
    category: "4 Pillars of OOP",
    difficulty: "Hard",
    explanation: "Occurs when a derived subclass instance is assigned by value (not pointer/reference) to a base class variable. The extra member variables and virtual overrides of the derived class are sliced off, retaining only the base class portion."
  },
  {
    id: 45,
    question: "What is the Object Pool Design Pattern?",
    category: "Design Patterns",
    difficulty: "Medium",
    explanation: "Maintains a pool of pre-instantiated, reusable objects (e.g. database connection pools, thread pools, game particle systems). Clients borrow an object, perform work, and return it to the pool, avoiding expensive repeated allocations and garbage collection pauses."
  },
  {
    id: 46,
    question: "What is Method Chaining and Fluent Interface in OOP?",
    category: "Design Principles",
    difficulty: "Easy",
    explanation: "Design where methods return `this` (the object instance itself), allowing multiple method invocations to be chained sequentially in a single expressive statement (`query.select('name').where('age > 18').orderBy('name')`)."
  },
  {
    id: 47,
    question: "What is Pure Fabrication in GRASP design principles?",
    category: "Design Principles",
    difficulty: "Hard",
    explanation: "Creating a class that does not represent an actual concept in the real-world problem domain (e.g., `DatabaseConnectionPool`, `Logger`, `EventDispatcher`), fabricated intentionally to achieve high cohesion, low coupling, and reusability."
  },
  {
    id: 48,
    question: "What is the difference between Covariant and Contravariant method overriding?",
    category: "4 Pillars of OOP",
    difficulty: "Hard",
    explanation: "**Covariant Return Type**: An overriding method in a subclass can return a *more specific derived subtype* than the return type declared in the base class. **Contravariant Parameters**: An overriding method accepts a *broader supertype* parameter than the base method."
  },
  {
    id: 49,
    question: "What is the Bridge Design Pattern?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Decouples an abstraction from its implementation so that the two can vary independently (e.g., separating an abstract `RemoteControl` from concrete `Device` implementations like `TV`, `Radio`, preventing an M x N combinatorial class explosion)."
  },
  {
    id: 50,
    question: "What is the Interpreter Design Pattern?",
    category: "Design Patterns",
    difficulty: "Hard",
    explanation: "Defines a grammatical representation for a domain language along with an interpreter that uses the grammar tree to evaluate expressions (used in SQL query parsers, regular expression engines, and mathematical formula evaluators)."
  }
];
