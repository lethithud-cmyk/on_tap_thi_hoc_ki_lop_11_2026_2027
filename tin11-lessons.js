window.TOPICS = [
  {id:1,name:'Máy tính và xã hội tri thức',lessons:[1,2,3,4,5],icon:'💻'},
  {id:2,name:'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',lessons:[6,7,8],icon:'🌐'},
  {id:3,name:'Đạo đức, pháp luật và văn hoá trong môi trường số',lessons:[9],icon:'🛡️'},
  {id:4,name:'Giới thiệu các hệ cơ sở dữ liệu',lessons:[10,11,12,13,14,15],icon:'🗄️'},
  {id:5,name:'Hướng nghiệp với Tin học',lessons:[16],icon:'🧭'},
  {id:6,name:'Thực hành tạo và khai thác cơ sở dữ liệu',lessons:[17,18,19,20,21,22,23,24],icon:'🧪'},
  {id:7,name:'Phần mềm chỉnh sửa ảnh và làm video',lessons:[25,26,27,28,29,30,31],icon:'🎨'}
];

window.LESSONS = [
{id:1,topic:1,title:'Hệ điều hành',summary:[
'Hệ điều hành quản lí thiết bị, tệp/thư mục, tiến trình và cung cấp môi trường để phần mềm ứng dụng khai thác phần cứng.',
'Windows, macOS và Linux là các hệ điều hành phổ biến cho máy tính cá nhân; Linux có nhiều bản phân phối.',
'Hệ điều hành cho thiết bị di động chú trọng giao tiếp thân thiện, kết nối mạng và quản lí thiết bị.',
'Hệ điều hành là lớp trung gian giữa phần cứng, phần mềm ứng dụng và người dùng.'
]},
{id:2,topic:1,title:'Thực hành sử dụng hệ điều hành',summary:[
'Giao diện đồ hoạ có cửa sổ ứng dụng, biểu tượng, thanh công việc/thanh trạng thái và các vùng điều khiển.',
'Các thao tác tệp/thư mục cơ bản gồm tạo mới, đổi tên, sao chép, di chuyển, xoá và mở bằng ứng dụng phù hợp.',
'Hệ điều hành cung cấp tiện ích bảo trì như kiểm tra lỗi, tối ưu ổ đĩa và các công cụ hệ thống.',
'Thiết bị di động hỗ trợ quản lí danh bạ, lịch, ứng dụng và các thiết lập hệ thống.'
]},
{id:3,topic:1,title:'Phần mềm nguồn mở và phần mềm chạy trên Internet',summary:[
'Phần mềm thương mại được bán theo giấy phép; phần mềm tự do cho phép sử dụng miễn phí nhưng không nhất thiết công khai mã nguồn.',
'Phần mềm nguồn mở cung cấp mã nguồn để người dùng có thể xem, sửa, phát triển và phân phối theo điều kiện giấy phép.',
'Giấy phép GPL là một giấy phép nguồn mở phổ biến, yêu cầu tuân thủ các điều kiện khi sửa đổi và phân phối.',
'Phần mềm chạy trên Internet cho phép sử dụng qua mạng mà không nhất thiết cài đặt đầy đủ trên máy.'
]},
{id:4,topic:1,title:'Bên trong máy tính',summary:[
'CPU gồm bộ điều khiển, ALU, các thanh ghi và bộ nhớ đệm; xung nhịp thường được đo bằng GHz.',
'RAM là bộ nhớ truy cập ngẫu nhiên dùng lưu tạm dữ liệu khi máy đang hoạt động; ROM lưu nội dung ít thay đổi hơn.',
'Bộ nhớ ngoài như HDD/SSD có dung lượng lớn, lưu dữ liệu lâu dài và được đo bằng các đơn vị như GB, TB.',
'Mạch logic dùng các cổng AND, OR, NOT, XOR và có thể ghép thành mạch thực hiện phép toán nhị phân.'
]},
{id:5,topic:1,title:'Kết nối máy tính với các thiết bị số',summary:[
'Thiết bị vào–ra thông dụng gồm bàn phím, chuột, màn hình, máy in và nhiều thiết bị số khác.',
'Các cổng như HDMI, USB được dùng để truyền dữ liệu, hình ảnh, âm thanh hoặc kết nối ngoại vi.',
'Hệ điều hành thường dùng cơ chế plug & play và driver để nhận biết, điều khiển thiết bị.',
'Thiết bị số có thể kết nối bằng cáp hoặc không dây như Bluetooth; cần ghép đôi đúng thiết bị và bảo đảm tương thích.'
]},
{id:6,topic:2,title:'Lưu trữ và chia sẻ tệp tin trên Internet',summary:[
'Ổ đĩa trực tuyến cho phép lưu trữ tệp/thư mục trên Internet và truy cập từ nhiều thiết bị.',
'Có thể tải tệp lên, tạo mới, sắp xếp và quản lí tệp/thư mục trực tiếp trên dịch vụ lưu trữ đám mây.',
'Chia sẻ tệp có thể gán các quyền như xem, nhận xét hoặc chỉnh sửa tuỳ dịch vụ.',
'Sau khi chia sẻ cần kiểm tra quyền truy cập và chỉ chia sẻ đúng đối tượng cần thiết.'
]},
{id:7,topic:2,title:'Thực hành tìm kiếm thông tin trên Internet',summary:[
'Tìm kiếm hiệu quả bắt đầu từ từ khoá phù hợp; có thể nhập từ bàn phím hoặc tìm bằng giọng nói.',
'Đặt cụm từ trong dấu ngoặc kép giúp tìm gần chính xác cụm từ đó.',
'Toán tử filetype: giúp giới hạn kết quả theo dạng tệp, ví dụ filetype:pdf.',
'Nên so sánh kết quả và khả năng của nhiều máy tìm kiếm, đồng thời đánh giá độ tin cậy của nguồn.'
]},
{id:8,topic:2,title:'Thực hành nâng cao sử dụng thư điện tử và mạng xã hội',summary:[
'Thư điện tử có thể được đánh dấu quan trọng và phân loại bằng nhãn để dễ quản lí.',
'Mạng xã hội hỗ trợ tạo trang/fanpage để đăng nội dung và tương tác với cộng đồng.',
'Cần thiết lập quyền riêng tư để kiểm soát ai có thể xem bài viết, thông tin cá nhân và nội dung gắn thẻ.',
'Nên thường xuyên rà soát cài đặt quyền riêng tư và hoạt động trên tài khoản.'
]},
{id:9,topic:3,title:'Giao tiếp an toàn trên Internet',summary:[
'Khi gặp dấu hiệu lừa đảo, áp dụng ba nguyên tắc: Hãy chậm lại – Kiểm tra ngay – Dừng lại, không gửi.',
'Không cung cấp mật khẩu, mã xác thực, thông tin ngân hàng hoặc chuyển tiền khi chưa kiểm chứng.',
'Ứng xử số cần tôn trọng, tuân thủ pháp luật, lành mạnh, có trách nhiệm và bảo đảm an toàn/bảo mật thông tin.',
'Trên mạng xã hội nên kiểm chứng thông tin, bảo vệ dữ liệu cá nhân và tránh ngôn ngữ xúc phạm, kích động.'
]},
{id:10,topic:4,title:'Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lí',summary:[
'Cập nhật dữ liệu gồm thêm, xoá hoặc sửa dữ liệu để phản ánh đúng tình trạng thực tế.',
'Truy xuất dữ liệu giúp tìm, lọc, sắp xếp và tổng hợp thông tin phục vụ ra quyết định.',
'Dữ liệu có thể được thu thập tự động từ mã vạch, cảm biến hoặc các hệ thống giao dịch.',
'Quản lí hiệu quả cần tổ chức lưu trữ để vừa cập nhật thuận tiện vừa khai thác thông tin nhanh và chính xác.'
]},
{id:11,topic:4,title:'Cơ sở dữ liệu',summary:[
'CSDL là tập hợp dữ liệu có liên quan với nhau, được lưu trữ có tổ chức để nhiều người hoặc ứng dụng cùng khai thác.',
'Tổ chức dữ liệu độc lập với chương trình giúp giảm dư thừa và hạn chế phụ thuộc phần mềm.',
'Các thuộc tính quan trọng gồm tính cấu trúc, không dư thừa, tính nhất quán/toàn vẹn và khả năng bảo mật, an toàn.',
'Dữ liệu được tổ chức khoa học giúp cập nhật đồng bộ và khai thác hiệu quả hơn.'
]},
{id:12,topic:4,title:'Hệ quản trị cơ sở dữ liệu và hệ cơ sở dữ liệu',summary:[
'Hệ QTCSDL cung cấp chức năng định nghĩa dữ liệu, cập nhật–truy xuất, bảo mật–an toàn và giao diện cho ứng dụng.',
'Hệ cơ sở dữ liệu gồm CSDL, hệ QTCSDL và các phần mềm ứng dụng khai thác CSDL.',
'Hệ CSDL tập trung lưu dữ liệu tại một máy/nơi; hệ CSDL phân tán lưu dữ liệu ở nhiều máy/nút kết nối qua mạng.',
'Mô hình phân tán tăng khả năng truy cập tại nhiều nơi nhưng phức tạp hơn trong quản lí và đồng bộ.'
]},
{id:13,topic:4,title:'Cơ sở dữ liệu quan hệ',summary:[
'CSDL quan hệ tổ chức dữ liệu thành các bảng có quan hệ với nhau.',
'Mỗi hàng là một bản ghi; mỗi cột là một trường/thuộc tính.',
'Khoá chính xác định duy nhất một bản ghi; khoá ngoại tham chiếu khoá chính của bảng khác để liên kết dữ liệu.',
'Kiểu dữ liệu và ràng buộc trường giúp kiểm soát giá trị hợp lệ và hỗ trợ tính toàn vẹn dữ liệu.'
]},
{id:14,topic:4,title:'SQL – Ngôn ngữ truy vấn có cấu trúc',summary:[
'SQL là ngôn ngữ chuẩn dùng để định nghĩa, cập nhật, truy xuất và kiểm soát quyền trên CSDL quan hệ.',
'Nhóm DDL có CREATE, ALTER; nhóm DML có SELECT, INSERT, UPDATE, DELETE; nhóm DCL có GRANT, REVOKE.',
'SELECT có thể kết hợp WHERE, ORDER BY và INNER JOIN để lọc, sắp xếp và liên kết dữ liệu.',
'Kiểu dữ liệu SQL thường gặp gồm CHAR/VARCHAR, BOOLEAN, INTEGER, REAL, DATE, TIME.'
]},
{id:15,topic:4,title:'Bảo mật và an toàn hệ cơ sở dữ liệu',summary:[
'Bảo mật CSDL dựa trên chính sách phân quyền tài khoản, xác thực và chỉ cấp đúng quyền cần thiết.',
'Các quyền có thể khác nhau giữa khách, người nhập liệu, người quản lí nội dung và quản trị viên.',
'An toàn dữ liệu cần phòng sự cố nguồn điện, hỏng thiết bị lưu trữ và sai sót của con người.',
'Sao lưu định kì và có phương án phục hồi là biện pháp quan trọng để giảm mất mát dữ liệu.'
]},
{id:16,topic:5,title:'Công việc quản trị cơ sở dữ liệu',summary:[
'Nhà quản trị CSDL cài đặt/cập nhật hệ QTCSDL, tạo và điều chỉnh CSDL, phân bổ tài nguyên và bảo đảm hệ thống hoạt động ổn định.',
'Công việc còn gồm phân quyền, bảo mật, sao lưu, phục hồi và xử lí sự cố.',
'Năng lực cần thiết: kiến thức CSDL, SQL, hệ QTCSDL, hệ điều hành, mạng, kĩ năng phân tích và giải quyết vấn đề.',
'Nhu cầu nhân lực quản trị CSDL tăng cùng với sự phát triển của các ứng dụng và hệ thống dữ liệu.'
]},
{id:17,topic:6,title:'Quản trị cơ sở dữ liệu trên máy tính',summary:[
'Quản trị CSDL trên máy tính giúp lưu trữ, tìm kiếm, cập nhật và tổng hợp dữ liệu nhanh, nhất quán hơn so với hồ sơ rời rạc.',
'MySQL là hệ QTCSDL phổ biến; HeidiSQL là phần mềm khách có giao diện đồ hoạ để làm việc với MySQL và một số hệ QTCSDL khác.',
'Khi kết nối cục bộ thường dùng máy chủ 127.0.0.1, cổng 3306, tài khoản quản trị phù hợp.',
'Sau khi kết nối có thể tạo CSDL, bảng, cập nhật dữ liệu và chạy truy vấn SQL.'
]},
{id:18,topic:6,title:'Thực hành xác định cấu trúc bảng và các trường khoá',summary:[
'Thiết kế CSDL bắt đầu từ việc xác định đối tượng cần quản lí, trường dữ liệu và quan hệ giữa các bảng.',
'Tách dữ liệu thành các bảng như bannhac, nhacsi, casi, banthuam giúp giảm lặp và thuận lợi khi cập nhật.',
'Mỗi bảng cần xác định khoá chính; các trường tham chiếu sang bảng khác là khoá ngoại.',
'Chọn kiểu dữ liệu phù hợp như INT, VARCHAR và có thể dùng AUTO_INCREMENT cho trường số định danh.'
]},
{id:19,topic:6,title:'Thực hành tạo lập cơ sở dữ liệu và các bảng',summary:[
'Tạo CSDL mymusic trên HeidiSQL và chọn bộ mã/kết hợp so sánh phù hợp để lưu tiếng Việt.',
'Khai báo trường của bảng với tên, kiểu dữ liệu, độ dài và thuộc tính NULL/NOT NULL.',
'Có thể đặt AUTO_INCREMENT cho trường số định danh và khai báo PRIMARY KEY cho khoá chính.',
'Sau khi khai báo cần lưu cấu trúc bảng để hệ QTCSDL tạo bảng.'
]},
{id:20,topic:6,title:'Thực hành tạo lập các bảng có khoá ngoài',summary:[
'Bảng có khoá ngoài chứa trường tham chiếu đến khoá chính của bảng liên quan.',
'Ngoài khoá chính có thể đặt ràng buộc UNIQUE cho trường hoặc nhóm trường không được trùng.',
'Khi khai báo FOREIGN KEY cần chọn đúng cột tham chiếu và bảng/cột đích.',
'Kiểu dữ liệu của trường khoá ngoài phải tương thích với trường được tham chiếu.'
]},
{id:21,topic:6,title:'Thực hành cập nhật và truy xuất dữ liệu các bảng',summary:[
'Cập nhật dữ liệu gồm thêm bản ghi mới, sửa giá trị và xoá bản ghi.',
'Có thể truy xuất toàn bộ bảng, sắp xếp theo cột hoặc lọc theo điều kiện trong giao diện HeidiSQL.',
'Với SQL, SELECT dùng để lấy dữ liệu; WHERE lọc; ORDER BY sắp xếp tăng/giảm.',
'Thực hành cần lưu ý trường AUTO_INCREMENT thường được hệ thống tự sinh giá trị.'
]},
{id:22,topic:6,title:'Thực hành cập nhật bảng dữ liệu có tham chiếu',summary:[
'Giá trị ở trường khoá ngoài phải tham chiếu tới giá trị tồn tại ở khoá chính của bảng liên quan.',
'Ràng buộc tham chiếu giúp tránh đưa vào dữ liệu không hợp lệ.',
'Xoá một bản ghi đang được bảng khác tham chiếu có thể bị hệ QTCSDL từ chối để bảo đảm tính nhất quán.',
'Khi thao tác qua giao diện hoặc phần mềm ứng dụng vẫn phải tuân thủ các ràng buộc của CSDL.'
]},
{id:23,topic:6,title:'Thực hành truy xuất dữ liệu qua liên kết các bảng',summary:[
'Dữ liệu phân tán ở nhiều bảng được kết hợp bằng điều kiện nối trên các trường khoá có quan hệ.',
'INNER JOIN lấy các bản ghi thoả mãn điều kiện liên kết giữa hai bảng.',
'Có thể nối nhiều bảng liên tiếp để lấy thông tin đầy đủ từ bannhac, nhacsi, casi, banthuam.',
'Bí danh bảng/cột giúp câu truy vấn ngắn gọn và tránh mơ hồ khi nhiều bảng có trường trùng tên.'
]},
{id:24,topic:6,title:'Thực hành sao lưu dữ liệu',summary:[
'Sao lưu CSDL là tạo bản dự phòng để phục hồi khi dữ liệu gốc bị mất hoặc hỏng.',
'HeidiSQL có thể xuất cấu trúc và dữ liệu CSDL ra tệp SQL.',
'Phục hồi thực hiện bằng cách tải/chạy tệp SQL sao lưu để tái tạo CSDL và dữ liệu.',
'Bản sao lưu cần được lưu an toàn, kiểm tra khả năng phục hồi và cập nhật định kì.'
]},
{id:25,topic:7,title:'Phần mềm chỉnh sửa ảnh',summary:[
'Ảnh số dạng bitmap được biểu diễn bằng các điểm ảnh (pixel); kích thước ảnh được mô tả bằng số điểm ảnh theo chiều rộng × chiều cao.',
'Độ phân giải ảnh thường đo bằng ppi; trên cùng kích thước in, độ phân giải cao hơn thường cho ảnh chi tiết hơn.',
'GIMP là phần mềm chỉnh sửa ảnh bitmap miễn phí với vùng ảnh, thanh bảng chọn, hộp công cụ và các hộp quản lí lớp/màu.',
'Thao tác cơ bản gồm mở ảnh, phóng to/thu nhỏ, xoay, cắt, thay đổi kích thước/độ phân giải và xuất ảnh.'
]},
{id:26,topic:7,title:'Công cụ tinh chỉnh màu sắc và công cụ chọn',summary:[
'Brightness–Contrast điều chỉnh độ sáng và độ tương phản; Color Balance điều chỉnh cân bằng màu; Hue–Saturation điều chỉnh sắc độ và độ bão hoà.',
'Vùng chọn giúp giới hạn chỉnh sửa vào một phần cụ thể của ảnh.',
'Rectangle Select, Ellipse Select và Free Select tạo vùng chọn theo hình chữ nhật, elip hoặc đường tự do.',
'Có thể kết hợp điều chỉnh màu với vùng chọn để chỉ thay đổi một đối tượng hoặc vùng ảnh.'
]},
{id:27,topic:7,title:'Công cụ vẽ và một số ứng dụng',summary:[
'Lớp ảnh (Layer) cho phép tách các đối tượng thành phần để chỉnh sửa độc lập; thứ tự lớp ảnh hưởng đến phần hiển thị.',
'Các công cụ thường dùng: Paint Brush, Bucket Fill, Gradient, Eraser, Clone và Healing.',
'Clone sao chép mẫu từ vùng nguồn; Healing trộn thông tin để xoá khuyết điểm tự nhiên hơn.',
'Kênh alpha biểu diễn độ trong suốt; màu nổi/màu nền là hai màu làm việc chính của nhiều công cụ vẽ.'
]},
{id:28,topic:7,title:'Tạo ảnh động',summary:[
'Ảnh động GIF có thể được tạo từ nhiều lớp ảnh, mỗi lớp đóng vai trò một khung hình.',
'Có thể mở nhiều ảnh thành lớp, khoá, gộp, nhân đôi, lật hoặc quay lớp để tạo chuỗi khung hình.',
'Tên lớp có thể kèm thời gian hiển thị như (1000ms); Loop forever dùng để lặp liên tục.',
'Khi xuất GIF cần chọn chế độ ảnh động; hiệu ứng Blend giúp chuyển động giữa các khung mượt hơn.'
]},
{id:29,topic:7,title:'Khám phá phần mềm làm phim',summary:[
'Phần mềm làm phim có vùng lệnh, ngăn tư liệu, màn xem trước, thanh thời gian/storyboard và các track.',
'Tư liệu đầu vào có thể gồm ảnh, video clip và tệp âm thanh.',
'Timeline thể hiện các lớp/track theo thời gian; mỗi đoạn phim có thể có track video và audio.',
'Quy trình cơ bản: chuẩn bị kịch bản/tư liệu, nhập tư liệu, sắp xếp–biên tập, xem trước và xuất video.'
]},
{id:30,topic:7,title:'Biên tập phim',summary:[
'Biên tập phim gồm chỉnh ảnh/video, chỉnh âm thanh, tạo hiệu ứng chuyển cảnh, điều chỉnh thời lượng và thêm phụ đề.',
'Có thể thay thế ảnh, chỉnh âm lượng và tạo hiệu ứng Fade Out cho âm thanh.',
'Hiệu ứng chuyển cảnh được áp dụng giữa các phân cảnh để chuyển tiếp tự nhiên hơn.',
'Phụ đề cần đúng nội dung, thời điểm xuất hiện và thời lượng phù hợp với phân cảnh.'
]},
{id:31,topic:7,title:'Thực hành tạo phim hoạt hình',summary:[
'Tạo phim hoạt hình cần xây dựng kịch bản, chuẩn bị hình ảnh/đoạn phim, lời thoại/âm thanh và phụ đề.',
'Các phân cảnh phải được sắp xếp theo mạch kịch bản và thời lượng hợp lí.',
'Có thể dùng Record Narration để ghi lời thoại/lời dẫn và gắn vào phim.',
'Sau khi hoàn thiện cần xem thử, kiểm tra đồng bộ hình–âm–phụ đề rồi xuất tệp video.'
]}
];
