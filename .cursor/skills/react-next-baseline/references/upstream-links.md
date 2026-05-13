# Đồng bộ baseline Vercel

## Bản đã vendor trong repo (cách 2)

Toàn bộ skill upstream đã được copy vào:

**`.cursor/skills/react-next-baseline/vendor/`**

Gồm: `SKILL.md`, `README.md`, `metadata.json`, **`AGENTS.md`**, thư mục **`rules/`** (72 file `.md` tại thời điểm tải).

Agent **ưu tiên đọc local** từ `vendor/` thay vì mở URL, trừ khi bạn chủ động cập nhật lại từ GitHub.

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

## URL tham chiếu (khi không dùng vendor)

| File | URL |
|------|-----|
| SKILL.md | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md |
| AGENTS.md | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/AGENTS.md |
| Rules | https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules |

Giữ bảng URL để đối chiếu nhanh hoặc khi làm việc ngoài repo.
