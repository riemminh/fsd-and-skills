---
name: fix-bug-default
description: Minimal bugfix workflow for order-management. Use when the user reports bugs, regressions, or wrong behavior on a page or in the API client. Pair with agent-coding-discipline, debugging-and-bugfix, business-rules (if domain), project-conventions, react-next-baseline as needed.
---

# Workflow: Fix bug (default)

## Goal

Fix correctly, fix small, do not sprawl: **few files**, **done criteria before code**, **correct business priority**, no opportunistic refactor.

---

## Step 0 — Declare before touching code (required)

Before opening any file, the agent **must write out**:

1. **Assumption** about root cause (1–2 lines).
2. **Done criteria** — list each user **Expected** bullet; all must pass before done.
3. **File scope** to touch (specific filenames, not "maybe several files").
4. If there are **≥ 2 readings** of the request → present both, ask the user, do not pick alone.

> Source: `agent-coding-discipline` (Think before coding + Goal-driven).

---

## Step 1 — Reproduce

- Concrete route (`/orders`, `/login`, …), click steps, sample data.
- Use DevTools Network / React Query Devtools / console to confirm symptoms before fixing.

---

## Step 2 — Pick extra skills (read only when conditions match)

| Condition | Read skill |
|-----------|------------|
| Bug touches order status, permissions, money, cancel, timeline | `business-rules` |
| Expected includes UI feedback, redirect, or “nothing visible” after an action | `project-conventions` → [stack-and-layout.md](../project-conventions/references/stack-and-layout.md) — verify **app shell** (`core/providers`, root layout), not only the page/hook |
| Unsure about import paths, file placement, barrels, `@/` alias | `project-conventions` |
| Wrong cache, staleTime, double fetch, invalidate after mutation | `data-fetching` |
| Bug in form, Zod schema, error messages | `forms-and-validation` |
| Token, 401, leaked env, `dangerouslySetInnerHTML` | `security-frontend` |
| Wrong style / component | `ui-design-system` |
| Slow UI, extra re-renders, bundle bloat | `react-next-baseline/references/vercel-SKILL-excerpt.md` → only matching `vendor/rules/<rule>.md` (1–3 files; do not open `AGENTS.md`) |

**Conflict priority:**  
correct business & data safety > repo conventions > Vercel baseline.

---

## Step 3 — Fix

- **Smallest** change in files declared in Step 0.
- Every diff line must **trace** to the bug symptom.
- No "improvements" to neighboring code, formatting, or comments outside scope.

---

## Step 4 — Verify

- [ ] Repeat repro — bug gone.
- [ ] Every **Expected** bullet from Step 0 checked (not only the main symptom).
- [ ] If an Expected outcome is **visible/global**: confirm mount in app shell, not only the call site.
- [ ] `pnpm lint` and `pnpm type-check` pass (if present in repo).
- [ ] No files outside scope changed.

---

## Stopping rule — when to ask the user instead of guessing

Stop and ask when:

- Bug cannot be reproduced (need more sample data / detailed click path).
- Fix would **break other behavior** — need trade-off confirmation.
- "Smallest" scope is insufficient; need **> 3 files** beyond initial declaration.
- Root cause has **≥ 2** plausible explanations with no evidence to distinguish.

---

## Example prompts (copy-paste)

**UI bug — wrong sort**

```text
fix-bug-default. Scope: src/features/orders/components/order-table.tsx + related hook.
Symptom: sort by total wrong (desc shows low to high).
Reproduce: /orders → click "Total" column → DESC.
Done criteria: DESC → highest-total order on top.
Do not touch files outside scope.
```

**Domain bug — wrong order status**

```text
fix-bug-default + business-rules.
Bug: order is "shipped" but timeline still shows "pending".
Scope: features/orders and types/order.
Do not change auth or payment.
```

**401 / token error**

```text
fix-bug-default + security-frontend + data-fetching.
Bug: after logout, revisit still no redirect; old token still in header.
Done criteria: after logout, subsequent requests have no Authorization header.
```

---

## Links in the skill tree

| Skill | Role in this flow |
|-------|-------------------|
| `agent-coding-discipline` | Discipline throughout — Step 0 comes from here |
| `debugging-and-bugfix` | Detail on reproduce → isolate |
| `workflows/feature-shipping` | Switch when bug is fixed but a new feature is needed |
| `pr-and-code-review` | Add when the user wants a pre-merge patch review |
