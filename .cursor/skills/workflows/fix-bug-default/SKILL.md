---
name: fix-bug-default
description: Quy trình sửa bug tối thiểu cho repo order-management. Dùng khi user báo lỗi, regression, hành vi sai trên trang hoặc API client. Kết hợp agent-coding-discipline, debugging-and-bugfix, business-rules (nếu đụng nghiệp vụ), project-conventions, react-next-baseline khi cần.
---

# Workflow: Fix bug (mặc định)

## Mục đích

Sửa đúng, sửa nhỏ, không lan: **ít file**, **tiêu chí xong trước khi code**, **ưu tiên đúng nghiệp vụ**, không refactor theo.

---

## Bước 0 — Khai báo trước khi chạm code (bắt buộc)

Trước khi mở file nào, agent **phải viết ra**:

1. **Giả định** về nguyên nhân (1–2 dòng).
2. **Tiêu chí xong** — ví dụ: *"sort desc hiển thị đơn mới nhất trên cùng; lặp lại bước reproduce không còn lỗi"*.
3. **Phạm vi file** sẽ chạm (tên file cụ thể, không "nhiều file có thể").
4. Nếu có **≥ 2 cách hiểu** yêu cầu → trình bày cả hai, hỏi user, không tự chọn.

> Nguồn: `agent-coding-discipline` (Think before coding + Goal-driven).

---

## Bước 1 — Reproduce

- Route cụ thể (`/orders`, `/login`, …), bước bấm, dữ liệu mẫu.
- Dùng DevTools Network / React Query Devtools / console để confirm triệu chứng trước khi fix.

---

## Bước 2 — Chọn skill bổ sung (chỉ đọc khi đúng điều kiện)

| Điều kiện | Skill cần đọc thêm |
|-----------|-------------------|
| Bug liên quan trạng thái đơn, quyền, tính tiền, hủy, timeline | `business-rules` |
| Import path, chỗ đặt file, barrel, alias `@/` chưa chắc | `project-conventions` |
| Cache sai, staleTime, double fetch, invalidate sau mutation | `data-fetching` |
| Bug ở form, Zod schema, message lỗi | `forms-and-validation` |
| Token, 401, env lộ, `dangerouslySetInnerHTML` | `security-frontend` |
| Style / component sai | `ui-design-system` |
| Chậm UI, re-render thừa, bundle phình | `react-next-baseline/references/vercel-SKILL-excerpt.md` → chỉ `vendor/rules/<rule>.md` phù hợp (1–3 file; không mở `AGENTS.md`) |

**Quy tắc ưu tiên khi xung đột:**  
nghiệp vụ đúng & an toàn dữ liệu > convention repo > baseline Vercel.

---

## Bước 3 — Fix

- Chỉnh **nhỏ nhất** trong file đã khai báo ở Bước 0.
- Mỗi dòng diff phải **trace** về đúng triệu chứng bug.
- Không "cải thiện" code lân cận, format, hay comment ngoài phạm vi.

---

## Bước 4 — Verify

- [ ] Lặp lại bước reproduce — bug không còn.
- [ ] `pnpm lint` và `pnpm type-check` pass (nếu repo có).
- [ ] Không có file ngoài phạm vi bị thay đổi.
- [ ] Tiêu chí xong ở Bước 0 đã thỏa.

---

## Stopping rule — khi nào phải hỏi user thay vì đoán

Dừng lại và hỏi khi:

- Không reproduce được bug (cần thêm data mẫu / bước bấm chi tiết hơn).
- Fix đúng bug nhưng sẽ **phá behavior khác** — cần xác nhận trade-off.
- Phạm vi "nhỏ nhất" không đủ; cần đụng > 3 file ngoài khai báo ban đầu.
- Nguyên nhân có ≥ 2 khả năng mà không có bằng chứng phân biệt.

---

## Ví dụ prompt (copy-paste)

**Bug UI — sort sai**

```text
fix-bug-default. Phạm vi: src/features/orders/components/order-table.tsx + hook liên quan.
Triệu chứng: sort theo total sai (desc hiển thị nhỏ đến lớn).
Reproduce: /orders → bấm cột "Total" → DESC.
Tiêu chí xong: bấm DESC → đơn giá cao nhất trên cùng.
Không đụng file ngoài phạm vi.
```

**Bug nghiệp vụ — trạng thái đơn sai**

```text
fix-bug-default + business-rules.
Bug: đơn ở trạng thái "shipped" nhưng timeline vẫn hiện "pending".
Phạm vi: features/orders và types/order.
Không đổi auth hoặc payment.
```

**Lỗi 401 / token**

```text
fix-bug-default + security-frontend + data-fetching.
Bug: logout xong vào lại vẫn không redirect; token cũ còn trong header.
Tiêu chí: logout → mọi request tiếp theo không có Authorization header.
```

---

## Liên kết trong cây skill

| Skill | Vai trò trong flow này |
|-------|------------------------|
| `agent-coding-discipline` | Kỷ luật xuyên suốt — Bước 0 lấy từ đây |
| `debugging-and-bugfix` | Chi tiết luồng reproduce → isolate |
| `workflows/feature-shipping` | Chuyển sang khi fix xong mà cần thêm tính năng |
| `pr-and-code-review` | Thêm khi user yêu cầu review patch trước merge |
