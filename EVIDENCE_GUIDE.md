# GỢI Ý THU MINH CHỨNG CHO SÁNG KIẾN KINH NGHIỆM

## 1. Mục tiêu minh chứng

Minh chứng nên trả lời được ba câu hỏi:

1. Học sinh có tham gia sử dụng website không?
2. Kết quả ôn tập có thay đổi sau khi sử dụng không?
3. Website có hỗ trợ học sinh tự học, tự phát hiện phần yếu và ôn lại không?

## 2. Bộ minh chứng tối thiểu

- Ảnh chụp giao diện website.
- Ảnh học sinh sử dụng website trong giờ học/tự học.
- Phiếu khảo sát trước khi áp dụng.
- Phiếu khảo sát sau khi áp dụng.
- Kết quả kiểm tra/thi thử trước – sau.
- Một số báo cáo CSV do học sinh xuất từ website.
- Bảng tổng hợp điểm, tỉ lệ hoàn thành, độ chính xác.
- Nhận xét của học sinh/giáo viên.

## 3. Quy trình trước – sau

### Trước tác động
- Tổ chức một bài kiểm tra hoặc khảo sát đầu vào.
- Ghi nhận: điểm trung bình, tỉ lệ đạt, mức tự tin, thói quen ôn tập.
- Lưu dữ liệu gốc.

### Trong quá trình áp dụng
- Quy định thời gian sử dụng website.
- Theo dõi số bài đã học, số câu đã làm, câu sai, lịch sử thi thử.
- Có thể yêu cầu học sinh nộp báo cáo CSV theo tuần hoặc theo mốc.

### Sau tác động
- Tổ chức bài kiểm tra/khảo sát sau.
- So sánh cùng nhóm chỉ số với đầu vào.
- Thu phản hồi về mức dễ sử dụng, tính hữu ích, khả năng tự học.

## 4. Các chỉ số nên tổng hợp

- Điểm trung bình trước – sau.
- Tỉ lệ học sinh đạt từ 5/10, 6.5/10, 8/10 trở lên.
- Tỉ lệ hoàn thành bài/chủ đề.
- Độ chính xác trung bình khi luyện tập.
- Số lần thi thử trung bình.
- Mức giảm số câu sai sau các lượt ôn.
- Mức độ hài lòng/tự tin của học sinh.

## 5. Lưu ý về tính trung thực

- Không điều chỉnh số liệu để làm đẹp kết quả.
- Nêu rõ số lượng học sinh tham gia và học sinh thiếu dữ liệu.
- Phân biệt dữ liệu do website ghi nhận với dữ liệu khảo sát/kiểm tra.
- Nếu học sinh dùng nhiều thiết bị, cần ghi nhận hạn chế của localStorage.
- Không dùng tên học sinh trong bản công khai nếu không cần thiết.

## 6. Cấu trúc bảng tổng hợp gợi ý

| STT | Mã HS | Điểm trước | Điểm sau | Câu đã làm | Độ chính xác | Số lần thi thử | Ghi chú |
|---:|---|---:|---:|---:|---:|---:|---|

Nên dùng mã học sinh khi xử lí số liệu minh chứng thay vì công khai đầy đủ họ tên.
