# Đồng bộ baseline Vercel

## Bản đã vendor trong repo (cách 2)

Toàn bộ skill upstream đã được copy vào:

**`.cursor/skills/react-next-baseline/vendor/`**

Gồm: `SKILL.md`, `README.md`, `metadata.json`, **`AGENTS.md`**, thư mục **`rules/`** (các file `.md` từng rule).

**Agent trong repo order-management:** khi làm task perf/React, **không** đọc hàng loạt hay toàn bộ `vendor/`. Luồng chuẩn: [vercel-SKILL-excerpt.md](vercel-SKILL-excerpt.md) → chỉ mở **`vendor/rules/<rule>.md`** cần thiết (1–3 file). `AGENTS.md` / `vendor/SKILL.md` chỉ dùng khi user yêu cầu audit đầy đủ hoặc đối chiếu bản upstream. Ưu tiên đọc local **từng file rule** thay vì mở URL GitHub cho cùng một nội dung.

## Nguồn gốc (để cập nhật sau này)

- Repo: https://github.com/vercel-labs/agent-skills  
- Thư mục: `skills/react-best-practices/`  
- Tên skill (frontmatter upstream): `vercel-react-best-practices`

## Cập nhật vendor khi Vercel đổi

**Cách A — Zip (giống lần copy):**

```bash
cd .cursor/skills/react-next-baseline
curl -fsSL "https://codeload.github.com/vercel-labs/agent-skills/zip/refs/heads/main" -o .upstream.zip
unzip -q -o .upstream.zip "agent-skills-main/skills/react-best-practices/*" -d .upstream-extract
rm -rf vendor
mkdir -p vendor && cp -R .upstream-extract/agent-skills-main/skills/react-best-practices/* vendor/
rm -rf .upstream-extract .upstream.zip
```

**Cách B — CLI:** `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices` (có thể tạo folder song song; merge tay vào `vendor/` nếu cần).

## Sau khi cập nhật `vendor/`

Đồng bộ lại phần **「Chỉ mục file có trong `vendor/rules/`」** trong [`vercel-SKILL-excerpt.md`](vercel-SKILL-excerpt.md) với danh sách file thực tế trong `vendor/rules/` (tránh agent chọn rule không tồn tại).

## URL tham chiếu (khi không dùng vendor)

| File | URL |
|------|-----|
| SKILL.md | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md |
| AGENTS.md | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/AGENTS.md |
| Rules | https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules |

Giữ bảng URL để đối chiếu nhanh hoặc khi làm việc ngoài repo.
