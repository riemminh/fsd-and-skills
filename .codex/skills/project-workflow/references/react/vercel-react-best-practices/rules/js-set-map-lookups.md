---
title: Use Set Or Map For Repeated Lookups
impact: LOW-MEDIUM
tags: javascript, map, set, loops
---

## Use Set Or Map For Repeated Lookups

When matching items repeatedly, build a `Set` or `Map` once instead of scanning arrays.

**Incorrect: repeated find**

```ts
orders.map((order) => products.find((product) => product.id === order.productId));
```

**Correct: indexed lookup**

```ts
const productById = new Map(products.map((product) => [product.id, product]));
orders.map((order) => productById.get(order.productId));
```

Best for dashboard metrics and cross-list joins.
