---
name: fix-bug-default
description: "Bugfix workflow (order-management). AUTO-PICK when prompt has bug/fix/regression/wrong/broken/incorrect/not working/crash/defect/hotfix/patch (behavior) OR Vietnamese: lỗi, sửa lỗi, hỏng, sai, không hoạt động, regression, sửa bug. NOT for add/create/new/implement/thêm/tạo mới/xóa/bổ sung/cột mới/feature ship. Scope+Done alone is NOT enough. Pair: debugging-and-bugfix, agent-coding-discipline."
---

# Workflow: Fix bug (default)

## When to use — keyword routing

**Pick this skill** when the user describes **broken or wrong existing behavior** (something used to work or should match spec but does not).

| Signal | Examples (EN) | Examples (VI) |
|--------|----------------|---------------|
| Defect | `bug`, `defect`, `issue` (as in ticket) | `lỗi`, `bug` |
| Repair behavior | `fix`, `hotfix`, `patch` (fix behavior) | `sửa lỗi`, `sửa bug` |
| Wrong output | `wrong`, `incorrect`, `unexpected`, `doesn't match` | `sai`, `không đúng`, `không khớp` |
| Failure | `broken`, `not working`, `fails`, `crash`, `error` (runtime/UI) | `hỏng`, `không hoạt động`, `bị lỗi` |
| Regression | `regression`, `used to work`, `stopped working` | `regression`, `trước đây đúng giờ sai` |
| Symptom-led | `Symptom:`, `Reproduce:`, `Expected:` (vs current bug) | `Triệu chứng:`, `Tái hiện:` |

**Do not pick this skill** when the main ask is **new or changed capability** (even in one file) — use `workflows/feature-shipping` instead. Strong **anti-keywords**: `add`, `create`, `new`, `implement`, `extend`, `remove`, `delete`, `feature`, `ship`, `thêm`, `tạo`, `mới`, `xóa`, `bổ sung`, `thêm cột`, `thêm nút`.

**Disambiguation**

| Phrase | Workflow |
|--------|----------|
| `sửa lỗi`, `fix bug`, `wrong sort order` | **fix-bug-default** |
| `sửa` / `edit` + **add column, new field, new button** | **feature-shipping** |
| Only `Scope:` + `Done:` (no bug/feature verb) | Read [skills-hub](../skills-hub/SKILL.md) → **ask user** or infer from Done (new UI element → feature) |
| `fix` + **typo / lint / types only** | Neither workflow required; minimal edit |

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

### Behavioral checks (required)

- [ ] Repeat repro — bug gone.
- [ ] Every **Expected** bullet from Step 0 checked (not only the main symptom).
- [ ] If an Expected outcome is **visible/global**: confirm mount in app shell, not only the call site.
- [ ] No files outside scope changed.

### Static checks — minimal runs (required when repo has scripts)

**Goal:** one verification pass at the end. Repeated `pnpm type-check` / `pnpm lint` inflate context (shell output) and **cost extra tokens** without improving fix quality.

| Phase | Do | Do not |
|-------|-----|--------|
| **While editing** | Use IDE **`ReadLints`** on files you changed | Run `tsc` / `eslint` after every small edit |
| **After all edits** | Run **`pnpm type-check` once**, then **`pnpm lint` once** (only if scripts exist) | Run full project lint **and** per-file eslint in the same task |
| **On failure** | Fix **all** reported issues in scope, then retry — **at most 1 retry per command** | Fix one line → type-check → fix one line → type-check |
| **On success** | Stop — do not re-run “to be sure” | Re-run because sandbox failed earlier if a later run already passed |

**Order:** finish code → `type-check` → `lint` (not interleaved with partial fixes).

**User override:** if the prompt says `skip lint` / `skip type-check`, skip those commands and say what was skipped in the closing summary.

### Checklist

- [ ] `pnpm type-check` pass (once at end, + ≤1 retry only if it failed)
- [ ] `pnpm lint` pass (once at end, + ≤1 retry only if it failed)

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

**Minimal verify (save tokens)**

```text
fix-bug-default. Scope: <files>.
Done criteria: <expected>.
Verify: one pnpm type-check + one pnpm lint after all edits; no per-file eslint/tsc.
```

---

## Links in the skill tree

| Skill | Role in this flow |
|-------|-------------------|
| `agent-coding-discipline` | Discipline throughout — Step 0 comes from here |
| `debugging-and-bugfix` | Detail on reproduce → isolate |
| `workflows/feature-shipping` | Switch when bug is fixed but a new feature is needed |
| `pr-and-code-review` | Add when the user wants a pre-merge patch review |
