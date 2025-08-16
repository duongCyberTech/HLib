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

// App constants
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

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'uid',
  USER_DATA: 'userData'
};

// Form validation patterns
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
  PASSWORD_MISMATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  SERVER_ERROR: 'Something went wrong. Please try again later.'
};
