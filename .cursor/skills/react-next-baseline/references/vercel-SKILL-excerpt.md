# Trích từ Vercel `skills/react-best-practices/SKILL.md` (xem bản đầy đủ trên GitHub)

Mục đích: tra cứu nhanh **tên rule** và **nhóm ưu tiên**. Chi tiết từng rule: thư mục `rules/` trên upstream hoặc file `AGENTS.md`.

## Rule Categories by Priority (tóm tắt)

| Priority | Category | Prefix |
|----------|----------|--------|
| 1 | Eliminating Waterfalls | `async-` |
| 2 | Bundle Size Optimization | `bundle-` |
| 3 | Server-Side Performance | `server-` |
| 4 | Client-Side Data Fetching | `client-` |
| 5 | Re-render Optimization | `rerender-` |
| 6 | Rendering Performance | `rendering-` |
| 7 | JavaScript Performance | `js-` |
| 8 | Advanced Patterns | `advanced-` |

## Ví dụ rule (để biết khi nào mở sâu)

- `async-parallel` — Promise.all cho tác vụ độc lập  
- `bundle-barrel-imports` — tránh barrel làm phình bundle  
- `bundle-dynamic-imports` — `next/dynamic` cho component nặng  
- `rerender-no-inline-components` — không khai báo component con trong thân component  

Bản đầy đủ: https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md
