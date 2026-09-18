/**
 * 50 High-Value Data Structures & Algorithms (DSA) Interview Questions
 */

export const DSA_QUESTIONS = [
  {
    id: 1,
    question: "What is Big-O Notation and what is the difference between Time Complexity and Space Complexity?",
    category: "Complexity Analysis",
    difficulty: "Easy",
    explanation: "Big-O notation describes the upper bound limiting behavior of an algorithm's growth rate as input size `N` scales toward infinity. **Time Complexity** measures the number of elementary operations executed. **Space Complexity** measures the total auxiliary memory (excluding input) allocated in RAM and call stack."
  },
  {
    id: 2,
    question: "What is the difference between Array and Singly Linked List in memory and performance?",
    category: "Linear Data Structures",
    difficulty: "Easy",
    explanation: "**Array**: Contiguous memory block, O(1) random index access (`arr[i]`), high CPU cache locality, but expensive O(N) insertions/deletions in the middle and fixed/reallocation costs. **Linked List**: Non-contiguous nodes with pointer references, O(1) insertions/deletions at known nodes, but O(N) traversal search and pointer memory overhead."
  },
  {
    id: 3,
    question: "How do you detect a cycle in a Linked List (Floyd's Tortoise and Hare algorithm)?",
    category: "Linear Data Structures",
    difficulty: "Medium",
    explanation: "Initialize two pointers `slow` (moves 1 step) and `fast` (moves 2 steps). If there is no cycle, `fast` reaches `null` in O(N) time. If a cycle exists, `fast` will inevitably lap and meet `slow` inside the loop in O(N) time and O(1) space. To find cycle start, reset `slow` to head and advance both 1 step until they meet."
  },
  {
    id: 4,
    question: "How do you reverse a Singly Linked List iteratively and recursively?",
    category: "Linear Data Structures",
    difficulty: "Medium",
    explanation: "**Iterative**: Maintain 3 pointers (`prev = null`, `curr = head`, `next = null`). In a loop: `next = curr.next; curr.next = prev; prev = curr; curr = next;` in O(N) time, O(1) space. **Recursive**: Base case `head == null || head.next == null`. Call `newHead = reverse(head.next)`, set `head.next.next = head`, `head.next = null`, return `newHead` in O(N) time, O(N) stack space."
  },
  {
    id: 5,
    question: "What is a Stack and what is the Monotonic Stack pattern?",
    category: "Linear Data Structures",
    difficulty: "Medium",
    explanation: "A Stack is a LIFO (Last-In-First-Out) container. A **Monotonic Stack** maintains elements in strictly increasing or decreasing order. As new elements arrive, older smaller/larger elements are popped. Used to solve 'Next Greater Element', 'Largest Rectangle in Histogram', and 'Daily Temperatures' in linear O(N) time."
  },
  {
    id: 6,
    question: "What is a Queue and how is a Circular Queue implemented with an array?",
    category: "Linear Data Structures",
    difficulty: "Easy",
    explanation: "A Queue is a FIFO (First-In-First-Out) container. A **Circular Queue** uses an array of fixed size `capacity` with `front` and `rear` pointers updated using modulo arithmetic: `rear = (rear + 1) % capacity` and `front = (front + 1) % capacity`, avoiding O(N) element shifting on dequeue."
  },
  {
    id: 7,
    question: "What is the difference between QuickSort and MergeSort?",
    category: "Sorting & Searching",
    difficulty: "Medium",
    explanation: "**QuickSort**: In-place (O(log N) stack space), average O(N log N), worst-case O(N^2) if pivot is poor, unstable, faster in practice due to cache locality. **MergeSort**: Divide-and-conquer, guaranteed O(N log N) worst-case, stable (preserves equal element order), but requires **O(N) auxiliary memory**."
  },
  {
    id: 8,
    question: "What is Binary Search and what are its prerequisites and edge cases?",
    category: "Sorting & Searching",
    difficulty: "Easy",
    explanation: "Searches a **sorted array** by halving the search space in O(log N) time. Prerequisites: elements must be sorted and accessible by index. Edge case: avoid integer overflow when calculating midpoint using `mid = low + (high - low) / 2` instead of `(low + high) / 2`."
  },
  {
    id: 9,
    question: "What is a Binary Search Tree (BST) and what causes it to degenerate into O(N)?",
    category: "Trees & BST",
    difficulty: "Medium",
    explanation: "A binary tree where for every node, all left subtree values are smaller and right subtree values are larger. In balanced BSTs, search/insert/delete is O(log N). If sorted data is inserted sequentially without rebalancing, it degenerates into a linear skewed linked list with **O(N)** time complexity."
  },
  {
    id: 10,
    question: "What is a Self-Balancing BST (AVL Tree vs Red-Black Tree)?",
    category: "Trees & BST",
    difficulty: "Hard",
    explanation: "**AVL Tree**: Strictly balanced (height difference between subtrees <= 1); faster lookups, but slower insertions/deletions due to frequent tree rotations. **Red-Black Tree**: Loosely balanced using color properties (black height balance); faster inserts/deletions with fewer rotations, making it the industry choice for `std::map`, Java `TreeMap`, and Linux kernel schedulers."
  },
  {
    id: 11,
    question: "What are Tree Traversals (In-order, Pre-order, Post-order, Level-order BFS)?",
    category: "Trees & BST",
    difficulty: "Easy",
    explanation: "**In-order** (Left, Root, Right): yields sorted output for BST. **Pre-order** (Root, Left, Right): used for cloning/serializing trees. **Post-order** (Left, Right, Root): used for bottom-up deletions/evaluating expression trees. **Level-order (BFS)**: traverses level-by-level using a Queue."
  },
  {
    id: 12,
    question: "What is a Binary Heap (Min-Heap / Max-Heap) and Priority Queue?",
    category: "Heaps & Priority Queues",
    difficulty: "Medium",
    explanation: "A complete binary tree stored in a flat array where for any node at index `i`, parent is at `(i-1)/2`, children at `2i+1` and `2i+2`. In a Min-Heap, parent is always <= children. `peek()` is O(1), `insert()` is O(log N) via bubble-up, `extractMin()` is O(log N) via sift-down. `heapify` builds a heap in **O(N)** time."
  },
  {
    id: 13,
    question: "What is the Two Pointers Technique and Sliding Window Pattern?",
    category: "Algorithm Patterns",
    difficulty: "Medium",
    explanation: "**Two Pointers**: Traverses array from opposite ends or at differing speeds (e.g., Two Sum on sorted array, Palindrome check). **Sliding Window**: Maintains a dynamic subsegment `[left, right]` across an array/string, expanding `right` and contracting `left` to solve subarray sum, longest substring without repeating characters in linear O(N) time."
  },
  {
    id: 14,
    question: "What is Breadth-First Search (BFS) vs Depth-First Search (DFS) on Graphs?",
    category: "Graphs",
    difficulty: "Medium",
    explanation: "**BFS**: Uses a **Queue** to explore neighbors level-by-level, guaranteed to find the **shortest path in unweighted graphs** (O(V + E)). **DFS**: Uses a **Stack / Recursion** to explore as deep as possible before backtracking, used for topological sort, cycle detection, and connected components."
  },
  {
    id: 15,
    question: "How do you detect a cycle in a Directed Graph vs Undirected Graph?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "**Undirected Graph**: Use BFS/DFS with a `visited` set and check if an adjacent node is visited and NOT the parent of the current node, or use Disjoint Set Union (Union-Find). **Directed Graph**: Use DFS with a 3-color state (**White** = unvisited, **Gray** = in current recursion stack, **Black** = visited); hitting a Gray node indicates a back-edge cycle, or use Kahn's Topological Sort."
  },
  {
    id: 16,
    question: "What is Topological Sort (Kahn's Algorithm)?",
    category: "Graphs",
    difficulty: "Medium",
    explanation: "Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge `u -> v`, `u` comes before `v` (build systems, task scheduling). **Kahn's Algorithm**: Calculates in-degrees of all nodes, pushes 0 in-degree nodes into a Queue, repeatedly dequeues node and decrements neighbor in-degrees. If processed count != total nodes, a cycle exists."
  },
  {
    id: 17,
    question: "What is Dijkstra's Shortest Path Algorithm and why does it fail on negative edge weights?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "Dijkstra finds shortest paths from a source node to all nodes in a non-negative weighted graph in **O((V + E) log V)** using a Min-Heap. It fails on negative edge weights because it greedily marks nodes as finalized/visited, assuming subsequent paths can never reduce cost, which negative edges violate (use Bellman-Ford for negative weights)."
  },
  {
    id: 18,
    question: "What is the Bellman-Ford Algorithm and Floyd-Warshall Algorithm?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "**Bellman-Ford**: Single-source shortest path supporting negative edge weights in O(V * E) by relaxing all edges V-1 times; a V-th relaxation detecting distance decrease confirms negative weight cycles. **Floyd-Warshall**: All-pairs shortest path in O(V^3) dynamic programming."
  },
  {
    id: 19,
    question: "What is Minimum Spanning Tree (MST) - Kruskal's vs Prim's Algorithm?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "An MST connects all vertices in an undirected weighted graph with minimum total edge weight and no cycles (V-1 edges). **Kruskal's**: Sorts all edges by weight and greedily adds edges using **Union-Find (DSU)** in O(E log E). **Prim's**: Grows a connected tree from an arbitrary start node using a Min-Heap in O(E log V)."
  },
  {
    id: 20,
    question: "What is Disjoint Set Union (DSU / Union-Find) with Path Compression and Union by Rank?",
    category: "Advanced Data Structures",
    difficulty: "Hard",
    explanation: "DSU tracks elements partitioned into disjoint subsets. **Path Compression** flattens tree depth during `find()` by making nodes point directly to the root. **Union by Rank** attaches the smaller tree under the root of the larger tree, achieving near-constant **O(alpha(N))** amortized time per operation (Inverse Ackermann function)."
  },
  {
    id: 21,
    question: "What is Dynamic Programming (DP) and what are Overlapping Subproblems and Optimal Substructure?",
    category: "Dynamic Programming",
    difficulty: "Medium",
    explanation: "DP solves complex problems by breaking them into simpler subproblems. **Optimal Substructure**: The optimal solution to the problem contains optimal solutions to its subproblems. **Overlapping Subproblems**: The same subproblems are solved repeatedly (cached via **Top-Down Memoization** or **Bottom-Up Tabulation**)."
  },
  {
    id: 22,
    question: "What is the 0/1 Knapsack Problem vs Fractional Knapsack Problem?",
    category: "Dynamic Programming",
    difficulty: "Medium",
    explanation: "**0/1 Knapsack**: Items cannot be divided (either taken or left); solved via 2D/1D Dynamic Programming in O(N * W) pseudo-polynomial time. **Fractional Knapsack**: Items can be broken into fractional pieces; solved greedily in O(N log N) by sorting items by value-to-weight ratio."
  },
  {
    id: 23,
    question: "What is Longest Common Subsequence (LCS) vs Longest Increasing Subsequence (LIS)?",
    category: "Dynamic Programming",
    difficulty: "Hard",
    explanation: "**LCS**: Finds the longest sequence appearing in the same relative order in two strings; solved via 2D DP in O(N * M). **LIS**: Finds the longest strictly increasing subsequence in an array; solved via DP in O(N^2) or optimized to **O(N log N)** using patience sorting with binary search (`std::lower_bound`)."
  },
  {
    id: 24,
    question: "What is a Trie (Prefix Tree) and what are its primary use cases?",
    category: "Advanced Data Structures",
    difficulty: "Medium",
    explanation: "A Trie is a tree where each node represents a character of an alphabet, and paths from root to node spell out words. Insert and search operations are **O(L)** where `L` is word length, independent of total dictionary size. Standard for autocomplete, spell checkers, and IP routing tables."
  },
  {
    id: 25,
    question: "What is an LRU (Least Recently Used) Cache and how is it implemented in O(1) time?",
    category: "Advanced Data Structures",
    difficulty: "Hard",
    explanation: "Combining a **Hash Map** and a **Doubly Linked List**. The Hash Map provides O(1) key-to-node lookup. The Doubly Linked List maintains access order: whenever a key is accessed or updated, its node is moved to the head in O(1). When capacity exceeds limit, the tail node (LRU) is evicted in O(1)."
  },
  {
    id: 26,
    question: "What is Backtracking and what are classic examples (N-Queens, Sudoku Solver)?",
    category: "Algorithm Patterns",
    difficulty: "Medium",
    explanation: "Backtracking builds candidates incrementally and abandons (prunes) a candidate branch as soon as it determines the candidate cannot lead to a valid solution. In N-Queens: place queen row by row, check column and diagonal attacks, backtrack if no column is valid."
  },
  {
    id: 27,
    question: "What is the difference between Greedy Algorithms and Dynamic Programming?",
    category: "Algorithm Patterns",
    difficulty: "Easy",
    explanation: "**Greedy Algorithms** make the locally optimal choice at each step without backtracking (fast, but only works when local optimum yields global optimum, e.g. Dijkstra, Huffman coding). **Dynamic Programming** evaluates all possible subproblem choices and stores results to guarantee the global optimum."
  },
  {
    id: 28,
    question: "What is Kadane's Algorithm for Maximum Subarray Sum?",
    category: "Algorithm Patterns",
    difficulty: "Easy",
    explanation: "Finds the contiguous subarray with maximum sum in linear O(N) time and O(1) space. Iterate through the array maintaining `current_sum = max(num, current_sum + num)` and `max_sum = max(max_sum, current_sum)`."
  },
  {
    id: 29,
    question: "What is a Segment Tree and Fenwick Tree (Binary Indexed Tree)?",
    category: "Advanced Data Structures",
    difficulty: "Hard",
    explanation: "Used for **Range Queries** (Range Sum, Range Minimum) and point updates in **O(log N)** time. **Segment Tree**: Full binary tree representing array intervals (supports arbitrary associative functions). **Fenwick Tree (BIT)**: Uses bitwise manipulation (`i & -i`) with a compact flat array for prefix sum queries with less code and lower memory."
  },
  {
    id: 30,
    question: "What is the KMP (Knuth-Morris-Pratt) String Matching Algorithm?",
    category: "Strings & Pattern Matching",
    difficulty: "Hard",
    explanation: "Matches a pattern of length `M` in text of length `N` in **O(N + M)** time. It precomputes a Longest Proper Prefix which is also Suffix (**LPS array**) for the pattern. When a character mismatch occurs, it uses LPS to skip redundant comparisons without backing up the text pointer."
  },
  {
    id: 31,
    question: "What is Rabin-Karp Algorithm and Rolling Hash?",
    category: "Strings & Pattern Matching",
    difficulty: "Medium",
    explanation: "Calculates a polynomial rolling hash of the pattern and a sliding window of the text. Because advancing the window updates the hash in O(1) arithmetic time (`hash = (hash - old_char) * base + new_char`), full string comparison is only performed when hashes match, running in O(N + M) average time."
  },
  {
    id: 32,
    question: "How do you find the Median of Two Sorted Arrays in O(log(min(M, N))) time?",
    category: "Sorting & Searching",
    difficulty: "Hard",
    explanation: "Using Binary Search on the smaller array partition. Divide both arrays into left and right halves such that total elements in left half equal right half, and `max(left1, left2) <= min(right1, right2)`. Binary search adjusts the partition index in O(log(min(M, N))) time."
  },
  {
    id: 33,
    question: "What is Quickselect and how does it find the K-th Smallest Element in O(N) average time?",
    category: "Sorting & Searching",
    difficulty: "Medium",
    explanation: "Based on QuickSort partitioning: pick a pivot and partition array into elements smaller and larger. If pivot index equals `K-1`, return pivot. If `K-1 < pivotIndex`, recurse only on the left partition; otherwise recurse only on the right. Because only one half is explored (`N + N/2 + N/4...`), average time complexity is **O(N)**."
  },
  {
    id: 34,
    question: "What is the difference between Stable and Unstable Sorting algorithms?",
    category: "Sorting & Searching",
    difficulty: "Easy",
    explanation: "A **Stable** sort preserves the relative order of duplicate elements with equal keys (MergeSort, InsertionSort, TimSort). An **Unstable** sort may reorder identical elements arbitrarily (QuickSort, HeapSort)."
  },
  {
    id: 35,
    question: "What is Counting Sort and Radix Sort?",
    category: "Sorting & Searching",
    difficulty: "Medium",
    explanation: "Non-comparison sorting algorithms: **Counting Sort** counts frequencies of distinct integer keys in O(N + K) time. **Radix Sort** sorts integers digit by digit from least significant digit (LSD) to most significant digit using stable Counting Sort as a subroutine in **O(D * (N + K))** linear time."
  },
  {
    id: 36,
    question: "What is Bit Manipulation and what do common bit tricks do (`n & (n - 1)`, `n & -n`)?",
    category: "Bit Manipulation",
    difficulty: "Medium",
    explanation: "`n & (n - 1)` clears the lowest set bit (used in Brian Kernighan's algorithm to count set bits in O(set bits) time, and testing power of 2 via `(n > 0) && (n & (n - 1)) == 0`). `n & -n` isolates the lowest set bit (used in Fenwick trees)."
  },
  {
    id: 37,
    question: "How do you find the single non-duplicate number in an array where every other element appears twice?",
    category: "Bit Manipulation",
    difficulty: "Easy",
    explanation: "XOR all elements together: `res = 0; for num in nums: res ^= num; return res;` Because `x ^ x = 0` and `x ^ 0 = x`, all paired elements cancel each other out, leaving only the unique element in **O(N) time and O(1) space**."
  },
  {
    id: 38,
    question: "What is the difference between Adjacency Matrix and Adjacency List for Graph representation?",
    category: "Graphs",
    difficulty: "Easy",
    explanation: "**Adjacency Matrix**: 2D array of size `V x V` (O(1) edge check, but consumes O(V^2) memory, bad for sparse graphs). **Adjacency List**: Array of lists of size `V + E` (O(V + E) memory, faster neighbor iteration, optimal for sparse real-world graphs)."
  },
  {
    id: 39,
    question: "What is Lowest Common Ancestor (LCA) in a Binary Tree vs BST?",
    category: "Trees & BST",
    difficulty: "Medium",
    explanation: "In a **BST**: compare node values; if both `p` and `q` are smaller than current node, traverse left; if both larger, traverse right; the first split point is the LCA in O(H). In a **Binary Tree**: post-order recursive search returning non-null when `p` or `q` is found; if both left and right return non-null, current node is LCA."
  },
  {
    id: 40,
    question: "What is A* Search Algorithm?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "An informed heuristic search algorithm that finds the shortest path by evaluating nodes using `f(n) = g(n) + h(n)`, where `g(n)` is the exact cost from start to node `n`, and `h(n)` is an admissible heuristic estimating cost from `n` to goal (e.g. Euclidean/Manhattan distance)."
  },
  {
    id: 41,
    question: "What is Amortized Analysis (Aggregate, Accounting, Potential methods)?",
    category: "Complexity Analysis",
    difficulty: "Hard",
    explanation: "Amortized analysis guarantees the average performance of each operation in the worst-case sequence of operations (e.g., dynamic array resizing takes O(N) during doubling, but amortizes to **O(1)** across all insertions)."
  },
  {
    id: 42,
    question: "How do you detect a Palindrome Permutation in a string?",
    category: "Strings & Pattern Matching",
    difficulty: "Easy",
    explanation: "A string permutation can form a palindrome if and only if **at most one character has an odd frequency count** (tracked via a hash map or a bitmask toggling bits via `mask ^= (1 << char)`)."
  },
  {
    id: 43,
    question: "What is the difference between Recursion and Tail Recursion?",
    category: "Complexity Analysis",
    difficulty: "Medium",
    explanation: "Standard recursion performs calculations *after* the recursive call returns, holding stack frames. Tail recursion performs all calculations *before* the recursive call, which is the very last instruction of the function, allowing compiler optimization (TCO) to reuse the current stack frame."
  },
  {
    id: 44,
    question: "What is the Dutch National Flag Algorithm (Sort Colors 0, 1, 2)?",
    category: "Algorithm Patterns",
    difficulty: "Medium",
    explanation: "Maintains 3 pointers (`low`, `mid`, `high`). In a single pass: if `arr[mid] == 0`, swap `arr[low]` and `arr[mid]`, increment `low` and `mid`. If `arr[mid] == 1`, increment `mid`. If `arr[mid] == 2`, swap `arr[mid]` and `arr[high]`, decrement `high` in O(N) time and O(1) space."
  },
  {
    id: 45,
    question: "What is the difference between Strongly Connected Components (Tarjan's vs Kosaraju's Algorithm)?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "Both find maximal subgraphs where every vertex is reachable from every other vertex in O(V + E). **Kosaraju**: Uses 2 DFS passes and graph transposition (reversing all edge directions). **Tarjan**: Uses a single DFS pass tracking `discovery_time` and `low-link` values with a stack."
  },
  {
    id: 46,
    question: "What is the Master Theorem for divide-and-conquer recurrences (`T(N) = aT(N/b) + f(N)`)?",
    category: "Complexity Analysis",
    difficulty: "Hard",
    explanation: "Compares `f(N)` with `N^(log_b(a))`: 1) If `f(N) = O(N^(log_b(a) - e))`, then `T(N) = Theta(N^(log_b(a)))`. 2) If `f(N) = Theta(N^(log_b(a)))`, then `T(N) = Theta(N^(log_b(a)) * log N)`. 3) If `f(N) = Omega(N^(log_b(a) + e))`, then `T(N) = Theta(f(N))`."
  },
  {
    id: 47,
    question: "What is Morris In-Order Traversal and how does it traverse trees in O(1) space?",
    category: "Trees & BST",
    difficulty: "Hard",
    explanation: "Morris traversal temporarily modifies tree pointers by creating **Threaded Binary Trees**: it finds the in-order predecessor of the current node and links its right pointer to current, traversing the tree without recursion or auxiliary stack memory in O(N) time and strictly O(1) space."
  },
  {
    id: 48,
    question: "What is the Bounded Buffer (Producer-Consumer) Problem using Queues?",
    category: "Linear Data Structures",
    difficulty: "Medium",
    explanation: "Producers insert data into a fixed-size queue, and consumers remove data. Synchronized using mutexes and condition variables (`not_full`, `not_empty`) to block producers when queue is full and block consumers when queue is empty."
  },
  {
    id: 49,
    question: "What is the Maximum Flow problem (Ford-Fulkerson and Edmonds-Karp)?",
    category: "Graphs",
    difficulty: "Hard",
    explanation: "Finds the maximum possible flow from a source to sink in a flow network. **Ford-Fulkerson** repeatedly finds augmenting paths in the residual graph. **Edmonds-Karp** implements Ford-Fulkerson using **BFS** to find the shortest augmenting path in `O(V * E^2)` time."
  },
  {
    id: 50,
    question: "What is Reservoir Sampling and how does it randomly sample `K` items from a stream of unknown size?",
    category: "Algorithm Patterns",
    difficulty: "Hard",
    explanation: "Stores the first `K` items in a reservoir array. For each subsequent `i`-th item arriving from the stream, generates a random integer `j` from `0` to `i`. If `j < K`, replaces `reservoir[j]` with the new item. This mathematically guarantees that every item in the stream has an equal `K / N` probability of being chosen in O(N) time and O(K) memory."
  }
];
