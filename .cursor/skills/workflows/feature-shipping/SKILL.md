---
name: feature-shipping
description: "Feature shipping workflow (order-management). AUTO-PICK when prompt has add/create/new/implement/extend/remove/delete/update/edit/feature/ship/column/button/screen/form. NOT for bug/fix/regression/wrong/broken. Scope+Done alone: if Done adds UI/API capability → this skill. Pair: project-conventions."
---

# Workflow: Ship a feature

## When to use — keyword routing

**Pick this skill** when the user wants **new or changed product behavior** (UI, API, form, column, permission, refactor with same behavior declared explicitly).

| Signal                | Examples                                                             |
| --------------------- | -------------------------------------------------------------------- |
| Create                | `add`, `create`, `new`, `introduce`, `implement`                     |
| Change structure      | `extend`, `update`, `edit`, `modify`, `change` (behavior/capability) |
| Remove                | `remove`, `delete`, `drop`                                           |
| Ship intent           | `feature`, `ship`, `build`, `scaffold`                               |
| UI/API nouns          | `column`, `button`, `page`, `route`, `hook`, `filter`, `dialog`      |
| Done = new capability | `Done: show Items column`, `Done: filter by status`                  |

**Do not pick this skill** when the user reports **existing behavior is wrong** — use `workflows/fix-bug-default`. Strong **anti-keywords**: `bug`, `fix`, `broken`, `regression`, `wrong`, `not working`.

**Disambiguation**

| Phrase                                                        | Workflow                                                                                                                   |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `add column Items`, `add filter`, `create login page`         | **feature-shipping**                                                                                                       |
| `sort is wrong`, `fix cancel button`, `regression on /orders` | **fix-bug-default**                                                                                                        |
| `refactor` + **behavior unchanged**                           | **feature-shipping** (surgical; say so in Step 0)                                                                          |
| Only `Scope:` + `Done:`                                       | If Done describes **new** UI/API → **feature-shipping**; if **incorrect** current behavior → **fix-bug-default**; else ask |

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

---

## Step 1 — Pick skills (read only when conditions match)

| Condition                                                                        | Read skill                                                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Always** when unsure about file placement, imports, barrels, feature structure | `project-conventions` (+ `references/stack-and-layout.md` for quick map)                   |
| Feature touches order status, permissions, money, cancel, timeline               | `business-rules`                                                                           |
| Needs UI: `shared/components/ui`, Tailwind, dark mode, layout                    | `ui-design-system`                                                                         |
| Needs fetch / mutation / cache: React Query hooks, API client                    | `data-fetching`                                                                            |
| Has form: RHF + Zod, async submit, error messages                                | `forms-and-validation`                                                                     |
| Touches auth, token, env, external HTML rendering                                | `security-frontend`                                                                        |
| Touches perf: waterfall, bundle, re-render, Server/Client boundary               | `react-next-baseline/references/vercel-SKILL-excerpt.md` → only matching rules (1–3 files) |

**Conflict priority:** correct business & safety > repo conventions > framework baseline.

---

## Step 2 — Implement

- Create / edit only files declared in Step 0.
- Keep existing repo patterns (`@/` alias, barrel `index.ts`, `features/<domain>/` layout).
- No one-off abstractions; no refactor outside scope.
- Every added line must trace to declared done criteria.

---

## Step 3 — Verify

- [ ] Done criteria met (correct behavior on route/UI)
- [ ] No files outside scope changed
- [ ] Imports use correct aliases; barrel exports updated
- [ ] Run `pnpm type-check` once at end (+ ≤1 retry if failed)
- [ ] Run `pnpm lint` once at end (+ ≤1 retry if failed)

**Order:** finish implementation → `type-check` → `lint` (not interleaved).

**Stop and ask when:** scope grows beyond initial declaration, ≥2 viable patterns unclear, or touches sensitive business logic not covered in `business-rules`.
