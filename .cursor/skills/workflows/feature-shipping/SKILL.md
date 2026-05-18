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
[ ] project-conventions + agent-coding-discipline
[ ] New: ./scripts/create-feature.sh <name> — else extend features/<x>/ + app/
[ ] Layers: types → *.api.ts → RQ hooks → components → thin page.tsx
[ ] RBAC: ProtectedRoute + allowedRoles; empty/loading/error states
[ ] pnpm type-check && pnpm lint (+ smoke happy path)
[ ] Report: shipped · files · manual test steps
```

Domain routing: `../../references/domain-routing.md`
