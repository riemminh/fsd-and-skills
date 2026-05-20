---
title: React 19 Ref Prop
impact: MEDIUM
tags: react19, refs, forwardref
---

## React 19 Ref Prop

React 19 allows `ref` as a regular prop in function components. Do not apply this rule to React 18 projects.

**React 18 pattern**

```tsx
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} {...props} />);
```

**React 19 pattern**

```tsx
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```
