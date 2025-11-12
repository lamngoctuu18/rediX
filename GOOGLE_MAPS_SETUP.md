# Hướng dẫn cấu hình Google Maps API

## Cách lấy Google Maps API Key

### Bước 1: Tạo Project trên Google Cloud Console
1. Truy cập https://console.cloud.google.com/
2. Đăng nhập bằng tài khoản Google
3. Tạo project mới hoặc chọn project hiện có

### Bước 2: Kích hoạt Google Maps JavaScript API
1. Vào menu **APIs & Services** > **Library**
2. Tìm kiếm "Maps JavaScript API"
3. Click vào "Maps JavaScript API" và nhấn **ENABLE**
4. Tương tự, tìm và kích hoạt "Directions API"

### Bước 3: Tạo API Key
1. Vào menu **APIs & Services** > **Credentials**
2. Click **CREATE CREDENTIALS** > **API key**
3. Copy API key vừa tạo

### Bước 4: Giới hạn API Key (khuyến nghị)
1. Click vào API key vừa tạo
2. Trong phần **Application restrictions**:
   - Chọn "HTTP referrers (web sites)"
   - Thêm domain của bạn (ví dụ: `localhost:3000/*` cho development)
3. Trong phần **API restrictions**:
   - Chọn "Restrict key"
   - Chọn "Maps JavaScript API" và "Directions API"
4. Nhấn **SAVE**

### Bước 5: Cấu hình trong dự án
1. Copy file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Mở file `.env` và thay thế `YOUR_API_KEY_HERE` bằng API key của bạn:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...
   ```

3. Khởi động lại server:
   ```bash
   npm start
   ```

## Lưu ý bảo mật
- **KHÔNG** commit file `.env` lên Git
- File `.env` đã được thêm vào `.gitignore`
- Chỉ chia sẻ API key với team members qua kênh bảo mật
- Nên giới hạn API key theo domain và API cụ thể

## Tính năng Google Maps trong RIDE X

### Vé lượt (Turn-based Rental)
Khi chọn **Vé lượt** (9,000đ), hệ thống sẽ:
- Hiển thị 2 tuyến đường cố định:
  1. **Ga Văn Khê → Đại học Đại Nam**
  2. **Đại học Đại Nam → Ga Văn Khê**
- Hiển thị bản đồ Google Maps với đường đi được tính toán
- Hiển thị khoảng cách và thời gian dự kiến
- Tính toán route tối ưu cho xe đạp

### Các loại vé khác
- **Vé theo giờ**: Tự do chọn trạm bắt đầu (chưa có maps)
- **Vé theo ngày**: Tự do chọn trạm bắt đầu (chưa có maps)
- **Vé theo tháng**: Tự do chọn trạm bắt đầu (chưa có maps)

## Xử lý lỗi

### Nếu map không hiển thị:
1. Kiểm tra API key đã được cấu hình đúng chưa
2. Kiểm tra console browser xem có lỗi gì không
3. Đảm bảo đã kích hoạt Maps JavaScript API và Directions API
4. Kiểm tra giới hạn domain của API key

### Nếu không tính được route:
1. Kiểm tra Directions API đã được kích hoạt chưa
2. Kiểm tra tọa độ các trạm có đúng không
3. Xem log trong console

## Chi phí
- Google Maps Platform cung cấp **$200 miễn phí mỗi tháng**
- Maps JavaScript API: $7/1000 loads
- Directions API: $5/1000 requests
- Với traffic nhỏ, hoàn toàn MIỄN PHÍ trong giới hạn $200/tháng
