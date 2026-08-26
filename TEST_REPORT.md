# TEST REPORT – v12

## Kiểm tra dữ liệu

- Tin học 10: 30 bài, 772 câu.
- Tin học 11: 31 bài, 860 câu.
- Không thay đổi ngân hàng câu hỏi so với v11 trong quá trình nâng cấp giao diện/logic.

## Kiểm tra mã nguồn

- `app.js`: `node --check` đạt.
- `storage.js`: cấu trúc tương thích dữ liệu v11; các trường v12 có giá trị mặc định khi dữ liệu cũ chưa có.

## Kiểm tra giao diện bằng Chromium headless

Đã dựng toàn bộ trang với dữ liệu thật và kiểm tra:
- Trang chủ Tin 10: không có lỗi JavaScript.
- Mở bài học và làm bài 10 câu: hoạt động.
- Trang kết quả: có 4 thẻ phân tích mức độ với Tin 10.
- Trang tiến độ: hiển thị đủ 30 bài Tin 10.
- Tin 11: hiển thị đủ 31 bài, bài đánh giá 15 câu hoạt động theo 3 mức có trong dữ liệu Tin 11.
- Giao diện desktop và mobile đã được render kiểm tra.

## Kiểm tra logic v12

- Câu sai trả lời đúng lần 1: vẫn còn trong sổ, phục hồi 1/2.
- Câu sai trả lời đúng lần 2: được xoá khỏi sổ, phục hồi 2/2.
- Đánh giá đầu vào: không hiển thị giải thích trong lúc làm; lưu lịch sử với giai đoạn `pre` sau khi nộp.
- Kết quả bài học dưới 60%: trạng thái Cần ôn lại.
- Ngưỡng Thành thạo: từ 80%.

## Google Sheets

Cơ chế POST của v11 được giữ. Script v12 là nâng cấp tùy chọn để nhận thêm trường và phục vụ dashboard tổng hợp.
