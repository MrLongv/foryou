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
