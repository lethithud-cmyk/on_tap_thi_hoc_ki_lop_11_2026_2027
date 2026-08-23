# BÁO CÁO KIỂM TRA – PHIÊN BẢN TRIỂN KHAI & MINH CHỨNG

Ngày kiểm tra: 22/08/2026

## Kết quả

- 7 chủ đề.
- 31 bài học.
- 860 câu hỏi.
- Cú pháp các tệp JavaScript: đạt.
- Các đường dẫn cục bộ trong `index.html`: đầy đủ.
- Ngân hàng câu hỏi không bị thay đổi/mất dữ liệu.

## Chức năng bổ sung

- Trang **Hướng dẫn**.
- Hồ sơ học sinh gồm họ tên và lớp.
- Hồ sơ lưu cục bộ bằng `localStorage`.
- Xuất báo cáo học tập dạng **CSV**.
- Sao chép tóm tắt tiến độ.
- Hướng dẫn triển khai Internet: `DEPLOY_GUIDE.md`.
- Hướng dẫn thu minh chứng sáng kiến: `EVIDENCE_GUIDE.md`.

## Phạm vi dữ liệu CSV

Báo cáo CSV có thể chứa:
- họ tên;
- lớp;
- ngày xuất;
- số bài hoàn thành;
- số câu đã làm;
- số câu đúng;
- độ chính xác;
- số câu cần ôn;
- số lần thi thử;
- điểm thi thử cao nhất;
- lịch sử các lần thi thử.

## Lưu ý kỹ thuật

Website vẫn là website tĩnh. Không có máy chủ thu dữ liệu tập trung. Dữ liệu học tập mặc định chỉ được lưu trên trình duyệt học sinh. Muốn giáo viên tổng hợp toàn lớp, học sinh cần nộp báo cáo CSV hoặc sử dụng thêm một công cụ thu bài.

