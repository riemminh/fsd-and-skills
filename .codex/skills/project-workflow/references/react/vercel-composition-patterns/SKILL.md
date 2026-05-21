---
name: vercel-composition-patterns
description: Use after repo flow scope is known when refactoring React component APIs, boolean props, compound components, render props, provider boundaries, context interfaces, slots, variants, or React 19 ref patterns.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel Composition Patterns

Use this only after the repo flow has selected exact files.

## Rule Categories By Priority

| Priority | Category                | Impact | Prefix          |
| -------- | ----------------------- | ------ | --------------- |
| 1        | Component Architecture  | HIGH   | `architecture-` |
| 2        | State Management        | MEDIUM | `state-`        |
| 3        | Implementation Patterns | MEDIUM | `patterns-`     |
| 4        | React 19 APIs           | MEDIUM | `react19-`      |

```
[ ] First route through `.repo-knowledge/AGENT_MAP.md` or the matched flow file
[ ] Work only on already allowed edit files
[ ] Open `references/checks.md`
[ ] Choose at most 2 rule IDs, then open only those `rules/<id>.md` files
[ ] Do not migrate call sites outside allowed scope unless the prompt asks for an API migration
[ ] Do not list/scan `rules/`, `.`, project root, `with-skills`, or `src`
[ ] Do not open `AGENTS.md`, `CLAUDE.md`, `README.md`, generated test cases, or the upstream repo
[ ] React 19-specific patterns apply only if the project already uses React 19
```
