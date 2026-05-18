---
name: agent-coding-discipline
description: >-
  Agent coding discipline — 4 Karpathy principles (think, simplicity, surgical
  changes, goal-driven). Use when writing/editing/reviewing code; pair with
  workflows fix-bug-default and feature-shipping.
disable-model-invocation: true
priority: high
triggerKeywords: [discipline, scope, refactor, minimal, overcomplicate, surgical, karpathy]
---

**🔹 Load:** On every coding task (especially with `fix-bug-default` or `feature-shipping`).

# Agent Coding Discipline

Principles from [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT) — reduce common LLM coding mistakes.

**Tradeoff:** Biases toward caution over speed. For trivial tasks (typo, one-liner), use judgment — full rigor not required.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State assumptions explicitly; if uncertain, ask.
- Multiple interpretations → list them; don't pick silently.
- A simpler approach exists → say so; push back when warranted.
- Unclear → stop, name what's confusing, ask the user.

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features or options beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or config that wasn't requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite.

**Test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor what isn't broken.
- Match repo style even if you'd do it differently.
- Unrelated dead code → **mention** it; don't delete unless asked.

Orphans from **your** changes (unused imports/vars/functions) → remove.

**Test:** Every changed line should trace directly to the user's request.

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

| Instead of… | Transform to… |
| ------------- | ------------- |
| "Add validation" | Tests for invalid inputs → pass |
| "Fix bug" | Reproduce (or describe clearly) → fix → verify |
| "Refactor X" | Checks pass before and after |

Multi-step — brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

Strong criteria → agent loops independently. Weak criteria ("make it work") → constant clarification.

**This repo:** after coding, workflows run `pnpm type-check && pnpm lint` once.

---

## Project-specific

- Don't create `.md` files unless the user asked.
- Commit / push only when the user explicitly requests.
- Domain logic (orders, RBAC): correctness before optimization — pair `business-rules`.

---

## Signs it's working

- Diffs contain only requested changes.
- Fewer rewrites from overengineering.
- Clarifying questions come **before** implementation, not after mistakes.

## Pair with

- `workflows/fix-bug-default` — surgical + goal-driven for bugfixes
- `workflows/feature-shipping` — simplicity + scope for new features
