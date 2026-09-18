/**
 * 50 High-Value TypeScript Interview Questions
 */

export const TYPESCRIPT_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between `interface` and `type` alias in TypeScript?",
    category: "Type System",
    difficulty: "Medium",
    explanation: "`interface` is extendable, supports declaration merging (merging multiple declarations of the same name), and is optimized for object shape definitions and OOP class implementation. `type` is more flexible, supporting union types (`A | B`), primitives, tuples, intersections, and mapped/conditional types, but cannot be merged."
  },
  {
    id: 2,
    question: "What is the `any` type vs `unknown` type, and why is `unknown` preferred for type safety?",
    category: "Type Safety",
    difficulty: "Easy",
    explanation: "`any` completely disables TypeScript type-checking, allowing calling any method or property without safety. `unknown` is the type-safe counterpart (top type): you cannot access properties, call methods, or assign `unknown` to other types without first narrowing its type via type guards (`typeof`, `instanceof`, or custom predicates)."
  },
  {
    id: 3,
    question: "How do Generics work in TypeScript and why are they used?",
    category: "Generics",
    difficulty: "Medium",
    explanation: "Generics (`<T>`) allow writing reusable functions, classes, and interfaces that operate over a variety of types while preserving type relationships and compile-time type safety instead of losing types to `any` (e.g., `function identity<T>(arg: T): T`)."
  },
  {
    id: 4,
    question: "What is Type Narrowing and what are Type Guards?",
    category: "Type Narrowing",
    difficulty: "Medium",
    explanation: "Type narrowing refines a broad type (like `string | number`) into a more specific type within a conditional branch. Type guards include: `typeof x === 'string'`, `x instanceof Date`, `in` operator (`'prop' in obj`), equality checks, and custom user-defined type predicates (`is` keyword)."
  },
  {
    id: 5,
    question: "What is a custom Type Predicate function (`arg is Type`)?",
    category: "Type Narrowing",
    difficulty: "Medium",
    explanation: "A custom type predicate is a function returning a boolean whose return type is formatted as `parameterName is SpecificType` (e.g., `function isFish(pet: Pet): pet is Fish`). If the function returns `true`, TypeScript narrows the variable to `Fish` inside the calling `if` block."
  },
  {
    id: 6,
    question: "What is the `never` type and when does TypeScript use it?",
    category: "Type System",
    difficulty: "Hard",
    explanation: "`never` represents the bottom type—values that never occur. It is the return type of functions that never return (infinite loops or always throw errors). It is also used in exhaustive type checking inside `switch/case` statements to guarantee at compile-time that all union variants are handled."
  },
  {
    id: 7,
    question: "What is Exhaustive Type Checking and how is it implemented with `never`?",
    category: "Type Safety",
    difficulty: "Hard",
    explanation: "When handling a discriminated union, assign the unhandled case in the `default` branch to a `never` variable: `const _exhaustiveCheck: never = action;`. If a developer later adds a new union variant without updating the switch statement, TypeScript throws a compile-time error."
  },
  {
    id: 8,
    question: "What are Discriminated Unions (Tagged Unions)?",
    category: "Type System",
    difficulty: "Medium",
    explanation: "A discriminated union is a pattern where multiple object types in a union share a common literal property with a unique value (the 'discriminant' tag, e.g. `type: 'success' | 'error'`). TypeScript uses this tag to automatically narrow the object type inside `if` or `switch` statements."
  },
  {
    id: 9,
    question: "What is the difference between `const` assertions (`as const`) and regular `const` variables?",
    category: "Type System",
    difficulty: "Medium",
    explanation: "`as const` on an object or array literal instructs the compiler to: 1) Infer literal types rather than widened types (e.g., `'GET'` instead of `string`), 2) Make all object properties recursively `readonly`, and 3) Treat arrays as fixed `readonly` tuples."
  },
  {
    id: 10,
    question: "How do Utility Types like `Partial<T>`, `Required<T>`, `Readonly<T>`, and `Record<K, T>` work?",
    category: "Utility Types",
    difficulty: "Easy",
    explanation: "`Partial<T>` makes all properties of `T` optional (`?`). `Required<T>` makes all properties mandatory (`-?`). `Readonly<T>` makes all properties read-only. `Record<K, T>` constructs an object type whose keys are `K` and values are `T`."
  },
  {
    id: 11,
    question: "What is the difference between `Pick<T, K>` and `Omit<T, K>`?",
    category: "Utility Types",
    difficulty: "Easy",
    explanation: "`Pick<T, K>` constructs a new type by selecting a specific set of properties `K` from type `T`. `Omit<T, K>` constructs a new type by removing a specific set of properties `K` from type `T`."
  },
  {
    id: 12,
    question: "What is the `keyof` operator and how is it used with Mapped Types?",
    category: "Generics",
    difficulty: "Medium",
    explanation: "`keyof T` produces a string or numeric literal union of all known public property names of type `T`. It is used in mapped types `[K in keyof T]` to iterate over properties and build dynamic derived types."
  },
  {
    id: 13,
    question: "What does the `typeof` type operator do in a type context?",
    category: "Type System",
    difficulty: "Easy",
    explanation: "In a type position (e.g., `type Config = typeof defaultConfig`), `typeof` captures and refers to the TypeScript type of a runtime JavaScript variable or object without having to manually duplicate its interface definition."
  },
  {
    id: 14,
    question: "What are Conditional Types (`T extends U ? X : Y`) in TypeScript?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Conditional types select one of two possible types based on a subtyping relationship test. If `T` is assignable to `U`, the type resolves to `X`; otherwise `Y`. When used with generics, conditional types enable powerful meta-programming and type-level logic."
  },
  {
    id: 15,
    question: "What is the `infer` keyword in conditional types?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "`infer` introduces a type variable within the `extends` clause of a conditional type to be deduced by the compiler (e.g., extracting a Promise's resolved value: `type Unwrap<T> = T extends Promise<infer U> ? U : T`)."
  },
  {
    id: 16,
    question: "What are Numeric Enums vs String Enums vs `const enum`?",
    category: "Enums & Objects",
    difficulty: "Medium",
    explanation: "Numeric enums auto-increment from 0 and generate two-way reverse mappings at runtime. String enums require explicit string values with no reverse mapping. `const enum` generates zero JavaScript runtime code, inlining the raw literal values directly at compile time for smaller bundle sizes."
  },
  {
    id: 17,
    question: "Why do many modern TypeScript codebases prefer `as const` object maps over `enum`?",
    category: "Enums & Objects",
    difficulty: "Medium",
    explanation: "`const STATUS = { ACTIVE: 'active', INACTIVE: 'inactive' } as const` paired with `type Status = typeof STATUS[keyof typeof STATUS]` avoids TypeScript runtime code generation, preserves standard JavaScript semantics, works flawlessly with tree-shaking, and avoids enum quirks with numeric values."
  },
  {
    id: 18,
    question: "What is the difference between Non-null Assertion Operator (`!`) and Optional Chaining (`?.`)?",
    category: "Type Safety",
    difficulty: "Easy",
    explanation: "`?.` is a runtime JavaScript operator that safely short-circuits to `undefined` if a reference is null/undefined. `!` is a compile-time TypeScript assertion telling the compiler 'I guarantee this value is not null or undefined', generating no runtime protection."
  },
  {
    id: 19,
    question: "What is the `tsconfig.json` `strict` mode setting and what checks does it enable?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`strict: true` turns on the strongest type-checking guarantees, including: `noImplicitAny` (prevents unannotated any), `strictNullChecks` (differentiates null/undefined from types), `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, and `noImplicitThis`."
  },
  {
    id: 20,
    question: "What is Structural Typing (Duck Typing) in TypeScript vs Nominal Typing?",
    category: "Type System",
    difficulty: "Medium",
    explanation: "TypeScript uses Structural Typing: type compatibility is determined entirely by the shape/members of the object, not by its explicit name or declaration. If object `A` has all the properties required by interface `B`, `A` is assignable to `B`. Nominal typing (like Java/C#) requires explicit class inheritance."
  },
  {
    id: 21,
    question: "How can you simulate Nominal Typing (Branded Types) in TypeScript?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "By attaching a unique compile-time property (brand) to a primitive: `type USD = number & { readonly __brand: unique symbol }`. This prevents accidentally passing an unvalidated `number` or `EUR` to a function expecting `USD`."
  },
  {
    id: 22,
    question: "What is the difference between Intersection Types (`&`) and Union Types (`|`)?",
    category: "Type System",
    difficulty: "Easy",
    explanation: "Union types (`A | B`) mean a value can be *either* type `A` OR type `B` (you can only access common shared properties before narrowing). Intersection types (`A & B`) combine all properties of `A` AND `B` into a single combined type."
  },
  {
    id: 23,
    question: "What is the difference between `Exclude<T, U>` and `Extract<T, U>`?",
    category: "Utility Types",
    difficulty: "Medium",
    explanation: "`Exclude<T, U>` removes types from union `T` that are assignable to `U` (`type T0 = Exclude<'a' | 'b' | 'c', 'a'>` is `'b' | 'c'`). `Extract<T, U>` keeps only the types in union `T` that are assignable to `U`."
  },
  {
    id: 24,
    question: "What is `ReturnType<T>` and `Parameters<T>` in TypeScript?",
    category: "Utility Types",
    difficulty: "Medium",
    explanation: "`ReturnType<T>` extracts the return type of a function type `T`. `Parameters<T>` extracts the tuple type of all parameter arguments accepted by function type `T`."
  },
  {
    id: 25,
    question: "What is `Awaited<T>` in TypeScript?",
    category: "Utility Types",
    difficulty: "Medium",
    explanation: "`Awaited<T>` recursively unwraps Promises and `Thenables` to extract the final resolved value type, modeling the behavior of `await` or `Promise.all`."
  },
  {
    id: 26,
    question: "What is Index Signature (`[key: string]: any`) and what are its risks?",
    category: "Type Safety",
    difficulty: "Medium",
    explanation: "Index signatures define types for dictionary objects with arbitrary dynamic keys. The risk is that reading non-existent keys returns type `T` at compile-time instead of `T | undefined`, hiding potential runtime `undefined` bugs. Use `noUncheckedIndexedAccess: true` in tsconfig to enforce safe checking."
  },
  {
    id: 27,
    question: "What are Template Literal Types in TypeScript?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Template literal types (`type Event = 'on${Capitalize<Action>}'`) build string union types using template string syntax, enabling strict type-safe event handlers, CSS property values, and database query builders."
  },
  {
    id: 28,
    question: "What is Function Overloading in TypeScript?",
    category: "Generics",
    difficulty: "Medium",
    explanation: "Function overloading provides multiple function signatures (head definitions with parameter/return types) followed by a single implementation signature that handles all cases, giving callers accurate types based on which parameter combination they supply."
  },
  {
    id: 29,
    question: "What is the purpose of Ambient Declarations (`declare` keyword and `.d.ts` files)?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`.d.ts` declaration files contain type definitions without executable JavaScript implementations. The `declare` keyword informs the TypeScript compiler that certain global variables, modules, or window objects exist at runtime (e.g. from CDN scripts or third-party JS packages)."
  },
  {
    id: 30,
    question: "What is the difference between `interface` Declaration Merging and Class inheritance?",
    category: "Type System",
    difficulty: "Medium",
    explanation: "Declaration merging automatically combines multiple `interface` definitions sharing the same identifier across files/packages into a single unified interface. Class inheritance (`extends`) creates runtime parent-child relationships and prototype chains."
  },
  {
    id: 31,
    question: "What are Mapped Types with Key Remapping (`as`)?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Key remapping (`[K in keyof T as 'get${Capitalize<string & K>}']: () => T[K]`) allows transforming property key names while iterating over types, generating getter/setter interfaces automatically."
  },
  {
    id: 32,
    question: "What is the `satisfies` operator introduced in TypeScript 4.9?",
    category: "Type Safety",
    difficulty: "Hard",
    explanation: "The `satisfies` operator validates that an expression matches a type contract *without* widening or altering the inferred literal type (e.g., `const palette = { red: [255, 0, 0] } satisfies Record<string, string | number[]>` ensures `palette.red` retains its specific `number[]` type rather than `string | number[]`)."
  },
  {
    id: 33,
    question: "What is Variance (Covariance, Contravariance, Invariance, and Bivariance)?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Variance describes how subtyping between complex types relates to subtyping of their component types. Function return types are **covariant** (more specific return is assignable). Function parameters are **contravariant** (less specific parameter is assignable). `strictFunctionTypes: true` enforces contravariance on method parameters."
  },
  {
    id: 34,
    question: "What is the `readonly` modifier on properties and arrays?",
    category: "Type Safety",
    difficulty: "Easy",
    explanation: "`readonly` prevents re-assigning properties after initialization (`readonly id: string`). `ReadonlyArray<T>` (or `readonly T[]`) removes all mutating methods (`push`, `pop`, `splice`), enforcing immutability."
  },
  {
    id: 35,
    question: "What is the difference between `export type` and `export` in TypeScript?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`export type { User }` explicitly marks an export as a type-only construct. Bundlers (Vite, Babel, esbuild) use isolated module transpilation and can safely erase type-only exports without requiring cross-file type resolution."
  },
  {
    id: 36,
    question: "What is the `isolatedModules` flag in tsconfig.json?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`isolatedModules: true` instructs TypeScript to warn on code that cannot be safely transpiled by single-file transpilers like Babel or SWC (e.g., ambient const enums or re-exporting types without `export type`)."
  },
  {
    id: 37,
    question: "What is the difference between `moduleResolution: 'node'` and `moduleResolution: 'bundler'`?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`node` models traditional CommonJS Node.js `require()` path resolution. `bundler` models modern bundler behavior (Vite, Webpack), supporting package.json `exports` fields, extensionless imports, and modern ESM module loading rules."
  },
  {
    id: 38,
    question: "What is the `override` keyword in TypeScript classes?",
    category: "Type Safety",
    difficulty: "Medium",
    explanation: "Adding `override` to a child class method ensures that the method is actually overriding a method from its base class. If the base class method is renamed or removed in the future, TypeScript will flag a compile error."
  },
  {
    id: 39,
    question: "How do TypeScript Decorators work (Stage 3 Decorators)?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Decorators (`@logged`) are functions that wrap and modify classes, methods, accessors, or fields at class definition time. Standardized in ECMAScript/TS 5.0, they accept the target element and a `context` object providing metadata and initialization hooks."
  },
  {
    id: 40,
    question: "What is `InstanceType<T>` and `ConstructorParameters<T>`?",
    category: "Utility Types",
    difficulty: "Hard",
    explanation: "`InstanceType<T>` extracts the instance type returned by a constructor function or class `T`. `ConstructorParameters<T>` extracts a tuple of parameter types accepted by the constructor of class `T`."
  },
  {
    id: 41,
    question: "What is the `this` parameter annotation in TypeScript functions?",
    category: "Type Safety",
    difficulty: "Medium",
    explanation: "Placing a fake first parameter `this: Type` in a function signature (e.g. `function handleClick(this: HTMLButtonElement, e: Event)`) declares the expected `this` context for type-checking without emitting an actual argument in JavaScript."
  },
  {
    id: 42,
    question: "What is the `noUncheckedIndexedAccess` compiler option?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "When enabled, any lookup on an array index or dictionary object (e.g. `items[0]` or `dict['key']`) is typed as `T | undefined` rather than `T`, forcing developers to handle potential out-of-bounds or missing keys."
  },
  {
    id: 43,
    question: "What is the difference between `unknown` and `never` in union and intersection types?",
    category: "Type System",
    difficulty: "Hard",
    explanation: "In unions: `T | unknown` is `unknown` (absorbs everything); `T | never` is `T` (`never` is pruned). In intersections: `T & unknown` is `T`; `T & never` is `never` (impossible type)."
  },
  {
    id: 44,
    question: "What are Tuple types and how do Rest/Spread elements work in Tuples?",
    category: "Type System",
    difficulty: "Easy",
    explanation: "A tuple is a fixed-length array where each element has a specific known type: `[string, number]`. With spread/rest elements `[string, ...number[]]`, tuples can define arrays starting with a string followed by zero or more numbers."
  },
  {
    id: 45,
    question: "What is Type Casting vs Type Assertion in TypeScript?",
    category: "Type Safety",
    difficulty: "Easy",
    explanation: "Type Casting in languages like C#/Java changes runtime representation. TypeScript type assertions (`x as string` or `<string>x`) are strictly compile-time hints to the type-checker and have zero runtime effect, meaning they do not perform data conversion."
  },
  {
    id: 46,
    question: "What is recursive type definition and how is it used for JSON or Tree structures?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "A recursive type references itself in its own definition (e.g., `type JSONValue = string | number | boolean | null | JSONValue[] | { [k: string]: JSONValue }`), accurately modeling arbitrarily nested tree structures."
  },
  {
    id: 47,
    question: "What is the `OmitByType` custom mapped utility type?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "`type OmitByType<T, ValueType> = { [K in keyof T as T[K] extends ValueType ? never : K]: T[K] }` iterates over all properties of `T` and uses key remapping with `never` to filter out properties matching `ValueType`."
  },
  {
    id: 48,
    question: "What is the `skipLibCheck` tsconfig setting and why is it commonly enabled?",
    category: "Configuration",
    difficulty: "Easy",
    explanation: "`skipLibCheck: true` skips type checking of all imported declaration files (`.d.ts` in `node_modules`). It drastically speeds up compilation times while avoiding build failures caused by conflicting third-party library typings."
  },
  {
    id: 49,
    question: "What is Const Type Parameter (`<const T>`) in TypeScript 5.0?",
    category: "Generics",
    difficulty: "Hard",
    explanation: "Adding `const` to a generic type parameter (`function create<const T>(values: T)`) forces TypeScript to infer the most specific literal and readonly types for passed arguments without requiring callers to manually write `as const`."
  },
  {
    id: 50,
    question: "How does TypeScript handle excess property checks on object literals?",
    category: "Type Safety",
    difficulty: "Medium",
    explanation: "When passing an object literal directly to a function or variable typed as an interface, TypeScript performs Excess Property Checks and errors if unlisted properties are present. However, assigning the object to an intermediate variable first bypasses excess checks due to structural subtyping."
  }
];
