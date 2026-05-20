---
title: Decouple State Implementation
impact: MEDIUM
tags: state, provider, implementation
---

## Decouple State Implementation

UI parts should not know whether state comes from `useState`, React Query, Zustand, or server sync.

**Incorrect: UI owns implementation**

```tsx
function ProductFields() {
  const store = useProductStore();
  return <Input value={store.name} />;
}
```

**Correct: provider owns implementation**

```tsx
function ProductFields() {
  const { state, actions } = useProductForm();
  return <Input value={state.name} onChange={actions.setName} />;
}
```
