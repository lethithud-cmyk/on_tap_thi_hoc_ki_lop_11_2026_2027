# Hướng dẫn triển khai v12 an toàn

## Khuyến nghị trước khi thay v11

1. Giữ nguyên website v11 đang hoạt động cho đến khi thử v12 trên máy.
2. Giải nén bản `github-flat` và mở `index.html` để kiểm tra.
3. Kiểm tra Tin 10, Tin 11, làm một bài, thi thử, câu cần củng cố và tiến độ.

## Cập nhật GitHub Pages

Repository hiện tại có thể tiếp tục sử dụng, không cần tạo repository mới.

1. Vào repository GitHub đang dùng.
2. `Add file` → `Upload files`.
3. Tải toàn bộ tệp trong bản `github-flat` lên thư mục gốc.
4. Commit với nội dung gợi ý: `Nâng cấp website lên v12 - học theo năng lực`.
5. Chờ GitHub Pages triển khai.
6. Mở website và nhấn `Ctrl + F5`.

## Google Sheets

Website học sinh v12 vẫn gửi được dữ liệu với Apps Script v11 hiện tại vì các trường cũ được giữ nguyên.

Nếu muốn dùng **Dashboard giáo viên** và ghi thêm các trường:
- Trạng thái học tập
- Mức cần củng cố
- Giai đoạn đánh giá trước/sau

thì cập nhật Apps Script bằng tệp `GOOGLE_APPS_SCRIPT_Code.gs.txt` và triển khai lại Web App trên cùng deployment.
