---
name: feature-shipping
description: >-
  Feature-shipping workflow: scope → conventions → implement by layer → verify.
  Use when adding capability, screens, APIs, or implement/ship a new feature.
  Do NOT use for bugfixes only (use fix-bug-default).
disable-model-invocation: true
priority: high
triggerKeywords:
  [feature, ship, implement, add, create, new screen]
---

**🔹 Load:** When building new behavior — not fixing existing broken behavior.

# Workflow: Feature Shipping

## Checklist

```
- [ ] 1. Scope
- [ ] 2. Conventions & file placement
- [ ] 3. Implement by layer
- [ ] 4. Domain skills (if needed)
- [ ] 5. Route / page
- [ ] 6. Verify once
- [ ] 7. Report
```

---

## 1. Scope

- 1–3 bullets: user-visible outcome.
- Feature: `orders` | `products` | `auth` | `customers` | new.
- If vague → ask **one** question; otherwise ship the smallest slice.

---

## 2. Conventions & file placement

Read `project-conventions` and `agent-coding-discipline` (Karpathy: simplicity + surgical) before creating files.

**New feature:**

```bash
./scripts/create-feature.sh <feature-name>
```

**Extend existing feature:** add only under `src/features/<name>/` and `src/app/`.

`app/ → features/ → shared/ → core/ → config/` — features must not import other features.

---

## 3. Implement by layer

1. **Types** — `features/<x>/types/`
2. **API** — `*.api.ts` + `ApiClient`
3. **Hooks** — React Query + `QUERY_KEYS` from `@/config`
4. **Components** — reuse `@/shared/components/ui/*`
5. **Page** — thin `src/app/.../page.tsx`

---

## 4. Domain skills (Read when needed)

| Need | Skill |
| ---- | ----- |
| Order, RBAC, money | `business-rules` |
| List, mutation, cache | `data-fetching` |
| UI, async UX | `ui-design-system` |
| Complex forms | `forms-and-validation` |
| Auth | `security-frontend` |

---

## 5. Route / page

- Route in `src/app/`; `ROUTES` from `@/config` when available.
- RBAC: `ProtectedRoute` + `allowedRoles`.
- Empty / loading / error states per `ui-design-system`.

---

## 6. Verify once

```bash
pnpm type-check && pnpm lint
```

Smoke: happy path (+ one permission case if RBAC applies).

---

## 7. Report

- **Shipped:** what the user can do now
- **Main files**
- **Test:** `pnpm dev` + steps to verify
