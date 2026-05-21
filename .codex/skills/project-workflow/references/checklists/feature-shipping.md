# Feature Shipping Checklist

Use only when adding a new screen/API capability. Never use for fix/bug/loi/sai/regression prompts.

```text
[ ] If prompt says fix/bug/loi/sai/regression: stop and use `references/checklists/fix-bug-default.md`
[ ] Scope: feature name + exact edit files before reading extra files
[ ] Search only by passing exact scoped files to rg/grep; do not search `.`, project root, `with-skills`, or `src`
[ ] Reference gate before patch: choose `react`, `composition`, or `none`
[ ] If editing `.tsx`, hooks, data fetching, rendering, performance, or refactor code: choose `react`, open `references/react/vercel-react-best-practices/references/checks.md`, then open 1-2 exact `references/react/vercel-react-best-practices/rules/<id>.md` files
[ ] If changing component API, provider/context, variants, boolean props, or slots: choose `composition`, open `references/react/vercel-composition-patterns/references/checks.md`, then open 1-2 exact `references/react/vercel-composition-patterns/rules/<id>.md` files
[ ] Choose `none` only for non-React edits; state `reference gate: none` before patching
[ ] Skip grep/read/edit for legacy roots unless this is a migration
```
