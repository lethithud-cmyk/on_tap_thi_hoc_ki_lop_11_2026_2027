# HƯỚNG DẪN ĐƯA WEBSITE ÔN TẬP TIN HỌC 11 LÊN INTERNET

## A. Chuẩn bị

Sau khi giải nén, thư mục website phải có cấu trúc tối thiểu:

```text
index.html
css/
  style.css
js/
  lessons.js
  questions.js
  storage.js
  app.js
```

Không đổi vị trí các thư mục nếu chưa sửa lại đường dẫn trong `index.html`.

---

## B. Cách 1 – GitHub Pages

### Bước 1. Tạo tài khoản GitHub
Truy cập GitHub và đăng nhập/tạo tài khoản.

### Bước 2. Tạo repository mới
- Chọn **New repository**.
- Đặt tên, ví dụ: `on-tap-tin-hoc-11`.
- Chọn Public nếu muốn học sinh truy cập không cần đăng nhập.
- Tạo repository.

### Bước 3. Tải website lên
- Chọn **Add file → Upload files**.
- Kéo thả toàn bộ các tệp/thư mục của website.
- Bảo đảm `index.html` nằm ở thư mục gốc của repository.
- Commit changes.

### Bước 4. Bật GitHub Pages
- Vào **Settings → Pages**.
- Ở phần Build and deployment, chọn nguồn **Deploy from a branch**.
- Chọn nhánh `main` và thư mục `/ (root)`.
- Save.
- Chờ GitHub tạo địa chỉ website.

### Bước 5. Gửi liên kết cho học sinh
Sao chép URL GitHub Pages và gửi qua SHub, nhóm lớp, LMS hoặc mã QR.

---

## C. Cách 2 – Netlify

### Cách nhanh
- Đăng nhập Netlify.
- Chọn chức năng tạo site từ thư mục/tệp.
- Kéo thả thư mục website đã giải nén vào vùng triển khai.
- Chờ hệ thống tạo URL.
- Có thể đổi tên site trong phần cấu hình tên miền.

Netlify phù hợp khi muốn đăng nhanh website tĩnh mà không làm việc nhiều với Git.

---

## D. Kiểm tra sau khi đăng

Dùng điện thoại và máy tính khác để mở website, sau đó kiểm tra:

1. Trang chủ tải đầy đủ.
2. Mở một bài học.
3. Làm thử 3–5 câu.
4. Mở Ôn cuối kì II.
5. Tạo đề Thi thử.
6. Kiểm tra đồng hồ 45 phút.
7. Vào Tiến độ.
8. Vào Hướng dẫn và thử tải báo cáo CSV.

---

## E. Lưu ý về dữ liệu học sinh

Website hiện là **website tĩnh**. Dữ liệu như:
- bài đã hoàn thành;
- số câu đã làm;
- câu sai;
- lịch sử thi thử;
- họ tên/lớp;

được lưu bằng `localStorage` **trên trình duyệt của thiết bị học sinh**.

Điều này có nghĩa:
- giáo viên không tự động nhìn thấy dữ liệu của toàn lớp;
- học sinh đổi trình duyệt/xóa dữ liệu trình duyệt thì tiến độ có thể mất;
- để thu minh chứng, học sinh có thể dùng nút **Tải báo cáo CSV** và nộp cho giáo viên;
- nếu cần tổng hợp tập trung, có thể kết hợp Google Form/SHub hoặc phát triển thêm backend.

---

## F. Gợi ý sử dụng trong lớp

- Trước tiết ôn: gửi liên kết và yêu cầu học sinh nhập họ tên/lớp.
- Trong tiết: giao một chế độ ôn 30 câu hoặc 60 câu.
- Cuối tiết: cho học sinh làm Thi thử.
- Sau tiết: yêu cầu xuất CSV và nộp qua hệ thống thu bài.
