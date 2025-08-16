# HCMUT Academic Forum - Frontend

## 📋 Tổng quan

Frontend của HCMUT Academic Forum được xây dựng bằng React + Vite với Material-UI, cung cấp giao diện người dùng hiện đại và responsive cho hệ thống diễn đàn học thuật.

## 🛠️ Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **UI Library**: Material-UI (MUI) 7.1.1
- **Routing**: React Router DOM 7.6.2
- **HTTP Client**: Axios 1.9.0
- **Styling**: CSS + Material-UI theming
- **State Management**: React Context API

## 🏗️ Cấu trúc dự án

```
src/
├── components/           # Shared components
│   ├── common/          # Common UI components (Header, Footer, Loading)
│   ├── forms/           # Form components (sẵn sàng mở rộng)
│   ├── ui/              # Basic UI components (sẵn sàng mở rộng)
│   ├── CountDown.jsx    # Countdown timer component
│   └── index.js         # Export tất cả components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Verify.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── index.js
│   ├── dashboard/      # Dashboard pages
│   │   ├── Dashboard.jsx
│   │   └── index.js
│   ├── profile/        # Profile pages
│   │   ├── Profile.jsx
│   │   └── index.js
│   └── index.js        # Export tất cả pages
├── layouts/            # Layout components
│   ├── AuthLayout.jsx  # Layout cho auth pages
│   ├── MainLayout.jsx  # Layout cho main pages
│   └── index.js
├── context/            # React Context
│   ├── AuthContext.jsx # Authentication context
│   └── index.js
├── services/           # API services
│   ├── api.js          # Axios configuration
│   ├── authService.js  # Authentication API calls
│   └── index.js
├── hooks/              # Custom hooks
│   ├── useApi.js       # API call hook
│   └── index.js
├── utils/              # Utility functions
│   ├── constants.js    # App constants
│   ├── helpers.js      # Helper functions
│   └── index.js
├── styles/             # Styles
│   ├── globals.css     # Global styles
│   ├── components/     # Component-specific styles
│   └── pages/          # Page-specific styles
├── assets/             # Static assets
│   ├── images/
│   └── Logo.png
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Base styles
```

## 🔄 Luồng hoạt động của ứng dụng

### 1. **Khởi tạo ứng dụng**
```
main.jsx → App.jsx → AuthProvider → BrowserRouter → Routes
```

### 2. **Authentication Flow**

#### 2.1 Đăng ký (Signup)
```
Route: / → AuthLayout → Signup.jsx
```
1. User nhập thông tin: fname, mname, lname, email, password, avatar
2. Upload avatar lên Cloudinary
3. Gọi API `POST /auth/register`
4. Lưu `uid` vào localStorage
5. Gửi OTP qua email
6. Redirect đến `/verify`

#### 2.2 Xác thực OTP (Verify)
```
Route: /verify → AuthLayout → Verify.jsx
```
1. Nhận `uid` từ navigation state
2. User nhập OTP code (6 digits)
3. Gọi API `POST /auth/otp/verify`
4. Thành công → Redirect đến `/login`

#### 2.3 Đăng nhập (Login)
```
Route: /login → AuthLayout → Login.jsx
```
1. User nhập email và password
2. Gọi API `POST /auth/login`
3. Nhận token và lưu vào localStorage
4. Update AuthContext state
5. Redirect đến `/dashboard`

#### 2.4 Quên mật khẩu (Forgot Password)
```
Route: /forgot-password → AuthLayout → ForgotPassword.jsx
```
1. User nhập email
2. Gọi API `POST /auth/otp/request`
3. Nhập OTP để xác thực
4. Gọi API `POST /auth/otp/verify`

### 3. **Main Application Flow**

#### 3.1 Dashboard
```
Route: /dashboard → MainLayout → Dashboard.jsx
```
- Hiển thị thống kê tổng quan
- Danh sách bài viết gần đây
- Thông tin hoạt động của user

#### 3.2 Profile
```
Route: /profile → MainLayout → Profile.jsx
```
- Thông tin cá nhân của user
- Thống kê hoạt động
- Lịch sử tương tác

### 4. **Layout System**

#### 4.1 AuthLayout
- Sử dụng cho các trang authentication
- Bao gồm: Background video, Logo header
- Pages: Login, Signup, Verify, ForgotPassword

#### 4.2 MainLayout
- Sử dụng cho các trang chính của ứng dụng
- Bao gồm: Header (với navigation), Main content, Footer
- Pages: Dashboard, Profile, và các pages khác

## 🔐 Authentication Context

### AuthContext cung cấp:
```javascript
{
  user,              // Thông tin user hiện tại
  loading,           // Trạng thái loading
  isAuthenticated,   // Trạng thái đăng nhập
  login,             // Function đăng nhập
  register,          // Function đăng ký
  logout,            // Function đăng xuất
  checkAuthStatus    // Function kiểm tra auth
}
```

### Sử dụng trong component:
```javascript
import { useAuth } from '../context';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  // ...
}
```

## 🌐 API Services

### API Configuration (api.js)
- Base URL: `http://localhost:3001/api`
- Timeout: 10 seconds
- Auto attach Bearer token
- Response/Request interceptors

### Auth Service (authService.js)
```javascript
authService.login(email, password)
authService.register(userData)
authService.verifyOTP(uid, otp)
authService.requestOTP(uid)
authService.forgotPassword(email)
authService.resetPassword(email, otp, newPassword)
authService.verifyToken(token)
authService.getProfile()
authService.updateProfile(userData)
```

## 🎣 Custom Hooks

### useApi Hook
```javascript
import { useApi } from '../hooks';

function MyComponent() {
  const { loading, error, execute } = useApi();

  const handleSubmit = async () => {
    const result = await execute(() => authService.login(email, password));
    if (result.success) {
      // Handle success
    } else {
      // Handle error: result.error
    }
  };
}
```

## 🛠️ Utilities

### Constants (constants.js)
- API_ENDPOINTS: Tất cả API endpoints
- APP_CONFIG: Cấu hình ứng dụng
- ROUTES: Đường dẫn routes
- STORAGE_KEYS: Keys cho localStorage
- VALIDATION_PATTERNS: Regex patterns
- ERROR_MESSAGES: Thông báo lỗi

### Helpers (helpers.js)
- Validation functions
- Format functions (date, time, text)
- Storage helpers
- Error handling helpers
- Debounce function

## 🚀 Cách chạy dự án

### Prerequisites
- Node.js >= 18
- npm hoặc yarn

### Installation
```bash
cd HLib/frontend
npm install
```

### Development
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📝 Quy tắc phát triển

### 1. **Thêm Page mới**
```bash
# Tạo thư mục và component
src/pages/new-feature/
├── NewFeature.jsx
└── index.js

# Export trong pages/index.js
export * from './new-feature';

# Thêm route trong App.jsx
<Route path="/new-feature" element={
  <MainLayout>
    <NewFeature />
  </MainLayout>
} />
```

### 2. **Thêm Component mới**
```bash
# Tạo component
src/components/common/NewComponent.jsx

# Export trong components/common/index.js
export { default as NewComponent } from './NewComponent';
```

### 3. **Thêm API Service**
```bash
# Thêm function trong services/
export const newService = {
  getData: async () => {
    return await api.get('/new-endpoint');
  }
};
```

### 4. **Thêm Utility**
```bash
# Thêm vào utils/helpers.js hoặc utils/constants.js
export const newHelper = (data) => {
  // logic here
};
```

## 🔍 Debugging & Testing

### Debug Tools
- React Developer Tools
- Redux DevTools (nếu sử dụng Redux)
- Network tab để check API calls
- Console logs trong development

### Common Issues & Solutions

#### 1. **CORS Error**
```bash
# Đảm bảo backend đã config CORS cho localhost:5173
```

#### 2. **Token Expired**
```bash
# Token sẽ tự động được xử lý bởi axios interceptor
# User sẽ được redirect về /login
```

#### 3. **Component Not Found**
```bash
# Kiểm tra export/import paths
# Đảm bảo component được export trong index.js
```

## 📊 State Management

### Current: React Context
- AuthContext: Quản lý authentication state
- Đơn giản, phù hợp với ứng dụng hiện tại

### Future: Redux Toolkit (nếu cần)
- Khi ứng dụng phức tạp hơn
- Nhiều global state cần quản lý
- Time travel debugging

## 🎨 Styling Guidelines

### Material-UI Theme
```javascript
// Sử dụng theme colors
sx={{ color: 'primary.main' }}
sx={{ backgroundColor: 'secondary.light' }}
```

### Custom CSS
```css
/* Sử dụng CSS variables */
:root {
  --primary-color: #40C4FF;
  --secondary-color: #2196F3;
}
```

### Responsive Design
```javascript
// Sử dụng MUI breakpoints
sx={{
  display: { xs: 'none', md: 'block' },
  fontSize: { xs: '1rem', md: '1.2rem' }
}}
```

## 🔄 Data Flow

```
User Action → Component → Hook/Service → API → Backend
                ↓
            Update State → Re-render → UI Update
```

### Example: Login Flow
```
1. User clicks Login button
2. Login.jsx calls handleSubmit
3. handleSubmit calls authService.login()
4. authService.login() sends POST to /auth/login
5. Response updates AuthContext
6. AuthContext triggers re-render
7. App.jsx redirects to /dashboard
```

## 🚦 Error Handling

### Levels of Error Handling

#### 1. **Component Level**
```javascript
try {
  const result = await authService.login(email, password);
} catch (error) {
  setError(getErrorMessage(error));
}
```

#### 2. **Service Level**
```javascript
// Axios interceptor handles 401, 500 errors
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

#### 3. **Global Level**
```javascript
// Error boundary component (có thể thêm sau)
class ErrorBoundary extends React.Component {
  // Handle unexpected errors
}
```

## 📱 Mobile Responsiveness

### Breakpoints (Material-UI)
- xs: 0px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

### Mobile-First Approach
```javascript
// Design cho mobile trước, sau đó scale up
sx={{
  width: '100%',           // Mobile
  md: { width: '50%' },    // Tablet+
  lg: { width: '33%' }     // Desktop+
}}
```

## 🔮 Future Enhancements

### Planned Features
1. **Real-time Chat**: Socket.io integration
2. **Push Notifications**: Service Worker
3. **Offline Support**: PWA capabilities
4. **Dark Mode**: Theme switching
5. **Internationalization**: Multi-language support
6. **Advanced Search**: Elasticsearch integration
7. **File Upload**: Drag & drop interface
8. **Rich Text Editor**: For post creation

### Performance Optimizations
1. **Code Splitting**: React.lazy()
2. **Image Optimization**: WebP format
3. **Caching**: React Query
4. **Bundle Analysis**: webpack-bundle-analyzer

## 👥 Team Collaboration

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR → Review → Merge
```

### Code Review Checklist
- [ ] Component follows naming conventions
- [ ] Proper error handling
- [ ] Responsive design
- [ ] Accessibility considerations
- [ ] Performance implications
- [ ] Test coverage (future)

### Communication
- **Slack/Discord**: Daily updates
- **GitHub Issues**: Bug reports, feature requests
- **Documentation**: Keep README updated
- **Code Comments**: Complex logic explanation

---

## 📞 Support & Contact

Nếu có thắc mắc về frontend, liên hệ:
- **Frontend Lead**: [Tên người phụ trách]
- **GitHub Issues**: [Link repository]
- **Team Chat**: [Link Slack/Discord]

---

*Last updated: [02/08/2025]*
*Version: 1.0.0*
