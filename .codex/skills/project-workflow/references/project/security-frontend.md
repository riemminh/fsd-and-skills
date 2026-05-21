---
name: security-frontend
description: Use for frontend security in this repo, including auth, token storage, XSS, env and NEXT_PUBLIC exposure, 401 handling, logout/login, ApiClient, and untrusted HTML.
---

# Security (Frontend)

## Rules

- No token/PII logs in production
- `localStorage` token = XSS risk; single key, no duplicates
- `NEXT_PUBLIC_*` is public to the browser
- Pair `data-fetching` for 401/retry; `business-rules` for permission bypass

## Touch points

`auth-context`, `auth.service`, `ApiClient` interceptors — avoid `dangerouslySetInnerHTML` unless required
