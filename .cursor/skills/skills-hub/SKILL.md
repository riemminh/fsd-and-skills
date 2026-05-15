---
name: skills-hub
description: Index of all order-management `.cursor/skills` — when to use each folder, example prompts, conflict priority. Read first when unsure which skill to pick.
---

# Hub: how to use the skill tree in this repo

## Quick map (folder → role)

| Folder | Use when | One-line example for your prompt |
|--------|----------|----------------------------------|
| `agent-coding-discipline` | Any task that needs thinking / avoiding sprawling diffs | “Apply agent-coding-discipline; done criteria: …” |
| `react-next-baseline` | React/Next perf, bundle, fetch patterns (Vercel) | “react-next-baseline: read `references/vercel-SKILL-excerpt.md` then only `vendor/rules/<rule>.md` as needed — do not read all of `vendor/`.” |
| `project-conventions` | Repo conventions + stack/`src/` map (see `references/stack-and-layout.md`) | “Read project-conventions + stack-and-layout before adding a route.” |
| `business-rules` | Orders, money, status, auth affecting business logic | “business-rules before changing OrderStatus.” |
| `ui-design-system` | Tailwind, dark mode, `shared/components/ui` | “UI follows ui-design-system.” |
| `data-fetching` | React Query, axios, `QUERY_KEYS` | “data-fetching: invalidate after cancel.” |
| `forms-and-validation` | RHF + Zod | “forms-and-validation for create order form.” |
| `security-frontend` | Token, 401, leaked env | “security-frontend when editing ApiClient.” |
| `debugging-and-bugfix` | Bug workflow | “debugging-and-bugfix + reproduce on /orders.” |
| `pr-and-code-review` | PR review | “pr-and-code-review for current diff.” |
| `workflows/fix-bug-default` | Bugfix bundle | “Run fix-bug-default. Verify: one type-check + one lint after all edits.” |
| `workflows/feature-shipping` | New feature bundle | “Run feature-shipping. Verify: one type-check + one lint after all edits.” |

## Priority when skills conflict

1. Correct business logic & safety (`business-rules`, `security-frontend`)  
2. Repo conventions (`project-conventions`)  
3. Framework baseline (`react-next-baseline`)

## External sources wired into the tree

| Source | Location in tree |
|--------|------------------|
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/react-best-practices` (skill name `vercel-react-best-practices`) | `react-next-baseline/` + `references/upstream-links.md` |
| [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | `agent-coding-discipline/` (four principles spirit) |

## Combined examples (copy-paste)

**Bug: sort orders (table UI only)**  
`workflows/fix-bug-default` + scope `order-table.tsx` + `project-conventions` + (if slow / re-renders) `react-next-baseline`.

**Add API filter + cache**  
`workflows/feature-shipping` + `data-fetching` + `project-conventions` (add `references/stack-and-layout.md` if you need the map). Static verify: one `pnpm type-check` + one `pnpm lint` at end only.

**Change cancel-order flow**  
`business-rules` + `data-fetching` (invalidate) + `agent-coding-discipline`.

## Install Vercel baseline via CLI (optional)

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

If the CLI creates a folder with a different name, keep it or sync content — still document it in `react-next-baseline/references/upstream-links.md`.
