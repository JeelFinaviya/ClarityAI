/**
 * 50 High-Value Operating Systems Interview Questions
 */

export const OS_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between a Process and a Thread?",
    category: "Processes & Threads",
    difficulty: "Easy",
    explanation: "A **Process** is an executing program instance with its own independent, isolated virtual memory address space (text, data, heap, file descriptors). A **Thread** is the smallest schedulable unit of CPU execution within a process; all threads of a process share the same heap, code, and global memory, but each maintains its own private Stack and Program Counter (PC)."
  },
  {
    id: 2,
    question: "What is a Context Switch and what overhead does it introduce?",
    category: "Processes & Threads",
    difficulty: "Medium",
    explanation: "A Context Switch is the procedure of saving the execution state (CPU registers, Program Counter, stack pointer, page table base register) of the currently running process/thread and restoring the state of the next scheduled process. Overhead includes: CPU cycle cost, TLB (Translation Lookaside Buffer) cache flushes, and L1/L2/L3 CPU cache misses."
  },
  {
    id: 3,
    question: "What is Virtual Memory and how does Paging work?",
    category: "Memory Management",
    difficulty: "Medium",
    explanation: "Virtual Memory gives each process the illusion of having a contiguous, dedicated memory space larger than physical RAM. Memory is divided into fixed-size chunks called **Pages** (typically 4KB). The hardware **MMU (Memory Management Unit)** maps virtual pages to physical **Page Frames** in RAM via **Page Tables**."
  },
  {
    id: 4,
    question: "What is a Page Fault and what occurs when one is triggered?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "A Page Fault occurs when a process attempts to access a virtual page whose 'valid bit' in the Page Table is 0 (page is not present in physical RAM, but swapped out to disk). The MMU raises a hardware interrupt, trapping into OS kernel mode. The OS suspends the process, allocates a physical frame (evicting an old page if necessary), reads the page from disk via DMA into RAM, updates the page table, and restarts the instruction."
  },
  {
    id: 5,
    question: "What is the Translation Lookaside Buffer (TLB) and what is a TLB Miss?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "The TLB is a high-speed associative hardware cache on the CPU that stores recent virtual-to-physical address translations. On a **TLB Hit**, address translation takes <1 CPU cycle. On a **TLB Miss**, the MMU must perform a slow 'Page Table Walk' in main memory to resolve the multi-level page table, loading the translation into TLB."
  },
  {
    id: 6,
    question: "What is Thrashing in virtual memory and how is it detected and prevented?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "Thrashing occurs when the system spends more time swapping pages in and out of disk swap space than executing actual instructions (CPU utilization plummets while disk I/O hits 100%). Detected by monitoring high page-fault rates. Prevented using the **Working Set Model** (ensuring a process is only scheduled if its entire active working set of pages fits in RAM; otherwise suspending the process)."
  },
  {
    id: 7,
    question: "What are the common Page Replacement Algorithms (FIFO, LRU, Optimal, Clock)?",
    category: "Memory Management",
    difficulty: "Medium",
    explanation: "**Optimal (OPT)**: Evicts the page that will not be used for the longest future time (theoretical benchmark). **FIFO**: Evicts the oldest loaded page (suffers from Belady's Anomaly). **LRU (Least Recently Used)**: Evicts the page unused for the longest past duration. **Clock Algorithm (Second Chance)**: Approximate LRU using a circular buffer and 1-bit reference flags with a sweeping clock hand."
  },
  {
    id: 8,
    question: "What is Belady's Anomaly in Page Replacement?",
    category: "Memory Management",
    difficulty: "Medium",
    explanation: "The phenomenon where increasing the number of physical page frames allocated to a process results in an *increase* in the total number of page faults. It occurs in FIFO page replacement because FIFO is not a stack-based algorithm (unlike LRU or Optimal)."
  },
  {
    id: 9,
    question: "What is a Deadlock and what are the 4 Coffman conditions?",
    category: "Deadlocks & Synchronization",
    difficulty: "Medium",
    explanation: "Deadlock occurs when multiple processes are permanently blocked because each is holding a resource and waiting for another held by another process. The 4 conditions: 1) **Mutual Exclusion**, 2) **Hold and Wait**, 3) **No Preemption**, 4) **Circular Wait**. If any one condition is broken, deadlock cannot occur."
  },
  {
    id: 10,
    question: "What is Dijkstra's Banker's Algorithm for Deadlock Avoidance?",
    category: "Deadlocks & Synchronization",
    difficulty: "Hard",
    explanation: "A resource allocation algorithm that tests for safety by simulating the allocation of predetermined maximum possible resources. A state is **Safe** if there exists at least one execution sequence where all processes can finish without deadlocking. If allocating a resource would transition the system into an **Unsafe state**, the request is denied/delayed."
  },
  {
    id: 11,
    question: "What is the difference between a Mutex, a Counting Semaphore, and a Binary Semaphore?",
    category: "Deadlocks & Synchronization",
    difficulty: "Medium",
    explanation: "A **Mutex** is an ownership-based locking mechanism (only the thread that locked the mutex can unlock it; supports priority inheritance). A **Binary Semaphore** (values 0 or 1) has no ownership concept and is used for signaling between different threads. A **Counting Semaphore** (value N) controls access to a finite pool of N identical resources."
  },
  {
    id: 12,
    question: "What is Priority Inversion and how does Priority Inheritance Protocol resolve it?",
    category: "Deadlocks & Synchronization",
    difficulty: "Hard",
    explanation: "Priority Inversion occurs when a low-priority thread holds a shared lock needed by a high-priority thread, but a medium-priority thread preempts the low-priority thread, indirectly starving the high-priority thread (caused the 1997 Mars Pathfinder rover resets). **Priority Inheritance** temporarily elevates the low-priority thread's priority to match the high-priority thread until it releases the lock."
  },
  {
    id: 13,
    question: "What is CPU Scheduling and what are the common algorithms (FCFS, SJF, Round Robin, Multilevel Feedback Queue)?",
    category: "CPU Scheduling",
    difficulty: "Medium",
    explanation: "**FCFS**: Non-preemptive, suffers from Convoy Effect. **SJF (Shortest Job First)**: Optimal minimum average waiting time (requires knowing burst time). **Round Robin (RR)**: Preemptive time-sliced scheduling (`time quantum`). **MLFQ (Multilevel Feedback Queue)**: Multiple priority queues; CPU-bound jobs move down to lower priority larger quantum queues, while I/O-bound interactive jobs stay at high priority."
  },
  {
    id: 14,
    question: "What is the Convoy Effect in CPU Scheduling?",
    category: "CPU Scheduling",
    difficulty: "Easy",
    explanation: "In First-Come-First-Served (FCFS) scheduling, a long CPU-bound process with a huge burst time occupies the CPU, forcing numerous short I/O-bound processes to wait behind it, causing severe device starvation and poor average waiting times."
  },
  {
    id: 15,
    question: "What is the difference between User Mode (Ring 3) and Kernel Mode (Ring 0)?",
    category: "OS Architecture & System Calls",
    difficulty: "Easy",
    explanation: "**User Mode**: Restricted execution environment where applications run; CPU prohibits direct access to physical hardware, memory management registers, or privileged instructions. **Kernel Mode (Supervisor Mode)**: Privileged execution mode where the OS kernel has unrestricted direct access to hardware, CPU control registers, and all physical memory."
  },
  {
    id: 16,
    question: "What is a System Call (syscall) and how does a mode switch occur?",
    category: "OS Architecture & System Calls",
    difficulty: "Medium",
    explanation: "A System Call (`read`, `write`, `fork`, `open`) is the programmatic interface by which user applications request kernel services. The CPU triggers a **software interrupt / trap** (`syscall` instruction), saving user CPU registers, switching the hardware CPU privilege bit from User Mode to Kernel Mode, and executing the system call dispatcher via the Interrupt Vector Table."
  },
  {
    id: 17,
    question: "What is Inter-Process Communication (IPC) and what mechanisms exist in UNIX/Linux?",
    category: "Processes & Threads",
    difficulty: "Medium",
    explanation: "IPC enables isolated processes to exchange data. Mechanisms: 1) **Pipes / Named Pipes (FIFOs)** (unidirectional byte streams), 2) **Message Queues** (structured message packets), 3) **Shared Memory** (fastest, memory region mapped into multiple process address spaces; requires semaphore synchronization), 4) **Unix Domain Sockets / Network Sockets**, 5) **Signals**."
  },
  {
    id: 18,
    question: "What is the difference between `fork()`, `exec()`, and `wait()` system calls in UNIX?",
    category: "OS Architecture & System Calls",
    difficulty: "Medium",
    explanation: "`fork()` creates an exact duplicate child process with a new PID (using Copy-On-Write). `exec()` replaces the current process's memory, code, stack, and heap with a new executable program. `wait()` causes the parent process to block until a child process terminates, reading its exit status and reaping its PID."
  },
  {
    id: 19,
    question: "What is a Zombie Process vs an Orphan Process?",
    category: "Processes & Threads",
    difficulty: "Medium",
    explanation: "A **Zombie Process** has terminated execution but still has an entry in the Process Table because its parent has not yet read its exit status with `wait()` (consumes no RAM/CPU, but holds a PID). An **Orphan Process** is an active process whose parent process terminated before it; it is adopted by `init` / `systemd` (PID 1), which automatically reaps it on exit."
  },
  {
    id: 20,
    question: "What is Copy-On-Write (COW) during `fork()`?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "When `fork()` is called, the OS does not immediately copy physical memory pages. Instead, parent and child share the same physical pages marked as `read-only`. When either process attempts to write/modify a page, the MMU traps to the OS kernel, which creates a duplicate copy of *only that specific page*, making `fork()` near-instantaneous."
  },
  {
    id: 21,
    question: "What is the Critical Section Problem and what are the 3 requirements for a valid solution?",
    category: "Deadlocks & Synchronization",
    difficulty: "Medium",
    explanation: "A Critical Section is a segment of code that accesses shared resources (shared variables, files) that must not be executed by more than one process concurrently. Requirements: 1) **Mutual Exclusion** (only 1 process in critical section at a time), 2) **Progress** (selection of next process cannot be postponed indefinitely), 3) **Bounded Waiting** (a limit exists on the number of times others can enter before a waiting process is granted access)."
  },
  {
    id: 22,
    question: "What is Peterson's Algorithm for two-process mutual exclusion?",
    category: "Deadlocks & Synchronization",
    difficulty: "Hard",
    explanation: "A classic algorithmic mutual exclusion solution for 2 processes using a shared `flag[2]` array (expressing desire to enter) and a `turn` integer variable: `flag[i] = true; turn = j; while (flag[j] && turn == j); /* critical section */ flag[i] = false;`. Guarantees mutual exclusion, progress, and bounded waiting on strict memory architectures."
  },
  {
    id: 23,
    question: "What is a Spinlock vs a Mutex?",
    category: "Deadlocks & Synchronization",
    difficulty: "Medium",
    explanation: "A **Spinlock** repeatedly tests the lock variable in a busy-wait loop (`while(test_and_set(&lock))`). It avoids expensive OS thread sleep and context switch overhead, making it ideal for multi-core kernels holding locks for extremely short durations (<1 microsecond). A **Mutex** puts waiting threads to sleep in the OS scheduler queue."
  },
  {
    id: 24,
    question: "What is Memory Fragmentation (Internal vs External)?",
    category: "Memory Management",
    difficulty: "Easy",
    explanation: "**Internal Fragmentation**: Allocated memory block is slightly larger than the requested data payload (e.g. allocating a 4KB page for a 100-byte string; the unused space inside the page is wasted). **External Fragmentation**: Total free memory is sufficient to satisfy an allocation request, but the free memory is split into scattered non-contiguous holes (solved via Paging)."
  },
  {
    id: 25,
    question: "What is an Inode in UNIX File Systems?",
    category: "File Systems & Storage",
    difficulty: "Medium",
    explanation: "An Inode (Index Node) is a data structure on disk that stores all metadata about a file (file size, permissions, owner UID, group GID, access/modification timestamps, link count) and direct/indirect block pointers to the physical disk blocks containing the actual file data. It does NOT store the filename (filenames are mapped in directory entries)."
  },
  {
    id: 26,
    question: "What is a Hard Link vs a Symbolic (Soft) Link?",
    category: "File Systems & Storage",
    difficulty: "Easy",
    explanation: "A **Hard Link** is a direct directory entry pointing to the *same Inode number* as the target file (if the original filename is deleted, the file data remains accessible until all hard links are removed). A **Symbolic Link** is a special file with its own distinct Inode whose contents store the *string path* of the target file (if target is deleted, symlink becomes broken/dangling)."
  },
  {
    id: 27,
    question: "What is RAID (Redundant Array of Independent Disks) levels 0, 1, 5, 10?",
    category: "File Systems & Storage",
    difficulty: "Medium",
    explanation: "**RAID 0 (Striping)**: Splits data across 2+ disks (high read/write speed, zero redundancy; 1 failure destroys all data). **RAID 1 (Mirroring)**: Duplicates data across 2 disks (100% redundancy, 50% capacity). **RAID 5 (Striping with Distributed Parity)**: Requires >=3 disks, tolerates 1 disk failure. **RAID 10 (1+0)**: Mirrored striped pairs (high speed and fault tolerance)."
  },
  {
    id: 28,
    question: "What is the difference between Synchronous and Asynchronous I/O (Blocking vs Non-Blocking)?",
    category: "OS Architecture & System Calls",
    difficulty: "Medium",
    explanation: "**Blocking I/O**: Thread is suspended by the OS until data is ready in buffer. **Non-Blocking I/O**: System call returns immediately with `EWOULDBLOCK`/`EAGAIN` if no data is ready. **Asynchronous I/O (`io_uring`, AIO)**: Application initiates an I/O request and continues executing immediately; kernel notifies application when transfer is completely finished."
  },
  {
    id: 29,
    question: "What is I/O Multiplexing (`select`, `poll`, `epoll`) in Linux?",
    category: "OS Architecture & System Calls",
    difficulty: "Hard",
    explanation: "`select` and `poll` scan an entire array of file descriptors in **O(N)** time on every wakeup (slow for 10k connections). `epoll` uses an in-kernel Red-Black Tree and ready-list: the kernel registers callbacks on the socket; when network events occur, only the active file descriptors are placed into the ready list, returning events in **O(1) time** (foundation of Nginx, Node.js, Netty)."
  },
  {
    id: 30,
    question: "What is `cgroups` (Control Groups) and `namespaces` in Linux (Container Foundation)?",
    category: "OS Architecture & System Calls",
    difficulty: "Hard",
    explanation: "The core Linux primitives powering Docker containers: **Namespaces** isolate *what a process can see* (PID, network, mount, IPC, user namespaces). **cgroups (Control Groups)** restrict and meter *how much resources a process can consume* (CPU shares, RAM limits, disk I/O bandwidth, network priority)."
  },
  {
    id: 31,
    question: "What is the difference between Monolithic Kernel and Microkernel?",
    category: "OS Architecture & System Calls",
    difficulty: "Medium",
    explanation: "**Monolithic Kernel** (Linux, Windows): All OS services (VFS, device drivers, network stack, scheduler, IPC) run together in privileged Kernel Mode memory space (high performance, but driver bugs can crash entire OS). **Microkernel** (Mach, QNX, seL4): Only minimal core services (scheduling, basic IPC, memory) run in kernel mode; drivers and file systems run as isolated user-mode servers."
  },
  {
    id: 32,
    question: "What is Virtual Memory Swapping and Swap Space?",
    category: "Memory Management",
    difficulty: "Easy",
    explanation: "Swap space is a dedicated partition or file on the physical SSD/hard drive used as an overflow extension for RAM. When physical RAM becomes exhausted, the OS kernel pages out idle memory pages to swap to prevent out-of-memory crashes."
  },
  {
    id: 33,
    question: "What is the Linux OOM (Out-Of-Memory) Killer and `oom_score`?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "When physical RAM and swap are completely exhausted, the Linux kernel invokes the OOM Killer to prevent kernel panic. It calculates an `oom_score` for all active processes (based on RAM percentage consumed and `oom_score_adj`) and sends a `SIGKILL (kill -9)` to terminate the process with the highest score."
  },
  {
    id: 34,
    question: "What is Dirty Page Writeback and `sync()` system call?",
    category: "File Systems & Storage",
    difficulty: "Medium",
    explanation: "When a process writes data, it writes to in-memory Page Cache buffers, marking pages as 'dirty'. The background `pdflush` / `flush` kernel thread flushes dirty pages to disk periodically. The `sync()` system call forces an immediate flush of all dirty buffers to disk."
  },
  {
    id: 35,
    question: "What is Memory-Mapped File I/O (`mmap()`)?",
    category: "Memory Management",
    difficulty: "Hard",
    explanation: "`mmap()` maps a file directly into the process's virtual memory address space. Reading and writing to memory pointers automatically triggers page faults that read/write the underlying disk file, bypassing standard `read()`/`write()` user-space buffer copies and enabling fast zero-copy IPC."
  },
  {
    id: 36,
    question: "What is a Reentrant Function in operating systems?",
    category: "Processes & Threads",
    difficulty: "Medium",
    explanation: "A function is reentrant if it can be interrupted in the middle of its execution by another thread or signal handler, re-entered, and executed again safely without corrupting data (uses only local stack variables and arguments, no static or global shared state)."
  },
  {
    id: 37,
    question: "What are Linux Signals (`SIGKILL`, `SIGTERM`, `SIGINT`, `SIGSEGV`)?",
    category: "Processes & Threads",
    difficulty: "Easy",
    explanation: "**SIGINT (2)**: Interrupt from keyboard (`Ctrl+C`, catchable). **SIGTERM (15)**: Graceful termination request (catchable for cleanup). **SIGKILL (9)**: Forcible immediate process termination by kernel (cannot be caught, blocked, or ignored). **SIGSEGV (11)**: Segmentation fault from invalid memory access."
  },
  {
    id: 38,
    question: "What is the File Descriptor (FD) Table in UNIX?",
    category: "File Systems & Storage",
    difficulty: "Medium",
    explanation: "An array of pointers maintained by the kernel for each process pointing to open file table entries. Standard FDs: `0` (stdin), `1` (stdout), `2` (stderr). Any open file, network socket, pipe, or device is referenced via an integer index into this table."
  },
  {
    id: 39,
    question: "What is the difference between Kernel-Level Threads (KLT) and User-Level Threads (ULT / Green Threads)?",
    category: "Processes & Threads",
    difficulty: "Medium",
    explanation: "**Kernel-Level Threads (1:1 model)**: Managed directly by the OS scheduler; can run in parallel on multiple CPU cores, but thread creation and context switching require kernel transitions. **User-Level Threads (M:N / M:1 model)**: Managed by a user-space runtime library (Goroutines, Java Virtual Threads); ultra-fast context switching, but a blocking system call in one thread can block the entire process without async runtime support."
  },
  {
    id: 40,
    question: "What is the Readers-Writers Synchronization Problem?",
    category: "Deadlocks & Synchronization",
    difficulty: "Medium",
    explanation: "Multiple readers can read shared data concurrently, but writers require exclusive access. Classic solutions must balance priority: Reader-preference risks writer starvation; Writer-preference prevents writer starvation by queuing readers behind pending write requests."
  },
  {
    id: 41,
    question: "What is NUMA (Non-Uniform Memory Access) architecture?",
    category: "Hardware & CPU",
    difficulty: "Hard",
    explanation: "Multi-socket server architecture where each CPU socket has its own directly attached local RAM bank. Accessing local RAM is ultra-fast; accessing remote RAM attached to another socket over a QPI/UPI bus has higher latency and contention. Modern OS schedulers optimize thread placement for NUMA node locality."
  },
  {
    id: 42,
    question: "What is Symmetric Multiprocessing (SMP)?",
    category: "Hardware & CPU",
    difficulty: "Easy",
    explanation: "Computer architecture where two or more identical physical CPU cores connect to a single shared physical main memory and shared I/O bus, managed uniformly by a single OS instance."
  },
  {
    id: 43,
    question: "What is the difference between Hard Real-Time and Soft Real-Time Operating Systems (RTOS)?",
    category: "OS Architecture & System Calls",
    difficulty: "Medium",
    explanation: "**Hard Real-Time** (flight control, pacemakers, automotive braking): Missing a strict deadline results in catastrophic total system failure. **Soft Real-Time** (video streaming, gaming): Missing deadlines degrades quality of service (dropped frames) but does not cause system failure."
  },
  {
    id: 44,
    question: "What is Direct Memory Access (DMA)?",
    category: "Hardware & CPU",
    difficulty: "Medium",
    explanation: "A hardware feature that allows I/O devices (disk controllers, network cards, GPUs) to transfer data directly to/from main system RAM without continuous CPU intervention, freeing the CPU to perform computations while data transfers proceed."
  },
  {
    id: 45,
    question: "What is Journaling in File Systems (ext4, NTFS)?",
    category: "File Systems & Storage",
    difficulty: "Medium",
    explanation: "Before applying changes to main disk structures, the file system writes the proposed changes to an on-disk **Journal log**. If a power loss occurs mid-write, the file system checks the journal on reboot and completes or rolls back the transaction in seconds, avoiding hours-long `fsck` disk scans."
  },
  {
    id: 46,
    question: "What is Virtual File System (VFS) in UNIX/Linux?",
    category: "File Systems & Storage",
    difficulty: "Hard",
    explanation: "VFS is an abstract kernel layer on top of concrete file systems (ext4, XFS, NFS, Btrfs). It defines standard abstract interfaces (`open`, `read`, `write`) and objects (`inode`, `file`, `dentry`, `superblock`), allowing applications to interact with completely different file systems using identical system calls."
  },
  {
    id: 47,
    question: "What is CPU Cache Coherence (MESI Protocol)?",
    category: "Hardware & CPU",
    difficulty: "Hard",
    explanation: "In multi-core CPUs where each core has private L1/L2 caches, cache coherence ensures all cores see a consistent memory view. The **MESI protocol** tracks cache lines in 4 states: **Modified** (dirty, local only), **Exclusive** (clean, local only), **Shared** (clean, present in multiple caches), and **Invalid** (stale; must reload from L3/RAM)."
  },
  {
    id: 48,
    question: "What is False Sharing in Multi-Threaded Cache architectures?",
    category: "Hardware & CPU",
    difficulty: "Hard",
    explanation: "Occurs when two independent threads running on different CPU cores modify completely separate variables that happen to reside within the *same 64-byte CPU cache line*. Updating one variable invalidates the entire cache line in the other core, causing severe bus contention and performance collapse (prevented via cache-line padding)."
  },
  {
    id: 49,
    question: "What is Address Space Layout Randomization (ASLR)?",
    category: "Security & Protection",
    difficulty: "Medium",
    explanation: "A computer security technique that randomly arranges the memory address space positions of key data areas (stack, heap, shared libraries, executable base) at process startup, preventing buffer-overflow exploits (like Return-Oriented Programming - ROP) from jumping to predictable memory addresses."
  },
  {
    id: 50,
    question: "What is `eBPF` (Extended Berkeley Packet Filter) in the Linux Kernel?",
    category: "OS Architecture & System Calls",
    difficulty: "Hard",
    explanation: "A revolutionary in-kernel virtual machine that allows running sandboxed, verified custom programs inside the Linux kernel dynamically without modifying kernel source code or loading kernel modules. Extensively used for high-speed packet filtering (Cilium, XDP), observability (BCC, bpftrace), and runtime security auditing."
  }
];
