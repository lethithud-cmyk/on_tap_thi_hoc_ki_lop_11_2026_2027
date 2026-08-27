# Ôn tập Tin học 10 & 11 – v12.2

Phiên bản v12.2 phát triển từ v11 theo hướng **học tập cá nhân hoá dựa trên dữ liệu học tập**, phục vụ đồng thời hai mục tiêu:

1. Học sinh tự học, luyện tập và nhận phản hồi tức thời.
2. Giáo viên có dữ liệu để theo dõi tiến bộ và làm minh chứng cho sáng kiến.

## Điểm mới của v12

- Giao diện gọn hơn: 5 mục chính, các chức năng phụ gom vào menu **Thêm**.
- Mỗi bài có trạng thái năng lực:
  - **Thành thạo:** từ 80% trở lên.
  - **Đang củng cố:** 60–79%.
  - **Cần ôn lại:** dưới 60%.
- Không còn nút “đánh dấu hoàn thành” thủ công; mức thành thạo dựa trên kết quả luyện bài.
- **Luyện theo gợi ý:** ưu tiên câu sai, mức độ yếu và bài chưa thành thạo.
- **Đánh giá đầu vào / đánh giá lại:** 15 câu phân bố theo các mức độ có trong từng khối.
- Trang kết quả có phân tích NB/TH/VD/VDC (theo dữ liệu của từng khối), chỉ ra điểm mạnh và điểm cần cải thiện.
- **Sổ câu cần củng cố:** một câu sai chỉ rời sổ sau khi trả lời đúng lại 2 lần.
- Trang **Tiến độ** đổi thành hồ sơ năng lực: bản đồ mức độ, trạng thái từng bài, huy hiệu, so sánh trước–sau.
- Giữ nguyên cơ chế gửi Google Sheets đang chạy ở v11.
- Có `teacher-dashboard.html` tùy chọn, chỉ hiển thị dữ liệu tổng hợp, không trả danh sách tên học sinh.

## Dữ liệu hiện có

- Tin học 10: 30 bài, 772 câu.
- Tin học 11: 31 bài, 860 câu.

## Tệp chính

- `index.html`: website học sinh.
- `app.js`: logic học tập cá nhân hoá.
- `style.css`: giao diện.
- `storage.js`: lưu trạng thái trên thiết bị.
- `teacher-dashboard.html`: dashboard tổng hợp cho giáo viên (tùy chọn).
- `GOOGLE_APPS_SCRIPT_Code.gs.txt`: bản Apps Script v12 để thu thêm trường dữ liệu và cấp dữ liệu tổng hợp cho dashboard.
- `SANG_KIEN_MINH_CHUNG.md`: gợi ý cấu trúc minh chứng cho sáng kiến.

## Cập nhật v12.1 – Trải nghiệm làm bài
- Cho phép đổi đáp án trước khi nộp; không tiết lộ đúng/sai trước khi nộp.
- Điều hướng nhanh theo số câu, nhận biết câu đã làm/còn trống.
- Đánh giá đầu vào và đánh giá lại: 15 câu / 15 phút.
- Thi thử: 30 câu / 45 phút.
- Các chế độ học/luyện không giới hạn thời gian.
- Hết giờ ở Đánh giá/Thi thử: tự động nộp.


## Cập nhật v12.2 – Phân tích mức độ chính xác hơn
- Khu vực phân tích kết quả luôn có đủ 4 nhãn NB/TH/VD/VDC để thống nhất hồ sơ năng lực.
- Nếu một lượt làm hoặc cả ngân hàng của khối chưa có câu ở một mức, hệ thống hiển thị trạng thái **chưa có dữ liệu**, không coi 0/0 là yếu.
- Xử lí đồng hạng điểm mạnh/điểm yếu: ví dụ TH và VD cùng 55% sẽ hiển thị cả hai mức.
- Thanh năng lực dùng cùng ngưỡng: dưới 60% = Cần ôn lại; 60–79% = Đang củng cố; từ 80% = Thành thạo.
- Dashboard giáo viên hiển thị `--` nếu một mức chưa có dữ liệu, tránh hiểu nhầm 0% là học sinh làm sai toàn bộ.
- Rà soát dữ liệu hiện tại: ngân hàng Tin 11 có 860 câu với 3 mức Nhận biết, Thông hiểu, Vận dụng; chưa có câu gắn nhãn Vận dụng cao. v12.2 không tự tạo hay đổi nhãn câu hỏi để tránh làm sai lệch ngân hàng đã kiểm duyệt.
