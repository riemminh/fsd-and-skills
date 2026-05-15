---
name: feature-shipping
description: "Feature shipping workflow (order-management). AUTO-PICK when prompt has add/create/new/implement/extend/remove/delete/update/edit/feature/ship/column/button/screen/form OR Vietnamese: thêm, tạo, mới, xóa, cập nhật, chỉnh sửa, bổ sung, thêm cột, triển khai. NOT for bug/fix/regression/wrong/broken/lỗi/sửa lỗi. Scope+Done alone: if Done adds UI/API capability → this skill. Pair: project-conventions."
---

# Workflow: Ship a feature

## When to use — keyword routing

**Pick this skill** when the user wants **new or changed product behavior** (UI, API, form, column, permission, refactor with same behavior declared explicitly).

| Signal | Examples (EN) | Examples (VI) |
|--------|----------------|---------------|
| Create | `add`, `create`, `new`, `introduce`, `implement` | `thêm`, `tạo`, `mới`, `triển khai` |
| Change structure | `extend`, `update`, `edit`, `modify`, `change` (behavior/capability) | `cập nhật`, `chỉnh`, `sửa` (component/UI, not “sửa lỗi”) |
| Remove | `remove`, `delete`, `drop` | `xóa`, `gỡ`, `bỏ` |
| Ship intent | `feature`, `ship`, `build`, `scaffold` | `tính năng`, `làm feature` |
| UI/API nouns | `column`, `button`, `page`, `route`, `hook`, `filter`, `dialog` | `cột`, `nút`, `trang`, `filter`, `form` |
| Done = new capability | `Done: show Items column`, `Done: filter by status` | `Done: hiển thị cột Items` |

**Do not pick this skill** when the user reports **existing behavior is wrong** — use `workflows/fix-bug-default`. Strong **anti-keywords**: `bug`, `fix`, `broken`, `regression`, `wrong`, `not working`, `lỗi`, `sửa lỗi`, `hỏng`, `sai`.

**Disambiguation**

| Phrase | Workflow |
|--------|----------|
| `thêm cột Items`, `add filter`, `create login page` | **feature-shipping** |
| `sort is wrong`, `fix cancel button`, `regression on /orders` | **fix-bug-default** |
| `refactor` + **behavior unchanged** | **feature-shipping** (surgical; say so in Step 0) |
| Only `Scope:` + `Done:` | If Done describes **new** UI/API → **feature-shipping**; if **incorrect** current behavior → **fix-bug-default**; else ask |

> Agent: state chosen workflow in Step 0 (e.g. `Workflow: feature-shipping`).

## Goal

Add features with correct scope and conventions, no sprawl: **declare first**, **read skills as actually needed**, **verify outputs clearly**.

---

## Step 0 — Declare before code (required)

Before opening any file, the agent **must write out**:

1. **Scope** — list of files/folders to create or edit (specific names).
2. **Done criteria** — user-visible behavior after the feature works.
3. **Assumptions** about unclear conventions (file placement, hook names, …) — list to confirm or ask.
4. **Extra skills to read** — pick from Step 1 table below, not the whole tree.

If scope is vague or there are **≥ 2** substantial implementation paths → summarize both, ask the user before coding.

> Source: `agent-coding-discipline` (Think before coding + Goal-driven).

---

## Step 1 — Pick skills (read only when conditions match)

| Condition | Read skill |
|-----------|------------|
| **Always** when unsure about file placement, imports, barrels, feature structure | `project-conventions` (+ `references/stack-and-layout.md` for quick map) |
| Feature touches order status, permissions, money, cancel, timeline | `business-rules` |
| Needs UI: `shared/components/ui`, Tailwind, dark mode, layout | `ui-design-system` |
| Needs fetch / mutation / cache: React Query hooks, API client | `data-fetching` |
| Has form: RHF + Zod, async submit, error messages | `forms-and-validation` |
| Touches auth, token, env, external HTML rendering | `security-frontend` |
| Touches perf: waterfall, bundle, re-render, Server/Client boundary | `react-next-baseline/references/vercel-SKILL-excerpt.md` → only matching `vendor/rules/<rule>.md` (1–3 files; do not open `AGENTS.md`) |

**Conflict priority:**  
correct business & safety > repo conventions > framework baseline.

---

## Step 2 — Implement

- Create / edit only files declared in Step 0.
- Keep existing repo patterns (`@/` alias, barrel `index.ts`, `features/<domain>/` layout).
- No one-off abstractions; no refactor outside scope.
- Every added line must trace to declared done criteria.

---

## Step 3 — Verify

### Behavioral checks (required)

- [ ] Step 0 done criteria met (correct behavior on route/UI).
- [ ] No files outside scope changed.
- [ ] Imports use correct aliases; barrel exports updated if new files join the public API.

### Static checks — minimal runs (required when repo has scripts)

**Goal:** one verification pass at the end. Repeated `pnpm type-check` / `pnpm lint` inflate context (shell output) and **cost extra tokens** without improving feature quality.

| Phase | Do | Do not |
|-------|-----|--------|
| **While implementing** | Use IDE **`ReadLints`** on files you changed | Run `tsc` / `eslint` after every small edit or new file |
| **After all edits** | Run **`pnpm type-check` once**, then **`pnpm lint` once** (only if scripts exist) | Run full project lint **and** per-file eslint in the same task |
| **On failure** | Fix **all** reported issues in scope, then retry — **at most 1 retry per command** | Scaffold file → type-check → scaffold file → type-check |
| **On success** | Stop — do not re-run “to be sure” | Re-run because an earlier sandbox run failed if a later run already passed |

**Order:** finish implementation → `type-check` → `lint` (not interleaved with partial work).

**User override:** if the prompt says `skip lint` / `skip type-check`, skip those commands and say what was skipped in the closing summary.

> Same rules as `workflows/fix-bug-default` Step 4 (static checks).

### Checklist

- [ ] `pnpm type-check` pass (once at end, + ≤1 retry only if it failed)
- [ ] `pnpm lint` pass (once at end, + ≤1 retry only if it failed)

---

## Stopping rule — when to ask the user instead of guessing

Stop and ask when:

- Initial scope grows into another domain (e.g. add order filter → feels like changing the whole payment module).
- Repo has **≥ 2** viable patterns and it is unclear which the team uses for this feature.
- Feature touches sensitive business (order cancel, refund, RBAC) and `business-rules` does not cover it clearly.
- Need **≥ 1** extra route / domain file outside declared scope.

---

## Example prompts (copy-paste)

**Add Items column (table only)**

```text
feature-shipping. Scope: src/features/orders/components/order-table.tsx only.
Done: cột "Items" hiển thị order.items.length, căn phải; không sửa order-grid.
Keywords: thêm cột / add column — not a bugfix.
```

**Add filter on /orders**

```text
feature-shipping. Scope: src/features/orders — add filter UI + update useOrders hook.
Done criteria: user selects status "pending" → list shows only pending orders; URL updates ?status=pending.
Skills: project-conventions + data-fetching + ui-design-system.
Do not change payment domain; do not add new routes.
```

**Add login page**

```text
feature-shipping. Scope: src/features/auth — login form, submit, redirect on success.
Done criteria: valid credentials → redirect to /orders; wrong credentials → error message.
Skills: forms-and-validation + security-frontend.
Do not change global QueryClient.
```

**Refactor order-table into smaller components**

```text
feature-shipping. Scope: src/features/orders/components/order-table.tsx and child components split out.
Done criteria: sort/filter behavior unchanged after refactor; no new logic.
Skills: project-conventions + agent-coding-discipline (surgical — do not change logic).
```

**Minimal verify (save tokens)**

```text
feature-shipping. Scope: <files>.
Done criteria: <expected>.
Verify: one pnpm type-check + one pnpm lint after all edits; no per-file eslint/tsc.
```

---

## Links in the skill tree

| Skill | Role in this flow |
|-------|-------------------|
| `agent-coding-discipline` | Discipline throughout — Step 0 comes from here |
| `project-conventions` | Repo conventions: folders, imports, barrels (almost always) |
| `workflows/fix-bug-default` | Switch when feature ships but bugs remain — narrow file scope |
| `pr-and-code-review` | Add when the user wants a pre-merge diff review |
