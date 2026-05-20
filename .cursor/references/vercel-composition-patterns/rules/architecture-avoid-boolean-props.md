---
title: Avoid Boolean Prop Proliferation
impact: CRITICAL
tags: architecture, boolean-props, composition
---

## Avoid Boolean Prop Proliferation

Do not keep adding boolean props to control component modes. Each boolean multiplies hidden states.

**Incorrect: mode booleans**

```tsx
<Form isCreate isCompact showAdvanced />
```

**Correct: explicit composition**

```tsx
<CreateProductForm density="compact">
  <AdvancedFields />
</CreateProductForm>
```

Use this when API complexity is growing, not for a one-off prop.
