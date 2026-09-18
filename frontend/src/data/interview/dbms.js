/**
 * 50 High-Value DBMS Concepts Interview Questions
 */

export const DBMS_QUESTIONS = [
  {
    id: 1,
    question: "What are the ACID properties of database transactions?",
    category: "Transactions & ACID",
    difficulty: "Easy",
    explanation: "**Atomicity**: all operations in a transaction succeed or all roll back ('all-or-nothing'). **Consistency**: database transitions from one valid state to another, preserving integrity constraints. **Isolation**: concurrent transactions execute independently without interference. **Durability**: once committed, changes survive system crashes and power failures."
  },
  {
    id: 2,
    question: "What are the common Concurrency Anomalies (Dirty Read, Non-Repeatable Read, Phantom Read)?",
    category: "Transactions & ACID",
    difficulty: "Medium",
    explanation: "**Dirty Read**: Transaction reads uncommitted changes made by another concurrent transaction (which might later roll back). **Non-Repeatable Read**: Transaction re-reads the *same row* and discovers modified column values. **Phantom Read**: Transaction re-executes a range query and discovers *new rows* inserted or deleted by another committed transaction."
  },
  {
    id: 3,
    question: "What is Serializability and conflict serializability in DBMS?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "A concurrent schedule is **serializable** if its final database state is equivalent to some serial execution of those transactions. A schedule is **conflict serializable** if it can be transformed into a serial schedule by swapping non-conflicting adjacent operations (tested via acyclic Precedence Graphs)."
  },
  {
    id: 4,
    question: "What is the Two-Phase Locking (2PL) protocol and Strict 2PL?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "2PL guarantees conflict serializability across 2 phases: 1) **Growing Phase** (transactions acquire locks, cannot release locks), 2) **Shrinking Phase** (transactions release locks, cannot acquire locks). **Strict 2PL** holds all exclusive write locks until the transaction commits/aborts, preventing cascading rollbacks."
  },
  {
    id: 5,
    question: "What is a Deadlock in DBMS and what are the 4 Coffman conditions?",
    category: "Deadlocks & Recovery",
    difficulty: "Medium",
    explanation: "Deadlock occurs when 2+ transactions wait cyclically for resources locked by each other. The 4 required conditions are: 1) **Mutual Exclusion**, 2) **Hold and Wait**, 3) **No Preemption**, and 4) **Circular Wait**. Broken via Wait-Die/Wound-Wait schemes or Wait-For Graph cycle detection with victim termination."
  },
  {
    id: 6,
    question: "What is the difference between Wait-Die and Wound-Wait deadlock prevention schemes?",
    category: "Deadlocks & Recovery",
    difficulty: "Hard",
    explanation: "Both use transaction timestamps (older transactions have higher priority): **Wait-Die (Non-preemptive)**: If older requests lock held by younger, older *waits*; if younger requests lock held by older, younger *dies* (rolls back). **Wound-Wait (Preemptive)**: If older requests lock held by younger, older *wounds* (forces rollback on) younger; if younger requests lock held by older, younger *waits*."
  },
  {
    id: 7,
    question: "What is the Write-Ahead Logging (WAL) protocol and the ARIES recovery algorithm?",
    category: "Deadlocks & Recovery",
    difficulty: "Hard",
    explanation: "WAL mandates that log records must be flushed to disk before corresponding dirty data pages are written. **ARIES** recovery operates in 3 phases after a crash: 1) **Analysis** (determines active transactions and dirty pages at checkpoint), 2) **Redo** (repeats history forward from oldest unwritten log), 3) **Undo** (rolls back all uncommitted active transactions)."
  },
  {
    id: 8,
    question: "What is the difference between Shared (S) locks and Exclusive (X) locks?",
    category: "Concurrency Control",
    difficulty: "Easy",
    explanation: "A **Shared (S) Lock** is acquired for reading: multiple transactions can hold shared locks on the same resource concurrently. An **Exclusive (X) Lock** is acquired for writing/modifying: only one transaction can hold an exclusive lock, blocking all other read and write locks."
  },
  {
    id: 9,
    question: "What are Intent Locks (IS, IX, SIX) in Multi-Granularity Locking?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "Multi-granularity locking allows locking at different hierarchy levels (Database > Table > Page > Row). **Intent Shared (IS)** and **Intent Exclusive (IX)** locks are placed on parent nodes (table) to signal that a transaction intends to lock fine-grained child nodes (rows), preventing other transactions from acquiring incompatible table-level locks."
  },
  {
    id: 10,
    question: "What is the B-Tree vs B+ Tree data structure in database indexing?",
    category: "Storage & Indexing",
    difficulty: "Medium",
    explanation: "In a **B-Tree**, keys and actual record pointers are stored in both internal nodes and leaf nodes. In a **B+ Tree**, internal nodes store *only routing keys*, all actual data pointers reside *exclusively in leaf nodes*, and leaf nodes are linked via a doubly linked list, providing faster range scans and higher branching factors."
  },
  {
    id: 11,
    question: "What is Functional Dependency and Armstrong's Axioms in Normalization?",
    category: "Normalization",
    difficulty: "Medium",
    explanation: "A functional dependency `X -> Y` states that the value of attribute `X` uniquely determines the value of `Y`. **Armstrong's Axioms** are sound and complete rules for deriving dependencies: 1) **Reflexivity** (if `Y <= X`, then `X -> Y`), 2) **Augmentation** (if `X -> Y`, then `XZ -> YZ`), 3) **Transitivity** (if `X -> Y` and `Y -> Z`, then `X -> Z`)."
  },
  {
    id: 12,
    question: "What is the difference between 3NF (Third Normal Form) and BCNF (Boyce-Codd Normal Form)?",
    category: "Normalization",
    difficulty: "Hard",
    explanation: "In **3NF**, for every non-trivial functional dependency `X -> Y`, either `X` is a superkey OR `Y` is a prime attribute (part of a candidate key). **BCNF** is stricter: `X` **must be a superkey** in all non-trivial dependencies `X -> Y`, eliminating redundancies caused by overlapping candidate keys."
  },
  {
    id: 13,
    question: "What is Lossless Join Decomposition and Dependency Preservation?",
    category: "Normalization",
    difficulty: "Hard",
    explanation: "**Lossless Join** guarantees that decomposing relation `R` into `R1` and `R2` allows reconstructing the exact original `R` via natural join without generating spurious false rows (verified if `R1 INTERSECT R2` is a superkey of `R1` or `R2`). **Dependency Preservation** ensures all original functional dependencies can be enforced without joining tables."
  },
  {
    id: 14,
    question: "What is the Buffer Pool Manager in a DBMS and what is the LRU-K / 2Q page replacement policy?",
    category: "Storage & Indexing",
    difficulty: "Hard",
    explanation: "The Buffer Manager caches fixed-size disk pages (typically 4KB–8KB) in RAM memory frames. Standard LRU suffers from 'sequential scan pollution' (a single large table scan evicts the entire hot cache). **LRU-2 / 2Q** tracks the timestamp of the *last 2 accesses*, requiring a page to be accessed twice before entering the hot queue."
  },
  {
    id: 15,
    question: "What is the difference between Dense Index and Sparse Index?",
    category: "Storage & Indexing",
    difficulty: "Medium",
    explanation: "A **Dense Index** contains an index entry for *every single search key value* in the data file. A **Sparse Index** contains index entries only for *some of the records* (typically one entry per data block/page), requiring the data file to be physically sorted by search key."
  },
  {
    id: 16,
    question: "What is the CAP Theorem in Distributed Databases?",
    category: "Distributed DBMS",
    difficulty: "Medium",
    explanation: "The CAP theorem states that a distributed data store can simultaneously provide at most two of the following three guarantees during a network partition: **Consistency** (all nodes return the latest write), **Availability** (every non-failing node returns a response), and **Partition Tolerance** (system continues operating despite network message drops)."
  },
  {
    id: 17,
    question: "What is PACELC Theorem in Distributed Systems?",
    category: "Distributed DBMS",
    difficulty: "Hard",
    explanation: "PACELC extends the CAP theorem: **If there is a Partition (P)**, trade off **Availability (A)** vs **Consistency (C)**; **Else (E)**, trade off **Latency (L)** vs **Consistency (C)** (e.g. MongoDB is PC/EC; Cassandra is PA/EL)."
  },
  {
    id: 18,
    question: "What is the Two-Phase Commit (2PC) protocol in Distributed Transactions?",
    category: "Distributed DBMS",
    difficulty: "Hard",
    explanation: "2PC coordinates distributed transaction commits across multiple independent nodes: 1) **Prepare Phase**: Coordinator asks all cohort nodes 'Can you commit?'; nodes write undo/redo logs and reply VOTE_COMMIT or VOTE_ABORT. 2) **Commit Phase**: If all voted commit, coordinator sends GLOBAL_COMMIT; otherwise sends GLOBAL_ABORT. Drawback: blocking if coordinator crashes."
  },
  {
    id: 19,
    question: "What is the difference between Pessimistic Concurrency Control and Timestamp Ordering (T/O)?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "Pessimistic locking uses locks to delay conflicting transactions. **Timestamp Ordering (Basic T/O)** assigns timestamps `TS(T)` on arrival and validates that read/write operations execute in strict timestamp order: if a transaction attempts to read/write a value written by a newer transaction, it is aborted and restarted with a new timestamp."
  },
  {
    id: 20,
    question: "What is the difference between Slotted-Page Architecture and Log-Structured (LSM-Tree) Storage?",
    category: "Storage & Indexing",
    difficulty: "Hard",
    explanation: "**Slotted-Page** (used in PostgreSQL/MySQL) stores records in fixed disk pages with an array of slot offset pointers at the page header (in-place updates). **LSM-Tree** (used in RocksDB/Cassandra) writes all mutations to an in-memory **MemTable** (SSTable) and append-only WAL, flushing immutable sorted runs to disk, delivering 10x faster write throughput."
  },
  {
    id: 21,
    question: "What are the 3 Levels of Data Abstraction in DBMS (ANSI/SPARC Architecture)?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "1) **External Level (View Level)**: Describes how individual end-users or application views perceive the data. 2) **Conceptual Level (Logical Level)**: Describes *what* data is stored in the database and the relationships between entities. 3) **Internal Level (Physical Level)**: Describes *how* data is physically stored on disk (B-Trees, page layouts, file organizations)."
  },
  {
    id: 22,
    question: "What is Data Independence (Physical vs Logical)?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "**Physical Data Independence**: The ability to modify physical storage structures (indexes, file organization, partitioning) without altering the logical conceptual schema. **Logical Data Independence**: The ability to modify the conceptual schema (adding columns/tables) without breaking external views or application queries."
  },
  {
    id: 23,
    question: "What is a Foreign Key Constraint and Referential Integrity?",
    category: "Schema Design",
    difficulty: "Easy",
    explanation: "Referential integrity dictates that any value of a foreign key attribute in a referencing table must either match an existing primary key value in the referenced table or be `NULL`, preventing orphaned child records."
  },
  {
    id: 24,
    question: "What is Relational Algebra and what are the 5 basic operators?",
    category: "Relational Algebra & SQL",
    difficulty: "Medium",
    explanation: "Relational Algebra is the formal mathematical procedural query language underlying SQL. The 5 fundamental primitive operators are: 1) **Selection** (`sigma`), 2) **Projection** (`pi`), 3) **Union** (`union`), 4) **Set Difference** (`-`), and 5) **Cartesian Product** (`x`)."
  },
  {
    id: 25,
    question: "What is a Candidate Key, Primary Key, and Super Key?",
    category: "Schema Design",
    difficulty: "Easy",
    explanation: "A **Super Key** is any set of attributes that uniquely identifies a row. A **Candidate Key** is a *minimal superkey* (no redundant attributes). The **Primary Key** is the single candidate key chosen by the database designer to uniquely identify records across the table."
  },
  {
    id: 26,
    question: "What is a Hash Index and how does Extensible Hashing work?",
    category: "Storage & Indexing",
    difficulty: "Hard",
    explanation: "A Hash Index uses a hash function to map keys to bucket addresses (O(1) exact equality lookup, but cannot support range queries). **Extendible Hashing** uses a directory of pointers and global/local depth bits to dynamically split individual buckets without rehashing the entire database."
  },
  {
    id: 27,
    question: "What is the difference between Write Skew and Phantom Reads?",
    category: "Transactions & ACID",
    difficulty: "Hard",
    explanation: "A Phantom Read occurs when a query range finds new rows inserted by another transaction. **Write Skew** occurs in Snapshot Isolation when two concurrent transactions read overlapping data, make disjoint writes based on constraints (e.g. two doctors concurrently booking off-call assuming the other is on duty), and both commit, violating the global business rule."
  },
  {
    id: 28,
    question: "What is Snapshot Isolation (SI)?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "Under Snapshot Isolation, each transaction reads from a private snapshot of the database taken at transaction start time. Writes are tracked in a write set; at commit time, if a write-write conflict is detected with another concurrent committed transaction ('first-committer-wins'), the transaction aborts."
  },
  {
    id: 29,
    question: "What is Database Query Optimization and Cost-Based Optimizer (CBO)?",
    category: "Storage & Indexing",
    difficulty: "Hard",
    explanation: "A CBO parses SQL into an Abstract Syntax Tree (AST), generates multiple algebraically equivalent relational execution trees (exploring join orders via dynamic programming / Selinger algorithm), estimates I/O and CPU cost using column histogram statistics, and picks the cheapest execution plan."
  },
  {
    id: 30,
    question: "What is the difference between Primary Index and Secondary Index?",
    category: "Storage & Indexing",
    difficulty: "Medium",
    explanation: "A **Primary Index** is built on the physically ordered primary key field of the file (usually clustered). A **Secondary Index** is built on non-ordering attributes, storing key values paired with record pointers or primary keys, requiring an additional index traversal."
  },
  {
    id: 31,
    question: "What is Multi-Valued Dependency (MVD) and 4NF (Fourth Normal Form)?",
    category: "Normalization",
    difficulty: "Hard",
    explanation: "An MVD `X ->-> Y` occurs when attribute `X` determines a set of independent values for `Y` regardless of other attributes. A relation is in **4NF** if it is in BCNF and contains no non-trivial multi-valued dependencies."
  },
  {
    id: 32,
    question: "What is Join Dependency (JD) and 5NF (Project-Join Normal Form)?",
    category: "Normalization",
    difficulty: "Hard",
    explanation: "A relation is in **5NF (PJNF)** if every join dependency in the relation is implied by its candidate keys, ensuring that decomposing the table into smaller tables and joining them back together does not lose semantic integrity."
  },
  {
    id: 33,
    question: "What is Star Schema vs Snowflake Schema in Data Warehousing?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "**Star Schema**: Contains a central Fact Table connected directly to denormalized single-table Dimension Tables (fast, simpler joins). **Snowflake Schema**: Normalizes dimension tables into multiple sub-tables (saves disk space, but requires more joins)."
  },
  {
    id: 34,
    question: "What is the difference between Heap File Organization and Sequential File Organization?",
    category: "Storage & Indexing",
    difficulty: "Easy",
    explanation: "**Heap File**: Records are inserted wherever free space is available in disk blocks without sorting (fast inserts O(1), slow linear search O(N)). **Sequential File**: Records are physically sorted on disk by a search key (fast binary search, slow expensive inserts requiring page reorganization)."
  },
  {
    id: 35,
    question: "What is Optimistic Concurrency Control (OCC) validation phases?",
    category: "Concurrency Control",
    difficulty: "Hard",
    explanation: "OCC assumes conflicts are rare and executes transactions in 3 phases: 1) **Read Phase** (reads from DB, writes to local private workspace), 2) **Validation Phase** (checks if any concurrent transaction modified conflicting data), 3) **Write Phase** (commits local writes to database if validated; otherwise aborts)."
  },
  {
    id: 36,
    question: "What is a Checkpoint in Database Recovery?",
    category: "Deadlocks & Recovery",
    difficulty: "Medium",
    explanation: "A checkpoint flushes dirty buffer pages from memory to disk and writes a sync record to the log. During crash recovery, the recovery manager does not need to scan the entire log history from the beginning of time; it only scans forward from the most recent checkpoint."
  },
  {
    id: 37,
    question: "What is the difference between Steal/No-Steal and Force/No-Force buffer management policies?",
    category: "Deadlocks & Recovery",
    difficulty: "Hard",
    explanation: "**Steal**: Frame manager can flush uncommitted dirty pages to disk to free RAM (requires Undo logging). **No-Steal**: Uncommitted pages are never written to disk. **Force**: All updated pages must be flushed to disk before transaction commits. **No-Force** (standard in modern DBMS): Pages can remain dirty in memory across commits (requires Redo logging)."
  },
  {
    id: 38,
    question: "What is a Cascade Rollback (Cascading Aborts) and how is it avoided?",
    category: "Transactions & ACID",
    difficulty: "Medium",
    explanation: "Cascading aborts occur when transaction `T1` aborts, forcing all subsequent transactions that read `T1`'s uncommitted writes to abort recursively. Avoided by using **Cascadeless Schedules (Strict 2PL)**, which restrict reads to only committed data."
  },
  {
    id: 39,
    question: "What is the difference between Strong Consistency and Eventual Consistency?",
    category: "Distributed DBMS",
    difficulty: "Medium",
    explanation: "**Strong Consistency**: Any read operation immediately returns the value of the most recent write across all nodes. **Eventual Consistency**: If no new updates are made, all replicas will eventually converge and return the same data after network replication lag."
  },
  {
    id: 40,
    question: "What is Vector Clocks in Distributed Databases?",
    category: "Distributed DBMS",
    difficulty: "Hard",
    explanation: "Vector clocks are arrays of logical timestamps maintained on each distributed node to establish causal ordering of events and detect concurrent write conflicts without relying on synchronized physical wall clocks."
  },
  {
    id: 41,
    question: "What is Column-Family (Wide-Column) Storage (Apache Cassandra / HBase)?",
    category: "Architecture & Data Model",
    difficulty: "Medium",
    explanation: "Wide-column stores organize data into rows with dynamic, sparse columns grouped into column families. They use LSM-Trees and distributed consistent hashing (ring topology), providing linear horizontal write scalability across thousands of nodes."
  },
  {
    id: 42,
    question: "What is Graph Database (Neo4j) vs Relational Database?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "Graph databases store data as **Nodes (entities)**, **Edges (relationships)**, and **Properties** using **Index-Free Adjacency** (each node maintains direct physical memory pointers to adjacent nodes), traversing deep multi-hop relationships in O(1) time without expensive SQL JOIN tables."
  },
  {
    id: 43,
    question: "What is the difference between Optimistic Lock and Pessimistic Lock in DBMS?",
    category: "Concurrency Control",
    difficulty: "Easy",
    explanation: "Pessimistic locking locks data before reading/modifying to prevent conflicts (best for high-contention write systems). Optimistic locking allows unrestricted reads and checks version numbers at commit time (best for low-contention, high-read web apps)."
  },
  {
    id: 44,
    question: "What is the purpose of Database Catalog (Data Dictionary)?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "The system catalog stores database metadata (table schemas, column data types, user privileges, index definitions, and table statistics used by the query optimizer)."
  },
  {
    id: 45,
    question: "What is Two-Tier vs Three-Tier DBMS Architecture?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "**Two-Tier (Client-Server)**: Client application directly connects to the DBMS server (e.g. desktop ODBC apps). **Three-Tier**: Client (browser) communicates with an intermediate Application Server (Node/Django/Spring), which executes business logic and queries the database server."
  },
  {
    id: 46,
    question: "What is the difference between Partial Dependency and Transitive Dependency?",
    category: "Normalization",
    difficulty: "Medium",
    explanation: "**Partial Dependency**: A non-key attribute depends on only a *portion of a composite primary key* (violates 2NF). **Transitive Dependency**: A non-key attribute depends on another *non-key attribute* (`A -> B` and `B -> C`, violates 3NF)."
  },
  {
    id: 47,
    question: "What is Bloom Filter and how do databases use it to reduce disk reads?",
    category: "Storage & Indexing",
    difficulty: "Hard",
    explanation: "A Bloom Filter is a space-efficient probabilistic data structure that tests whether an element is a member of a set. It can return false positives ('may be in set') but **never false negatives** ('definitely not in set'), allowing database storage engines (RocksDB, Cassandra, Postgres) to skip reading disk SSTables if the key is not present."
  },
  {
    id: 48,
    question: "What is Row-Oriented vs Column-Oriented Storage format?",
    category: "Storage & Indexing",
    difficulty: "Medium",
    explanation: "**Row-Oriented** (PostgreSQL, MySQL) stores entire rows adjacently on disk (fast for writing and reading single complete records). **Column-Oriented** (Parquet, ClickHouse, Snowflake) stores all values of a single column adjacently on disk, providing massive compression ratios and ultra-fast aggregation scans across millions of rows."
  },
  {
    id: 49,
    question: "What is Phantom Deadlock in Distributed Databases?",
    category: "Deadlocks & Recovery",
    difficulty: "Hard",
    explanation: "In distributed systems where local wait-for graphs are sent to a central coordinator with network delays, transient lock release messages can arrive out-of-order, causing the coordinator to detect and break a 'phantom' deadlock cycle that no longer exists in reality."
  },
  {
    id: 50,
    question: "What is Read-After-Write (Read-Your-Own-Writes) Consistency in Distributed Systems?",
    category: "Distributed DBMS",
    difficulty: "Medium",
    explanation: "A consistency guarantee ensuring that if a user updates data, any subsequent read issued by that same user will always reflect their update (commonly implemented by routing user reads to the primary node for 5 seconds after a write before falling back to read-replicas)."
  }
];
