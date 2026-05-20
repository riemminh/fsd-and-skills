---
name: project-conventions
description: Next.js/FSD paths and import boundaries. Use when structure/location is unclear.
disable-model-invocation: true
priority: medium
triggerKeywords: [structure, folder, architecture, boundary, organize]
---

# Project Conventions

`app/ → features/ → shared/ → core/ → config/` — higher imports lower only; **features never import features**.

Edit only matched route/feature scope. Declare exact edit files first; search only by passing those files to rg/grep. Skip grep/read/edit for roots outside the FSD map (`src/services`, `src/hooks`, `src/components`, `src/types`, `src/lib`, `src/contexts`) unless the prompt names them.

For React/Next `.tsx`, hooks, rendering, refactor, or component API changes, apply the workflow reference gate before patching.

Use `.repo-knowledge/AGENT_MAP.md` only when route/feature ownership is unclear.
