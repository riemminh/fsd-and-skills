# Agent Map

Open only when the target file/flow is unclear.

## How To Route A Prompt

1. If the prompt matches a flow trigger, open that flow file.
2. Search only by passing selected files to rg/grep; do not search `.`, project root, `with-skills`, or `src`.
3. Skip grep/read/edit for roots outside the matched FSD route/feature scope unless the prompt names them.
4. If still unclear, use route/feature lookup below.

## Flow Triggers

- `create-order` (`create order`, `order total`, `order form`, `stock validation`, `order RBAC`) -> `.repo-knowledge/flows/create-order.md`
- `create-product` (`create product`, `new product`, `product form`, `add product`, `product sku`) -> `.repo-knowledge/flows/create-product.md`
- `dashboard` (`dashboard`, `operations dashboard`, `metrics`, `revenue`, `stock warnings`) -> `.repo-knowledge/flows/dashboard.md`

## Feature Lookup

- `auth` -> `.repo-knowledge/features/auth.md`; root: `src/features/auth`; imports features: none
- `customers` -> `.repo-knowledge/features/customers.md`; root: `src/features/customers`; imports features: none
- `orders` -> `.repo-knowledge/features/orders.md`; root: `src/features/orders`; imports features: `auth`, `customers`, `products`; debt notes: 12
- `products` -> `.repo-knowledge/features/products.md`; root: `src/features/products`; imports features: none

## Route Ownership

- `/` -> `src/app/page.tsx` | features: `auth`
- `/dashboard` -> `src/app/dashboard/page.tsx` | features: `auth`, `orders`
- `/login` -> `src/app/login/page.tsx` | features: `auth`
- `/orders` -> `src/app/orders/page.tsx` | features: `auth`, `orders`
- `/orders/create` -> `src/app/orders/create/page.tsx` | features: `auth`, `customers`, `orders`
- `/products` -> `src/app/products/page.tsx` | features: `products`
- `/products/[id]/edit` -> `src/app/products/[id]/edit/page.tsx` | features: `products`
- `/products/create` -> `src/app/products/create/page.tsx` | features: `products`
