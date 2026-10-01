# Git Push Rejection and Rebase Conflict Resolution

## Scenario

While updating the project documentation, changes were made both locally and directly in the GitHub repository.

After committing the local changes, I attempted to push them to the `main` branch using:

```bash
git push
```

The push was rejected because the remote repository contained changes that were not available in the local repository.

---

## Error: Push Rejected

Git returned the following error:

```text
To https://github.com/krutiknikhal/nodejs-demo-app.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/krutiknikhal/nodejs-demo-app.git'

hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```

## Why It Happened

Changes had been made directly on GitHub while separate changes were also being made in the local repository.

As a result, the local and remote `main` branches no longer had the same commit history.

Conceptually:

```text
Remote:
A --- B --- C
           ^
           Remote change

Local:
A --- B --- D
           ^
           Local change
```

Git rejected the push because the remote contained a commit that was missing from the local branch.

Instead of overwriting the remote history, the remote changes first needed to be integrated locally.

---

## Attempted Resolution

To retrieve the latest remote changes while keeping a clean commit history, I used:

```bash
git pull --rebase origin main
```

The command fetched the latest `main` branch from GitHub and attempted to replay my local commit on top of it.

However, Git then detected another problem.

---

## Error: README Rebase Conflict

The following conflict occurred:

```text
Auto-merging README.md
CONFLICT (add/add): Merge conflict in README.md
error: could not apply 0bd7e71... Update README.MD file
```

Git stopped the rebase because both the local and remote histories contained changes involving `README.md`.

Git could not safely decide which version should be kept.

---

## Checking the Conflict

The repository state can be inspected at any point using:

```bash
git status
```

During a rebase conflict, Git identifies the files that require manual resolution.

In this case, the conflicted file was:

```text
README.md
```

The local README contained the final project documentation that I wanted to preserve.

---

## Resolving the README Conflict

After selecting and verifying the required version of `README.md`, the resolved file was staged:

```bash
git add README.md
```

Staging the file tells Git that the conflict in that file has been resolved.

The rebase was then continued using:

```bash
git rebase --continue
```

Git opened the commit-message editor and displayed the commit being replayed.

After confirming the commit message and closing the editor, Git completed the rebase.

---

## Verifying the Repository

After the rebase completed, I verified the repository state:

```bash
git status
```

Once the working tree and branch state were correct, the synchronized history could be pushed normally:

```bash
git push
```

---

## Why I Did Not Use Force Push

It may be tempting to resolve a rejected push with:

```bash
git push --force
```

However, this was intentionally avoided.

A force push rewrites the remote branch reference and can remove or overwrite remote commits if used incorrectly.

Instead, I integrated the remote changes using:

```bash
git pull --rebase origin main
```

and manually resolved the conflict.

This preserved the relevant remote history while allowing my local commit to be reapplied.

---

## What I Learned

This scenario helped me understand several important Git concepts:

- A push can be rejected when the remote branch contains commits that are missing locally.
- Making changes both locally and directly on GitHub can cause branch histories to diverge.
- `git pull --rebase` fetches remote changes and reapplies local commits on top of them.
- A rebase can stop when Git encounters conflicting changes.
- Conflicts must be resolved before the rebase can continue.
- `git add` is also used to mark a conflicted file as resolved.
- `git rebase --continue` continues a paused rebase after conflicts have been resolved.
- `git status` is useful for understanding the repository state during conflict resolution.
- Force push should not be used as the default solution to a rejected push.

---

## Commands Used

```bash
# Attempt to push local commits
git push

# Retrieve remote changes and rebase local commits
git pull --rebase origin main

# Check the repository/conflict state
git status

# Mark the README conflict as resolved
git add README.md

# Continue the rebase
git rebase --continue

# Verify the final repository state
git status

# Push the synchronized branch
git push
```

## Key Takeaway

When a push is rejected because the remote branch contains changes that are not available locally, the remote history should be inspected and integrated rather than immediately force pushing.

In this scenario, using `git pull --rebase`, resolving the README conflict, and continuing the rebase allowed the local and remote work to be synchronized safely.