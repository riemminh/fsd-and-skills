---
name: feature-shipping
description: Use only when adding a new screen/API capability. Never use for fix/bug/lỗi/sai/regression prompts.
disable-model-invocation: true
priority: low
triggerKeywords: [feature, screen, workflow, capability, add, build]
---

# Feature Shipping

```
[ ] If prompt says fix/bug/lỗi/sai/regression: stop and use `fix-bug-default`
[ ] Scope: feature name + exact edit files before reading extra files
[ ] Search only by passing exact scoped files to rg/grep; do not search `.`, project root, `with-skills`, or `src`
[ ] Skip grep/read/edit for legacy roots unless this is a migration
```
