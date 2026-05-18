---
name: security-frontend
description: Token storage, XSS, NEXT_PUBLIC exposure, 401. Use when editing auth, ApiClient, env vars, or rendering untrusted HTML.
disable-model-invocation: true
priority: medium
triggerKeywords: [auth, token, security, xss, env, NEXT_PUBLIC, 401, logout, login]
---

# Security (Frontend)

## Rules

- No token/PII logs in production
- `localStorage` token = XSS risk; single key, no duplicates
- `NEXT_PUBLIC_*` is public to the browser
- Pair `data-fetching` for 401/retry; `business-rules` for permission bypass

## Touch points

`auth-context`, `auth.service`, `ApiClient` interceptors — avoid `dangerouslySetInnerHTML` unless required
