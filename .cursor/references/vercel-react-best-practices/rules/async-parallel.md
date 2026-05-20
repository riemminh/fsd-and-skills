---
title: Promise.all For Independent Operations
impact: CRITICAL
tags: async, waterfall, data-fetching
---

## Promise.all For Independent Operations

Start independent async work together instead of awaiting each operation in sequence.

**Incorrect: sequential waterfall**

```ts
const orders = await getOrders();
const products = await getProducts();
```

**Correct: parallel work**

```ts
const [orders, products] = await Promise.all([getOrders(), getProducts()]);
```

Use only when the calls do not depend on each other.
