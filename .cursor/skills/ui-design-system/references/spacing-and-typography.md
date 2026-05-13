# Spacing & typography (thực tế repo)

## Dark mode

- `src/app/layout.tsx`: `<html className={cn("dark font-sans", geist.variable)}>` — mặc định dark.

## Tailwind v4

- PostCSS + `@tailwindcss/postcss` (theo `package.json`).
- Ưu tiên utility class; tránh CSS module trừ khi đã có pattern.

## Spacing

- Dùng scale Tailwind chuẩn (`p-4`, `gap-2`, …) nhất quán trong danh sách đơn và filter bar (`features/orders/components`).

## Typography

- Body: `inter.className` trên `<body>`.
- Sans variable: Geist (`--font-sans`) cho `font-sans` utility.

Cập nhật khi thêm design token file riêng.
