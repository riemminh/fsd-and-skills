# Dependency layers (per ARCHITECTURE.md)

Source: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) (**Clear Dependencies** section).

## Allowed import order

```
app/ → features/ → shared/ → core/ → config/
```

- **Higher** layers may import from **lower** layers.
- **Lower** layers must not import from **higher** (e.g. `config/` does not import `features/`).
- **Features do not import other features directly** — use `shared/`, callback props, or lift shared logic to `shared/` / `core/` when truly shared.

## When to break (ask / document in PR)

- Cross-import between two `features/*` (e.g. `orders` imports `products`) — avoid; if unavoidable, team must agree.

## Drift vs ARCHITECTURE.md (so agents are not confused)

| ARCHITECTURE.md says | Current repo |
|----------------------|--------------|
| `config/routes.ts` | **`ROUTES` + `QUERY_KEYS` live in `src/config/constants.ts`**, exported via `src/config/index.ts`. No separate `routes.ts` yet. |
| `core/middleware/` | Directory **may not exist** — add when shared middleware is needed; do not assume it is there. |

Update this table if you later split `routes.ts` or add `core/middleware/`.
