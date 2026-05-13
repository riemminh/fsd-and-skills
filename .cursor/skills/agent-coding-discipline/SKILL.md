---
name: agent-coding-discipline
description: Giảm lỗi kiểu agent — không đoán mò, code tối giản, diff phẫu thuật, có tiêu chí verify. Dùng cho mọi task không tầm thường trong repo order-management. Nội dung lấy cảm hứng từ andrej-karpathy-skills (Think / Simplicity / Surgical / Goal-driven).
---

# Kỷ luật khi agent viết code (Karpathy-style)

## Khi nào dùng skill này

- Mọi task **không** siêu nhỏ (không chỉ sửa một ký tự).
- Khi user mơ hồ, hoặc có nhiều cách hiểu yêu cầu.
- Khi sửa code **người khác đã viết** — tránh “dọn dẹp” lan.

**Không cần** áp full checklist cho: đổi typo, đổi một hằng số rõ ràng.

## Bốn nguyên tắc (áp dụng song song)

### 1. Think before coding

- Nêu **giả định** ra lời; không chắc thì **hỏi** thay vì đoán.
- Nếu có **hai cách hiểu** yêu cầu, trình bày cả hai, không chọn im lặng.
- Nếu có cách **đơn hơn** đáng kể, nói ra (push back có lý).

### 2. Simplicity first

- Chỉ code đủ để đáp ứng yêu cầu; không thêm tính năng “dự phòng”.
- Không tạo abstraction cho code **chỉ dùng một chỗ**.
- Nếu 200 dòng có thể là 50 mà vẫn rõ — ưu tiên đơn.

### 3. Surgical changes

- Không “cải thiện” file lân cận, comment, format **ngoài** phạm vi task.
- Không refactor phần **không hỏng**.
- Giữ style hiện có (kể cả khi bạn thích style khác).
- Dead code **có sẵn**: có thể nhắc user; **không xóa** trừ khi được yêu cầu.
- Import/biến **do thay đổi của bạn** làm thừa → xóa.

**Kiểm tra:** mỗi dòng diff phải **trace** được về yêu cầu user.

### 4. Goal-driven execution

- Đổi task thành **tiêu chí xong**: ví dụ “fix bug” → “tái hiện được → sau fix không tái hiện; sort đúng thứ tự đã nêu”.
- Nhiều bước: liệt kê ngắn `bước → verify`.

## Kết hợp với skill khác

| Skill kết hợp | Vai trò |
|---------------|---------|
| `workflows/fix-bug-default` | Gói đầy đủ thứ tự khi sửa bug. |
| `workflows/feature-shipping` | Gói khi làm tính năng. |
| `project-conventions` | Chi tiết repo sau khi đã quyết định hướng. |
| `business-rules` | Khi “đơn giản hóa” không được phá invariant nghiệp vụ. |

## Nguồn tham chiếu gốc

- [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — `CLAUDE.md` (cùng tinh thần 4 mục trên).
