LOVE CONFESSION v0.1.0
=======================

1. Cá nhân hóa
--------------
Mở file config.js bằng Notepad và sửa:
- yourName
- partnerName
- specialDate
- messages

2. Nhạc nền (tùy chọn)
-----------------------
- Đặt file MP3 tên: music.mp3
- Trong config.js đổi:
  enableLocalMusic: true

Lưu ý: iPhone/Android thường không cho web tự phát nhạc.
Người xem cần chạm nút ♫ để bật nhạc.

3. Chạy thử
------------
Chỉ cần double-click index.html để xem.
Để test giống website thật hơn, có thể dùng VS Code + Live Server.

4. Deploy Cloudflare Pages
---------------------------
Có thể upload toàn bộ thư mục này lên GitHub, sau đó tạo Cloudflare Pages.
Không cần Worker, D1 hay R2.

5. QR
------
Sau khi có URL chính thức, tạo QR trỏ đến URL đó.
Ví dụ:
https://love.tenmiencuaban.vn

Trang web được thiết kế mobile-first cho iPhone và Android.


6. Bản v0.1.1
------------
Đã đổi bộ font sang Cormorant Garamond + Playfair Display để giao diện sang trọng, nhẹ nhàng và lãng mạn hơn.


7. Bản v0.1.2 – Dreamy Hearts
-----------------------------
- Tăng mật độ trái tim bay nền.
- Thêm nhiều loại tim với kích thước/độ sáng khác nhau.
- Thêm hạt sáng lấp lánh.
- Tim bay có độ lệch ngang và hiệu ứng chiều sâu tự nhiên hơn.
- Khi mở thư / đến câu hỏi / bấm “Em đồng ý” có hiệu ứng bùng nổ trái tim.
- Finale có 2 đợt bùng tim để màn hình rực rỡ hơn.
- Vẫn tối ưu để chạy mượt trên điện thoại.


8. Bản v0.2.0 – WOW Cinematic
-----------------------------
- Nền aurora hồng tím chuyển động chậm.
- Hiệu ứng vignette điện ảnh giúp trung tâm nổi bật hơn.
- Cánh hoa hồng rơi tự nhiên với xoay 3D.
- Sao băng xuất hiện ngẫu nhiên.
- Card kính có tia sáng quét nhẹ.
- Nút “Em đồng ý” có shimmer cao cấp.
- Finale có 3 vòng halo phát sáng quanh trái tim.
- Tên hai người chuyển động nhẹ và có glow.
- Hiệu ứng đồng ý được nâng cấp thành cinematic love wave:
  trái tim + confetti + cánh hoa + sparkle + sao băng.
- Có hỗ trợ prefers-reduced-motion để tránh gây khó chịu cho người nhạy cảm với chuyển động.


9. Bản v0.3.0 – Deluxe Romantic Experience
-------------------------------------------
- Chuyển cảnh cinematic có flash ánh sáng.
- Card xuất hiện bằng blur + fade mượt hơn.
- Có khung ảnh kỷ niệm tùy chọn ở màn hình cuối.
- Có "chòm sao hình trái tim" phát sáng ở finale.
- Nhạc nền được hỗ trợ tốt hơn:
  + đặt file music.mp3 cùng thư mục
  + config enableLocalMusic: true
  + nhạc có thể phát ngay sau lần chạm đầu tiên (hợp với quy định autoplay của iPhone/Android)
  + nút nhạc có trạng thái đang phát.
- Finale có thêm một đợt tim bùng sau 1,6 giây để hiệu ứng dài và sang hơn.

ẢNH KỶ NIỆM:
- Nếu muốn dùng ảnh hai người, đặt ảnh tên couple.jpg cùng thư mục.
- Trong config.js để:
  showPhotoIfAvailable: true
  couplePhoto: "couple.jpg"
- Nếu không có ảnh, web tự ẩn khung ảnh, không bị lỗi giao diện.

NHẠC:
- Đặt file MP3 tên music.mp3 trong cùng thư mục.
- Trong config.js đổi:
  enableLocalMusic: true
- Do giới hạn trình duyệt, nhạc sẽ bắt đầu sau khi người xem chạm phong thư lần đầu.


10. v0.3.1 – iPhone Effects Fix
-------------------------------
- Sửa nguyên nhân iPhone có thể gần như không thấy animation khi bật Reduce Motion.
- Loại bỏ rule CSS làm mọi animation chỉ chạy 0.01ms.
- Giữ đầy đủ tim, cánh hoa, sparkle, aurora và finale trên Safari iPhone.
- Giảm nhẹ blur nặng GPU trên iOS để chạy mượt hơn.
- Thêm iphoneEffectsBoost: true trong config.js để hiệu ứng trên iPhone vẫn dày và rực rỡ.


11. v0.3.2 – iPhone Music Fix
-----------------------------
- Dùng thẻ <audio> thật thay vì chỉ new Audio().
- Gọi audio.load() để Safari chuẩn bị file trước.
- Bắt touchstart/pointerdown ngay lúc chạm phong thư để phát trong user gesture.
- Không chờ nhạc buffer trước khi mở phong thư.
- Nếu Safari chặn tự phát, hiện nhắc “Chạm ♫ để bật nhạc”.
- Nếu file music.mp3 không đọc được, hiện thông báo rõ.
