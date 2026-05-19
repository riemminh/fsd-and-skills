---
name: project-conventions
description: Next.js/FSD paths and import boundaries. Use when structure/location is unclear.
disable-model-invocation: true
priority: medium
triggerKeywords: [structure, folder, architecture, boundary, organize]
---

# Project Conventions

`app/ → features/ → shared/ → core/ → config/` — higher imports lower only; **features never import features**.

Use `.repo-knowledge/AGENT_MAP.md` only when route/feature ownership is unclear.

Details: `../../references/structure.md` · `docs/ARCHITECTURE.md`
