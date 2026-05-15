# Order domain (summarized from code)

Primary sources: `src/features/orders/types/index.ts` and utils `order-status`, `order-calculations`.

## Status (`OrderStatus`)

`pending` | `processing` | `shipped` | `delivered` | `cancelled`

**Suggested invariants (confirm with PM):**

- Status transitions should not **skip** intermediate steps if UI / reporting depends on order.
- `cancelled` must not “come back” to active without an explicit flow.

## Money fields on `Order`

- `subtotal`, `tax`, `shipping`, `total` — any change must stay **consistent** with `items[]` (quantity × price, line subtotal).
- When editing `order-calculations` or aggregation: re-check **rounding** and currency units (demo app often uses raw numbers).

## Create / update order

- `CreateOrderInput`: `customerId`, `items` (productId + quantity), `shippingAddress`, `paymentMethod`, optional `notes`.
- `UpdateOrderInput`: may change `status`, `items`, address, notes — do not drop required API fields if the backend assumes they exist.

## History (`OrderHistoryEntry`)

- Each status change should record `timestamp`, `user`, optional `note` if UI/API supports it.

Update this file when product spec changes.
