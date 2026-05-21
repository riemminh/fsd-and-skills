---
name: forms-and-validation
description: Use for multi-field forms, validation, Zod schemas, React Hook Form, RHF resolvers, input validation, and submit validation in this repo. Not for simple inputs.
---

# Forms & Validation

RHF state + Zod schema → `zodResolver(schema)` in `useForm`.

```tsx
const schema = z.object({ field: z.string().min(1, "Required") });
const form = useForm({ resolver: zodResolver(schema) });
```

Pair: `ui-design-system` (submit UX) · `data-fetching` (mutations) · `business-rules` (domain rules)
