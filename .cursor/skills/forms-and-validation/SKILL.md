---
name: forms-and-validation
description: RHF + Zod for forms. Use for complex forms with validation.
disable-model-invocation: true
priority: low
triggerKeywords: [form, validation, zod, react-hook-form, rhf, input, submit]
---

**🔹 Load:** For complex forms with validation (RHF + Zod).

# Forms & Validation

## Stack

- **React Hook Form** (RHF) - form state
- **Zod** - schema validation

## Use When

- Creating/editing forms with validation
- Multiple fields with complex rules
- Form submission with error handling

## Pattern

```tsx
const schema = z.object({
  field: z.string().min(1, "Required"),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Pair With

- `ui-design-system` (form components, async submit UX)
- `data-fetching` (mutations)
- `business-rules` (validation rules)
