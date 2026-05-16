---
name: skills-hub
description: Index of skills. Use decision tree to choose right skill. Read when unsure which skill to pick.
priority: high
triggerKeywords: [help, which, what, how, guide, index]
---

**🔹 Load:** When unsure which skill to use.

# Skills Hub (Decision Tree)

## Step 1: Workflow Type

**Is it a bug?** → `workflows/fix-bug-default`

- Keywords: bug, fix, wrong, broken, error, crash, issue

**Is it a feature?** → `workflows/feature-shipping`

- Keywords: add, create, new, implement, remove, delete, update, edit

**Mixed or unclear?** → Ask user

## Step 2: Domain

**Orders/Money/Status** → `business-rules`
**UI/Forms/Design** → `ui-design-system`
**API/Cache/Fetch** → `data-fetching`
**Performance** → `react-next-baseline`
**Auth/Security** → `security-frontend`
**Structure/Imports** → `project-conventions`

## Step 3: Cross-Cutting (Always Apply)

- `prompt-analysis` (ALWAYS FIRST)
- `agent-coding-discipline` (non-trivial tasks)
- `concise-output` (all tasks)

## Priority When Skills Conflict

1. `business-rules` + `security-frontend` (correctness & safety)
2. `project-conventions` (repo conventions)
3. `react-next-baseline` (framework optimization)

## Quick Map

| Skill                        | Use When                       | Example                                                     |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------- |
| `prompt-analysis`            | BEFORE any feature/bugfix      | "Read prompt-analysis first"                                |
| `agent-coding-discipline`    | Non-trivial tasks              | "Apply discipline; done criteria: ..."                      |
| `business-rules`             | Orders, money, status, RBAC    | "business-rules before changing OrderStatus"                |
| `project-conventions`        | Repo structure, imports        | "Read project-conventions before adding route"              |
| `data-fetching`              | RQ, axios, cache               | "data-fetching: invalidate after cancel"                    |
| `ui-design-system`           | Tailwind, components, async UX | "Read ui-design-system for API-bound buttons"               |
| `forms-and-validation`       | RHF + Zod                      | "forms-and-validation for create order form"                |
| `security-frontend`          | Token, 401, env vars           | "security-frontend when editing ApiClient"                  |
| `debugging-and-bugfix`       | Bug workflow                   | "debugging-and-bugfix + reproduce on /orders"               |
| `react-next-baseline`        | React/Next perf                | "react-next-baseline: read excerpt then specific rules"     |
| `workflows/fix-bug-default`  | Bugfix bundle                  | "Run fix-bug-default. Verify: MAX 2× type-check + 2× lint"  |
| `workflows/feature-shipping` | Feature bundle                 | "Run feature-shipping. Verify: MAX 2× type-check + 2× lint" |

## External Sources

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) → `react-next-baseline/`
- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) → `agent-coding-discipline/`

## Combined Examples

**Bug: sort orders wrong**

- Keywords: `wrong`, `fix`
- Skills: `workflows/fix-bug-default` + `project-conventions`

**Feature: add Items column**

- Keywords: `add`, `column`
- Skills: `workflows/feature-shipping` + `ui-design-system`

**Add API filter + cache**

- Keywords: `add`, `filter`
- Skills: `workflows/feature-shipping` + `data-fetching` + `project-conventions`

**Change cancel-order flow**

- Skills: `business-rules` + `data-fetching` + `agent-coding-discipline`
