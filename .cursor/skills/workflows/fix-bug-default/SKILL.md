---
name: fix-bug-default
description: Bugfix workflow for broken/error/regression behavior; not for new features.
disable-model-invocation: true
priority: high
triggerKeywords: [bug, fix, lỗi, sai, broken, error, crash, regression, wrong]
---

# Fix Bug (Default)

```
[ ] Route via `.repo-knowledge/AGENT_MAP.md` only if target flow/file is unclear
[ ] Read only the matching flow file, then its core Read First files
[ ] Declare exact edit files before patching; stop if a needed file is outside allowed scope
[ ] Search only by passing exact allowed files to rg/grep; do not search `.`, project root, `with-skills`, or `src`
[ ] Patch one root cause in allowed files only
[ ] Skip grep/read/edit for out-of-scope legacy roots unless named
```
