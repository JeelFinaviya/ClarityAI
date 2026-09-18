/**
 * 50 High-Value PostgreSQL Interview Questions
 */

export const POSTGRESQL_QUESTIONS = [
  {
    id: 1,
    question: "What is MVCC (Multi-Version Concurrency Control) in PostgreSQL and how does it work?",
    category: "Architecture & Concurrency",
    difficulty: "Hard",
    explanation: "MVCC allows concurrent reads and writes without read locks blocking write locks and vice versa. Instead of overwriting data in-place, PostgreSQL writes a brand new row version (tuple) with system headers `xmin` (creation transaction ID) and `xmax` (deletion/update transaction ID). Each transaction sees a point-in-time snapshot of committed tuples valid for its transaction ID."
  },
  {
    id: 2,
    question: "What is the `VACUUM` process in PostgreSQL and what is Table Bloat?",
    category: "Storage & Maintenance",
    difficulty: "Medium",
    explanation: "When rows are updated or deleted, old tuple versions become 'dead tuples' taking up space on disk (Table Bloat). `VACUUM` scans pages, marks dead tuple space as available for new data, and updates free space maps (FSM). `VACUUM FULL` rewrites the entire table into a new file, reclaiming disk space to the OS but acquiring an exclusive table lock."
  },
  {
    id: 3,
    question: "What is Autovacuum and why is tuning `autovacuum_vacuum_scale_factor` critical?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "Autovacuum is a background daemon that runs `VACUUM` and `ANALYZE` automatically when dead tuples exceed a threshold (`base_threshold + scale_factor * total_tuples`). On massive tables (10M+ rows), the default 20% scale factor means autovacuum will not trigger until 2M rows die, causing massive bloat. Tuning scale factor down to 1-5% keeps bloat under control."
  },
  {
    id: 4,
    question: "What is the difference between `JSON` and `JSONB` data types in PostgreSQL?",
    category: "Data Types",
    difficulty: "Medium",
    explanation: "`JSON` stores text verbatim, preserving exact formatting, whitespace, and key order (fast inserts, slow query processing because it must re-parse on every read). `JSONB` stores data in a parsed binary format, strips whitespace, deduplicates keys, and crucially **supports GIN indexing and containment operators (`@>`)**, making queries orders of magnitude faster."
  },
  {
    id: 5,
    question: "What are GIN (Generalized Inverted Index) and GiST (Generalized Search Tree) indexes?",
    category: "Indexing",
    difficulty: "Hard",
    explanation: "**GIN** is an inverted index where keys point to a posting list of row IDs (ideal for multi-value documents: `JSONB` keys, full-text search `tsvector`, and array lookups). **GiST** is a balanced tree index for hierarchical and geometric data (PostGIS geometric shapes, range types `tsrange`, nearest-neighbor KNN searches)."
  },
  {
    id: 6,
    question: "What is BRIN (Block Range Index) and when is it most effective?",
    category: "Indexing",
    difficulty: "Hard",
    explanation: "BRIN stores only the minimum and maximum values for physical ranges of adjacent disk pages (e.g. 128 pages). It uses tiny index memory (<1% of B-Tree size) and is extremely fast for massive, append-only time-series tables where data is physically ordered on disk by timestamp or auto-incrementing ID."
  },
  {
    id: 7,
    question: "What is Write-Ahead Logging (WAL) and how does it ensure Durability and Crash Recovery?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "WAL is an append-only log on disk where every database modification is recorded before the change is written to shared memory or data pages. On sudden power loss or server crash, PostgreSQL replays the WAL from the last checkpoint (`REDO`) to recover all committed transactions."
  },
  {
    id: 8,
    question: "What is Transaction ID (XID) Wraparound and how does PostgreSQL prevent data loss?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "PostgreSQL uses 32-bit transaction IDs (~4 billion transactions). Because modulo arithmetic determines whether a transaction is in the past or future, reaching 2 billion transactions without maintenance would cause old transactions to appear in the future (data invisibility). Autovacuum performs **Freeze** operations to mark old XIDs with a special frozen bit `FrozenXID`."
  },
  {
    id: 9,
    question: "What are PostgreSQL Table Partitioning strategies (Range, List, Hash)?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "Declarative Partitioning splits a large parent table into smaller physical child tables based on a partition key: **Range** (by date/time `FROM ('2026-01-01') TO ('2026-02-01')`), **List** (by status/country code), **Hash** (evenly distributed by hash modulus)."
  },
  {
    id: 10,
    question: "What is Partition Pruning in PostgreSQL?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "Partition Pruning is a query optimization where the query planner analyzes the `WHERE` clause and skips scanning child partition tables that cannot possibly contain matching records (e.g., querying for January data only scans the January partition and ignores the other 11 months)."
  },
  {
    id: 11,
    question: "What are the 4 Transaction Isolation Levels in PostgreSQL?",
    category: "Transactions & Concurrency",
    difficulty: "Hard",
    explanation: "1) **Read Committed** (default, reads latest committed snapshot per statement), 2) **Repeatable Read** (snapshot fixed at transaction start; prevents non-repeatable reads and phantom reads), 3) **Serializable** (uses SSI - Serializable Snapshot Isolation to prevent all write skew anomalies via lock-free predicate dependency graphs)."
  },
  {
    id: 12,
    question: "What is Connection Pooling and why is PgBouncer essential for PostgreSQL in production?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "PostgreSQL uses a **process-per-connection architecture** (each client connection spawns a heavy ~10MB OS process, causing context switching at >200 connections). **PgBouncer** is a lightweight proxy that pools connections in Transaction mode, allowing thousands of application requests to multiplex over a small pool of 50-100 real database connections."
  },
  {
    id: 13,
    question: "What is the difference between `EXPLAIN (ANALYZE, BUFFERS)` and standard `EXPLAIN`?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "`BUFFERS` shows shared buffer cache hit vs disk read statistics (`shared hit`, `read`, `dirtied`). A query that appears fast in memory might be hitting disk under load; high `read` counts reveal queries needing better indexing or increased `shared_buffers`."
  },
  {
    id: 14,
    question: "What is the `shared_buffers` configuration parameter in PostgreSQL?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "`shared_buffers` defines the dedicated amount of RAM allocated for PostgreSQL to cache shared database table and index pages (typically configured to **25% of total system RAM** on dedicated database servers, letting the OS page cache handle the rest)."
  },
  {
    id: 15,
    question: "What is `work_mem` and what happens if it is set too high?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "`work_mem` is the memory allocated for internal sort operations (`ORDER BY`, `DISTINCT`) and hash tables (`Hash Join`) *per operation, per connection*. If a complex query runs 4 sorts across 50 concurrent connections, it can consume `4 * 50 * work_mem` RAM; setting it too high causes Out-Of-Memory (OOM) kernel panics."
  },
  {
    id: 16,
    question: "What is `maintenance_work_mem` used for?",
    category: "Performance & Scaling",
    difficulty: "Easy",
    explanation: "`maintenance_work_mem` defines the maximum memory used by maintenance operations like `VACUUM`, `CREATE INDEX`, and `ALTER TABLE ADD FOREIGN KEY` (typically set significantly higher than `work_mem`, e.g. 512MB–2GB)."
  },
  {
    id: 17,
    question: "What is `pg_stat_statements` and how is it used for database performance auditing?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "`pg_stat_statements` is a core extension that tracks execution statistics across all SQL queries (normalized query text, total calls, mean execution time, rows returned, and shared buffer cache hits), identifying top slow queries and database load drivers."
  },
  {
    id: 18,
    question: "What is the difference between Physical Replication (Streaming Replication) and Logical Replication in PostgreSQL?",
    category: "Replication & HA",
    difficulty: "Hard",
    explanation: "**Physical Streaming Replication** replicates binary byte-for-byte WAL records from primary to standby (exact bitwise replica, read-only standby, whole-cluster). **Logical Replication** decodes WAL into row-level logical changes (INSERT/UPDATE/DELETE), allowing selective table replication, cross-version upgrades, and writes on the subscriber."
  },
  {
    id: 19,
    question: "What is the `HOT` (Heap-Only Tuple) optimization in PostgreSQL?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "When an `UPDATE` does not modify any indexed column and the new tuple fits inside the *same disk page* as the old tuple, PostgreSQL creates a Heap-Only Tuple chained via root pointers, completely bypassing index updates and reducing index bloat."
  },
  {
    id: 20,
    question: "What is a Partial Index and what is an Expression Index in PostgreSQL?",
    category: "Indexing",
    difficulty: "Easy",
    explanation: "**Partial Index**: `CREATE INDEX ON orders(user_id) WHERE status = 'pending';` indexes only rows matching the condition. **Expression Index**: `CREATE INDEX ON users(LOWER(email));` indexes the computed result of an expression or function."
  },
  {
    id: 21,
    question: "What is the `pg_trgm` extension and how does it enable fast fuzzy/trigram search?",
    category: "Extensions",
    difficulty: "Medium",
    explanation: "`pg_trgm` breaks text into 3-character substrings (trigrams). Paired with a GIN index (`CREATE INDEX ON products USING gin(name gin_trgm_ops)`), it accelerates leading wildcard `LIKE '%query%'`, regex matches, and fuzzy similarity calculations (`%` operator)."
  },
  {
    id: 22,
    question: "What is Full-Text Search in PostgreSQL (`tsvector` vs `tsquery`)?",
    category: "Full-Text Search",
    difficulty: "Medium",
    explanation: "`tsvector` is a sorted list of distinct normalized lexemes (words reduced to stems with stop words removed). `tsquery` represents search terms combined with boolean operators (`&`, `|`, `!`). Matches are evaluated via `to_tsvector('english', body) @@ to_tsquery('english', 'react & hooks')` and indexed with GIN."
  },
  {
    id: 23,
    question: "What is `REFRESH MATERIALIZED VIEW CONCURRENTLY` and what prerequisite is required?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "`CONCURRENTLY` allows queries to continue reading the materialized view while it is being refreshed in the background without exclusive table locks. Prerequisite: the materialized view **must have at least one `UNIQUE` index** with no WHERE clause on non-null columns."
  },
  {
    id: 24,
    question: "What is `LISTEN` and `NOTIFY` in PostgreSQL?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "PostgreSQL's built-in asynchronous Publish-Subscriber messaging system. Clients execute `LISTEN channel_name`, and database functions/triggers execute `NOTIFY channel_name, 'payload'`, waking up connected web backends (e.g. Node.js/Python) without polling."
  },
  {
    id: 25,
    question: "What is `PostGIS`?",
    category: "Extensions",
    difficulty: "Easy",
    explanation: "PostGIS is an open-source spatial database extension for PostgreSQL that adds support for geographic objects (points, polygons, lines), spatial indexes (GiST), and spatial functions (`ST_Distance`, `ST_DWithin`, `ST_Contains`)."
  },
  {
    id: 26,
    question: "What is `pg_dump` vs `pg_dumpall` vs `pg_basebackup`?",
    category: "Storage & Maintenance",
    difficulty: "Medium",
    explanation: "`pg_dump` creates a logical backup (SQL script or tar archive) of a single database. `pg_dumpall` dumps all databases and global objects (roles, tablespaces). `pg_basebackup` takes a physical binary filesystem-level snapshot of the entire cluster for streaming replication replicas."
  },
  {
    id: 27,
    question: "What is `UPSERT` in PostgreSQL (`INSERT ... ON CONFLICT DO UPDATE`)?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "`INSERT INTO users(id, email) VALUES(1, 'a@b.com') ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;` atomically inserts a new row or updates the existing row if a unique constraint or primary key conflict occurs."
  },
  {
    id: 28,
    question: "What is the difference between `TIMESTAMP` and `TIMESTAMPTZ` in PostgreSQL?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "`TIMESTAMP` (without timezone) stores naive date/time. `TIMESTAMPTZ` (with timezone) converts incoming timestamps to **UTC** internally for storage, and converts UTC back to the client session's timezone on output, preventing timezone conversion bugs."
  },
  {
    id: 29,
    question: "What is `CITEXT` data type in PostgreSQL?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "`CITEXT` (case-insensitive text extension) automatically calls `LOWER()` internally for all comparison (`=`) and sorting operations, making email addresses or usernames case-insensitive without requiring expression indexes."
  },
  {
    id: 30,
    question: "What is the `pg_locks` view and how do you diagnose query blocking?",
    category: "Performance & Scaling",
    difficulty: "Hard",
    explanation: "Querying `pg_locks` joined with `pg_stat_activity` identifies which backend PID is holding an exclusive lock on a table or row, and which blocked queries are waiting on that lock, enabling termination via `pg_cancel_backend(pid)` or `pg_terminate_backend(pid)`."
  },
  {
    id: 31,
    question: "What is `pg_cron`?",
    category: "Extensions",
    difficulty: "Easy",
    explanation: "`pg_cron` is an extension that runs periodic scheduled database maintenance, materialized view refreshes, and batch rollup queries directly inside the PostgreSQL engine using standard cron syntax."
  },
  {
    id: 32,
    question: "What is Foreign Data Wrapper (FDW) / `postgres_fdw` in PostgreSQL?",
    category: "Architecture & Concurrency",
    difficulty: "Hard",
    explanation: "FDW allows PostgreSQL to access data stored in external data sources (remote PostgreSQL instances, MySQL, Redis, CSV files, S3) as if they were local tables, enabling distributed federated SQL queries."
  },
  {
    id: 33,
    question: "What is `ARRAY` data type and how are array containment queries executed?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "PostgreSQL supports native arrays (`tags text[]`). Filtered using containment operators (`WHERE tags @> ARRAY['react']`), overlap (`&&`), or `ANY(tags)`, indexed using GIN."
  },
  {
    id: 34,
    question: "What is `pgvector` and how does it support AI/ML Vector Embeddings?",
    category: "Extensions",
    difficulty: "Medium",
    explanation: "`pgvector` is an open-source extension adding a `vector(dim)` datatype for storing AI embeddings (from OpenAI, Gemini, BERT). It provides vector similarity metrics (Cosine distance `<=>`, L2 distance `<->`, Inner product `<#>`) and indexes via HNSW and IVFFlat."
  },
  {
    id: 35,
    question: "What is the difference between HNSW and IVFFlat vector indexes in `pgvector`?",
    category: "Extensions",
    difficulty: "Hard",
    explanation: "**IVFFlat** clusters vectors into inverted lists; fast build time but requires training data and lower recall. **HNSW (Hierarchical Navigable Small World)** builds a multi-layer graph; uses more memory and takes longer to build, but delivers near-100% recall and ultra-fast sub-millisecond query latency."
  },
  {
    id: 36,
    question: "What is the `hstore` extension in PostgreSQL?",
    category: "Extensions",
    difficulty: "Easy",
    explanation: "`hstore` is the legacy key-value store extension in PostgreSQL preceding `JSONB`. It stores flat string key-value pairs (`'k1 => v1, k2 => v2'`), now largely superseded by `JSONB` for nested objects."
  },
  {
    id: 37,
    question: "What is `uuid-ossp` vs native `gen_random_uuid()` in PostgreSQL 13+?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "In older versions, generating UUIDs required enabling the `uuid-ossp` extension (`uuid_generate_v4()`). PostgreSQL 13+ includes native built-in `gen_random_uuid()` in core with zero extension dependencies."
  },
  {
    id: 38,
    question: "What is `statement_timeout` and `lock_timeout`?",
    category: "Performance & Scaling",
    difficulty: "Medium",
    explanation: "`statement_timeout = '5s'` aborts any query running longer than 5 seconds. `lock_timeout = '2s'` aborts queries waiting more than 2 seconds to acquire a table lock, preventing DDL migrations from queueing up behind long transactions and blocking production traffic."
  },
  {
    id: 39,
    question: "What is the `FILLFACTOR` table and index storage parameter?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "Default `FILLFACTOR = 100` packs pages completely full. Setting `FILLFACTOR = 80` leaves 20% free space in each page for future `UPDATE` operations, enabling HOT (Heap-Only Tuple) optimization and drastically reducing index update fragmentation."
  },
  {
    id: 40,
    question: "What is a Checkpoint in PostgreSQL and how is `checkpoint_completion_target` tuned?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "A checkpoint flushes dirty shared buffer pages to disk and writes a checkpoint record to WAL. Setting `checkpoint_completion_target = 0.9` spreads disk I/O writes smoothly across 90% of the checkpoint interval, eliminating I/O spikes."
  },
  {
    id: 41,
    question: "What is `pg_repack` and how does it rebuild bloated tables without exclusive locks?",
    category: "Storage & Maintenance",
    difficulty: "Hard",
    explanation: "`pg_repack` reorganizes tables on disk and removes dead tuple bloat online by creating a shadow copy table, capturing concurrent changes via triggers, and swapping table files with only a momentary metadata lock, avoiding `VACUUM FULL` downtime."
  },
  {
    id: 42,
    question: "What is the `search_path` setting and how does Schema resolution work?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "`search_path = '$user, public'` defines the order in which PostgreSQL searches schemas for unqualified table names (e.g. `SELECT * FROM users`), allowing multi-tenant schemas inside a single database."
  },
  {
    id: 43,
    question: "What is `RETURNING` clause in PostgreSQL `INSERT`, `UPDATE`, `DELETE` statements?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "`INSERT INTO users(name) VALUES('John') RETURNING id, created_at;` immediately returns computed or auto-generated column values in the response, eliminating the need for a secondary `SELECT` query."
  },
  {
    id: 44,
    question: "What is the difference between `SERIAL` and `IDENTITY` columns in PostgreSQL?",
    category: "Data Types",
    difficulty: "Easy",
    explanation: "`SERIAL` is legacy syntax that creates an implicit sequence object. `GENERATED ALWAYS AS IDENTITY` is the SQL standard conforming implementation, preventing accidental manual inserts into the ID column without `OVERRIDING SYSTEM VALUE`."
  },
  {
    id: 45,
    question: "What is `pg_terminate_backend()` vs `pg_cancel_backend()`?",
    category: "Performance & Scaling",
    difficulty: "Easy",
    explanation: "`pg_cancel_backend(pid)` sends a `SIGINT` to gracefully cancel the currently running query on that connection. `pg_terminate_backend(pid)` sends a `SIGTERM` to forcibly kill the entire OS backend process and close the client socket."
  },
  {
    id: 46,
    question: "What is Point-In-Time Recovery (PITR) in PostgreSQL?",
    category: "Replication & HA",
    difficulty: "Hard",
    explanation: "PITR restores a base physical backup and replays archived continuous WAL logs up to an exact target timestamp (`recovery_target_time = '...'`) or named restore point, allowing recovery to the exact second before an accidental `DROP TABLE`."
  },
  {
    id: 47,
    question: "What are Advisory Locks in PostgreSQL (`pg_advisory_lock`)?",
    category: "Architecture & Concurrency",
    difficulty: "Medium",
    explanation: "Application-defined locks controlled via integers (`pg_advisory_lock(12345)`). They have no table association and are used to synchronize distributed application tasks (e.g., ensuring a cron job runs on only one backend instance) with zero table overhead."
  },
  {
    id: 48,
    question: "What is `pg_wal` (formerly `pg_xlog`) directory?",
    category: "Storage & Maintenance",
    difficulty: "Medium",
    explanation: "The physical directory storing 16MB WAL segment files. If disk space runs out in `pg_wal`, the PostgreSQL cluster immediately shuts down to prevent data corruption."
  },
  {
    id: 49,
    question: "What is the difference between `synchronous_commit = on` vs `off`?",
    category: "Performance & Scaling",
    difficulty: "Hard",
    explanation: "`on` guarantees a transaction is flushed to WAL on disk before returning success to the client (100% durable). `off` delays disk sync by `wal_writer_delay` (~200ms), giving a massive write throughput boost with the minor trade-off that a server crash might lose the last 200ms of committed data."
  },
  {
    id: 50,
    question: "What is `JIT` (Just-In-Time) compilation in PostgreSQL 11+?",
    category: "Performance & Scaling",
    difficulty: "Hard",
    explanation: "PostgreSQL uses LLVM to JIT-compile complex expressions and tuple deforming code in analytical queries. While beneficial for long-running OLAP queries, JIT adds 10-30ms compile overhead to short OLTP queries, which is why `jit = off` is often recommended for low-latency web backends."
  }
];
