---
name: security-frontend
description: Bảo mật phía client order-management — token, localStorage, XSS, env NEXT_PUBLIC, axios 401. Dùng khi sửa auth, API client, render HTML ngoài, hoặc lộ dữ liệu nhạy cảm.
---

# Security (frontend)

## Khi nào dùng

- Sửa `auth-context`, `auth.service`, `ApiClient` interceptors.
- Thêm `dangerouslySetInnerHTML` hoặc render rich text (tránh nếu không cần).
- Thêm biến `NEXT_PUBLIC_*` — nhớ: **mọi giá trị NEXT_PUBLIC lộ cho browser**.

## Quy tắc cứng

- **Không** log token / response chứa PII trong production path.
- Token trong `localStorage` — hiểu rủi ro XSS; không nhân đôi token ra nhiều key tùy tiện.

## Kết hợp

- `business-rules` — không bypass quyền chỉ vì “tiện” ở client.
- `data-fetching` — xử lý 401, retry, redirect sau logout.

## Ví dụ prompt

```text
Sửa flow 401: security-frontend + data-fetching; không in response ra console.
```
