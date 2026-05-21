---
title: Derive State During Render
impact: MEDIUM
tags: rerender, effects, derived-state
---

## Derive State During Render

Do not use effects to store values that can be computed from current props or state.

**Incorrect: effect mirrors data**

```tsx
const [total, setTotal] = useState(0);
useEffect(() => setTotal(items.reduce(sumItems, 0)), [items]);
```

**Correct: compute directly**

```tsx
const total = items.reduce(sumItems, 0);
```

Use memo only when the calculation is measurably expensive.
