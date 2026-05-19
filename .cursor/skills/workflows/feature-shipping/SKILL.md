---
name: feature-shipping
description: Ship new capability — scope, layers, verify. Use for new screens/APIs/features; NOT bugfixes-only.
disable-model-invocation: true
priority: high
triggerKeywords: [feature, ship, implement, add, create, new screen]
---

# Feature Shipping

```
[ ] Scope: 1–3 bullets; feature name; smallest slice
[ ] If scope spans routes/features: `.repo-knowledge/AGENT_MAP.md` → matching feature/flow
[ ] project-conventions + agent-coding-discipline
[ ] Layers: types → *.api.ts → RQ hooks → components → thin page.tsx
[ ] Verify with the repo's normal checks
[ ] Report: shipped · files
```

Domain routing: `../../references/domain-routing.md`
