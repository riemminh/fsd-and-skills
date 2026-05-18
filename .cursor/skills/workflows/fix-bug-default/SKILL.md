---
name: fix-bug-default
description: >-
  Bugfix workflow: reproduce → find root cause → minimal patch → verify.
  Use when the user reports errors, asks to fix/debug, regression, wrong behavior,
  or crash. Do NOT use for new features (use feature-shipping).
disable-model-invocation: true
priority: high
triggerKeywords:
  [bug, fix, broken, error, crash, regression, debug, wrong, not working]
---

**🔹 Load:** When the task is fixing broken/wrong behavior — not shipping a new feature.

# Workflow: Fix Bug (Default)

## Checklist

```
- [ ] 1. Understand & reproduce
- [ ] 2. Localize root cause
- [ ] 3. Read domain skills (if needed)
- [ ] 4. Minimal fix
- [ ] 5. Verify once
- [ ] 6. Short report
```

---

## 1. Understand & reproduce

- One sentence: expected vs actual.
- Entry point: route → component → hook → `*.api.ts` / `services/*`.

---

## 2. Localize root cause

- Trace: UI → hook → API → types/utils.
- One root cause; don't patch symptoms across many files.
- Orders/money/roles: read `business-rules` before changing logic.

---

## 3. Domain skills (Read when relevant)

| Area | Skill |
| ---- | ----- |
| `src/` structure | `project-conventions` |
| Order, status, money, roles | `business-rules` |
| Cache, mutation, refetch | `data-fetching` |
| UI, dialog, loading/toast | `ui-design-system` |
| Form validation | `forms-and-validation` |
| 401, token | `security-frontend` |

---

## 4. Minimal fix

Read `agent-coding-discipline` (Karpathy: surgical + goal-driven).

- Smallest diff that fixes the root cause.
- No refactors, no new features, no repo-wide formatting.
- Correct logic before performance tweaks.

---

## 5. Verify once

```bash
pnpm type-check && pnpm lint
```

Fix errors you introduced. Skip `pnpm build` unless the user asked.

---

## 6. Report

- **Cause** (one line)
- **Files changed**
- **Commands run** for verify + result
