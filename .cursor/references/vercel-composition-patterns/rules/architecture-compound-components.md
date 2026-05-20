---
title: Use Compound Components
impact: HIGH
tags: architecture, compound-components, context
---

## Use Compound Components

For complex shared-state UI, expose small subcomponents that consume a shared context.

**Incorrect: one monolith**

```tsx
<Composer showHeader showFooter renderActions={actions} />
```

**Correct: composed parts**

```tsx
<Composer.Provider>
  <Composer.Header />
  <Composer.Input />
  <Composer.Submit />
</Composer.Provider>
```

Use only when consumers need flexible layouts around the same shared state.
