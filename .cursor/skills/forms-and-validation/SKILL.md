---
name: forms-and-validation
description: RHF + Zod schemas and resolvers. Use only for multi-field forms with validation rules, not simple inputs.
disable-model-invocation: true
priority: low
triggerKeywords: [form, validation, zod, react-hook-form, rhf, input, submit]
---

# Forms & Validation

RHF state + Zod schema → `zodResolver(schema)` in `useForm`.

```tsx
const schema = z.object({ field: z.string().min(1, "Required") });
const form = useForm({ resolver: zodResolver(schema) });
```

Pair: `ui-design-system` (submit UX) · `data-fetching` (mutations) · `business-rules` (domain rules)
