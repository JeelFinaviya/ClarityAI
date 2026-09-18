/**
 * 50 High-Value MongoDB Interview Questions
 */

export const MONGODB_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between SQL relational databases and MongoDB (Document Model)?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "SQL databases store structured data in rigid tabular rows and columns with enforced schemas and joins. MongoDB stores flexible, schema-less JSON-like BSON (Binary JSON) documents in collections, supporting deeply nested sub-documents, arrays, dynamic schemas, and horizontal scaling via sharding."
  },
  {
    id: 2,
    question: "What is BSON and why does MongoDB use BSON instead of plain JSON?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "BSON is a binary-encoded serialization of JSON-like documents. It extends JSON with extra datatypes (`ObjectId`, `Date`, `BinData`, `Decimal128`, `Long`) and includes length prefixes for fast traversal and indexing without parsing strings."
  },
  {
    id: 3,
    question: "What is the structure of an `ObjectId` in MongoDB?",
    category: "Architecture & Data Model",
    difficulty: "Medium",
    explanation: "An `ObjectId` is a 12-byte unique identifier composed of: 1) **4-byte timestamp** (seconds since Unix epoch), 2) **5-byte random value** (unique to machine and process), 3) **3-byte incrementing counter** (initialized randomly). Because of the leading timestamp, ObjectIds are naturally roughly time-ordered."
  },
  {
    id: 4,
    question: "When should you Embed Documents vs Reference Documents (Data Modeling)?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "**Embed (Denormalization)** for: 1:1 or 1:few relationships (addresses, line items), data that is read together, and atomic update needs. **Reference (Normalization via `$lookup`)** for: 1:Many, Many:Many relationships, large or unbounded arrays (preventing 16MB document size limit), and data that changes frequently."
  },
  {
    id: 5,
    question: "What is the 16MB Document Size Limit in MongoDB and how do you handle larger files?",
    category: "Architecture & Data Model",
    difficulty: "Medium",
    explanation: "A single BSON document cannot exceed **16MB** to prevent RAM bloat and preserve network performance. For storing larger binary files (videos, PDFs, images >16MB), use **GridFS** (which splits files into 255KB chunks across `fs.chunks` and `fs.files` collections) or cloud object storage (AWS S3)."
  },
  {
    id: 6,
    question: "How does the MongoDB Aggregation Pipeline work?",
    category: "Aggregation Pipeline",
    difficulty: "Medium",
    explanation: "The Aggregation Pipeline processes documents sequentially through multi-stage transformations: `$match` (filters), `$project` (selects/reshapes), `$group` (aggregates by key), `$sort`, `$unwind` (deconstructs arrays), `$lookup` (left outer join), `$facet` (multi-faceted analytics), and `$out` (writes result to collection)."
  },
  {
    id: 7,
    question: "What is the `$lookup` aggregation stage and how does it perform joins?",
    category: "Aggregation Pipeline",
    difficulty: "Medium",
    explanation: "`$lookup: { from: 'orders', localField: '_id', foreignField: 'userId', as: 'userOrders' }` performs a left outer join between two collections within the same database, embedding matching joined documents as an array in the output."
  },
  {
    id: 8,
    question: "What are MongoDB Index types (Single Field, Compound, Multikey, Geospatial, Text)?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "1) **Single Field**: index on one field (`{ email: 1 }`). 2) **Compound**: index on multiple fields (`{ status: 1, createdAt: -1 }`). 3) **Multikey**: index on array fields (indexes each array element). 4) **Geospatial**: `2dsphere` for spherical GPS queries (`$near`, `$geoWithin`). 5) **Text**: full-text search."
  },
  {
    id: 9,
    question: "What is the Equality, Sort, Range (ESR) rule for Compound Indexes?",
    category: "Indexing",
    difficulty: "Hard",
    explanation: "When designing compound indexes: 1) Place fields queried with **Equality (`$eq`)** first, 2) Place fields used for **Sorting (`.sort()`)** second, 3) Place fields with **Range queries (`$gt`, `$in`)** last. Violating ESR forces MongoDB to perform memory-intensive in-memory sorts."
  },
  {
    id: 10,
    question: "What is a TTL (Time-To-Live) Index in MongoDB?",
    category: "Indexing",
    difficulty: "Easy",
    explanation: "`db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })` is a single-field index on a Date field where a background thread automatically deletes expired documents after the specified elapsed seconds (ideal for session stores and cache logs)."
  },
  {
    id: 11,
    question: "What is a Replica Set in MongoDB and how does Automated Failover work?",
    category: "Replication & High Availability",
    difficulty: "Hard",
    explanation: "A Replica Set consists of **1 Primary** node (handles all writes) and **multiple Secondary** nodes (replicate operations via `oplog.rs`). If the Primary heartbeats fail for >10 seconds, secondaries hold an automated consensus election via Raft-like algorithm to elect a new Primary with zero manual intervention."
  },
  {
    id: 12,
    question: "What is the `oplog` (Operations Log) in MongoDB replication?",
    category: "Replication & High Availability",
    difficulty: "Hard",
    explanation: "The `oplog.rs` is a special capped collection in the `local` database that records a rolling idempotent log of all write operations applied to the primary. Secondary nodes continuously tail and replay the oplog asynchronously to stay synchronized."
  },
  {
    id: 13,
    question: "What is Sharding in MongoDB and what are the 3 main components?",
    category: "Sharding & Scaling",
    difficulty: "Hard",
    explanation: "Sharding horizontally partitions data across multiple servers. Components: 1) **Mongos Router**: stateless query router directing client requests. 2) **Config Servers**: replica set storing cluster metadata and chunk routing tables. 3) **Shard Nodes**: replica sets holding individual data chunks."
  },
  {
    id: 14,
    question: "What is a Shard Key and what makes a good vs bad Shard Key?",
    category: "Sharding & Scaling",
    difficulty: "Hard",
    explanation: "The Shard Key determines how documents are distributed into chunks. A good shard key has **high cardinality**, **balanced frequency**, and non-monotonically increasing values (hashed shard keys). Monotonically increasing keys (like timestamps or auto-incrementing IDs) create write hotspots on a single shard."
  },
  {
    id: 15,
    question: "What is Write Concern (`w: 1`, `w: 'majority'`) and Read Concern (`'local'`, `'majority'`)?",
    category: "Transactions & Consistency",
    difficulty: "Hard",
    explanation: "**Write Concern** describes the level of acknowledgement requested from MongoDB before returning success (`w: 'majority'` guarantees writes are written to a majority of replica nodes). **Read Concern** controls data isolation (`'majority'` reads data committed to a majority of nodes, preventing dirty reads of rolled-back writes)."
  },
  {
    id: 16,
    question: "What is Read Preference (`primary`, `secondary`, `nearest`)?",
    category: "Replication & High Availability",
    difficulty: "Medium",
    explanation: "`primary` (default, all reads from primary for strict consistency). `secondary` (offloads reads to secondaries, subject to replication lag). `secondaryPreferred`. `nearest` (reads from the node with the lowest network ping latency)."
  },
  {
    id: 17,
    question: "What is the WiredTiger Storage Engine in MongoDB?",
    category: "Architecture & Data Model",
    difficulty: "Hard",
    explanation: "WiredTiger is MongoDB's default pluggable storage engine. It provides document-level concurrency control (lock-free optimistic concurrency), snappy/zlib compression on disk (reducing storage by up to 80%), and an in-memory cache."
  },
  {
    id: 18,
    question: "What are Multi-Document ACID Transactions in MongoDB 4.0+?",
    category: "Transactions & Consistency",
    difficulty: "Hard",
    explanation: "Starting in v4.0 (Replica Sets) and v4.2 (Sharded Clusters), MongoDB supports multi-document ACID transactions across collections using `session.startTransaction()` and `session.commitTransaction()`, utilizing snapshot isolation and two-phase commit."
  },
  {
    id: 19,
    question: "What is a Capped Collection in MongoDB?",
    category: "Architecture & Data Model",
    difficulty: "Easy",
    explanation: "`db.createCollection('logs', { capped: true, size: 5242880, max: 5000 })` is a fixed-size, circular queue collection that automatically overwrites the oldest documents once the allocated disk size or document count limit is reached, maintaining insertion order for logging and notification feeds."
  },
  {
    id: 20,
    question: "What is a Covered Query in MongoDB?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "A query where all filtered fields in the query predicate AND all returned fields in the projection are included in an index (with `_id: 0` explicitly suppressed). MongoDB satisfies the entire query from index keys in RAM without fetching raw documents."
  },
  {
    id: 21,
    question: "What is the difference between `$set`, `$unset`, `$push`, and `$pull` update operators?",
    category: "CRUD Operations",
    difficulty: "Easy",
    explanation: "`$set`: updates or creates a field value without overwriting other fields. `$unset`: deletes a field from a document. `$push`: appends an element to an array field. `$pull`: removes matching elements from an array field."
  },
  {
    id: 22,
    question: "What is the `$elemMatch` operator in query and projection?",
    category: "CRUD Operations",
    difficulty: "Medium",
    explanation: "In queries: `$elemMatch` matches documents where at least one array element satisfies *all specified criteria simultaneously* (preventing false positives from multiple different elements). In projections: it limits the array output to only the first matching element."
  },
  {
    id: 23,
    question: "What is the `$unwind` aggregation stage?",
    category: "Aggregation Pipeline",
    difficulty: "Medium",
    explanation: "`$unwind: '$tags'` deconstructs an array field from input documents to output a separate document for *each element* in the array, allowing grouping, filtering, and aggregation on individual array items."
  },
  {
    id: 24,
    question: "What is the difference between `findAndModify()` / `findOneAndUpdate()` and standard `updateOne()`?",
    category: "CRUD Operations",
    difficulty: "Medium",
    explanation: "`updateOne()` updates matching documents and returns an acknowledgement object. `findOneAndUpdate()` atomically updates the document AND returns the document itself (either pre-update or post-update via `{ returnDocument: 'after' }`), ideal for job queues and counters."
  },
  {
    id: 25,
    question: "What is Mongoose ODM and what are Mongoose Virtuals?",
    category: "Tooling & Ecosystem",
    difficulty: "Easy",
    explanation: "Mongoose is a Node.js Object Document Modeling library providing strict schemas, validation, middleware hooks, and model casting. **Virtuals** are computed document properties (e.g. `fullName` combining `first` and `last`) that can be accessed like fields but are not persisted to the MongoDB database."
  },
  {
    id: 26,
    question: "What are Mongoose Pre and Post Middleware Hooks?",
    category: "Tooling & Ecosystem",
    difficulty: "Medium",
    explanation: "Hooks executed before (`pre('save')`, used for password hashing) or after (`post('save')`, used for logging/emails) model lifecycle events (save, validate, remove, find)."
  },
  {
    id: 27,
    question: "What is the `explain('executionStats')` output in MongoDB?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "It runs the query and reports key execution metrics: `nReturned` (matching documents returned), `totalKeysExamined` (index keys scanned), `totalDocsExamined` (raw documents read from disk), and `executionTimeMillis`. An optimal query has `totalKeysExamined == nReturned` and `totalDocsExamined == 0`."
  },
  {
    id: 28,
    question: "What is a Sparse Index vs a Partial Index in MongoDB?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "**Sparse Index**: only indexes documents containing the indexed field (skips documents where field is missing). **Partial Index** (`partialFilterExpression: { rating: { $gt: 4 } }`): indexes documents that satisfy a specified filter expression, providing a more flexible and expressive alternative to sparse indexes."
  },
  {
    id: 29,
    question: "What is the purpose of `$facet` in MongoDB aggregation?",
    category: "Aggregation Pipeline",
    difficulty: "Hard",
    explanation: "`$facet` executes multiple independent aggregation sub-pipelines concurrently on the same input documents in a single query stage (e.g. generating search results, category counters, and price histogram buckets simultaneously for e-commerce filters)."
  },
  {
    id: 30,
    question: "What is an Arbiter node in a MongoDB Replica Set?",
    category: "Replication & High Availability",
    difficulty: "Medium",
    explanation: "An Arbiter participates in elections to break ties and achieve majority quorum during primary failover. It holds **no data copies**, cannot become a primary, and uses minimal resources, maintaining an odd number of voting members in 2-node data clusters."
  },
  {
    id: 31,
    question: "What is the `$text` search index and `$meta: 'textScore'`?",
    category: "Indexing",
    difficulty: "Medium",
    explanation: "A Text Index enables tokenization, stemming, and stop-word filtering across string fields. Querying with `$text: { $search: '...' }` allows sorting results by relevance using `{ score: { $meta: 'textScore' } }`."
  },
  {
    id: 32,
    question: "What is Change Streams in MongoDB?",
    category: "Architecture & Data Model",
    difficulty: "Hard",
    explanation: "`collection.watch()` opens a change stream that tails the `oplog`, emitting real-time event notifications whenever documents are inserted, updated, replaced, or deleted, used for real-time dashboards and cache invalidations."
  },
  {
    id: 33,
    question: "What is the difference between `upsert: true` and regular updates?",
    category: "CRUD Operations",
    difficulty: "Easy",
    explanation: "If `upsert: true` is set, MongoDB updates matching documents; if no document matches the query criteria, it inserts a new document combining the query filter and update operators as its initial data."
  },
  {
    id: 34,
    question: "What is the `$merge` stage in the Aggregation Pipeline?",
    category: "Aggregation Pipeline",
    difficulty: "Hard",
    explanation: "`$merge` writes the aggregation pipeline results to an existing collection, allowing incremental updates, merging on primary keys, or generating on-demand materialized summary tables across databases."
  },
  {
    id: 35,
    question: "What is `mongodump` and `mongorestore` vs `mongoexport` and `mongoimport`?",
    category: "Tooling & Ecosystem",
    difficulty: "Easy",
    explanation: "`mongodump` / `mongorestore` backup and restore binary BSON files, preserving exact data types and index definitions. `mongoexport` / `mongoimport` export and import readable JSON/CSV files, but lose BSON type fidelity."
  },
  {
    id: 36,
    question: "What is the `$expr` operator in MongoDB queries?",
    category: "CRUD Operations",
    difficulty: "Medium",
    explanation: "`$expr` allows using aggregation expressions inside standard `find()` query predicates, enabling comparisons between two fields within the *same document* (e.g. `find({ $expr: { $gt: ['$spent', '$budget'] } })`)."
  },
  {
    id: 37,
    question: "What is Document Versioning (Schema Versioning Pattern) in MongoDB?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "Adding a `schema_version: 2` integer field to documents. When the data structure changes over time, application code checks the version field and dynamically handles migrations lazily upon read/write without massive offline database migrations."
  },
  {
    id: 38,
    question: "What is the Subset Pattern in MongoDB schema design?",
    category: "Schema Design",
    difficulty: "Hard",
    explanation: "When a document has hundreds of related items (e.g., 500 reviews on a product), instead of storing all reviews or making a separate lookup, you embed only the **top 10 most recent reviews** in the main product document for instant rendering, storing older reviews in a separate collection."
  },
  {
    id: 39,
    question: "What is the Outlier Pattern in MongoDB schema design?",
    category: "Schema Design",
    difficulty: "Hard",
    explanation: "Designed for data where 99% of documents have small arrays (e.g., normal users have 100 followers), but a few outliers have millions (celebrity users). A boolean flag `has_overflow: true` diverts the outlier's extra relationships into an overflow collection to preserve standard document sizing."
  },
  {
    id: 40,
    question: "What is the difference between `bulkWrite()` and multiple `insertOne()` calls?",
    category: "CRUD Operations",
    difficulty: "Medium",
    explanation: "`bulkWrite()` sends an array of diverse write operations (`insertOne`, `updateOne`, `deleteOne`) in a single network round-trip, supporting both ordered (stops on first failure) and unordered (parallelizes writes) execution modes."
  },
  {
    id: 41,
    question: "What is `collation` in MongoDB?",
    category: "Indexing",
    difficulty: "Easy",
    explanation: "Collation specifies language-specific rules for string comparison and sorting, such as case-insensitivity (`{ locale: 'en', strength: 2 }`) and accent-handling."
  },
  {
    id: 42,
    question: "What is MongoDB Atlas?",
    category: "Tooling & Ecosystem",
    difficulty: "Easy",
    explanation: "MongoDB Atlas is the fully managed multi-cloud database service provided by MongoDB Inc., handling automated provisioning, scaling, backups, encryption, vector search, and global clusters on AWS, GCP, and Azure."
  },
  {
    id: 43,
    question: "What is Field-Level Encryption (CSFLE) in MongoDB?",
    category: "Security",
    difficulty: "Hard",
    explanation: "Client-Side Field-Level Encryption (CSFLE) encrypts sensitive document fields (credit cards, SSNs) inside the application driver *before* sending data over the network, ensuring the database engine only stores ciphertext."
  },
  {
    id: 44,
    question: "What is the `$graphLookup` aggregation stage?",
    category: "Aggregation Pipeline",
    difficulty: "Hard",
    explanation: "`$graphLookup` performs recursive searches on collections, traversing graph relationships (social friend-of-a-friend networks, organizational hierarchies) up to a specified `maxDepth` in a single aggregation step."
  },
  {
    id: 45,
    question: "What is the difference between `insertMany()` with `ordered: true` vs `ordered: false`?",
    category: "CRUD Operations",
    difficulty: "Medium",
    explanation: "`ordered: true` (default) inserts documents serially and aborts immediately if any document encounters an error (like duplicate key). `ordered: false` attempts to insert all documents in parallel, reporting errors at the end while successfully inserting non-failing documents."
  },
  {
    id: 46,
    question: "What is the purpose of `$bucket` and `$bucketAuto` in aggregation?",
    category: "Aggregation Pipeline",
    difficulty: "Medium",
    explanation: "`$bucket` groups incoming documents into specified boundary ranges (histograms). `$bucketAuto` automatically determines boundary ranges to distribute documents evenly across a specified number of buckets."
  },
  {
    id: 47,
    question: "What is Time Series Collection in MongoDB 5.0+?",
    category: "Architecture & Data Model",
    difficulty: "Medium",
    explanation: "Collections created with `{ timeseries: { timeField: 'timestamp', metaField: 'sensorId' } }` optimize storage of time-series measurements using columnar compression in underlying buckets, reducing disk space by up to 90%."
  },
  {
    id: 48,
    question: "What is the `$sample` aggregation stage?",
    category: "Aggregation Pipeline",
    difficulty: "Easy",
    explanation: "`$sample: { size: 5 }` randomly selects the specified number of documents from its input collection using random pseudo-index selection when possible."
  },
  {
    id: 49,
    question: "What is the `cursor.batchSize()` method?",
    category: "CRUD Operations",
    difficulty: "Easy",
    explanation: "`cursor.batchSize(100)` specifies the maximum number of documents returned in each network round-trip packet from the MongoDB server to the client driver as the cursor is iterated."
  },
  {
    id: 50,
    question: "What is MongoDB Vector Search (Atlas Vector Search)?",
    category: "Tooling & Ecosystem",
    difficulty: "Medium",
    explanation: "A fully integrated vector database capability in MongoDB Atlas using hierarchical k-nearest neighbor (k-NN) vector search algorithms to perform semantic search, retrieval-augmented generation (RAG), and image similarity queries on high-dimensional embeddings directly alongside operational data."
  }
];
