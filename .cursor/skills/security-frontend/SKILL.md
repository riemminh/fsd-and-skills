---
name: security-frontend
description: Client-side security - token, localStorage, XSS, env vars, 401 handling.
priority: medium
triggerKeywords: [auth, token, security, xss, env, NEXT_PUBLIC, 401, logout, login]
---

**🔹 Load:** When editing auth, API client, rendering external HTML, or handling sensitive data.

# Security (Frontend)

## Use When

- Editing `auth-context`, `auth.service`, `ApiClient` interceptors
- Adding `dangerouslySetInnerHTML` or rich text (avoid if unnecessary)
- Adding `NEXT_PUBLIC_*` vars (exposed to browser!)

## Hard Rules

- **Don't** log tokens/PII in production
- Token in `localStorage` - understand XSS risk
- Don't duplicate tokens across keys
- `NEXT_PUBLIC_*` = visible to everyone

## Pair With

- `business-rules` (don't bypass permissions)
- `data-fetching` (handle 401, retry, redirect)

## Example

"Fix 401 flow: security-frontend + data-fetching; don't print responses to console."
