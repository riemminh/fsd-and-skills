---
title: Define Context Interfaces
impact: HIGH
tags: state, context, dependency-injection
---

## Define Context Interfaces

Expose context as a clear contract with `state`, `actions`, and `meta`.

**Incorrect: ad hoc values**

```tsx
<Context.Provider value={{ form, setForm, loading, inputRef }} />
```

**Correct: structured interface**

```tsx
<Context.Provider value={{ state, actions, meta }} />
```

This lets providers change implementation while consumers keep the same API.
