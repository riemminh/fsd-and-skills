---
title: Lift State Into Providers
impact: MEDIUM
tags: state, provider, siblings
---

## Lift State Into Providers

Lift state when sibling components need to coordinate or share actions.

**Incorrect: duplicated local state**

```tsx
<FilterPanel />
<ResultsTable />
```

Each component tracks the selected filter separately.

**Correct: shared provider**

```tsx
<ProductSearchProvider>
  <FilterPanel />
  <ResultsTable />
</ProductSearchProvider>
```

Avoid providers for state used by only one small component.
