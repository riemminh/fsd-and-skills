---
name: feature-shipping
description: Use only when adding a new screen/API capability. Never use for fix/bug/error/regression/incorrect/wrong prompts.
disable-model-invocation: true
priority: low
triggerKeywords: [feature, screen, workflow, capability, add, build]
---

# Feature Shipping

```
[ ] If prompt says fix/bug/error/regression/incorrect/wrong: stop and use `fix-bug-default`
[ ] Scope: feature name + exact edit files before reading extra files
[ ] Search only by passing exact scoped files to rg/grep; do not search `.`, project root, `with-skills`, or `src`
[ ] Reference gate before patch: choose `react`, `composition`, or `none`
[ ] React feature page guardrails: avoid convention drift, fetch waterfalls, increased bundle size, and unnecessary re-renders
[ ] For independent page data, start queries in parallel; do not fetch inside rows/cards/effects
[ ] Avoid new heavy dependencies, broad client barrel imports, nested component definitions, and effect-derived state
[ ] If editing `.tsx`, hooks, data fetching, rendering, performance, or refactor code: choose `react`, open `.cursor/references/vercel-react-best-practices/references/checks.md`, then open 1-2 exact `.cursor/references/vercel-react-best-practices/rules/<id>.md` files
[ ] If changing component API, provider/context, variants, boolean props, or slots: choose `composition`, open `.cursor/references/vercel-composition-patterns/references/checks.md`, then open 1-2 exact `.cursor/references/vercel-composition-patterns/rules/<id>.md` files
[ ] Choose `none` only for non-React edits; state `reference gate: none` before patching
[ ] Skip grep/read/edit for legacy roots unless this is a migration
```
