# Testing (per docs/ARCHITECTURE.md + repo)

Strategy source: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) (Testing Strategy section).

## Strategy

- **Unit:** pure utils, calculation functions; hooks with React Testing Library; API with axios mocks.
- **Integration:** flows inside one feature, component interaction, API integration.
- **E2E:** critical user flows, may cross features.

## Commands in `package.json` today

- `pnpm lint` — ESLint.
- `pnpm type-check` — `tsc --noEmit`.

No default unit `test` script yet — when adding (Vitest/Jest), update this file with run commands and file locations (`*.test.ts` next to module or `__tests__/` per team).

## Suggested test placement by feature

- Keep tests near `src/features/<name>/` (same domain as code under test), aligned with feature-based architecture in the docs.
