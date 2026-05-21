# Fix Bug Checklist

Use for broken/error/regression behavior. Do not use for new features.

```text
[ ] Route via `.repo-knowledge/AGENT_MAP.md` only if target flow/file is unclear
[ ] Read only the matching flow file, then its core Read First files
[ ] Declare exact edit files before patching; stop if a needed file is outside allowed scope
[ ] Search only by passing exact allowed files to rg/grep; do not search `.`, project root, `with-skills`, or `src`
[ ] Reference gate before patch: choose `react`, `composition`, or `none`
[ ] If editing `.tsx`, hooks, data fetching, rendering, performance, or refactor code: choose `react`, open `references/react/vercel-react-best-practices/references/checks.md`, then open 1-2 exact `references/react/vercel-react-best-practices/rules/<id>.md` files
[ ] If changing component API, provider/context, variants, boolean props, or slots: choose `composition`, open `references/react/vercel-composition-patterns/references/checks.md`, then open 1-2 exact `references/react/vercel-composition-patterns/rules/<id>.md` files
[ ] Choose `none` only for non-React edits; state `reference gate: none` before patching
[ ] Patch one root cause in allowed files only
[ ] Skip grep/read/edit for out-of-scope legacy roots unless named
```
