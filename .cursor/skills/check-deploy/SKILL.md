---
name: check-deploy
description: >-
  Prepares the Python backend for deploy by running ruff, mypy, lint-imports, and
  pytest in fix-loops, then asks what to commit, writes semantic commits per feature,
  and pushes to GitHub. Use when the user says check-deploy, /check-deploy, prepare
  deploy, pre-push backend, or asks to run mypy/ruff/pytest before push.
disable-model-invocation: true
---

# check-deploy

Prepare the backend for deploy. Work from `backend/` (same as CI). Do not skip steps.
Do not commit or push until the user confirms the commit plan.

## Progress checklist

Copy and update as you go:

```
check-deploy:
- [ ] 1. Lint/type: ruff check, ruff format --check, mypy, lint-imports
- [ ] 2. Pytest
- [ ] 3. Ask user what to commit
- [ ] 4. Semantic commits (confirmed groups only)
- [ ] 5. Push to GitHub
```

## Step 1 — Lint / type checks

Run in `backend/`, in this order:

```bash
ruff check .
ruff format --check .
mypy .
lint-imports
```

### Fix loop

1. If any command fails: fix the **minimum** code needed (prefer `ruff format .` for format drift).
2. Re-run the **failed** command(s). If a fix may affect style or types, re-run the full Step 1 suite.
3. If the **same** issue returns (same file + code/message): try a different approach.
4. Cap: **3 attempts** per identical issue. Then stop, list remaining failures, and **do not** commit or push.
5. Do **not** weaken configs (ruff/mypy/pytest ignores, `per-file-ignores`, coverage thresholds) just to pass.

Only proceed to Step 2 when all four commands pass.

## Step 2 — Pytest

```bash
pytest
```

### Fix loop

1. On failure: fix the minimum needed (code or tests).
2. If the fix may affect types/style: re-run Step 1, then pytest again. Otherwise re-run pytest.
3. Same failure after a fix → different approach; max **3** attempts per identical failure, then stop (no commit/push).

Only proceed to Step 3 when pytest passes.

## Step 3 — Ask what to commit

**Always ask.** Never commit without an explicit confirmation of the proposed groups.

1. From repo root, gather:

```bash
git status
git diff
git log -5 --oneline
```

2. Group changes by feature (Conventional Commits: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `perf`, `ci`, `style`, `build`).
3. Present a numbered plan: each proposed commit subject + files in that group. Exclude secrets (`.env`, credentials, keys).
4. Wait for the user to confirm, edit, or cancel.

- Cancel / nothing to commit → stop. Do **not** push.
- Confirmed groups → Step 4.

## Step 4 — Semantic commits

One commit **per confirmed feature** (no megacommit).

- Stage only the files for that group.
- Message: Conventional Commits; imperative subject; body only when why is non-obvious.
- Follow project git protocol: no `--no-verify`, no force, no amend unless user rules allow; no config changes.
- On Windows PowerShell, pass the message via a here-string (equivalent to HEREDOC).

After all confirmed commits: `git status` to verify a clean intended state.

## Step 5 — Push

```bash
git push
```

If the branch has no upstream:

```bash
git push -u origin HEAD
```

On auth/remote failure: report and stop. Never `--force` / `--force-with-lease` unless the user explicitly asks in this session.

## Done

Report briefly: checks passed, commits created (subjects), push result (remote/branch).
