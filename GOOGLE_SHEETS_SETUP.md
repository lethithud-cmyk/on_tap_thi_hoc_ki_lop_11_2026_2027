# Google Sheets – cấu hình v12

## 1. Website học sinh

`config.js` vẫn giữ URL Web App hiện tại. Không cần đổi URL nếu Apps Script cũ vẫn đang nhận dữ liệu tốt.

## 2. Nâng cấp Apps Script (khuyến nghị cho sáng kiến)

Để nhận thêm dữ liệu v12 và dùng `teacher-dashboard.html`:

1. Mở Google Sheet đang nhận kết quả.
2. Extensions → Apps Script.
3. Sao lưu mã cũ.
4. Thay bằng nội dung trong `GOOGLE_APPS_SCRIPT_Code.gs.txt`.
5. Deploy → Manage deployments → Edit deployment → New version → Deploy.
6. Giữ nguyên quyền truy cập như deployment hiện tại.

Nếu triển khai trên cùng deployment, URL `/exec` thường giữ nguyên nên `config.js` không cần sửa.

## 3. Cột mới v12

Ngoài dữ liệu v11, script v12 ghi thêm:
- Khối
- VDC đúng
- VDC tổng
- Trạng thái học tập
- Mức cần củng cố
- Giai đoạn đánh giá

## 4. Dashboard giáo viên

Mở `teacher-dashboard.html`, chọn khối và nhập lớp. Dashboard chỉ lấy số liệu tổng hợp:
- số học sinh tham gia;
- số lượt làm;
- điểm và độ chính xác trung bình;
- NB/TH/VD/VDC;
- so sánh đánh giá đầu vào và sau ôn tập;
- các bài có kết quả trung bình thấp.

Dashboard không trả danh sách hoặc tên học sinh.
