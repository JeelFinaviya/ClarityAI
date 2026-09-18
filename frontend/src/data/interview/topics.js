/**
 * Metadata and groupings for all 22 technical interview topics.
 */

export const TOPIC_GROUPS = [
  'All',
  'Frontend',
  'Backend',
  'Databases',
  'Core CS',
  'APIs & Tools'
];

export const INTERVIEW_TOPICS = [
  // Frontend
  {
    id: 'html',
    name: 'HTML',
    shortName: 'HTML',
    group: 'Frontend',
    description: 'Semantics, Accessibility, Web Storage, Canvas, Forms & Modern DOM APIs',
    questionCount: 50,
  },
  {
    id: 'css',
    name: 'CSS',
    shortName: 'CSS',
    group: 'Frontend',
    description: 'Box Model, Flexbox, Grid, Specificity, Positioning, Animations & Responsive Design',
    questionCount: 50,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    shortName: 'JavaScript',
    group: 'Frontend',
    description: 'Event Loop, Closures, Prototypes, Async/Await, Scope, Memory & Modern ES6+',
    questionCount: 50,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    shortName: 'TypeScript',
    group: 'Frontend',
    description: 'Generics, Interfaces, Type Narrowing, Utility Types, Inference & Type Safety',
    questionCount: 50,
  },
  {
    id: 'react',
    name: 'React',
    shortName: 'React',
    group: 'Frontend',
    description: 'Virtual DOM, Hooks, Reconciliation, State Management, RSC & Performance',
    questionCount: 50,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    shortName: 'Next.js',
    group: 'Frontend',
    description: 'App Router, Server Components, SSR/SSG/ISR, Server Actions, Middleware & SEO',
    questionCount: 50,
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    shortName: 'Node.js',
    group: 'Backend',
    description: 'Event Loop, Libuv, Streams, Buffers, Worker Threads, Clustering & Async I/O',
    questionCount: 50,
  },
  {
    id: 'express',
    name: 'Express.js',
    shortName: 'Express',
    group: 'Backend',
    description: 'Middleware Pipeline, Routing, Error Handling, CORS, Security & Scalable Architecture',
    questionCount: 50,
  },
  {
    id: 'python',
    name: 'Python',
    shortName: 'Python',
    group: 'Backend',
    description: 'Data Structures, GIL, Generators, Decorators, OOP, Memory & Asyncio',
    questionCount: 50,
  },
  {
    id: 'django',
    name: 'Django',
    shortName: 'Django',
    group: 'Backend',
    description: 'MVT, ORM Optimization, Middleware, Signals, Migrations, Auth & Caching',
    questionCount: 50,
  },
  {
    id: 'drf',
    name: 'Django REST Framework',
    shortName: 'DRF',
    group: 'Backend',
    description: 'Serializers, ViewSets, Permissions, Throttles, Pagination & Authentication',
    questionCount: 50,
  },
  {
    id: 'java',
    name: 'Java',
    shortName: 'Java',
    group: 'Backend',
    description: 'JVM/GC, Collections, Concurrency, Multithreading, OOP & Exception Handling',
    questionCount: 50,
  },

  // Databases
  {
    id: 'sql',
    name: 'SQL',
    shortName: 'SQL',
    group: 'Databases',
    description: 'Complex Joins, Window Functions, Indexing, CTEs, Aggregations & Query Plans',
    questionCount: 50,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    shortName: 'PostgreSQL',
    group: 'Databases',
    description: 'MVCC, VACUUM, GIN/GiST Indexes, JSONB, Partitioning, WAL & Isolation Levels',
    questionCount: 50,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    shortName: 'MongoDB',
    group: 'Databases',
    description: 'Document Modeling, Aggregation Pipelines, Indexing, Sharding & Replication',
    questionCount: 50,
  },
  {
    id: 'dbms',
    name: 'DBMS Concepts',
    shortName: 'DBMS',
    group: 'Databases',
    description: 'ACID, Normalization (1NF-BCNF), Transactions, 2PL, Deadlocks & Indexing',
    questionCount: 50,
  },

  // APIs & Tools
  {
    id: 'rest-apis',
    name: 'REST APIs',
    shortName: 'REST APIs',
    group: 'APIs & Tools',
    description: 'HTTP Methods, Status Codes, Idempotency, JWT vs Sessions, Rate Limiting & ETag',
    questionCount: 50,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    shortName: 'Git & GitHub',
    group: 'APIs & Tools',
    description: 'Internals (Trees/Blobs/Commits), Merge vs Rebase, Cherry-pick, Conflict Resolution & CI/CD',
    questionCount: 50,
  },

  // Core CS
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    group: 'Core CS',
    description: 'Big-O, Trees, Graphs, Dynamic Programming, Heaps, Searching & Sorting',
    questionCount: 50,
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    shortName: 'OOP',
    group: 'Core CS',
    description: '4 Pillars, SOLID Principles, Design Patterns, Composition & Coupling',
    questionCount: 50,
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    shortName: 'Networks',
    group: 'Core CS',
    description: 'TCP/IP, OSI Layers, 3-Way Handshake, DNS, HTTP/2/3, TLS & WebSockets',
    questionCount: 50,
  },
  {
    id: 'os',
    name: 'Operating Systems',
    shortName: 'Operating Systems',
    group: 'Core CS',
    description: 'Processes, Threads, Virtual Memory, Paging, Deadlocks, Scheduling & Mutex/Semaphores',
    questionCount: 50,
  }
];
