---
name: skills-hub
description: Mục lục toàn bộ .cursor/skills của order-management — khi nào dùng folder nào, ví dụ prompt, thứ tự ưu tiên. Đọc đầu tiên khi không biết chọn skill nào.
---

# Hub: cách dùng cây skill trong repo này

## Bản đồ nhanh (folder → vai trò)

| Folder | Dùng khi | Ví dụ một dòng trong prompt |
|--------|----------|-----------------------------|
| `agent-coding-discipline` | Mọi task cần suy nghĩ / tránh diff lan | “Áp dụng agent-coding-discipline; tiêu chí xong: …” |
| `react-next-baseline` | React/Next perf, bundle, fetch pattern (Vercel) | “Tham chiếu react-next-baseline cho waterfall/bundle.” |
| `project-conventions` | Alias, chỗ đặt file, lint/format repo | “Theo project-conventions, chỉ sửa trong `features/orders`.” |
| `react-project-overview` | Lạ repo, cần bản đồ layer | “Đọc react-project-overview trước khi thêm route.” |
| `business-rules` | Đơn, tiền, trạng thái, auth ảnh nghiệp vụ | “business-rules trước khi đổi OrderStatus.” |
| `ui-design-system` | Tailwind, dark, `shared/components/ui` | “UI theo ui-design-system.” |
| `data-fetching` | React Query, axios, `QUERY_KEYS` | “data-fetching: invalidate sau cancel.” |
| `forms-and-validation` | RHF + Zod | “forms-and-validation cho create order form.” |
| `security-frontend` | Token, 401, env lộ | “security-frontend khi sửa ApiClient.” |
| `debugging-and-bugfix` | Quy trình bug | “debugging-and-bugfix + reproduce trên /orders.” |
| `pr-and-code-review` | Review PR | “pr-and-code-review cho diff hiện tại.” |
| `workflows/fix-bug-default` | Gói sửa bug | “Chạy workflow fix-bug-default.” |
| `workflows/feature-shipping` | Gói tính năng mới | “Chạy workflow feature-shipping.” |

## Thứ tự ưu tiên khi xung đột

1. Đúng nghiệp vụ & an toàn (`business-rules`, `security-frontend`)  
2. Quy ước repo (`project-conventions`)  
3. Baseline framework (`react-next-baseline`)

## Nguồn ngoài đã tích hợp vào cây

| Nguồn | Chỗ trong cây |
|-------|----------------|
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/react-best-practices` (tên skill `vercel-react-best-practices`) | `react-next-baseline/` + `references/upstream-links.md` |
| [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | `agent-coding-discipline/` (tinh thần 4 nguyên tắc) |

## Ví dụ kết hợp (copy dùng)

**Bug sort đơn (chỉ UI table)**  
`workflows/fix-bug-default` + phạm vi `order-table.tsx` + `project-conventions` + (nếu chậm/re-render) `react-next-baseline`.

**Thêm filter API + cache**  
`workflows/feature-shipping` + `data-fetching` + `react-project-overview` + `project-conventions`.

**Đổi luồng hủy đơn**  
`business-rules` + `data-fetching` (invalidate) + `agent-coding-discipline`.

## Cài baseline Vercel qua CLI (tuỳ chọn)

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

Nếu CLI tạo folder tên khác, giữ nguyên hoặc đồng bộ nội dung — vẫn trỏ trong `react-next-baseline/references/upstream-links.md`.
