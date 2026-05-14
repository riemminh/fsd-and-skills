---
name: feature-shipping
description: Luồng triển khai tính năng mới (thiết kế ngắn → code theo convention → hook data → test/lint) cho order-management. Dùng khi user thêm màn, API client, form, hoặc refactor có phạm vi rõ.
---

# Workflow: Ship tính năng

## Mục đích

Thêm tính năng đúng scope, đúng convention, không lan: **khai báo trước**, **đọc skill theo nhu cầu thực**, **verify đầu ra rõ ràng**.

---

## Bước 0 — Khai báo trước khi code (bắt buộc)

Trước khi mở file nào, agent **phải viết ra**:

1. **Scope** — danh sách file/folder sẽ tạo hoặc sửa (tên cụ thể).
2. **Tiêu chí xong** — hành vi user thấy được sau khi tính năng hoạt động.
3. **Giả định** về convention chưa chắc (chỗ đặt file, tên hook, …) — liệt kê để confirm hoặc hỏi.
4. **Skill cần đọc thêm** — chọn từ bảng Bước 1 dưới, không đọc hết cây.

Nếu scope mơ hồ hoặc có ≥ 2 hướng triển khai đáng kể → trình bày ngắn gọn cả hai, hỏi user trước khi code.

> Nguồn: `agent-coding-discipline` (Think before coding + Goal-driven).

---

## Bước 1 — Chọn skill (chỉ đọc khi đúng điều kiện)

| Điều kiện | Skill cần đọc |
|-----------|--------------|
| **Luôn** — chưa chắc chỗ đặt file, import, barrel, cấu trúc feature | `project-conventions` (+ `references/stack-and-layout.md` nếu cần bản đồ nhanh) |
| Tính năng đụng trạng thái đơn, quyền, tính tiền, hủy, timeline | `business-rules` |
| Cần UI: component `shared/components/ui`, Tailwind, dark mode, layout | `ui-design-system` |
| Cần fetch / mutation / cache: React Query hooks, API client | `data-fetching` |
| Có form: RHF + Zod, submit async, message lỗi | `forms-and-validation` |
| Đụng auth, token, env, render HTML ngoài | `security-frontend` |
| Chạm perf: waterfall, bundle, re-render, Server/Client boundary | `react-next-baseline/references/vercel-SKILL-excerpt.md` → chỉ `vendor/rules/<rule>.md` phù hợp (1–3 file; không mở `AGENTS.md`) |

**Thứ tự ưu tiên khi xung đột:**  
nghiệp vụ đúng & an toàn > convention repo > baseline framework.

---

## Bước 2 — Implement

- Tạo / sửa đúng file đã khai báo ở Bước 0.
- Giữ pattern hiện có của repo (alias `@/`, barrel `index.ts`, cấu trúc `features/<domain>/`).
- Không thêm abstraction chỉ dùng một chỗ; không refactor code ngoài scope.
- Mỗi dòng thêm phải trace về tiêu chí xong đã khai báo.

---

## Bước 3 — Verify

- [ ] Tiêu chí xong ở Bước 0 thỏa (hành vi đúng trên route/UI).
- [ ] `pnpm lint` và `pnpm type-check` pass.
- [ ] Không có file ngoài scope bị thay đổi.
- [ ] Import đúng alias; barrel export đã cập nhật nếu thêm file mới ra public API.

---

## Stopping rule — khi nào phải hỏi user thay vì đoán

Dừng lại và hỏi khi:

- Scope ban đầu mở rộng sang domain khác ngoài khai báo (ví dụ: thêm filter đơn → thấy cần đổi cả payment module).
- Convention repo có ≥ 2 pattern khả thi mà không rõ cái nào team dùng cho tính năng này.
- Tính năng đụng nghiệp vụ nhạy cảm (hủy đơn, refund, phân quyền) mà `business-rules` chưa cover rõ.
- Cần tạo thêm ≥ 1 route / domain file ngoài scope đã khai báo.

---

## Ví dụ prompt (copy-paste)

**Thêm filter trên /orders**

```text
feature-shipping. Scope: src/features/orders — thêm filter UI + cập nhật useOrders hook.
Tiêu chí: user chọn status "pending" → list chỉ hiện đơn pending; URL cập nhật ?status=pending.
Skill cần: project-conventions + data-fetching + ui-design-system.
Không đổi payment domain; không tạo route mới.
```

**Thêm trang login**

```text
feature-shipping. Scope: src/features/auth — form login, submit, redirect sau thành công.
Tiêu chí: nhập đúng credentials → redirect về /orders; nhập sai → hiện error message.
Skill cần: forms-and-validation + security-frontend.
Không đổi QueryClient global.
```

**Refactor order-table sang component nhỏ hơn**

```text
feature-shipping. Scope: src/features/orders/components/order-table.tsx và các component con tách ra.
Tiêu chí: behavior sort/filter không đổi sau refactor; không thêm logic mới.
Skill cần: project-conventions + agent-coding-discipline (surgical — không đổi logic).
```

---

## Liên kết trong cây skill

| Skill | Vai trò trong flow này |
|-------|------------------------|
| `agent-coding-discipline` | Kỷ luật xuyên suốt — Bước 0 lấy từ đây |
| `project-conventions` | Convention repo: folder, import, barrel (luôn cần) |
| `workflows/fix-bug-default` | Chuyển sang khi tính năng xong nhưng còn bug — thu hẹp phạm vi file |
| `pr-and-code-review` | Thêm khi user yêu cầu review diff trước merge |
