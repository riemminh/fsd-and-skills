---
name: project-conventions
description: Quy ước chỉ áp dụng cho repo order-management — alias import, cấu trúc features, ESLint/Prettier, API layer. Dùng khi thêm/sửa file trong src. Kết hợp react-next-baseline cho pattern React/Next chung.
---

# Quy ước dự án (order-management)

## Nguồn chính thức

- **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** — cấu trúc feature, barrel import, tầng phụ thuộc, naming. Skill này **bám theo** file đó và bổ sung chỗ **lệch thực tế** trong `references/architecture-layers.md`.

## Khi nào dùng

- Mọi thay đổi dưới `src/`.
- Khi không chắc **đặt file mới ở đâu** hoặc **import kiểu gì**.

**Không** chứa toàn bộ best practice React — phần đó xem **`react-next-baseline`**.

## Ưu tiên vs skill khác

1. `business-rules` — nếu đụng nghiệp vụ đơn / quyền.  
2. **File này + `references/`** — convention repo.  
3. `react-next-baseline` — tối ưu framework khi không trái (1)(2).

## Liên kết

- [architecture-layers.md](references/architecture-layers.md) — `app → features → shared → core → config`, cấm feature import feature
- [naming-and-imports.md](references/naming-and-imports.md) — alias, barrel, naming file
- [components-and-hooks.md](references/components-and-hooks.md) — `ui` / `common` / `layout`, hooks shared, auth qua `@/features/auth`
- [testing-conventions.md](references/testing-conventions.md)

## Ví dụ prompt

```text
Sửa theo project-conventions; perf thì thêm react-next-baseline. Không đổi cấu trúc features/.
```
