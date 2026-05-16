---
name: debugging-and-bugfix
description: Debug flow - reproduce, narrow down, minimal fix, verify. Use concise-output.
priority: medium
triggerKeywords: [bug, fix, error, broken, wrong, crash, issue, debug]
---

**🔹 Load:** For functional/UI/data bugs.

**OUTPUT:** Use `concise-output` - show fix only, skip verbose debugging narration.

# Debug & Bugfix

## Flow

1. Read `agent-coding-discipline` - assumptions, done criteria
2. **Reproduce** - route, sample data, click steps
3. **Isolate** - DevTools Network (API), RQ Devtools (cache), console
4. **Smallest fix** in relevant files
5. **Verify** - repeat repro steps; then **one** `pnpm type-check` + **one** `pnpm lint` after all edits (max 2 runs per command: 1 initial + 1 retry)

## Pair With

| Issue                    | Add Skill             |
| ------------------------ | --------------------- |
| Wrong order status/money | `business-rules`      |
| Cache/refetch            | `data-fetching`       |
| Style/component          | `ui-design-system`    |
| Slow UI/re-render/bundle | `react-next-baseline` |

## Bundled Workflow

Use `workflows/fix-bug-default` for standardized order.
