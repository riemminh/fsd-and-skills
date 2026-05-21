---
title: Avoid Inline Component Definitions
impact: MEDIUM
tags: rerender, components, identity
---

## Avoid Inline Component Definitions

Do not define React components inside another component; identity changes on each render.

**Incorrect: nested component**

```tsx
function Page() {
  function EmptyState() {
    return <p>No rows</p>;
  }
  return <EmptyState />;
}
```

**Correct: module-level component**

```tsx
function EmptyState() {
  return <p>No rows</p>;
}
```

Keep helpers local only when they are not components.
