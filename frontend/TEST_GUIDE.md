# Hướng dẫn Test Đăng nhập

## 🚀 Cách khởi động Frontend

1. Mở terminal trong thư mục `HLib/frontend`
2. Chạy lệnh:
```bash
npm run dev
```
3. Mở trình duyệt và truy cập: `http://localhost:5173`

## 👤 Tài khoản Test

Hiện tại đang sử dụng Mock Service (không cần backend), bạn có thể đăng nhập với:

### Tài khoản Admin:
- **Email**: `admin@hcmut.edu.vn`
- **Password**: `admin123`

### Tài khoản User:
- **Email**: `user@hcmut.edu.vn`
- **Password**: `user123`

## 🧪 Các bước Test

### 1. Test Đăng nhập
1. Truy cập trang chủ (sẽ redirect đến `/login` nếu chưa đăng nhập)
2. Nhập email và password từ danh sách trên
3. Click "Log in"
4. Kiểm tra:
   - Loading state hiển thị
   - Sau khi đăng nhập thành công, redirect đến `/dashboard`
   - Sidebar hiển thị với menu items
   - Header hiển thị avatar và tên user

### 2. Test Navigation
1. Sau khi đăng nhập, click vào các menu items trong sidebar:
   - My account → `/profile`
   - Courses → `/courses`
   - Threads → `/threads`
   - My Collections → `/collections`
   - My Documents → `/documents`
   - Favorite Documents → `/favorites`
   - Revenue Report → `/revenue`

### 3. Test Protected Routes
1. Thử truy cập trực tiếp `/dashboard` khi chưa đăng nhập
2. Kiểm tra có redirect về `/login` không

### 4. Test Logout
1. Click vào avatar ở header
2. Click "Logout"
3. Kiểm tra redirect về `/login`

## 🔧 Chuyển đổi giữa Mock và Real API

Trong file `HLib/frontend/src/services/authService.js`:

```javascript
// Set to true để dùng mock service (test không cần backend)
// Set to false để dùng real API (cần backend chạy)
const USE_MOCK = true;
```

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **"Cannot read properties of undefined"**
   - Kiểm tra user object trong AuthContext
   - Kiểm tra response từ API/Mock service

2. **"Network Error"**
   - Nếu USE_MOCK = false, đảm bảo backend đang chạy
   - Kiểm tra URL trong `src/utils/constants.js`

3. **Sidebar không hiển thị**
   - Kiểm tra MainLayout có import Sidebar đúng không
   - Kiểm tra CSS styling

4. **Protected Routes không hoạt động**
   - Kiểm tra ProtectedRoute component
   - Kiểm tra AuthContext loading state

## 📱 Responsive Design

Test trên các kích thước màn hình khác nhau:
- Desktop (>1200px)
- Tablet (768px - 1200px)  
- Mobile (<768px)

## 🎯 Kết quả mong đợi

Sau khi test thành công:
- ✅ Đăng nhập smooth với loading state
- ✅ Dashboard hiển thị với sidebar như trong hình
- ✅ Navigation hoạt động đúng
- ✅ Protected routes bảo vệ tốt
- ✅ Logout và login lại hoạt động
- ✅ UI responsive trên mobile

## 🔄 Chuyển sang Real Backend

Khi backend sẵn sàng:
1. Set `USE_MOCK = false` trong `authService.js`
2. Đảm bảo backend chạy trên port 3001
3. Kiểm tra các endpoint API hoạt động
4. Test lại toàn bộ flow
