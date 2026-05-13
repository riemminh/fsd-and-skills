---
name: ui-design-system
description: UI order-management — Tailwind, dark mode, component trong shared/components/ui, typography. Dùng khi chỉnh layout, form control, bảng, dialog; kết hợp project-conventions cho import path.
---

# UI & design system (repo)

## Khi nào dùng

- Thêm/sửa màn `src/app/**`, component trong `src/features/**/components`, hoặc `src/shared/components/ui/**`.
- Chỉnh spacing, typography, theme (class `dark` trên `<html>` trong `layout.tsx`).

## Quy ước

- Dùng primitive UI từ `@/shared/components/ui/*` khi đã có (Button pattern shadcn, Card, Tabs, Sheet, v.v.).
- `cn()` từ `@/shared/utils` để gộp class Tailwind.
- Font: Geist + Inter trong `layout.tsx` — giữ nhất quán khi thêm heading.

## Chi tiết

- [spacing-and-typography.md](references/spacing-and-typography.md)

## Kết hợp

- `forms-and-validation` — form phức tạp (RHF + Zod).
- `react-next-baseline` — nếu vấn đề là render list lớn / dynamic import (ít gặp ở chỉnh UI nhỏ).

## Ví dụ prompt

```text
Thêm empty state cho order list theo ui-design-system; không tự tạo component raw nếu đã có trong shared/components/ui.
```
