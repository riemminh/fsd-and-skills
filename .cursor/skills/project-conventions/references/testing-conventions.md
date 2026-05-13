# Testing (theo docs/ARCHITECTURE.md + repo)

Nguồn chiến lược: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) (mục Testing Strategy).

## Chiến lược

- **Unit:** util thuần, hàm tính toán; hook với React Testing Library; API với axios mock.
- **Integration:** luồng trong một feature, tương tác component, tích hợp API.
- **E2E:** luồng người dùng quan trọng, có thể xuyên feature.

## Lệnh hiện có trong `package.json`

- `pnpm lint` — ESLint.
- `pnpm type-check` — `tsc --noEmit`.

Chưa có script `test` unit mặc định — khi thêm (Vitest/Jest), cập nhật đây với lệnh chạy và chỗ đặt file (`*.test.ts` cạnh module hoặc `__tests__/` theo team).

## Gợi ý đặt test theo feature

- Giữ test gần `src/features/<name>/` (cùng domain với code được kiểm tra), phù hợp tinh thần feature-based trong tài liệu kiến trúc.
