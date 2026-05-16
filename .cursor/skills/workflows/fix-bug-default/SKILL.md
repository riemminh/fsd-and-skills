---
name: fix-bug-default
description: "Bugfix workflow (order-management). AUTO-PICK when prompt has bug/fix/regression/wrong/broken/incorrect/not working/crash/defect/hotfix/patch (behavior). NOT for add/create/new/implement/remove/delete/feature ship. Scope+Done alone is NOT enough. Pair: debugging-and-bugfix, agent-coding-discipline."
---

# Workflow: Fix bug (default)

## When to use — keyword routing

**Pick this skill** when the user describes **broken or wrong existing behavior** (something used to work or should match spec but does not).

| Signal          | Examples                                                        |
| --------------- | --------------------------------------------------------------- |
| Defect          | `bug`, `defect`, `issue` (as in ticket)                         |
| Repair behavior | `fix`, `hotfix`, `patch` (fix behavior)                         |
| Wrong output    | `wrong`, `incorrect`, `unexpected`, `doesn't match`             |
| Failure         | `broken`, `not working`, `fails`, `crash`, `error` (runtime/UI) |
| Regression      | `regression`, `used to work`, `stopped working`                 |
| Symptom-led     | `Symptom:`, `Reproduce:`, `Expected:` (vs current bug)          |

**Do not pick this skill** when the main ask is **new or changed capability** (even in one file) — use `workflows/feature-shipping` instead. Strong **anti-keywords**: `add`, `create`, `new`, `implement`, `extend`, `remove`, `delete`, `feature`, `ship`.

**Disambiguation**

| Phrase                                         | Workflow                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `fix bug`, `wrong sort order`                  | **fix-bug-default**                                                                                    |
| `edit` + **add column, new field, new button** | **feature-shipping**                                                                                   |
| Only `Scope:` + `Done:` (no bug/feature verb)  | Read [skills-hub](../skills-hub/SKILL.md) → **ask user** or infer from Done (new UI element → feature) |
| `fix` + **typo / lint / types only**           | Neither workflow required; minimal edit                                                                |

> Agent: state chosen workflow in Step 0 (e.g. `Workflow: fix-bug-default`).

## Goal

Fix correctly, fix small, do not sprawl: **few files**, **done criteria before code**, **correct business priority**, no opportunistic refactor.

---

## Step 0 — Declare before touching code (required)

Before opening any file, the agent **must write out**:

1. **Assumption** about root cause (1–2 lines).
2. **Done criteria** — list each user **Expected** bullet; all must pass before done.
3. **File scope** to touch (specific filenames, not "maybe several files").
4. If there are **≥ 2 readings** of the request → present both, ask the user, do not pick alone.

---

## Step 1 — Reproduce

- Concrete route (`/orders`, `/login`, …), click steps, sample data.
- Use DevTools Network / React Query Devtools / console to confirm symptoms before fixing.

---

## Step 2 — Pick extra skills (read only when conditions match)

| Condition                                                                     | Read skill                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bug touches order status, permissions, money, cancel, timeline                | `business-rules`                                                                                                                                                                    |
| Expected includes UI feedback, redirect, or "nothing visible" after an action | `project-conventions` → [stack-and-layout.md](../project-conventions/references/stack-and-layout.md) — verify **app shell** (`core/providers`, root layout), not only the page/hook |
| Unsure about import paths, file placement, barrels, `@/` alias                | `project-conventions`                                                                                                                                                               |
| Wrong cache, staleTime, double fetch, invalidate after mutation               | `data-fetching`                                                                                                                                                                     |
| Bug in form, Zod schema, error messages                                       | `forms-and-validation`                                                                                                                                                              |
| Token, 401, leaked env, `dangerouslySetInnerHTML`                             | `security-frontend`                                                                                                                                                                 |
| Wrong style / component                                                       | `ui-design-system`                                                                                                                                                                  |
| Slow UI, extra re-renders, bundle bloat                                       | `react-next-baseline/references/vercel-SKILL-excerpt.md` → only matching rules (1–3 files)                                                                                          |

**Conflict priority:** correct business & data safety > repo conventions > Vercel baseline.

---

## Step 3 — Fix

- **Smallest** change in files declared in Step 0.
- Every diff line must **trace** to the bug symptom.
- No "improvements" to neighboring code, formatting, or comments outside scope.

---

## Step 4 — Verify

- [ ] Repeat repro — bug gone
- [ ] Every **Expected** bullet from Step 0 checked (not only the main symptom)
- [ ] If an Expected outcome is **visible/global**: confirm mount in app shell, not only the call site
- [ ] No files outside scope changed
- [ ] Run `pnpm type-check` once at end (+ ≤1 retry if failed)
- [ ] Run `pnpm lint` once at end (+ ≤1 retry if failed)

**Order:** finish code → `type-check` → `lint` (not interleaved with partial fixes).

**CRITICAL:** Wait until ALL edits complete before running type-check/lint. Maximum 2 runs per command (1 initial + 1 retry). Fix ALL errors before retry. DO NOT run per-file eslint. DO NOT run again after passing.

**Stop and ask when:** bug cannot be reproduced, fix would break other behavior, need >3 files beyond initial declaration, or root cause has ≥2 plausible explanations.
