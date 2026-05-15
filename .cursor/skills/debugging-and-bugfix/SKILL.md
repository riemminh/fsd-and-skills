---
name: debugging-and-bugfix
description: Practical debugging flow for order-management — reproduce, narrow down, minimal fix, verify. Use for bugs; read agent-coding-discipline first to avoid sprawling diffs.
---

# Debug & bugfix

## When to use

- Any functional / UI / wrong-data bug.

## Suggested flow

1. **Read `agent-coding-discipline`** — assumptions, done criteria.
2. **Reproduce** — route (`/orders`, `/login`, …), sample data, click steps.
3. **Isolate** — DevTools Network (API), React Query Devtools (cache), console.
4. **Smallest fix** in the relevant files.
5. **Verify** — repeat repro steps + `pnpm lint` / `type-check`.

## Pair with

| Issue | Add skill |
|-------|-----------|
| Wrong order status / money | `business-rules` |
| Cache / refetch | `data-fetching` |
| Style / component | `ui-design-system` |
| Slow UI / re-render / bundle | `react-next-baseline/references/vercel-SKILL-excerpt.md` pick rule → only `vendor/rules/<rule>.md` (do not read all of `vendor/`) + `data-fetching` if cache-related |

## Bundled workflow

- Use **`workflows/fix-bug-default`** in the prompt so the agent follows the standardized order.

## Scripts (optional)

- `scripts/` — add scripts when the team has them (grep routes, smoke curl). Empty for now or extend later.
