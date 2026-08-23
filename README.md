# Website ôn tập Tin học 11 – Cuối kì II

## Trạng thái phiên bản
- **Bài 1–31 đã được biên soạn/kiểm duyệt theo SGK Tin học 11 – Kết nối tri thức với cuộc sống** và đã tích hợp vào website.
- Toàn bộ Bài 1–31 đã được thay bằng ngân hàng câu hỏi biên soạn/kiểm duyệt; không còn dữ liệu thử nghiệm.
- Cơ chế **tự sinh câu hỏi đã được loại bỏ**. Website chỉ sử dụng các câu được lưu trực tiếp trong ngân hàng câu hỏi.

## Ngân hàng câu hỏi hiện tại
- Tổng số câu trong website: **860 câu trắc nghiệm nhiều lựa chọn**.
- Bài 1: 12 câu.
- Bài 2: 12 câu.
- Bài 3: 20 câu.
- Bài 4: 28 câu.
- Bài 5: 30 câu.
- Bài 6: 22 câu.
- Bài 7: 20 câu.
- Bài 8: 24 câu.
- Bài 9: 30 câu.
- Bài 10: 28 câu.
- Bài 11: 30 câu.
- Bài 12: 30 câu.
- Bài 13: 32 câu.
- Bài 14: 34 câu.
- Bài 15: 30 câu.
- Bài 16: 30 câu.
- Bài 17: 28 câu.
- Bài 18: 32 câu.
- Bài 19: 28 câu.
- Bài 20: 30 câu.
- Bài 21: 30 câu.
- Bài 22: 30 câu.
- Bài 23: 30 câu.
- Bài 24: 30 câu.
- Bài 25: 30 câu.
- Bài 26: 30 câu.
- Bài 27: 30 câu.
- Bài 28: 30 câu.
- Bài 29: 30 câu.
- Bài 30: 30 câu.
- Bài 31: 30 câu.
- **Bài 1–31: 860 câu đã biên soạn/kiểm duyệt.**
- **Không còn câu dữ liệu thử nghiệm.**


## Chế độ ôn tập cuối kì II

Phiên bản này bổ sung khu **Ôn tập cuối kì II** với:
- Ôn nhanh 30 câu theo ma trận.
- Ôn tổng hợp 60 câu, gấp đôi ma trận để tăng độ bao phủ.
- Ôn riêng 30 câu theo từng mức độ: Nhận biết, Thông hiểu, Vận dụng.
- Thi thử 30 câu trong 45 phút.
- Khi thi thử, học sinh được đổi phương án trước khi nộp.
- Kết quả phân tích theo **chủ đề** và **mức độ nhận thức**.

### Ma trận 30 câu tham khảo của website

| Chủ đề | Tổng | Nhận biết | Thông hiểu | Vận dụng |
|---|---:|---:|---:|---:|
| 1 | 4 | 2 | 1 | 1 |
| 2 | 3 | 1 | 1 | 1 |
| 3 | 2 | 1 | 1 | 0 |
| 4 | 5 | 2 | 2 | 1 |
| 5 | 2 | 1 | 1 | 0 |
| 6 | 7 | 2 | 2 | 3 |
| 7 | 7 | 3 | 1 | 3 |
| **Tổng** | **30** | **12** | **9** | **9** |

Ma trận này là cấu hình luyện tập của website, có thể thay đổi khi có ma trận/đặc tả chính thức.

## Chức năng
- 7 chủ đề, 31 bài học theo SGK Tin học 11 – Kết nối tri thức với cuộc sống (định hướng Tin học ứng dụng).
- Flashcard, luyện theo bài, luyện 20 câu theo chủ đề, thi thử 30 câu/45 phút.
- Lưu tiến độ, câu sai và lịch sử thi thử bằng `localStorage`.
- Giao diện sáng/tối, responsive cho máy tính và điện thoại.

## Cách chạy
Mở trực tiếp file `index.html` bằng Chrome/Edge/Firefox. Website không cần server, backend hay API key.

## Cách chỉnh nội dung
- `js/lessons.js`: tên chủ đề, tên bài và tóm tắt kiến thức.
- `js/questions.js`: ngân hàng câu hỏi.
- `index.html`: tiêu đề, thông tin giáo viên/trường ở cuối trang.
- `css/style.css`: giao diện.

## Thêm câu hỏi
Trong `js/questions.js`, bổ sung một phần tử vào mảng câu hỏi của bài tương ứng theo mẫu:

```js
['Thông hiểu',
 'Nội dung câu hỏi?',
 ['Phương án A','Phương án B','Phương án C','Phương án D'],
 1,
 'Giải thích vì sao đáp án đúng.']
```

Chỉ số đáp án đúng: A=0, B=1, C=2, D=3.

## Đăng Internet
### GitHub Pages
1. Tạo repository mới trên GitHub.
2. Upload toàn bộ nội dung thư mục này.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/root`.
5. Lưu và gửi đường link GitHub Pages cho học sinh.

### Netlify
Kéo thả toàn bộ thư mục website vào Netlify Drop, hệ thống sẽ tạo đường link công khai.

## Gợi ý sử dụng trong sáng kiến kinh nghiệm
Có thể mô tả quy trình học sinh: **Hệ thống hoá kiến thức → luyện theo bài → luyện theo chủ đề → ôn câu sai → thi thử → phân tích kết quả → quay lại bài yếu**. Nên thu thập minh chứng trước/sau bằng kết quả học tập, mức độ hoàn thành, phiếu khảo sát và phản hồi học sinh.


## Phiên bản triển khai và minh chứng

Bổ sung:
- Trang **Hướng dẫn** trên website.
- Hồ sơ học sinh: họ tên, lớp (lưu cục bộ).
- Xuất **Báo cáo học tập CSV**.
- Sao chép tóm tắt kết quả.
- Tài liệu `DEPLOY_GUIDE.md` hướng dẫn đưa website lên Internet.
- Tài liệu `EVIDENCE_GUIDE.md` hướng dẫn thu minh chứng cho sáng kiến.

**Quan trọng:** website không tự động gửi dữ liệu học sinh về giáo viên. Mặc định dữ liệu chỉ nằm trong `localStorage` của trình duyệt. Muốn tổng hợp toàn lớp, cần thu tệp CSV hoặc kết hợp công cụ thu bài.
