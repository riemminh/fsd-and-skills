---
title: Memoize Expensive Boundaries
impact: MEDIUM
tags: rerender, memo, components
---

## Memoize Expensive Boundaries

Use memoization for expensive child boundaries with stable props, not as a default habit.

**Incorrect: memo everywhere**

```tsx
const Label = memo(function Label({ text }: { text: string }) {
  return <span>{text}</span>;
});
```

**Correct: memo expensive lists**

```tsx
const OrderTable = memo(function OrderTable({ orders }: Props) {
  return <DataGrid rows={orders} />;
});
```

First reduce unnecessary parent state and unstable props.
