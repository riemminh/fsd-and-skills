---
name: react-next-baseline
description: React/Next baseline (Vercel). Read excerpt then only 1-3 rule files. Use for perf, bundle, fetch, re-render.
priority: low
triggerKeywords:
  [performance, perf, slow, bundle, waterfall, re-render, memo, useMemo, RSC, server, client]
---

**🔹 Load:** For perf issues (waterfall, bundle bloat, re-renders, RSC tuning).

# React/Next Baseline (Vercel)

## Role

Framework baseline. Does NOT replace `project-conventions` or `business-rules`.

**Conflict priority:** `business-rules` + `project-conventions` WIN over Vercel docs.

## Token-Saving Flow

**DON'T:**

- List/glob all `../../references/react-best-practices/rules/`
- Load all upstream content

**DO:**

1. Read this file (role + when to use)
2. Read `references/vercel-SKILL-excerpt.md` (index + symptom hints)
3. Open ONLY 1-3 chosen rule files from `../../references/react-best-practices/rules/<rule>.md`

## When to Use

- Unnecessary sequential `await` waterfall
- Bundle bloat (dynamic import, barrel imports)
- Extra re-renders, wrong memo/useMemo
- Server vs Client component tuning

## References

| File                      | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| `vercel-SKILL-excerpt.md` | **Read first** - index + token policy + symptom hints |
| `upstream-links.md`       | Refresh vendor from GitHub                            |

## Upstream

Full copy: `../../references/react-best-practices/` from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)

## Pair With

- `data-fetching` (RQ keys, QueryProvider, staleTime)
- Tables/lists (pick `rerender-*`, `rendering-*`, `bundle-*` rules)

## Example

"Optimize order table: read react-next-baseline excerpt, then only specific rule files for re-render issues."
