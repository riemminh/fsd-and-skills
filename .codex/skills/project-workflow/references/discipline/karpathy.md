# Karpathy coding discipline (detail)

Source: [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT).

**Tradeoff:** Caution over speed. Trivial tasks (typo, one-liner) — use judgment.

## 1. Think before coding

- State assumptions; ask if uncertain.
- Multiple interpretations → list them.
- Simpler approach exists → say so.
- Unclear → stop and ask.

## 2. Simplicity first

- No unrequested features, abstractions, config, or impossible error paths.
- If 200 lines could be 50, rewrite.

## 3. Surgical changes

- Don't improve adjacent code or refactor unrelated code.
- Match repo style. Unrelated dead code → mention, don't delete unless asked.
- Remove orphans from **your** changes only.

## 4. Goal-driven execution

| Instead of…      | Transform to…                   |
| ---------------- | ------------------------------- |
| "Add validation" | Tests for invalid inputs → pass |
| "Fix bug"        | Reproduce → fix → verify        |
| "Refactor X"     | Checks pass before and after    |

Multi-step: `1. [Step] → verify: [check]`

**This repo:** workflows use the repo's normal checks after coding.

## Project-specific

- No `.md` unless user asked.
- Commit/push only when user requests.
- Domain (orders, RBAC): correctness first — pair `business-rules`.
