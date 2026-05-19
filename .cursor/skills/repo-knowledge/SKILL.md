---
name: repo-knowledge
description: Generated repo map for routing prompts to the right route, feature, flow, and source files with minimal context. Use before editing, debugging, or adding features.
disable-model-invocation: true
priority: high
triggerKeywords: [repo, knowledge, map, flow, feature, route, context, structure, architecture]
---

# Repo Knowledge

Use generated cache to route context without broad repo scans:

1. Read `.repo-knowledge/AGENT_MAP.md`.
2. If the prompt matches a flow trigger, open only `.repo-knowledge/flows/<flow>.md`.
3. If the prompt names a route/domain, open only `.repo-knowledge/features/<feature>.md`.
4. Read the listed source files in `Read First`; avoid broad repo scans until those are insufficient.
5. Treat `Architecture Debt Notes` as guardrails: current debt, not patterns to copy.
