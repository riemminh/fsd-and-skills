# Phân Tích Cấu Trúc Thư Mục Skills

## Tổng Quan

- **Thư mục gốc**: `.cursor/skills/`
- **Tổng số file**: 28 files
- **Tổng số dòng**: 1,444 dòng

---

## Structure Map Chi Tiết

```
.cursor/skills/
│
├── _archive/                                    [Thư mục lưu trữ - không có file active]
│   ├── agent-coding-discipline/
│   ├── business-rules/
│   ├── concise-output/
│   ├── data-fetching/
│   ├── debugging-and-bugfix/
│   ├── forms-and-validation/
│   ├── pr-and-code-review/
│   ├── project-conventions/
│   ├── prompt-analysis/
│   ├── security-frontend/
│   ├── skills-hub/
│   ├── ui-design-system/
│   └── workflows/
│
├── agent-coding-discipline/
│   └── SKILL.md                                 [59 dòng]
│
├── business-rules/
│   ├── SKILL.md                                 [28 dòng]
│   └── references/
│       ├── orders-domain.md                     [28 dòng]
│       └── permissions-and-roles.md             [61 dòng]
│
├── concise-output/
│   └── SKILL.md                                 [82 dòng]
│
├── data-fetching/
│   ├── SKILL.md                                 [35 dòng]
│   └── references/
│       └── cache-and-keys.md                    [24 dòng]
│
├── debugging-and-bugfix/
│   └── SKILL.md                                 [37 dòng]
│
├── forms-and-validation/
│   └── SKILL.md                                 [32 dòng]
│
├── pr-and-code-review/
│   └── SKILL.md                                 [30 dòng]
│
├── project-conventions/
│   ├── SKILL.md                                 [38 dòng]
│   └── references/
│       ├── architecture-layers.md               [26 dòng]
│       ├── components-and-hooks.md              [39 dòng]
│       ├── naming-and-imports.md                [82 dòng]
│       ├── stack-and-layout.md                  [65 dòng]
│       └── testing-conventions.md               [20 dòng]
│
├── prompt-analysis/
│   └── SKILL.md                                 [134 dòng] ⭐ Lớn nhất
│
├── react-next-baseline/
│   ├── SKILL.md                                 [50 dòng]
│   └── references/
│       ├── upstream-links.md                    [45 dòng]
│       ├── vercel-SKILL-excerpt.md              [58 dòng]
│       └── vercel-archive/                      [Thư mục con]
│
├── security-frontend/
│   └── SKILL.md                                 [28 dòng]
│
├── skills-hub/
│   └── SKILL.md                                 [96 dòng]
│
├── ui-design-system/
│   ├── SKILL.md                                 [43 dòng]
│   └── references/
│       ├── async-action-ux.md                   [32 dòng]
│       └── spacing-and-typography.md            [21 dòng]
│
└── workflows/
    ├── feature-shipping/
    │   └── SKILL.md                             [103 dòng]
    │
    ├── fix-bug-default/
    │   └── SKILL.md                             [96 dòng]
    │
    ├── tiny-change/
    │   └── SKILL.md                             [31 dòng]
    │
    └── references/
        └── static-verify-once.md                [21 dòng]
```

---

## Thống Kê Chi Tiết

### 1. Skills Chính (SKILL.md files)

| Skill                          | Số Dòng | Mô Tả                       |
| ------------------------------ | ------- | --------------------------- |
| **prompt-analysis**            | 134     | Phân tích prompt (lớn nhất) |
| **workflows/feature-shipping** | 103     | Quy trình ship feature      |
| **skills-hub**                 | 96      | Hub quản lý skills          |
| **workflows/fix-bug-default**  | 96      | Quy trình fix bug mặc định  |
| **concise-output**             | 82      | Output ngắn gọn             |
| **agent-coding-discipline**    | 59      | Kỷ luật coding cho agent    |
| **react-next-baseline**        | 50      | Baseline React/Next.js      |
| **ui-design-system**           | 43      | Hệ thống thiết kế UI        |
| **project-conventions**        | 38      | Quy ước dự án               |
| **debugging-and-bugfix**       | 37      | Debug và sửa lỗi            |
| **data-fetching**              | 35      | Fetch dữ liệu               |
| **forms-and-validation**       | 32      | Form và validation          |
| **workflows/tiny-change**      | 31      | Quy trình thay đổi nhỏ      |
| **pr-and-code-review**         | 30      | PR và code review           |
| **business-rules**             | 28      | Quy tắc nghiệp vụ           |
| **security-frontend**          | 28      | Bảo mật frontend            |

**Tổng SKILL.md files**: 16 files, **1,022 dòng**

---

### 2. Reference Files

#### Business Rules References

| File                     | Số Dòng     |
| ------------------------ | ----------- |
| permissions-and-roles.md | 61          |
| orders-domain.md         | 28          |
| **Subtotal**             | **89 dòng** |

#### Project Conventions References

| File                    | Số Dòng      |
| ----------------------- | ------------ |
| naming-and-imports.md   | 82           |
| stack-and-layout.md     | 65           |
| components-and-hooks.md | 39           |
| architecture-layers.md  | 26           |
| testing-conventions.md  | 20           |
| **Subtotal**            | **232 dòng** |

#### React/Next Baseline References

| File                    | Số Dòng      |
| ----------------------- | ------------ |
| vercel-SKILL-excerpt.md | 58           |
| upstream-links.md       | 45           |
| **Subtotal**            | **103 dòng** |

#### UI Design System References

| File                      | Số Dòng     |
| ------------------------- | ----------- |
| async-action-ux.md        | 32          |
| spacing-and-typography.md | 21          |
| **Subtotal**              | **53 dòng** |

#### Data Fetching References

| File              | Số Dòng     |
| ----------------- | ----------- |
| cache-and-keys.md | 24          |
| **Subtotal**      | **24 dòng** |

#### Workflows References

| File                  | Số Dòng     |
| --------------------- | ----------- |
| static-verify-once.md | 21          |
| **Subtotal**          | **21 dòng** |

**Tổng Reference files**: 12 files, **522 dòng**

---

## Phân Tích Theo Danh Mục

### 📊 Top 5 Skills Lớn Nhất

1. **prompt-analysis** - 134 dòng
2. **workflows/feature-shipping** - 103 dòng
3. **skills-hub** - 96 dòng
4. **workflows/fix-bug-default** - 96 dòng
5. **concise-output** - 82 dòng

### 📁 Thư Mục Có Nhiều Nội Dung Nhất

1. **project-conventions** - 270 dòng (38 + 232 references)
2. **react-next-baseline** - 153 dòng (50 + 103 references)
3. **workflows** - 251 dòng (230 SKILL + 21 references)
4. **business-rules** - 117 dòng (28 + 89 references)
5. **ui-design-system** - 96 dòng (43 + 53 references)

### 🎯 Phân Loại Theo Chức Năng

#### Workflows (3 skills, 251 dòng)

- feature-shipping
- fix-bug-default
- tiny-change

#### Development Practices (6 skills, 346 dòng)

- agent-coding-discipline
- debugging-and-bugfix
- pr-and-code-review
- project-conventions
- concise-output
- prompt-analysis

#### Technical Implementation (5 skills, 241 dòng)

- react-next-baseline
- data-fetching
- forms-and-validation
- ui-design-system
- security-frontend

#### Domain & Business (2 skills, 124 dòng)

- business-rules
- skills-hub

---

## Tổng Kết

### Số Liệu Tổng Hợp

- **Tổng số skills chính**: 16 skills
- **Tổng số reference files**: 12 files
- **Tổng số file markdown**: 28 files
- **Tổng số dòng code**: 1,444 dòng

### Phân Bố Nội Dung

- **SKILL.md files**: 70.8% (1,022 dòng)
- **Reference files**: 29.2% (522 dòng)

### Độ Phức Tạp

- **Skill trung bình**: ~64 dòng/skill
- **Reference trung bình**: ~44 dòng/file
- **Skills có references**: 6/16 (37.5%)

### Thư Mục Archive

Thư mục `_archive/` chứa cấu trúc tương tự nhưng không có file active, có thể là các phiên bản cũ hoặc skills đã ngừng sử dụng.

---

**Ngày phân tích**: May 16, 2026
**Công cụ**: Kiro AI Assistant
