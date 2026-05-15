# Cache & query keys

## Existing query keys (`src/config/constants.ts`)

- `QUERY_KEYS.ORDERS` — `ALL`, `LIST(filters)`, `DETAIL(id)` (same pattern for `PRODUCTS`, `CUSTOMERS`).
- Prefer **reusing** these factories instead of loose string literals in hooks.

## Key conventions (suggested — follow existing hooks)

- Group by domain: e.g. `["orders"]`, `["orders", filters]`, `["order", id]` — stay **consistent** in `features/orders/hooks`.
- When adding a new filter: include it in the key segment that affects cache so stale UI does not appear.

## After mutations

- `invalidateQueries` or `setQueryData` depending on UX (optimistic needs `business-rules`).

## Axios

- Base URL from config — do not hardcode full URLs in hooks if `ApiClient` already covers it.

## Avoid

- Keys so broad they invalidate the whole app.
- `refetchOnWindowFocus: true` without a reason (this repo uses `false` today).
