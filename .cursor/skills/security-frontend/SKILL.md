---
name: security-frontend
description: Client-side security for order-management — token, localStorage, XSS, NEXT_PUBLIC env, axios 401. Use when editing auth, API client, rendering external HTML, or leaking sensitive data.
---

# Security (frontend)

## When to use

- Editing `auth-context`, `auth.service`, `ApiClient` interceptors.
- Adding `dangerouslySetInnerHTML` or rich text (avoid if unnecessary).
- Adding `NEXT_PUBLIC_*` vars — remember: **every NEXT_PUBLIC value is exposed to the browser**.

## Hard rules

- **Do not** log tokens / responses with PII on production paths.
- Token in `localStorage` — understand XSS risk; do not duplicate tokens across arbitrary keys.

## Pair with

- `business-rules` — do not bypass permissions for client “convenience”.
- `data-fetching` — handle 401, retry, redirect after logout.

## Example prompt

```text
Fix 401 flow: security-frontend + data-fetching; do not print responses to console.
```
