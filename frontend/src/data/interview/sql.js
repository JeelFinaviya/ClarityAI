/**
 * 50 High-Value SQL Interview Questions
 */

export const SQL_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, and `FULL OUTER JOIN`?",
    category: "Joins & Set Operations",
    difficulty: "Easy",
    explanation: "`INNER JOIN` returns only rows with matching keys in both tables. `LEFT JOIN` returns all rows from the left table and matched rows from the right (filling `NULL` for missing right rows). `RIGHT JOIN` returns all rows from the right table. `FULL OUTER JOIN` returns all rows from both tables, filling `NULL` wherever a match is missing."
  },
  {
    id: 2,
    question: "What is the difference between `WHERE` and `HAVING` clauses?",
    category: "Aggregation & Grouping",
    difficulty: "Easy",
    explanation: "`WHERE` filters individual rows **before** any aggregation (`GROUP BY`) occurs (cannot use aggregate functions like `SUM()`). `HAVING` filters aggregated groups **after** `GROUP BY` calculation (e.g., `HAVING COUNT(*) > 5`)."
  },
  {
    id: 3,
    question: "What are SQL Window Functions and how does the `OVER()` clause work?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "Window functions perform calculations across a set of table rows related to the current row without collapsing rows like `GROUP BY`. The `OVER (PARTITION BY department_id ORDER BY salary DESC)` clause defines how rows are partitioned into windows and ordered for ranking or running totals."
  },
  {
    id: 4,
    question: "What is the difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()`?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "For tied values (e.g., salaries of 100, 100, 90): `ROW_NUMBER()` assigns sequential unique numbers (`1, 2, 3`). `RANK()` assigns the same rank to ties and skips subsequent numbers (`1, 1, 3`). `DENSE_RANK()` assigns the same rank to ties without skipping (`1, 1, 2`)."
  },
  {
    id: 5,
    question: "What is a Common Table Expression (CTE) and how does a Recursive CTE work?",
    category: "Subqueries & CTEs",
    difficulty: "Hard",
    explanation: "A CTE (`WITH cte_name AS (...)`) defines a named temporary result set within a single statement. A **Recursive CTE** references itself via `UNION ALL` (combining an anchor member query and a recursive member query) to traverse hierarchical structures like organizational trees, graphs, and category taxonomies."
  },
  {
    id: 6,
    question: "What is the difference between `UNION` and `UNION ALL`?",
    category: "Joins & Set Operations",
    difficulty: "Easy",
    explanation: "`UNION` combines result sets from multiple `SELECT` statements and performs an expensive deduplication sort to remove duplicate rows. `UNION ALL` combines results directly without sorting or deduplication, making it significantly faster when duplicates are acceptable or impossible."
  },
  {
    id: 7,
    question: "What is a Correlated Subquery and why can it be a performance bottleneck?",
    category: "Subqueries & CTEs",
    difficulty: "Medium",
    explanation: "A correlated subquery references columns from the outer query row (`WHERE x.salary > (SELECT AVG(salary) FROM emp WHERE dept = x.dept)`). Because the inner query must re-execute **once for every single row** processed by the outer query (O(N*M)), it is often refactored into a `JOIN` or window function for speed."
  },
  {
    id: 8,
    question: "What is a Database Index (B-Tree Index) and how does it speed up queries?",
    category: "Indexing & Performance",
    difficulty: "Medium",
    explanation: "A B-Tree index is a balanced multi-way search tree data structure maintaining sorted keys with pointers to row storage. It reduces lookup complexity from O(N) full table scans to **O(log N)** disk page traversals for range queries (`BETWEEN`, `<`, `>`) and equality lookups."
  },
  {
    id: 9,
    question: "What is a Clustered Index vs a Non-Clustered (Secondary) Index?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "A **Clustered Index** defines the actual physical storage order of the data rows on disk (leaf nodes contain the real row data; only 1 clustered index per table, usually Primary Key). A **Non-Clustered Index** is a separate sorted structure whose leaf nodes contain key values and pointers/clustered keys pointing to row storage."
  },
  {
    id: 10,
    question: "What is an Index Covering Query (Covering Index)?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "A covering index contains all columns requested by a `SELECT` query (e.g., an index on `(user_id, status, created_at)` for `SELECT status FROM orders WHERE user_id = 5`). The database engine retrieves the entire result set directly from the index tree without performing secondary table lookups."
  },
  {
    id: 11,
    question: "What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`DELETE` is a DML statement that removes rows one by one, fires triggers, logs each deletion, and supports `WHERE`. `TRUNCATE` is DDL that deallocates entire data pages instantly, is faster, resets auto-increment IDs, and doesn't fire row triggers. `DROP` removes the entire table structure and data permanently from the database schema."
  },
  {
    id: 12,
    question: "What are SQL Constraints (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`)?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "Constraints enforce data integrity rules: `PRIMARY KEY` (uniquely identifies rows, non-null), `FOREIGN KEY` (enforces referential integrity), `UNIQUE` (prevents duplicate values), `CHECK` (validates boolean conditions like `age >= 18`), `NOT NULL` (disallows nulls)."
  },
  {
    id: 13,
    question: "How do you find the Nth highest salary in SQL?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "Using `DENSE_RANK()`: `WITH Ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank FROM employees) SELECT salary FROM Ranked WHERE rank = N LIMIT 1;` Alternatively using `LIMIT 1 OFFSET (N-1)`."
  },
  {
    id: 14,
    question: "What is `EXPLAIN` and `EXPLAIN ANALYZE` in SQL query optimization?",
    category: "Indexing & Performance",
    difficulty: "Medium",
    explanation: "`EXPLAIN` displays the query execution plan generated by the cost-based optimizer (showing index scans, sequential scans, join algorithms like Hash/Merge/Nested Loop). `EXPLAIN ANALYZE` actually executes the query and reports real runtime execution times vs optimizer cost estimates."
  },
  {
    id: 15,
    question: "What is the difference between `COALESCE()` and `NULLIF()`?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`COALESCE(val1, val2, ...)` returns the **first non-null value** in its argument list. `NULLIF(a, b)` returns `NULL` if `a == b`; otherwise returns `a` (frequently used to prevent divide-by-zero errors: `total / NULLIF(count, 0)`)."
  },
  {
    id: 16,
    question: "What is a Cross Join (Cartesian Product) and when is it generated accidentally?",
    category: "Joins & Set Operations",
    difficulty: "Easy",
    explanation: "A `CROSS JOIN` pairs every row from the first table with every row from the second table, resulting in `N * M` rows. It occurs accidentally when writing comma-separated tables in `FROM` without a corresponding `WHERE` join condition."
  },
  {
    id: 17,
    question: "What are SQL Aggregate Functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) and how do they handle `NULL` values?",
    category: "Aggregation & Grouping",
    difficulty: "Easy",
    explanation: "Aggregate functions ignore `NULL` values during calculation (e.g. `AVG(salary)` divides sum of non-null salaries by count of non-null rows). Note that `COUNT(*)` counts all rows including nulls, while `COUNT(col)` counts only rows where `col` is NOT NULL."
  },
  {
    id: 18,
    question: "What is the difference between `EXISTS` and `IN` in SQL subqueries?",
    category: "Subqueries & CTEs",
    difficulty: "Medium",
    explanation: "`EXISTS` tests for the existence of rows and short-circuits to `TRUE` on the first match (efficient for correlated subqueries). `IN` evaluates the full inner list of values. If the subquery in `NOT IN` returns even a single `NULL`, the entire condition evaluates to `UNKNOWN`/empty."
  },
  {
    id: 19,
    question: "What is a Self Join and what are practical use cases for it?",
    category: "Joins & Set Operations",
    difficulty: "Medium",
    explanation: "A Self Join joins a table to itself using distinct aliases (`FROM employees e JOIN employees m ON e.manager_id = m.id`). Practical uses include hierarchical reporting structures, comparing sequential events by timestamp, and finding duplicate records."
  },
  {
    id: 20,
    question: "What is Database Normalization (1NF, 2NF, 3NF, BCNF)?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "**1NF**: Atomic column values, no repeating groups. **2NF**: In 1NF and all non-key attributes are fully functionally dependent on the primary key (no partial dependencies). **3NF**: In 2NF and no transitive dependencies. **BCNF**: Every determinant is a candidate key."
  },
  {
    id: 21,
    question: "What is Denormalization and when is it preferred in real-world systems?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "Denormalization intentionally introduces redundant columns or pre-aggregated tables into normalized schemas to eliminate expensive multi-table `JOIN` operations in high-throughput read-heavy analytical dashboards and reporting databases (OLAP/Data Warehouses)."
  },
  {
    id: 22,
    question: "What is the difference between OLTP and OLAP databases?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "**OLTP (Online Transaction Processing)**: Optimized for high volumes of fast, row-oriented CRUD transactions with normalized schemas (PostgreSQL, MySQL). **OLAP (Online Analytical Processing)**: Optimized for complex multi-million row aggregation queries with columnar storage (ClickHouse, Snowflake, Redshift)."
  },
  {
    id: 23,
    question: "What is the `CASE WHEN` statement and how do you perform conditional aggregation?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`CASE WHEN cond THEN val ELSE default END` implements if-else logic. Conditional aggregation counts/sums categories in a single query: `SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_users`."
  },
  {
    id: 24,
    question: "What is the `LEAD()` and `LAG()` window function?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "`LAG(col, 1)` retrieves values from the previous row in the partition (calculating day-over-day growth). `LEAD(col, 1)` retrieves values from the next row in the partition without requiring a self-join."
  },
  {
    id: 25,
    question: "What is `NTILE(n)` window function?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "`NTILE(n)` divides an ordered partition into `n` approximately equal buckets/quantiles, assigning a bucket number from 1 to `n` to each row (e.g. `NTILE(4)` calculates quartiles, `NTILE(100)` calculates percentiles)."
  },
  {
    id: 26,
    question: "What is a Composite (Multi-Column) Index and the Leftmost Prefix Rule?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "An index created on multiple columns `(A, B, C)`. The **Leftmost Prefix Rule** states that the index can only optimize queries that filter on prefixes starting from the leftmost column (e.g., queries on `(A)` or `(A, B)` use the index; queries filtering only on `(B)` or `(C)` cannot use the B-Tree index)."
  },
  {
    id: 27,
    question: "What causes an Index to be ignored by the SQL Query Planner (SARGable queries)?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "Queries become non-SARGable (cannot use index seek) when: 1) Applying functions on columns (`WHERE UPPER(name) = 'JOHN'`), 2) Leading wildcards (`WHERE name LIKE '%son'`), 3) Implicit type conversion (comparing `VARCHAR` column with integer), 4) Math operations on column (`WHERE salary * 12 > 100000`)."
  },
  {
    id: 28,
    question: "What is the difference between `CHAR` and `VARCHAR` data types?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`CHAR(10)` is fixed-length (pads spaces to always occupy 10 characters, optimal for fixed-length codes like ISO country codes). `VARCHAR(10)` is variable-length (stores only the actual characters plus length prefix byte, saving disk space for variable strings)."
  },
  {
    id: 29,
    question: "What is the purpose of `GROUP_CONCAT()` / `STRING_AGG()`?",
    category: "Aggregation & Grouping",
    difficulty: "Easy",
    explanation: "It concatenates non-null string values from multiple rows in a group into a single delimited string (e.g. `STRING_AGG(tag_name, ', ')` groups all tags for an article into `'react, javascript, frontend'`)."
  },
  {
    id: 30,
    question: "What is a Database View vs a Materialized View?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "A standard **View** is a saved virtual query that executes dynamically on every access (no data stored). A **Materialized View** physically executes the query and stores the computed result table on disk, delivering instant read performance but requiring explicit `REFRESH MATERIALIZED VIEW`."
  },
  {
    id: 31,
    question: "What is SQL Pivot and Unpivot?",
    category: "Aggregation & Grouping",
    difficulty: "Hard",
    explanation: "**Pivot** rotates row-level values into distinct horizontal column headers (transforming monthly sales rows into columns Jan, Feb, Mar). **Unpivot** rotates column headers back into normalized vertical rows."
  },
  {
    id: 32,
    question: "What are Database Triggers and what are their drawbacks?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "Triggers are stored procedures that execute automatically in response to DML events (`BEFORE/AFTER INSERT/UPDATE/DELETE`). Drawbacks: they introduce hidden side-effects, complicate debugging, cause lock contention, and degrade bulk write performance."
  },
  {
    id: 33,
    question: "What is a Surrogate Key vs a Natural Key?",
    category: "Schema Design",
    difficulty: "Easy",
    explanation: "A **Natural Key** is an existing real-world attribute that is unique (e.g., SSN, email, passport number). A **Surrogate Key** is an artificial unique identifier generated by the database (auto-increment integer, UUID) with no business meaning, ensuring stability against business rule changes."
  },
  {
    id: 34,
    question: "What is the difference between UUID (GUID) and Auto-Increment BigInt for Primary Keys?",
    category: "Schema Design",
    difficulty: "Hard",
    explanation: "BigInt is compact (8 bytes), sequential (optimal for B-Tree clustering without page splits), but exposes total volume and sequential enumeration attacks. Random UUIDv4 (16 bytes) allows decentralized ID generation across distributed services, but causes severe **B-Tree index fragmentation** and random disk I/O (mitigated by time-ordered UUIDv7)."
  },
  {
    id: 35,
    question: "What is the difference between Optimistic Locking and Pessimistic Locking in SQL?",
    category: "Transactions & Concurrency",
    difficulty: "Hard",
    explanation: "**Pessimistic Locking** (`SELECT ... FOR UPDATE`) places physical locks on rows to block other transactions until commit. **Optimistic Locking** uses a `version` or `updated_at` column (`UPDATE tbl SET val = 1, version = 2 WHERE id = 1 AND version = 1`), checking if another transaction modified the row concurrently and failing if version changed."
  },
  {
    id: 36,
    question: "What is `INTERSECT` and `EXCEPT` (or `MINUS`) in SQL?",
    category: "Joins & Set Operations",
    difficulty: "Easy",
    explanation: "`INTERSECT` returns only distinct rows present in *both* query results. `EXCEPT` (or `MINUS` in Oracle) returns distinct rows from the first query that are *not present* in the second query result."
  },
  {
    id: 37,
    question: "What is Database Sharding vs Database Partitioning?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "**Partitioning** splits large tables into smaller logical chunks on the *same database server instance* (range, list, hash). **Sharding** is horizontal partitioning across *multiple independent database server nodes/clusters*, requiring a sharding key and distributed routing."
  },
  {
    id: 38,
    question: "What is the difference between `FIRST_VALUE()`, `LAST_VALUE()`, and `NTH_VALUE()` window functions?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "`FIRST_VALUE(col) OVER (...)` returns the value from the first row of the window frame. `LAST_VALUE(col)` returns the value from the last row (requiring `ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING` to avoid stopping at current row). `NTH_VALUE(col, n)` returns the nth row value."
  },
  {
    id: 39,
    question: "What is the purpose of `ROLLUP` and `CUBE` in `GROUP BY`?",
    category: "Aggregation & Grouping",
    difficulty: "Hard",
    explanation: "`GROUP BY ROLLUP(region, year)` generates hierarchical subtotal aggregations (grand total, regional totals, and yearly regional totals). `CUBE(region, year)` generates all possible combinations of subtotals across all dimensions (multidimensional cross-tabulation)."
  },
  {
    id: 40,
    question: "How do you delete duplicate records while keeping one unique row in SQL?",
    category: "Subqueries & CTEs",
    difficulty: "Medium",
    explanation: "Using a CTE with `ROW_NUMBER()`: `WITH Duplicates AS (SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn FROM users) DELETE FROM users WHERE id IN (SELECT id FROM Duplicates WHERE rn > 1);`"
  },
  {
    id: 41,
    question: "What is a Stored Procedure and how does it differ from a User-Defined Function (UDF)?",
    category: "Schema Design",
    difficulty: "Medium",
    explanation: "A **Stored Procedure** executes procedural code, can perform DML/DDL transactions, commit transactions, and does not need to return a value (called via `CALL`). A **Function** must return a value, cannot commit transactions, and can be invoked directly inside `SELECT` or `WHERE` expressions."
  },
  {
    id: 42,
    question: "What is the difference between `COUNT(DISTINCT col)` and `COUNT(col)`?",
    category: "Aggregation & Grouping",
    difficulty: "Easy",
    explanation: "`COUNT(col)` counts all non-null occurrences of `col` including duplicates. `COUNT(DISTINCT col)` filters out duplicate values and counts only the number of unique non-null values."
  },
  {
    id: 43,
    question: "What is a Partial Index (Filtered Index)?",
    category: "Indexing & Performance",
    difficulty: "Medium",
    explanation: "A partial index indexes only rows matching a specific `WHERE` predicate (e.g., `CREATE INDEX idx_active ON users(email) WHERE status = 'active'`), saving massive disk space and index update overhead for skewed tables."
  },
  {
    id: 44,
    question: "What is Foreign Key `ON UPDATE CASCADE` vs `ON DELETE CASCADE`?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`ON DELETE CASCADE` automatically deletes related child rows when the parent is deleted. `ON UPDATE CASCADE` automatically updates foreign key values in child rows if the parent primary key value is modified."
  },
  {
    id: 45,
    question: "What is SQL Three-Valued Logic (3VL)?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Medium",
    explanation: "In SQL, boolean expressions evaluate to one of three states: `TRUE`, `FALSE`, or `UNKNOWN` (NULL). Comparisons with `NULL` (like `NULL = NULL` or `NULL <> 5`) evaluate to `UNKNOWN`, which is why conditions must use `IS NULL` or `IS NOT NULL`."
  },
  {
    id: 46,
    question: "What is the difference between Hash Join, Nested Loop Join, and Merge Join in query execution plans?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "**Nested Loop Join**: Iterates outer table and seeks inner table (fast for small inputs with indexed inner). **Hash Join**: Builds in-memory hash table of smaller input and probes with larger input (fast for large unindexed equality joins). **Merge Join**: Scans both inputs simultaneously if both are already sorted by join key."
  },
  {
    id: 47,
    question: "What is the purpose of `TRIM()`, `LTRIM()`, and `RTRIM()`?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`TRIM(str)` strips leading and trailing whitespace characters. `LTRIM()` strips only leading (left) whitespace; `RTRIM()` strips only trailing (right) whitespace."
  },
  {
    id: 48,
    question: "What is the `PERCENT_RANK()` window function?",
    category: "Window Functions",
    difficulty: "Medium",
    explanation: "`PERCENT_RANK()` calculates the relative rank of a row within a partition as a fraction between `0.0` and `1.0` using the formula `(rank - 1) / (total_rows - 1)`."
  },
  {
    id: 49,
    question: "What is a Foreign Key Index and why is it critical for deletion performance?",
    category: "Indexing & Performance",
    difficulty: "Hard",
    explanation: "Databases do not automatically create indexes on Foreign Key columns. When deleting a parent row, the database must verify or cascade deletes across child tables. Without an index on the child FK column, every parent deletion causes a full table scan on the child table."
  },
  {
    id: 50,
    question: "What is the difference between `INSERT INTO ... SELECT` and `SELECT ... INTO`?",
    category: "Fundamentals & DDL/DML",
    difficulty: "Easy",
    explanation: "`INSERT INTO existing_table SELECT ...` inserts queried data into an already existing destination table. `SELECT ... INTO new_table FROM source` creates a brand new table with matching column definitions and populates it with the query results in one step."
  }
];
