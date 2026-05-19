---
name: project-conventions
description: Next.js 16 stack, import aliases, layer rules. Use when onboarding, adding routes/features, or unsure where files go under src/.
disable-model-invocation: true
priority: high
triggerKeywords: [structure, folder, import, alias, convention, architecture, where, organize]
---

# Project Conventions

## Stack

Next.js 16 App Router · React 19 TS strict · RQ v5 (`query-provider.tsx`) · Axios (`core/api/client.ts`) · RHF+Zod · Tailwind v4 (`dark` on `<html>`)

## Layers

`app/ → features/ → shared/ → core/ → config/` — higher imports lower only; **features never import features**.

## Aliases

`@/` → `src/` · `@/features/auth` · `@/shared/components/ui` · `@/config`

## On demand

Generated map: `.repo-knowledge/AGENT_MAP.md` routes prompt → feature/flow → `Read First`.

Tree, request flow, env: `references/structure.md` · Full: `docs/ARCHITECTURE.md` · Domain: `business-rules`
