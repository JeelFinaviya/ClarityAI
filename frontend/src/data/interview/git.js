/**
 * 50 High-Value Git & GitHub Interview Questions
 */

export const GIT_QUESTIONS = [
  {
    id: 1,
    question: "What are the 4 fundamental internal object types in Git (Blob, Tree, Commit, Annotated Tag)?",
    category: "Git Internals",
    difficulty: "Hard",
    explanation: "1) **Blob**: Stores raw file contents (uncompressed content hashed with SHA-1/SHA-256; no filename). 2) **Tree**: Represents a directory, mapping filenames/modes to Blob or Sub-tree SHA hashes. 3) **Commit**: Points to a root Tree, parent commit SHA(s), author, committer, and commit message. 4) **Annotated Tag**: Object pointing to a specific commit with tagger metadata and signature."
  },
  {
    id: 2,
    question: "What is the difference between `git merge` and `git rebase`?",
    category: "Branching & Merging",
    difficulty: "Medium",
    explanation: "`git merge` combines two branches by creating a new **Merge Commit** with two parents, preserving complete non-linear commit history and timestamps. `git rebase` rewrites history by replaying commits from the feature branch on top of the base branch one by one, creating a clean, linear commit graph but altering commit SHA hashes."
  },
  {
    id: 3,
    question: "What is a 'Detached HEAD' state in Git and how do you recover from it?",
    category: "Core Workflows",
    difficulty: "Medium",
    explanation: "A detached HEAD occurs when `HEAD` points directly to a specific commit SHA or tag rather than a named branch reference. Any new commits made in this state are orphaned if you switch branches. Recover by creating a new branch at that commit: `git switch -c new-feature-branch`."
  },
  {
    id: 4,
    question: "What is the difference between `git reset --soft`, `--mixed`, and `--hard`?",
    category: "Core Workflows",
    difficulty: "Medium",
    explanation: "`--soft`: Moves HEAD to target commit; keeps changes staged in the Index and Working Directory. `--mixed` (default): Moves HEAD and resets Index/staging area; keeps changes unstaged in Working Directory. `--hard`: Moves HEAD, resets Index, AND destroys all changes in the Working Directory."
  },
  {
    id: 5,
    question: "What is `git reflog` and how can it rescue accidentally deleted commits or hard resets?",
    category: "Recovery & History",
    difficulty: "Hard",
    explanation: "`git reflog` records every update to local branch tips and `HEAD` (commits, checkouts, rebases, hard resets). Even if you run `git reset --hard` or delete a branch, the commit SHA remains in reflog for ~30-90 days until garbage collected, allowing recovery via `git reset --hard HEAD@{1}` or `git branch rescue <SHA>`."
  },
  {
    id: 6,
    question: "What is `git cherry-pick` and when should it be used?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git cherry-pick <commit-hash>` applies the exact changes from a specific commit on another branch onto your current branch as a new commit. It is used to backport urgent bug fixes from main to release branches without merging entire feature branches."
  },
  {
    id: 7,
    question: "What is `git stash` and what is the difference between `git stash pop` and `git stash apply`?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git stash` temporarily shelves uncommitted modifications to working tree and index. `git stash pop` applies the top stashed change AND removes it from the stash list. `git stash apply` applies the stashed changes but keeps the stash in the stash list for future reuse."
  },
  {
    id: 8,
    question: "What is the difference between `git revert` and `git reset`?",
    category: "Recovery & History",
    difficulty: "Medium",
    explanation: "`git reset` rewrites history by moving the branch pointer backward (dangerous on shared remote branches). `git revert <commit-hash>` safely undoes changes by creating a **brand new inverse commit** that negates the specified commit, preserving existing commit history on public branches."
  },
  {
    id: 9,
    question: "What is Fast-Forward merge vs Non-Fast-Forward (`--no-ff`) merge?",
    category: "Branching & Merging",
    difficulty: "Medium",
    explanation: "A **Fast-Forward** merge occurs when the target branch has no new commits; Git simply moves the branch pointer forward without creating a merge commit. `--no-ff` forces Git to create a merge commit even if fast-forward is possible, documenting that a feature branch was merged."
  },
  {
    id: 10,
    question: "What is `git bisect` and how does it find bugs using binary search?",
    category: "Debugging & Tools",
    difficulty: "Hard",
    explanation: "`git bisect` performs binary search across commit history to identify the exact commit that introduced a bug. You mark `git bisect good <commit>` and `git bisect bad <commit>`. Git checks out the midpoint commit for testing (`git bisect run ./test_script.sh`), locating the offending commit in logarithmic O(log N) steps."
  },
  {
    id: 11,
    question: "What is the difference between `git fetch` and `git pull`?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "`git fetch` downloads remote objects and updates remote-tracking branches (`origin/main`) without modifying your local working tree or current branch. `git pull` is essentially `git fetch` followed immediately by `git merge FETCH_HEAD` (or `git rebase` if configured)."
  },
  {
    id: 12,
    question: "How do Merge Conflicts happen and how do you resolve them?",
    category: "Branching & Merging",
    difficulty: "Easy",
    explanation: "Conflicts happen when two branches modify the same line of a file differently or one branch deletes a file another modified. Git marks conflict sections (`<<<<<<<`, `=======`, `>>>>>>>`). Developers manually edit the file to the desired state, stage it with `git add`, and run `git commit` (or `git rebase --continue`)."
  },
  {
    id: 13,
    question: "What is the `.gitignore` file and what is the difference between `.gitignore` and `.git/info/exclude`?",
    category: "Configuration",
    difficulty: "Easy",
    explanation: "`.gitignore` defines file/directory patterns to be ignored by Git and is committed to the repository for all team members. `.git/info/exclude` is a local-only ignore file that applies only to your personal local clone and is never committed or pushed."
  },
  {
    id: 14,
    question: "What is `git squash` and how is Interactive Rebase (`git rebase -i`) used to clean commits?",
    category: "Core Workflows",
    difficulty: "Medium",
    explanation: "`git rebase -i HEAD~5` opens an interactive menu where you can `squash` (combine commits into one), `reword` (edit commit messages), `drop` (delete commits), `edit` (split commits), or reorder commits before merging a Pull Request."
  },
  {
    id: 15,
    question: "What is Git LFS (Large File Storage)?",
    category: "Git Internals",
    difficulty: "Medium",
    explanation: "Git LFS replaces large binary files (videos, 3D models, datasets) in the Git repository with tiny text pointer files containing SHA hashes. The actual large binary assets are stored on remote dedicated LFS storage servers, keeping the main Git repository clone size small."
  },
  {
    id: 16,
    question: "What are Git Hooks (`pre-commit`, `pre-push`) and how does Husky automate them?",
    category: "Automation & CI/CD",
    difficulty: "Medium",
    explanation: "Git hooks are custom shell scripts in `.git/hooks/` that run automatically on events (`pre-commit`, `commit-msg`, `pre-push`). **Husky** automates sharing and installing these hooks via npm/package.json, automatically running linters (oxlint/eslint), prettier, and unit tests before allowing commits."
  },
  {
    id: 17,
    question: "What is GitHub Actions and what are Workflows, Jobs, and Steps?",
    category: "Automation & CI/CD",
    difficulty: "Medium",
    explanation: "GitHub Actions is a CI/CD platform configured in `.github/workflows/*.yml`. A **Workflow** is an automated pipeline triggered by events (`push`, `pull_request`). A workflow contains **Jobs** (running on distinct virtual runners like `ubuntu-latest`), and each job contains sequential **Steps** (running shell commands or community actions)."
  },
  {
    id: 18,
    question: "What is the difference between `git checkout`, `git switch`, and `git restore`?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "In modern Git (2.23+), the overloaded `git checkout` command was split into two dedicated commands: `git switch` (strictly for switching and creating branches: `git switch -c feature`), and `git restore` (strictly for restoring working tree files or unstaging: `git restore --staged file`)."
  },
  {
    id: 19,
    question: "What is a Fork vs a Clone in GitHub?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "A **Clone** is a local copy of a Git repository on your local machine. A **Fork** is a server-side copy of another user's GitHub repository created under your own GitHub account, used in open-source to make changes and submit Pull Requests to the original repository."
  },
  {
    id: 20,
    question: "What is `git clean` and what does `git clean -fd` do?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git clean` deletes untracked files from the working directory. `-f` forces deletion; `-d` includes untracked directories (`-x` also deletes ignored files)."
  },
  {
    id: 21,
    question: "What is the purpose of `.gitkeep` files in Git?",
    category: "Configuration",
    difficulty: "Easy",
    explanation: "Git tracks files, not empty directories. A dummy empty file named `.gitkeep` (or `.keep`) is committed inside an empty directory to force Git to track and preserve the directory structure in source control."
  },
  {
    id: 22,
    question: "What is `git submodule` vs `git subtree`?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "**Submodules** point to a specific commit SHA of an external repository (stored in `.gitmodules`); clones must run `git submodule update --init`. **Subtrees** embed the external repository's code and history directly into a subfolder of the main repo as standard commits, eliminating submodule clone friction."
  },
  {
    id: 23,
    question: "What is GPG commit signing and why is it used on GitHub?",
    category: "Security",
    difficulty: "Medium",
    explanation: "Commit author names and emails can be easily spoofed in Git configs. Signing commits with a private GPG/SSH key allows GitHub to cryptographically verify your identity and display the green **Verified** badge on commits."
  },
  {
    id: 24,
    question: "What is `git remote prune origin`?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "It deletes local stale remote-tracking branch references (`origin/feature-x`) that have already been deleted on the remote GitHub repository."
  },
  {
    id: 25,
    question: "What is `git blame` and `git log -S` (Pickaxe)?",
    category: "Debugging & Tools",
    difficulty: "Medium",
    explanation: "`git blame <file>` displays the author, commit SHA, and date for every individual line in a file. `git log -S 'search_string'` (Pickaxe) searches the entire commit history for commits that added or removed the specific string."
  },
  {
    id: 26,
    question: "What is Git Garbage Collection (`git gc`) and packfiles?",
    category: "Git Internals",
    difficulty: "Hard",
    explanation: "`git gc` cleans up orphaned loose objects and compresses individual loose object files in `.git/objects/` into indexed, delta-compressed **packfiles** (`.pack` and `.idx`), drastically reducing repository disk space and speeding up network transfers."
  },
  {
    id: 27,
    question: "What is the difference between `git diff` and `git diff --staged` (or `--cached`)?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git diff` shows modifications in the Working Directory that have *not yet been staged*. `git diff --staged` shows changes that *are currently staged* in the Index compared to the last commit (`HEAD`)."
  },
  {
    id: 28,
    question: "What is GitHub Branch Protection Rules and Protected Branches?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "Enforces repository governance on `main`: requiring Pull Request reviews before merging, requiring passing CI status checks (tests, linter), requiring signed commits, preventing force pushes (`git push --force`), and restricting who can push."
  },
  {
    id: 29,
    question: "What is `git push --force-with-lease` and why is it safer than `git push --force`?",
    category: "Remote & Collaboration",
    difficulty: "Medium",
    explanation: "`--force` blindly overwrites the remote branch, potentially destroying teammates' commits pushed in the meantime. `--force-with-lease` checks if the remote branch tip matches your local remote-tracking ref; if someone else pushed new commits, the push is safely rejected."
  },
  {
    id: 30,
    question: "What is Gitflow vs Trunk-Based Development?",
    category: "Branching & Merging",
    difficulty: "Medium",
    explanation: "**Gitflow**: Heavy branching model with long-lived branches (`main`, `develop`, `release`, `feature`, `hotfix`), merging via scheduled releases. **Trunk-Based Development**: Modern CI/CD practice where developers merge small, frequent feature branches directly into `main` daily using Feature Flags."
  },
  {
    id: 31,
    question: "What is `git worktree` and when is it useful?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "`git worktree add ../hotfix-branch hotfix` allows checking out and working on multiple branches simultaneously in separate directories from the same local repository clone, without needing to stash or commit unfinished work."
  },
  {
    id: 32,
    question: "What is Semantic Versioning (SemVer) in release tags (`v1.2.3`)?",
    category: "Automation & CI/CD",
    difficulty: "Easy",
    explanation: "`MAJOR.MINOR.PATCH`: **MAJOR** increment for breaking API changes, **MINOR** for backward-compatible new features, and **PATCH** for backward-compatible bug fixes."
  },
  {
    id: 33,
    question: "What is the three-tree architecture of Git (Working Directory, Index, HEAD)?",
    category: "Git Internals",
    difficulty: "Medium",
    explanation: "1) **Working Directory**: Physical sandbox of files on disk. 2) **Index (Staging Area)**: Proposed next commit snapshot (`.git/index`). 3) **HEAD**: Last committed snapshot pointing to active branch tip."
  },
  {
    id: 34,
    question: "What is the `git commit --amend` command?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git commit --amend` modifies the most recent commit by combining newly staged changes and updating the commit message, replacing the previous commit with a new SHA hash without creating an extra commit."
  },
  {
    id: 35,
    question: "What is `git tag` (Lightweight vs Annotated)?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "**Lightweight Tag** (`git tag v1.0`): Simple pointer/bookmark to a commit SHA. **Annotated Tag** (`git tag -a v1.0 -m 'Release'`): Full Git object containing tagger name, email, date, GPG signature, and message."
  },
  {
    id: 36,
    question: "What is a Pull Request (PR) vs a Merge Request (MR)?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "They are identical concepts: a mechanism for proposing changes from a feature branch to be reviewed, discussed, automated-tested, and approved before merging into the base branch (termed **Pull Request** in GitHub, **Merge Request** in GitLab)."
  },
  {
    id: 37,
    question: "What is `git log --graph --oneline --all`?",
    category: "Debugging & Tools",
    difficulty: "Easy",
    explanation: "Displays an ASCII text visualization of the branch topology, merge commits, and history across all local and remote branches in a compact, one-line format."
  },
  {
    id: 38,
    question: "What is `git archive`?",
    category: "Core Workflows",
    difficulty: "Easy",
    explanation: "`git archive --format=zip HEAD -o release.zip` exports a clean zip or tar archive of the repository at a specific commit or tag, excluding all internal `.git` metadata."
  },
  {
    id: 39,
    question: "What is `git rerere` (Reuse Recorded Resolution)?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "`rerere` records how you resolved merge conflicts. If the same conflict occurs again during future rebases or merges, Git automatically applies the recorded resolution without manual intervention."
  },
  {
    id: 40,
    question: "What is `git bundle`?",
    category: "Advanced",
    difficulty: "Medium",
    explanation: "`git bundle create repo.bundle main` packages Git objects and references into a single binary file, allowing offline transfer of repository commits via USB or email without network access."
  },
  {
    id: 41,
    question: "What is the difference between Squash and Merge, Rebase and Merge, and Create a Merge Commit in GitHub PRs?",
    category: "Remote & Collaboration",
    difficulty: "Medium",
    explanation: "**Create Merge Commit**: Keeps all individual commits and adds a merge commit. **Squash and Merge**: Combines all PR commits into a single clean commit on base branch. **Rebase and Merge**: Replays individual commits linearly without a merge commit."
  },
  {
    id: 42,
    question: "What is `.gitattributes` file and what is `eol=lf` line ending normalization?",
    category: "Configuration",
    difficulty: "Medium",
    explanation: "`.gitattributes` defines path-specific Git settings. Setting `* text=auto eol=lf` ensures text files always check out with consistent LF line endings, preventing cross-platform Git diff churn between Windows (CRLF) and Linux/macOS (LF)."
  },
  {
    id: 43,
    question: "What is the difference between `origin` and `upstream` remotes in Git?",
    category: "Remote & Collaboration",
    difficulty: "Easy",
    explanation: "`origin` is the default name for your own remote repository (your fork). `upstream` is the convention for the original parent repository from which you forked, used to fetch new upstream changes."
  },
  {
    id: 44,
    question: "What is `git shortlog`?",
    category: "Debugging & Tools",
    difficulty: "Easy",
    explanation: "`git shortlog -sn` summarizes `git log` output, grouping and counting total commits per author in descending order, useful for release notes and contributor statistics."
  },
  {
    id: 45,
    question: "What is `git show` vs `git log`?",
    category: "Debugging & Tools",
    difficulty: "Easy",
    explanation: "`git log` lists the history of commit messages and metadata. `git show <commit-hash>` displays the full metadata AND the exact unified diff patch of changes introduced by that specific commit."
  },
  {
    id: 46,
    question: "How do you recover a deleted local branch in Git?",
    category: "Recovery & History",
    difficulty: "Medium",
    explanation: "Run `git reflog` to locate the commit SHA where the branch was pointing before deletion, and recreate the branch: `git branch branch-name <commit-sha>`."
  },
  {
    id: 47,
    question: "What is `git update-index --assume-unchanged`?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Tells Git to temporarily ignore local modifications to an already tracked file without adding it to `.gitignore` (useful for local config files), reversed via `--no-assume-unchanged`."
  },
  {
    id: 48,
    question: "What is `git merge-base`?",
    category: "Git Internals",
    difficulty: "Hard",
    explanation: "`git merge-base branchA branchB` finds the best common ancestor commit between two branches, which Git uses as the base snapshot during 3-way merges."
  },
  {
    id: 49,
    question: "What is GitHub Dependabot and Automated Security Advisories?",
    category: "Automation & CI/CD",
    difficulty: "Easy",
    explanation: "Dependabot monitors project dependencies (npm, pip, maven) against the GitHub Advisory Database for known CVE vulnerabilities and automatically opens Pull Requests with version upgrades."
  },
  {
    id: 50,
    question: "How does Git use SHA-1 vs SHA-256 for Cryptographic Object Hashing?",
    category: "Git Internals",
    difficulty: "Hard",
    explanation: "Git historically used SHA-1 (160-bit) to hash objects. To eliminate theoretical SHA-1 collision vulnerabilities, modern Git has transitioned to **SHA-256** (256-bit object format), creating collision-proof cryptographic content addresses."
  }
];
