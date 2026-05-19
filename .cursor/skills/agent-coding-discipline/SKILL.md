---
name: agent-coding-discipline
description: Minimal surgical diffs, simplicity, goal-driven verify. Use when writing/editing/reviewing code; pair with fix-bug-default or feature-shipping.
disable-model-invocation: true
priority: high
triggerKeywords: [discipline, scope, refactor, minimal, overcomplicate, surgical, karpathy]
---

# Agent Coding Discipline

1. **Route context** — use `repo-knowledge` in workflow tasks; skip broad scans when cache has a direct match.
2. **Think** — state assumptions; ask if unclear; don't guess silently.
3. **Simplicity** — smallest change; no speculative abstractions or unrequested features.
4. **Surgical** — only lines required by the request; match repo style; clean your orphans only.
5. **Verify** — define pass criteria; run `pnpm type-check && pnpm lint` after coding (workflows).

Detail + Karpathy source: `references/karpathy.md`
