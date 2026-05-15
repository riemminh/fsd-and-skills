# Permissions & user roles (from code)

## Role type (`UserRole`)

Single definition (duplicated in several files):

- `src/types/user.ts` — `export type UserRole = "admin" | "manager" | "viewer"`
- `src/features/auth/types/index.ts` — same union

Three roles: **`admin`**, **`manager`**, **`viewer`**.

## Demo accounts (`src/data/mock-users.ts`)

| Email | Role | Notes |
|-------|------|--------|
| `admin@example.com` | `admin` | Login page may show placeholder hint |
| `manager@example.com` | `manager` | |
| `viewer@example.com` | `viewer` | Read-only (per UI rules below) |

Password / login flow: see `src/app/login/page.tsx` and `auth.api` (may be mocked in demo).

## Permission matrix (from current checks in code)

| Action | `admin` | `manager` | `viewer` | Source in repo |
|--------|---------|-----------|----------|-----------------|
| Visit `/orders` (list) | Yes | Yes | Yes | Logged in only (`orders/page.tsx`) |
| **Create order** button (list UI) | Yes | Yes | No | `order-list.tsx`: `canCreateOrder = role === "admin" \|\| role === "manager"` |
| **`/orders/create` page** | Yes | Yes | No (redirect + toast) | `orders/create/page.tsx` |
| **Edit order** in drawer | Yes | Yes | No | `order-detail-drawer.tsx`: `canEdit` |
| **Cancel order** in drawer | Yes | Yes* | No | `canCancel = canEdit && status in pending|processing` — *only when status allows |

**Viewer:** can view list/detail; cannot create orders; cannot edit/cancel in drawer (per current `canEdit` rules).

## `ProtectedRoute` (`src/shared/components/common/protected-route.tsx`)

- Props: `allowedRoles?: string[]` (role strings; pass real `UserRole` values).
- Not logged in → redirect `/login`.
- Logged in but **role not in `allowedRoles`** → redirect **`/orders`** (no dedicated forbidden page).
- Omit `allowedRoles` → only checks authentication.

When adding routes: follow this pattern or an equivalent guard; update the table above.

## Auth mechanics (token)

- Token: `localStorage` key `auth_token`; user: key `user`.
- API: `ApiClient` adds `Authorization: Bearer` (`src/core/api/client.ts`).
- **Do not** log tokens or paste them into chat.

## Order status vs cancel/edit (domain layer, beyond roles alone)

- Helpers `canEditOrder` / `canCancelOrder` / valid transitions: `src/features/orders/utils/order-status.ts`.
- **Drawer UI** (`order-detail-drawer.tsx`) is **stricter** than util: `canCancel` only for `pending` or `processing` (while `canCancelOrder` in util may allow more). When changing business rules, **align** util vs UI or document why they differ.

## Role hook

- `useUserRole()` in `src/features/auth/hooks/use-auth.ts` — returns `user?.role \|\| null`.

## When extending RBAC

- Add rows/columns to the table above and new check sites (middleware, server actions, etc.).
- If a real backend has finer permissions than `admin|manager|viewer`, replace the table with API spec and link it here.
