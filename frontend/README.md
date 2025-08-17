# HCMUT Academic Forum - Frontend

## 📋 Tổng quan

Frontend của HCMUT Academic Forum được xây dựng bằng React + Vite với Material-UI, cung cấp giao diện người dùng hiện đại và responsive cho hệ thống diễn đàn học thuật. Project sử dụng font Roboto-Regular và hệ thống icon Material-UI với fallback FontAwesome mapping.

## 🛠️ Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **UI Library**: Material-UI (MUI) 7.1.1
- **Routing**: React Router DOM 7.6.2
- **HTTP Client**: Axios 1.9.0
- **Styling**: CSS + Material-UI theming + Custom CSS
- **State Management**: React Context API
- **Icons**: Material-UI Icons với FontAwesome mapping
- **Font**: Roboto-Regular.ttf (Custom font)
- **Image Upload**: Cloudinary integration
- **Form Validation**: Joi (backend) + Custom validation (frontend)

## 🏗️ Cấu trúc dự án

```
src/
├── components/           # Shared components
│   ├── common/          # Common UI components
│   │   ├── Header.jsx           # App header với navigation
│   │   ├── Footer.jsx           # App footer
│   │   ├── Loading.jsx          # Loading spinner component
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── ProtectedRoute.jsx   # Route protection component
│   │   ├── CourseCard.jsx       # Reusable course card component
│   │   ├── FontAwesomeIcon.jsx  # FontAwesome to MUI icon mapper
│   │   ├── SimpleIcon.jsx       # Simple icon component
│   │   ├── Icons.jsx            # Material-UI icons exports
│   │   ├── FontAwesomeTest.jsx  # Icon testing component
│   │   ├── TestInfo.jsx         # Development info component
│   │   └── index.js             # Export tất cả components
│   ├── forms/           # Form components (sẵn sàng mở rộng)
│   ├── ui/              # Basic UI components (sẵn sàng mở rộng)
│   ├── CountDown.jsx    # Countdown timer component
│   └── index.js         # Export tất cả components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx            # Login page với social auth
│   │   ├── Signup.jsx           # Registration với avatar upload
│   │   ├── Verify.jsx           # OTP verification
│   │   ├── ForgotPassword.jsx   # Password reset
│   │   └── index.js
│   ├── dashboard/      # Dashboard pages
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   └── index.js
│   ├── profile/        # Profile pages
│   │   ├── Profile.jsx          # User profile
│   │   └── index.js
│   ├── courses/        # Course pages
│   │   ├── CoursesDemo.jsx      # CourseCard demo page
│   │   └── index.js
│   └── index.js        # Export tất cả pages
├── layouts/            # Layout components
│   ├── AuthLayout.jsx  # Layout cho auth pages (với background)
│   ├── MainLayout.jsx  # Layout cho main pages (với header/footer)
│   └── index.js
├── context/            # React Context
│   ├── AuthContext.jsx # Authentication context với token management
│   └── index.js
├── services/           # API services
│   ├── api.js          # Axios configuration với interceptors
│   ├── authService.js  # Authentication API calls với mock support
│   └── index.js
├── hooks/              # Custom hooks
│   ├── useApi.js       # API call hook với error handling
│   └── index.js
├── utils/              # Utility functions
│   ├── constants.js    # App constants, API endpoints, routes
│   ├── helpers.js      # Helper functions, validation
│   └── index.js
├── styles/             # Styles
│   ├── fonts.css       # Font definitions (Roboto-Regular)
│   ├── globals.css     # Global styles và utility classes
│   ├── signin.css      # Authentication page styles
│   ├── components/     # Component-specific styles
│   └── pages/          # Page-specific styles
│       └── dashboard.css
├── assets/             # Static assets
│   ├── Logo.png        # App logo
│   ├── Roboto-Regular.ttf  # Custom font file
│   └── react.svg       # React logo
├── theme/              # Material-UI theme
│   └── index.js        # Custom theme với Roboto-Regular font
├── App.jsx             # Main App component với routing
├── main.jsx            # Entry point với ThemeProvider
└── index.css           # Base styles với font imports
```

## � Cách chạy dự án

### Prerequisites
- Node.js >= 18
- npm hoặc yarn

### Installation & Development
```bash
# Di chuyển vào thư mục frontend
cd HLib/frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build & Preview
```bash
# Build cho production
npm run build

# Preview build
npm run preview
```

### Test với Mock Data
Trong `src/services/authService.js`, set `USE_MOCK = true` để test không cần backend:

**Tài khoản test:**
- Admin: `admin@hcmut.edu.vn` / `admin123`
- User: `user@hcmut.edu.vn` / `user123`

## �🔄 Luồng hoạt động của ứng dụng

### 1. **Khởi tạo ứng dụng**
```
main.jsx → ThemeProvider → AuthProvider → BrowserRouter → App.jsx → Routes
```

### 2. **Authentication Flow**

#### 2.1 Đăng ký (Signup)
```
Route: / → AuthLayout → Signup.jsx
```
1. User nhập thông tin: fname, mname, lname, email, password
2. Upload avatar lên Cloudinary (optional)
3. Validation: email format, password strength
4. Gọi API `POST /auth/register` với form data
5. Lưu `uid` vào localStorage
6. Backend gửi OTP qua email
7. Redirect đến `/verify` với uid

#### 2.2 Xác thực OTP (Verify)
```
Route: /verify → AuthLayout → Verify.jsx
```
1. Nhận `uid` từ navigation state hoặc localStorage
2. User nhập OTP code (6 digits)
3. Countdown timer cho resend OTP
4. Gọi API `POST /auth/otp/verify` với uid và otp
5. Thành công → Redirect đến `/login`
6. Thất bại → Hiển thị error message

#### 2.3 Đăng nhập (Login)
```
Route: /login → AuthLayout → Login.jsx
```
1. User nhập email và password
2. Validation: email format, required fields
3. Gọi API `POST /auth/login`
4. Nhận JWT token và user info
5. Lưu token vào localStorage
6. Update AuthContext state (user, isAuthenticated)
7. Redirect đến `/dashboard`

#### 2.4 Quên mật khẩu (Forgot Password)
```
Route: /forgot-password → AuthLayout → ForgotPassword.jsx
```
1. User nhập email
2. Gọi API `POST /auth/otp/request`
3. Nhập OTP để xác thực
4. Gọi API `POST /auth/otp/verify`
5. Nhập mật khẩu mới
6. Gọi API `POST /auth/reset-password`

### 3. **Main Application Flow**

#### 3.1 Dashboard
```
Route: /dashboard → ProtectedRoute → MainLayout → Dashboard.jsx
```
- Hiển thị thống kê tổng quan
- Danh sách bài viết gần đây
- Thông tin hoạt động của user
- Course cards với different variants

#### 3.2 Profile
```
Route: /profile → ProtectedRoute → MainLayout → Profile.jsx
```
- Thông tin cá nhân của user
- Thống kê hoạt động
- Lịch sử tương tác
- Avatar management

#### 3.3 Courses Demo
```
Route: /courses-demo → MainLayout → CoursesDemo.jsx
```
- Demo các variant của CourseCard component
- Test page cho UI components

### 4. **Layout System**

#### 4.1 AuthLayout
- **Sử dụng cho**: Authentication pages
- **Bao gồm**:
  - Background styling
  - Logo header
  - Centered form container
  - Responsive design
- **Pages**: Login, Signup, Verify, ForgotPassword
- **Features**:
  - Social auth buttons (Google, Facebook, Apple)
  - Form validation
  - Loading states

#### 4.2 MainLayout
- **Sử dụng cho**: Main application pages
- **Bao gồm**:
  - Header với navigation và user menu
  - Main content area
  - Footer với links
  - Sidebar (optional)
- **Pages**: Dashboard, Profile, Courses, và các pages khác
- **Features**:
  - Protected route wrapper
  - User avatar dropdown
  - Responsive navigation

## 🎨 Font Configuration

### Font System
Project sử dụng **Roboto-Regular.ttf** làm font chính:

#### Font Files:
- `src/assets/Roboto-Regular.ttf` - Custom font file
- Font weight: 400 (Regular)
- Font display: swap (for performance)

#### Font Configuration:
```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Roboto-Regular';
  src: url('../assets/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

#### Theme Integration:
```javascript
// src/theme/index.js
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto-Regular',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});
```

#### Global Application:
- Tất cả components sử dụng Roboto-Regular
- Material-UI components được override
- Fallback fonts: system-ui, sans-serif

## 🎯 Icon System

### Material-UI Icons với FontAwesome Mapping

#### Icon Components:
```javascript
// src/components/common/Icons.jsx
export {
  PersonIcon,
  HomeIcon,
  FavoriteIcon,
  GoogleIcon,
  FacebookIcon,
  SchoolIcon,
  // ... và nhiều icons khác
} from '@mui/icons-material';
```

#### FontAwesome Compatibility:
```javascript
// src/components/common/FontAwesomeIcon.jsx
import { FontAwesomeIcon } from '../components/common';

// Sử dụng FontAwesome syntax
<FontAwesomeIcon
  icon="fas fa-user"
  size="1rem"
  color="primary.main"
  animation="hover"
/>

// Tự động map sang Material-UI icon
```

#### Icon Mapping:
```javascript
const fontAwesomeToMuiMap = {
  'fas fa-user': 'person',
  'fas fa-home': 'home',
  'fas fa-heart': 'favorite',
  'fab fa-google': 'google',
  'fab fa-facebook': 'facebook',
  // ... 50+ mappings
};
```

#### Simple Icon Usage:
```javascript
import { SimpleIcon } from '../components/common';

<SimpleIcon
  icon="person"
  size="2rem"
  color="primary.main"
/>
```

## 🔐 Authentication Context

### AuthContext cung cấp:
```javascript
{
  user,              // Thông tin user hiện tại (name, email, avatar, etc.)
  loading,           // Trạng thái loading khi check auth
  isAuthenticated,   // Boolean - trạng thái đăng nhập
  login,             // Function đăng nhập (email, password)
  register,          // Function đăng ký (userData)
  logout,            // Function đăng xuất và clear localStorage
  checkAuthStatus    // Function kiểm tra token validity
}
```

### Token Management:
- JWT token lưu trong localStorage
- Auto-attach token vào API requests
- Token verification với backend
- Auto-logout khi token expired

### Sử dụng trong component:
```javascript
import { useAuth } from '../context';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      Welcome {user.name}!
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🧩 Components Library

### CourseCard Component
Reusable component để hiển thị course information với multiple variants:

#### Props:
```javascript
<CourseCard
  course={courseData}           // Course object
  onClick={handleCourseClick}   // Click handler
  showReadMore={true}           // Show read more button
  variant="default"             // 'default', 'compact', 'detailed'
/>
```

#### Course Data Structure:
```javascript
const courseData = {
  title: 'Course Title',
  instructor: 'Instructor Name',
  category: 'Computer Science',
  date: '2024-01-15',
  likes: 42,
  image: 'image_url',
  description: 'Course description...',
  duration: '4 weeks',
  level: 'Beginner',
  students: 150
};
```

#### Variants:
- **default**: Full card với image, title, description
- **compact**: Horizontal layout, smaller size
- **detailed**: Extended info với duration, level, students

#### Category Colors:
```javascript
const categoryColors = {
  'Computer Science': '#40C4FF',
  'Mathematics': '#FF6B6B',
  'Physics': '#4ECDC4',
  'Chemistry': '#45B7D1',
  'Biology': '#96CEB4',
  'Engineering': '#FECA57',
  'Business': '#FF9FF3',
  'General': '#95A5A6'
};
```

### Header Component
App header với navigation và user menu:

#### Features:
- Logo với click navigation
- App title
- User avatar dropdown menu
- Login/Signup buttons (khi chưa đăng nhập)
- Responsive design

#### User Menu:
- Profile link
- Logout option
- FontAwesome icons

### Footer Component
App footer với links và information:

#### Sections:
- About HCMUT Forum
- Quick Links (Dashboard, Profile)
- Support (Help Center, Contact)
- Legal (Privacy Policy, Terms)

### Loading Component
Centralized loading spinner với Material-UI CircularProgress.

### ProtectedRoute Component
Route wrapper để bảo vệ authenticated pages:

```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🌐 API Services

### API Configuration (api.js)
```javascript
// Base configuration
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Auto attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Auth Service (authService.js)
```javascript
// Mock/Real API toggle
const USE_MOCK = true; // Set false để dùng real backend

// API methods
authService.login(email, password)           // Đăng nhập
authService.register(userData)               // Đăng ký với avatar upload
authService.verifyOTP(uid, otp)             // Xác thực OTP
authService.requestOTP(uid)                 // Request OTP mới
authService.forgotPassword(email)           // Quên mật khẩu
authService.resetPassword(email, otp, newPassword) // Reset password
authService.verifyToken(token)              // Verify JWT token
authService.getProfile()                    // Lấy thông tin profile
authService.updateProfile(userData)         // Cập nhật profile
```

### Cloudinary Integration:
```javascript
// Image upload configuration
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dsivbzwgs',
  UPLOAD_PRESET: 'avata_docs'
};

// Upload function trong Signup component
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  return response.json();
};
```

## 🎣 Custom Hooks

### useApi Hook
Centralized hook để handle API calls với loading states và error handling:

```javascript
import { useApi } from '../hooks';

function MyComponent() {
  const { loading, error, execute } = useApi();

  const handleSubmit = async () => {
    const result = await execute(() => authService.login(email, password));
    if (result.success) {
      // Handle success
      console.log('Login successful:', result.data);
    } else {
      // Handle error
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

#### Hook Features:
- Automatic loading state management
- Error handling và formatting
- Success/failure result structure
- Reusable across components

## 🛠️ Utilities

### Constants (constants.js)
Centralized configuration và constants:

```javascript
// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/otp/verify',
    REQUEST_OTP: '/auth/otp/request',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_TOKEN: '/auth/verify-token',
    PROFILE: '/auth/profile'
  }
};

// App configuration
export const APP_CONFIG = {
  APP_NAME: 'HCMUT ACADEMIC FORUM',
  API_BASE_URL: 'http://localhost:3001/api',
  CLOUDINARY_CLOUD_NAME: 'dsivbzwgs',
  CLOUDINARY_UPLOAD_PRESET: 'avata_docs'
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/',
  VERIFY: '/verify',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^[0-9]{10,11}$/
};

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase and number',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.'
};
```

### Helpers (helpers.js)
Utility functions để support development:

```javascript
// Validation helpers
export const validateEmail = (email) => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_PATTERNS.EMAIL.test(email)) return ERROR_MESSAGES.INVALID_EMAIL;
  return null;
};

export const validatePassword = (password) => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_PATTERNS.PASSWORD.test(password)) return ERROR_MESSAGES.INVALID_PASSWORD;
  return null;
};

// Format helpers
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('vi-VN');
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Storage helpers
export const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error getting storage item:', error);
    return null;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
};

// Error handling helpers
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return ERROR_MESSAGES.SERVER_ERROR;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
```

## 🧪 Testing & Development

### Development Testing
```bash
# Chạy development server
npm run dev

# Test với mock data (không cần backend)
# Trong src/services/authService.js: USE_MOCK = true
```

### Test Accounts (Mock Mode):
- **Admin**: `admin@hcmut.edu.vn` / `admin123`
- **User**: `user@hcmut.edu.vn` / `user123`

### Testing Flow:
1. **Authentication Test**:
   - Login với test accounts
   - Signup flow với avatar upload
   - OTP verification
   - Forgot password flow

2. **Navigation Test**:
   - Protected routes
   - Header navigation
   - User menu dropdown
   - Logout functionality

3. **Component Test**:
   - CourseCard variants tại `/courses-demo`
   - Icon system tại `/icons-test`
   - Responsive design

### Backend Integration:
```javascript
// Để chuyển sang real backend:
// 1. Set USE_MOCK = false trong authService.js
// 2. Đảm bảo backend chạy trên port 3001
// 3. Test API endpoints
```

## 📝 Development Guidelines

### 1. **Thêm Page mới**
```bash
# 1. Tạo thư mục và component
src/pages/new-feature/
├── NewFeature.jsx
└── index.js

# 2. Component structure
// NewFeature.jsx
import { Container, Typography } from '@mui/material';

export default function NewFeature() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        New Feature
      </Typography>
      {/* Component content */}
    </Container>
  );
}

# 3. Export trong pages/index.js
export { default as NewFeature } from './new-feature';

# 4. Thêm route trong App.jsx
<Route path="/new-feature" element={
  <ProtectedRoute>
    <MainLayout>
      <NewFeature />
    </MainLayout>
  </ProtectedRoute>
} />
```

### 2. **Thêm Component mới**
```bash
# 1. Tạo component với proper structure
src/components/common/NewComponent.jsx

# 2. Component template
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function NewComponent({
  prop1,
  prop2 = 'default value',
  onClick,
  ...props
}) {
  return (
    <Box {...props}>
      {/* Component content */}
    </Box>
  );
}

NewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string,
  onClick: PropTypes.func,
};

# 3. Export trong components/common/index.js
export { default as NewComponent } from './NewComponent';
```

### 3. **Thêm API Service**
```bash
# 1. Thêm service function
// services/newService.js
import { api } from './api';

export const newService = {
  getData: async (params) => {
    return await api.get('/new-endpoint', { params });
  },

  createData: async (data) => {
    return await api.post('/new-endpoint', data);
  },

  updateData: async (id, data) => {
    return await api.put(`/new-endpoint/${id}`, data);
  },

  deleteData: async (id) => {
    return await api.delete(`/new-endpoint/${id}`);
  }
};

# 2. Export trong services/index.js
export * from './newService';

# 3. Sử dụng trong component
import { newService } from '../services';
import { useApi } from '../hooks';

const { loading, error, execute } = useApi();

const handleGetData = async () => {
  const result = await execute(() => newService.getData());
  if (result.success) {
    // Handle success
  }
};
```

### 4. **Thêm Utility Function**
```bash
# 1. Thêm vào utils/helpers.js
export const newHelper = (data) => {
  // Validation
  if (!data) return null;

  // Processing logic
  return processedData;
};

# 2. Hoặc thêm constant vào utils/constants.js
export const NEW_CONSTANTS = {
  MAX_LENGTH: 100,
  DEFAULT_VALUE: 'default',
  VALIDATION_RULES: {
    required: true,
    minLength: 3
  }
};

# 3. Sử dụng trong component
import { newHelper, NEW_CONSTANTS } from '../utils';

const processedData = newHelper(rawData);
```

### 5. **Thêm Icon mới**
```bash
# 1. Import icon trong components/common/Icons.jsx
import { NewIcon } from '@mui/icons-material';

# 2. Export icon
export { NewIcon };

# 3. Thêm mapping trong FontAwesomeIcon.jsx
const fontAwesomeToMuiMap = {
  'fas fa-new-icon': 'new-icon',
  // ...
};

# 4. Sử dụng
<FontAwesomeIcon icon="fas fa-new-icon" size="1rem" />
// hoặc
<SimpleIcon icon="new-icon" size="1rem" />
```

### 6. **Styling Guidelines**
```bash
# 1. Sử dụng Material-UI sx prop
<Box sx={{
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 2,
  backgroundColor: 'primary.light',
  borderRadius: 1
}}>

# 2. Responsive design
<Box sx={{
  width: { xs: '100%', md: '50%' },
  fontSize: { xs: '1rem', md: '1.2rem' }
}}>

# 3. Theme colors
<Typography sx={{ color: 'primary.main' }}>
<Button sx={{ backgroundColor: 'secondary.light' }}>

# 4. Custom CSS (nếu cần)
// styles/components/NewComponent.css
.new-component {
  font-family: 'Roboto-Regular', system-ui, sans-serif;
}
```

## 🔍 Debugging & Troubleshooting

### Debug Tools
- **React Developer Tools**: Component inspection, props, state
- **Network Tab**: API calls, response inspection
- **Console Logs**: Development debugging
- **Material-UI Theme Inspector**: Theme values, breakpoints

### Common Issues & Solutions

#### 1. **Font không load**
```bash
# Kiểm tra font file path
src/assets/Roboto-Regular.ttf

# Kiểm tra @font-face declaration
src/styles/fonts.css
src/index.css
src/theme/index.js

# Clear browser cache
Ctrl + F5 hoặc hard refresh
```

#### 2. **Icon không hiển thị**
```bash
# Kiểm tra icon mapping
src/components/common/FontAwesomeIcon.jsx

# Kiểm tra icon import
src/components/common/Icons.jsx

# Fallback: Sử dụng SimpleIcon thay vì FontAwesomeIcon
<SimpleIcon icon="person" size="1rem" />
```

#### 3. **CORS Error**
```bash
# Backend phải config CORS cho localhost:5173
# Hoặc sử dụng mock mode: USE_MOCK = true
```

#### 4. **Token Expired**
```bash
# Token tự động được xử lý bởi axios interceptor
# User sẽ được redirect về /login
# Kiểm tra localStorage có token không
```

#### 5. **Component Not Found**
```bash
# Kiểm tra export/import paths
# Đảm bảo component được export trong index.js
# Kiểm tra case-sensitive file names
```

#### 6. **CourseCard không hiển thị đúng**
```bash
# Kiểm tra course data structure
# Kiểm tra variant prop: 'default', 'compact', 'detailed'
# Kiểm tra onClick handler
```

#### 7. **Authentication Issues**
```bash
# Kiểm tra AuthContext provider wrap App
# Kiểm tra localStorage token
# Kiểm tra API endpoints trong constants.js
# Test với mock mode trước
```

#### 8. **Styling Issues**
```bash
# Kiểm tra Material-UI theme import
# Kiểm tra sx prop syntax
# Kiểm tra responsive breakpoints
# Clear browser cache
```

### Development Tips

#### Performance Optimization:
```javascript
// 1. Lazy loading cho pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

// 2. Memoization cho expensive components
const MemoizedCourseCard = memo(CourseCard);

// 3. Debounce cho search inputs
const debouncedSearch = debounce(handleSearch, 300);
```

#### Error Boundaries:
```javascript
// Thêm error boundary cho production
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
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

## � Deployment

### Build cho Production
```bash
# Build optimized version
npm run build

# Preview build locally
npm run preview

# Build output trong dist/ folder
```

### Environment Variables
```bash
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Deployment Checklist
- [ ] Set USE_MOCK = false
- [ ] Update API_BASE_URL
- [ ] Test all authentication flows
- [ ] Test responsive design
- [ ] Optimize images và assets
- [ ] Enable HTTPS
- [ ] Configure CORS trên backend

## 👥 Team Collaboration

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request
# Code review
# Merge to main
```

### Commit Message Convention
```bash
feat: add new feature
fix: fix bug in component
style: update styling
refactor: refactor code structure
docs: update documentation
test: add tests
chore: update dependencies
```

### Code Review Checklist
- [ ] Component follows naming conventions
- [ ] Proper error handling
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance implications checked
- [ ] Props validation added
- [ ] Comments cho complex logic

### File Naming Conventions
```bash
# Components: PascalCase
CourseCard.jsx
AuthLayout.jsx

# Pages: PascalCase
Dashboard.jsx
Profile.jsx

# Utilities: camelCase
helpers.js
constants.js

# Styles: kebab-case
dashboard.css
signin.css
```

## 📚 Learning Resources

### Material-UI Documentation
- [MUI Components](https://mui.com/components/)
- [MUI System](https://mui.com/system/basics/)
- [MUI Theming](https://mui.com/customization/theming/)

### React Best Practices
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/)
- [Context API](https://reactjs.org/docs/context.html)

### Development Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Vite Documentation](https://vitejs.dev/)
- [Axios Documentation](https://axios-http.com/)

## 📞 Support & Contact

### Team Structure
- **Frontend Lead**: [Tên người phụ trách frontend]
- **Backend Lead**: [Tên người phụ trách backend]
- **UI/UX Designer**: [Tên designer]
- **Project Manager**: [Tên PM]

### Communication Channels
- **GitHub Issues**: Bug reports, feature requests
- **Team Chat**: [Link Slack/Discord/Teams]
- **Daily Standup**: [Thời gian và link meeting]
- **Code Review**: GitHub Pull Requests

### Documentation
- **Frontend README**: Tài liệu này
- **Backend README**: `../backend/README.md`
- **API Documentation**: [Link API docs]
- **Design System**: [Link Figma/Design docs]

---

## 📋 Quick Reference

### Useful Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview build

# Debugging
npm run dev -- --debug  # Debug mode
npm run build -- --analyze  # Bundle analysis
```

### Important Files
```bash
src/
├── App.jsx                    # Main app với routing
├── main.jsx                   # Entry point
├── theme/index.js             # Material-UI theme
├── context/AuthContext.jsx    # Authentication state
├── services/authService.js    # API calls
├── utils/constants.js         # App constants
├── components/common/         # Reusable components
└── styles/fonts.css           # Font configuration
```

### Key Components
- `CourseCard`: Reusable course display component
- `Header`: App navigation với user menu
- `AuthLayout`: Layout cho authentication pages
- `MainLayout`: Layout cho main application
- `ProtectedRoute`: Route protection wrapper
- `FontAwesomeIcon`: Icon mapping component

---

*Last updated: 17/08/2025*
*Version: 2.0.0*
*Contributors: [Team members]*
