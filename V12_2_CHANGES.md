# v12.2 – Phân tích mức độ chính xác hơn

## Mục tiêu
Sửa phần phân tích sau khi làm bài để không hiểu sai dữ liệu mức độ nhận thức, đồng thời đồng bộ giao diện học sinh và Dashboard giáo viên.

## Thay đổi
1. Luôn hiển thị bốn nhãn: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.
2. Mức không có câu trong lượt làm hiển thị trạng thái chưa có dữ liệu thay vì 0%/Cần ôn lại.
3. Nếu ngân hàng của khối chưa có câu ở mức đó, giao diện nêu rõ điều này.
4. Điểm mạnh và điểm cần ưu tiên hỗ trợ đồng hạng, không tự chọn một mức khi phần trăm bằng nhau.
5. Màu trạng thái thống nhất: <60% Cần ôn lại; 60–79% Đang củng cố; >=80% Thành thạo.
6. Dashboard giáo viên dùng `--` cho mức không có dữ liệu.

## Ghi chú dữ liệu
- Tin 10 hiện có đủ bốn nhãn mức độ.
- Tin 11 hiện có 860 câu, gồm Nhận biết, Thông hiểu và Vận dụng; chưa có câu gắn nhãn Vận dụng cao. Bản cập nhật này không tự sinh hoặc đổi nhãn câu hỏi.

## Tệp cần cập nhật trên GitHub
- `app.js`
- `style.css`
- `teacher-dashboard.html`
- `README.md` (khuyến nghị)
- `V12_2_CHANGES.md` (khuyến nghị)

Không cần cập nhật Google Apps Script.
