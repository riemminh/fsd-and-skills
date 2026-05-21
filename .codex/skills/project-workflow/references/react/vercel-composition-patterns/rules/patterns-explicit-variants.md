---
title: Create Explicit Variants
impact: MEDIUM
tags: variants, component-api, composition
---

## Create Explicit Variants

Prefer named variant components over branching on several mode props.

**Incorrect: hidden modes**

```tsx
<ProductForm mode="create" isQuickEntry />
```

**Correct: explicit variant**

```tsx
<QuickCreateProductForm />
```

Use this when the variant changes behavior or layout significantly. Keep shared internals behind smaller components.
