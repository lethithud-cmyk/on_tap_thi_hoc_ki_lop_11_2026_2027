# Cập nhật Google Sheets cho Tin học 10 & 11

1. Mở Google Sheet nhận kết quả.
2. Vào **Tiện ích mở rộng → Apps Script** (nếu menu không hiện, có thể mở `script.google.com` rồi mở dự án đã liên kết).
3. Xoá mã cũ trong `Mã.gs/Code.gs`, dán toàn bộ nội dung tệp `GOOGLE_APPS_SCRIPT_Code.gs.txt`.
4. Nhấn **Lưu**.
5. Chọn **Triển khai → Quản lý các bản triển khai**.
6. Chỉnh sửa deployment Web App hiện tại hoặc tạo phiên bản mới với quyền thực thi phù hợp và quyền truy cập **Bất kỳ ai**.
7. Nếu URL `/exec` thay đổi, dán URL mới vào `RESULTS_ENDPOINT` trong `config.js`. Nếu triển khai lại cùng deployment và URL không đổi, không cần sửa website.

Mã mới giữ 24 cột cũ và **nối thêm ở cuối**: `Khối`, `VDC đúng`, `VDC tổng`, nên dữ liệu cũ không bị xô lệch cột.
