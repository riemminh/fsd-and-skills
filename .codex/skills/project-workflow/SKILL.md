---
name: project-workflow
description: Use for this repo when fixing bugs, adding features, changing Next.js/FSD code, reviewing React/Next.js work, or handling project-specific UI, data fetching, forms, security, orders, RBAC, and business rules. Routes the task to the right checklist and reference files without loading everything.
---

# Project Workflow

Use this as the single Codex entrypoint for this repo. Keep the workflow scoped: read only the checklist and references needed for the current request.

## Route First

- Bug, fix, loi, sai, broken, error, crash, regression, wrong behavior: read `references/checklists/fix-bug-default.md`.
- New feature, screen, workflow, API capability, add, build: read `references/checklists/feature-shipping.md`.
- Scope, architecture, route ownership, folders, imports: read `references/project/project-conventions.md`; if ownership is unclear, read `.repo-knowledge/AGENT_MAP.md`.
- UI, button, form UI, dialog, toast, loading, style, Tailwind, component design: read `references/project/ui-design-system.md`.
- Query, cache, fetch, refetch, loading, mutation, API, axios, invalidate: read `references/project/data-fetching.md`.
- Order status, payment, cancel, role, permission, admin, manager, viewer, money, total, tax: read `references/project/business-rules.md`.
- Form validation, Zod, React Hook Form, RHF, submit validation: read `references/project/forms-and-validation.md`.
- Auth, token, security, XSS, env, NEXT_PUBLIC, 401, logout, login: read `references/project/security-frontend.md`.
- React/Next performance, bundle, rerender, waterfall, memo, async optimization: read `references/react/vercel-react-best-practices/references/checks.md`, then at most two matching rule files.
- Component API, boolean props, compound components, render props, provider/context, variants, slots: read `references/react/vercel-composition-patterns/references/checks.md`, then at most two matching rule files.
- Manual browser bug repro only when the user explicitly asks `/browser-bug-repro` or `invoke browser-bug-repro`: read `references/browser/browser-bug-repro.md`.

## Baseline Discipline

For coding or review work, read `references/discipline/agent-coding-discipline.md` when the task is broad, risky, or likely to invite unrelated refactors.

## Loading Rule

Do not scan all references. Choose the smallest set from the route list, read those files, then continue with normal repo inspection.
