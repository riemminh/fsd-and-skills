---
name: agent-coding-discipline
description: Reduce agent-style mistakes — no guessing, minimal code, surgical diffs, clear verify criteria. For every non-trivial task in order-management. Inspired by andrej-karpathy-skills (Think / Simplicity / Surgical / Goal-driven).
---

# Discipline when the agent writes code (Karpathy-style)

## When to use this skill

- Any task that is **not** tiny (not a single-character fix).
- When the user is vague or the request can be read multiple ways.
- When editing **someone else’s code** — avoid scope-creep “cleanup”.

**Skip** the full checklist for: typo fixes, changing one obvious constant.

## Four principles (apply together)

### 1. Think before coding

- State **assumptions** aloud; if unsure, **ask** instead of guessing.
- If there are **two readings** of the request, present both; do not pick silently.
- If a **much simpler** approach exists, say so (reasonable pushback).

### 2. Simplicity first

- Only code enough to meet the request; no “just in case” features.
- No abstractions for code **used in one place only**.
- If 200 lines can be 50 and stay clear — prefer fewer lines.

### 3. Surgical changes

- Do not “improve” neighboring files, comments, or formatting **outside** the task scope.
- Do not refactor what **is not broken**.
- Keep existing style (even if you prefer another).
- Pre-existing dead code: you may mention it; **do not delete** unless asked.
- Imports / variables made redundant **by your change** → remove them.

**Check:** every diff line must **trace** back to the user’s request.

### 4. Goal-driven execution

- Turn the task into **done criteria**: e.g. “fix bug” → “reproduces → after fix no longer reproduces; sort order as specified”.
- Multiple steps: short list `step → verify`.

## Pair with other skills

| Paired skill | Role |
|--------------|------|
| `workflows/fix-bug-default` | Full ordered flow for bugfixes. |
| `workflows/feature-shipping` | Bundle when shipping a feature. |
| `project-conventions` | Repo detail after direction is chosen. |
| `business-rules` | When simplification must not break business invariants. |

## Original reference

- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — `CLAUDE.md` (same spirit as the four items above).
