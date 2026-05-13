---
name: project-conventions
description: Quy ước và bản đồ repo order-management — stack (Next/React Query), cây thư mục, luồng data, alias import, cấu trúc features, ESLint/Prettier. Dùng khi onboarding, thêm route/feature, hoặc sửa file trong src. Kết hợp react-next-baseline cho pattern React/Next chung.
---

# Quy ước dự án (order-management)

## Nguồn chính thức

- **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** — cấu trúc feature, barrel import, tầng phụ thuộc, naming; phần Resources có link [Feature-Sliced Design](https://feature-sliced.design/). Skill này **bám theo** file đó và bổ sung chỗ **lệch thực tế** trong `references/architecture-layers.md` (gồm mục so sánh FSD).

## Khi nào dùng

- Mọi thay đổi dưới `src/`.
- **Onboarding / lạ codebase** — đọc thêm [stack-and-layout.md](references/stack-and-layout.md) (stack, cây thư mục, luồng request).
- Khi không chắc **đặt file mới ở đâu** hoặc **import kiểu gì**.

**Không** chứa toàn bộ best practice React — phần đó xem **`react-next-baseline`**.

## Ưu tiên vs skill khác

1. `business-rules` — nếu đụng nghiệp vụ đơn / quyền.  
2. **File này + `references/`** — convention repo.  
3. `react-next-baseline` — tối ưu framework khi không trái (1)(2).

## Liên kết

- [stack-and-layout.md](references/stack-and-layout.md) — stack, cây `src/`, luồng data, env (tổng quan nhanh)
- [architecture-layers.md](references/architecture-layers.md) — `app → features → shared → core → config`, cấm feature import feature
- [naming-and-imports.md](references/naming-and-imports.md) — alias, barrel, naming file
- [components-and-hooks.md](references/components-and-hooks.md) — `ui` / `common` / `layout`, hooks shared, auth qua `@/features/auth`
- [testing-conventions.md](references/testing-conventions.md)

## Ví dụ prompt

```text
Sửa theo project-conventions (kèm references/stack-and-layout.md nếu cần bản đồ); perf thì thêm react-next-baseline. Không đổi cấu trúc features/.
```
