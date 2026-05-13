---
name: debugging-and-bugfix
description: Quy trình debug thực dụng cho order-management — reproduce, thu hẹp, fix tối thiểu, verify. Dùng khi có bug; đọc agent-coding-discipline trước để tránh diff lan.
---

# Debug & sửa bug

## Khi nào dùng

- Bất kỳ bug chức năng / UI / dữ liệu sai.

## Luồng đề xuất

1. **Đọc `agent-coding-discipline`** — nêu giả định, tiêu chí xong.
2. **Reproduce** — route (`/orders`, `/login`, …), dữ liệu mẫu, bước click.
3. **Isolate** — DevTools Network (API), React Query Devtools (cache), console.
4. **Fix nhỏ nhất** trong file liên quan.
5. **Verify** — lặp lại bước reproduce + `pnpm lint` / `type-check`.

## Kết hợp

| Vấn đề | Thêm skill |
|--------|------------|
| Sai trạng thái đơn / tiền | `business-rules` |
| Cache / refetch | `data-fetching` |
| Style / component | `ui-design-system` |
| Chậm UI / re-render / bundle | `react-next-baseline/references/vercel-SKILL-excerpt.md` chọn rule → chỉ `vendor/rules/<rule>.md` tương ứng (không đọc hết `vendor/`) + `data-fetching` nếu liên quan cache |

## Workflow gói sẵn

- Dùng **`workflows/fix-bug-default`** trong prompt để agent theo thứ tự đã chuẩn hóa.

## Scripts (tuỳ chọn)

- Thư mục `scripts/` — thêm script khi team có (grep route, smoke curl). Hiện để trống hoặc thêm sau.
