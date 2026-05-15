# Spacing & typography (as in repo)

## Dark mode

- `src/app/layout.tsx`: `<html className={cn("dark font-sans", geist.variable)}>` — dark by default.

## Tailwind v4

- PostCSS + `@tailwindcss/postcss` (per `package.json`).
- Prefer utility classes; avoid CSS modules unless a pattern already exists.

## Spacing

- Use the standard Tailwind scale (`p-4`, `gap-2`, …) consistently in order list and filter bar (`features/orders/components`).

## Typography

- Body: `inter.className` on `<body>`.
- Sans variable: Geist (`--font-sans`) for `font-sans` utility.

Update when adding a dedicated design token file.
