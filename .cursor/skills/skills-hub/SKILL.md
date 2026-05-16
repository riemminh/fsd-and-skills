---
name: skills-hub
description: Index of order-management skills. FIRST read "Workflow routing by keywords" to choose fix-bug-default vs feature-shipping from prompt keywords (bug/fix vs add/create/delete). Read when unsure which skill to pick.
---

# Hub: how to use the skill tree in this repo

## Workflow routing by keywords (read first)

Before coding, pick **exactly one** workflow skill. Priority:

1. User names workflow explicitly (`fix-bug-default` / `feature-shipping`).
2. Keyword table below (EN or VI).
3. **Done criteria** semantics: _new capability_ → feature; _correct wrong behavior_ → bug.
4. Mixed or only `Scope:` + `Done:` with no verb → **ask the user** (do not default to fix-bug-default).

### → `workflows/fix-bug-default`

| EN                                                | VI                                    |
| ------------------------------------------------- | ------------------------------------- |
| bug, fix, hotfix, patch (behavior), defect, issue | bug, error, broken                    |
| wrong, incorrect, unexpected, not working         | wrong, incorrect, broken, not working |
| broken, crash, fails, error (symptom)             | broken, crash                         |
| regression, used to work, stopped working         | regression, used to work              |
| Symptom / Reproduce / Expected (bug ticket)       | Symptom / Reproduce                   |

### → `workflows/feature-shipping`

| EN                                                | VI                                  |
| ------------------------------------------------- | ----------------------------------- |
| add, create, new, implement, introduce, extend    | add, create, new, implement, extend |
| remove, delete, drop, update, edit, modify        | remove, delete, update, edit        |
| feature, ship, build, scaffold                    | feature, ship, build                |
| column, button, page, route, filter, dialog, form | column, button, page, filter, form  |

### Common mistakes

| Prompt                                                     | Wrong pick       | Correct pick                              |
| ---------------------------------------------------------- | ---------------- | ----------------------------------------- |
| `Scope: order-table.tsx` / `Done: Items column displays …` | fix-bug-default  | **feature-shipping** (new column in Done) |
| `fix sort by total wrong on /orders`                       | feature-shipping | **fix-bug-default**                       |
| `edit order-table` (no "bug") + Done adds column           | fix-bug-default  | **feature-shipping**                      |
| `fix sort bug`                                             | feature-shipping | **fix-bug-default**                       |

## Quick map (folder → role)

| Folder                       | Use when                                                                                    | One-line example for your prompt                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `prompt-analysis`            | **BEFORE any feature/bugfix** — parse user prompt into concrete requirements                | "Read prompt-analysis first to extract ALL requirements from user prompt."                                |
| `agent-coding-discipline`    | Any task that needs thinking / avoiding sprawling diffs                                     | "Apply agent-coding-discipline; done criteria: …"                                                         |
| `react-next-baseline`        | React/Next perf, bundle, fetch patterns (Vercel)                                            | "react-next-baseline: read `references/vercel-SKILL-excerpt.md` then only specific rule files as needed." |
| `project-conventions`        | Repo conventions + stack/`src/` map (see `references/stack-and-layout.md`)                  | "Read project-conventions + stack-and-layout before adding a route."                                      |
| `business-rules`             | Orders, money, status, auth affecting business logic                                        | "business-rules before changing OrderStatus."                                                             |
| `ui-design-system`           | Tailwind, `shared/components/ui`; async submit UX detail in `references/async-action-ux.md` | "Read ui-design-system + references/async-action-ux for API-bound buttons."                               |
| `data-fetching`              | React Query, axios, `QUERY_KEYS`                                                            | "data-fetching: invalidate after cancel."                                                                 |
| `forms-and-validation`       | RHF + Zod                                                                                   | "forms-and-validation for create order form."                                                             |
| `security-frontend`          | Token, 401, leaked env                                                                      | "security-frontend when editing ApiClient."                                                               |
| `debugging-and-bugfix`       | Bug workflow                                                                                | "debugging-and-bugfix + reproduce on /orders."                                                            |
| `pr-and-code-review`         | PR review                                                                                   | "pr-and-code-review for current diff."                                                                    |
| `workflows/fix-bug-default`  | Bugfix bundle                                                                               | "Run fix-bug-default. Verify: MAX 2× type-check + MAX 2× lint total (see verification-counter)."          |
| `workflows/feature-shipping` | New feature bundle                                                                          | "Run feature-shipping. Verify: MAX 2× type-check + MAX 2× lint total (see verification-counter)."         |

## Priority when skills conflict

1. Correct business logic & safety (`business-rules`, `security-frontend`)
2. Repo conventions (`project-conventions`)
3. Framework baseline (`react-next-baseline`)

## External sources wired into the tree

| Source                                                                                                                                           | Location in tree                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/react-best-practices` (skill name `vercel-react-best-practices`) | `react-next-baseline/` + `references/upstream-links.md` |
| [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)                                                    | `agent-coding-discipline/` (four principles spirit)     |

## Combined examples (copy-paste)

**Bug: sort orders wrong (table UI only)** — keywords: `wrong`, `fix`  
`workflows/fix-bug-default` + scope `order-table.tsx` + `project-conventions`.

**Feature: add Items column to order-table** — keywords: `add`, `new column`, `Done: display column`  
`workflows/feature-shipping` + scope `order-table.tsx` only; do not touch `order-grid.tsx`.

**Add API filter + cache** — keywords: `add`, `filter`  
`workflows/feature-shipping` + `data-fetching` + `project-conventions`. Static verify: one `pnpm type-check` + one `pnpm lint` at end only.

**Change cancel-order flow**  
`business-rules` + `data-fetching` (invalidate) + `agent-coding-discipline`.

## Install Vercel baseline via CLI (optional)

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

If the CLI creates a folder with a different name, keep it or sync content — still document it in `react-next-baseline/references/upstream-links.md`.
