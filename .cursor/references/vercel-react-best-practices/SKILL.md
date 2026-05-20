---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use after repo flow scope is known when writing, reviewing, refactoring, or optimizing React/Next.js code.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
disable-model-invocation: true
priority: low
triggerKeywords: [performance, optimize, refactor, review, bundle, rerender, waterfall, memo]
---

# Vercel React Best Practices

Use this as a narrow rule overlay, not for file discovery.

## Rule Categories By Priority

| Priority | Category                 | Impact     | Prefix       |
| -------- | ------------------------ | ---------- | ------------ |
| 1        | Eliminating Waterfalls   | CRITICAL   | `async-`     |
| 2        | Bundle Size Optimization | CRITICAL   | `bundle-`    |
| 3        | Server-Side Performance  | HIGH       | `server-`    |
| 4        | Re-render Optimization   | MEDIUM     | `rerender-`  |
| 5        | Rendering Performance    | MEDIUM     | `rendering-` |
| 6        | JavaScript Performance   | LOW-MEDIUM | `js-`        |

```
[ ] First route through `.repo-knowledge/AGENT_MAP.md` or the matched flow file
[ ] Work only on already allowed edit files
[ ] Open `references/checks.md`
[ ] Choose at most 2 rule IDs, then open only those `rules/<id>.md` files
[ ] Do not list/scan `rules/`, `.`, project root, `with-skills`, or `src`
[ ] Do not open `AGENTS.md`, `CLAUDE.md`, `README.md`, generated test cases, or the upstream repo
[ ] Mention chosen rule IDs in the final summary
```
