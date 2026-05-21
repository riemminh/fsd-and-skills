---
title: Prefer Children Over Render Props
impact: MEDIUM
tags: children, render-props, slots
---

## Prefer Children Over Render Props

Use children or named slots when composition is mostly layout, not dynamic calculation.

**Incorrect: render prop for layout**

```tsx
<Panel renderFooter={() => <SaveButton />} />
```

**Correct: child slot**

```tsx
<Panel>
  <Panel.Footer>
    <SaveButton />
  </Panel.Footer>
</Panel>
```

Render props are still fine when the child needs computed runtime data.
