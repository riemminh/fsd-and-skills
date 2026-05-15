---
name: skills-hub
description: Index of order-management skills. FIRST read "Workflow routing by keywords" to choose fix-bug-default vs feature-shipping from prompt keywords (bug/fix/lỗi vs add/thêm/tạo/xóa). Read when unsure which skill to pick.
---

# Hub: how to use the skill tree in this repo

## Workflow routing by keywords (read first)

Before coding, pick **exactly one** workflow skill. Priority:

1. User names workflow explicitly (`fix-bug-default` / `feature-shipping`).
2. Keyword table below (EN or VI).
3. **Done criteria** semantics: *new capability* → feature; *correct wrong behavior* → bug.
4. Mixed or only `Scope:` + `Done:` with no verb → **ask the user** (do not default to fix-bug-default).

### → `workflows/fix-bug-default`

| EN | VI |
|----|-----|
| bug, fix, hotfix, patch (behavior), defect, issue | lỗi, sửa lỗi, sửa bug |
| wrong, incorrect, unexpected, not working | sai, không đúng, hỏng, không hoạt động |
| broken, crash, fails, error (symptom) | bị lỗi, crash |
| regression, used to work, stopped working | regression, trước đúng giờ sai |
| Symptom / Reproduce / Expected (bug ticket) | Triệu chứng / Tái hiện |

### → `workflows/feature-shipping`

| EN | VI |
|----|-----|
| add, create, new, implement, introduce, extend | thêm, tạo, mới, triển khai, bổ sung |
| remove, delete, drop, update, edit, modify | xóa, gỡ, cập nhật, chỉnh sửa |
| feature, ship, build, scaffold | tính năng, làm feature |
| column, button, page, route, filter, dialog, form | cột, nút, trang, filter, form |

### Common mistakes

| Prompt | Wrong pick | Correct pick |
|--------|------------|--------------|
| `Scope: order-table.tsx` / `Done: cột Items hiển thị …` | fix-bug-default | **feature-shipping** (`thêm cột` / new column in Done) |
| `fix sort by total wrong on /orders` | feature-shipping | **fix-bug-default** |
| `sửa order-table` (no “lỗi”) + Done adds column | fix-bug-default | **feature-shipping** |
| `sửa lỗi sort` | feature-shipping | **fix-bug-default** |

## Quick map (folder → role)

| Folder | Use when | One-line example for your prompt |
|--------|----------|----------------------------------|
| `agent-coding-discipline` | Any task that needs thinking / avoiding sprawling diffs | “Apply agent-coding-discipline; done criteria: …” |
| `react-next-baseline` | React/Next perf, bundle, fetch patterns (Vercel) | “react-next-baseline: read `references/vercel-SKILL-excerpt.md` then only `vendor/rules/<rule>.md` as needed — do not read all of `vendor/`.” |
| `project-conventions` | Repo conventions + stack/`src/` map (see `references/stack-and-layout.md`) | “Read project-conventions + stack-and-layout before adding a route.” |
| `business-rules` | Orders, money, status, auth affecting business logic | “business-rules before changing OrderStatus.” |
| `ui-design-system` | Tailwind, dark mode, `shared/components/ui` | “UI follows ui-design-system.” |
| `data-fetching` | React Query, axios, `QUERY_KEYS` | “data-fetching: invalidate after cancel.” |
| `forms-and-validation` | RHF + Zod | “forms-and-validation for create order form.” |
| `security-frontend` | Token, 401, leaked env | “security-frontend when editing ApiClient.” |
| `debugging-and-bugfix` | Bug workflow | “debugging-and-bugfix + reproduce on /orders.” |
| `pr-and-code-review` | PR review | “pr-and-code-review for current diff.” |
| `workflows/fix-bug-default` | Bugfix bundle | “Run fix-bug-default. Verify: one type-check + one lint after all edits.” |
| `workflows/feature-shipping` | New feature bundle | “Run feature-shipping. Verify: one type-check + one lint after all edits.” |

## Priority when skills conflict

1. Correct business logic & safety (`business-rules`, `security-frontend`)  
2. Repo conventions (`project-conventions`)  
3. Framework baseline (`react-next-baseline`)

## External sources wired into the tree

| Source | Location in tree |
|--------|------------------|
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/react-best-practices` (skill name `vercel-react-best-practices`) | `react-next-baseline/` + `references/upstream-links.md` |
| [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | `agent-coding-discipline/` (four principles spirit) |

## Combined examples (copy-paste)

**Bug: sort orders wrong (table UI only)** — keywords: `wrong`, `fix`  
`workflows/fix-bug-default` + scope `order-table.tsx` + `project-conventions`.

**Feature: add Items column to order-table** — keywords: `add`, `thêm cột`, `Done: hiển thị cột`  
`workflows/feature-shipping` + scope `order-table.tsx` only; do not touch `order-grid.tsx`.

**Add API filter + cache** — keywords: `add`, `filter`  
`workflows/feature-shipping` + `data-fetching` + `project-conventions`. Static verify: one `pnpm type-check` + one `pnpm lint` at end only.

**Change cancel-order flow**  
`business-rules` + `data-fetching` (invalidate) + `agent-coding-discipline`.

## Install Vercel baseline via CLI (optional)

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

If the CLI creates a folder with a different name, keep it or sync content — still document it in `react-next-baseline/references/upstream-links.md`.
