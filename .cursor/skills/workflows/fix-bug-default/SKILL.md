---
name: fix-bug-default
description: Bugfix workflow — reproduce, root cause, minimal patch, verify. Use for errors/regressions/wrong behavior; NOT new features.
disable-model-invocation: true
priority: high
triggerKeywords: [bug, fix, broken, error, crash, regression, debug, wrong, not working]
---

# Fix Bug (Default)

```
[ ] repo-knowledge: use AGENT_MAP → matching flow/feature only
[ ] Reproduce (expected vs actual; route → hook → api from cache)
[ ] One root cause — orders/money/roles → read business-rules first
[ ] Minimal fix (agent-coding-discipline)
[ ] Check feature `Architecture Debt Notes` before copying nearby imports/patterns
[ ] pnpm type-check && pnpm lint
[ ] Report: cause · files · verify result
```

Domain routing table: `../../references/domain-routing.md`
