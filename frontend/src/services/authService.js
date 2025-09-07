import api from './api';
import { mockAuthService } from './mockAuthService';

// Set to true to use mock service for testing without backend
const USE_MOCK = false;

export const authService = USE_MOCK ? mockAuthService : {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // Verify OTP
  verifyOTP: async (uid, otp) => {
    const response = await api.post('/auth/otp/verify', {
      uid,
      otp
    });
    return response;
  },

  // Request OTP
  requestOTP: async (uid) => {
    const response = await api.post('/auth/otp/request', {
      uid
    });
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', {
      email
    });
    return response;
  },

  // Reset password
  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      email,
      otp,
      newPassword
    });
    return response;
  },

  // Verify token
  verifyToken: async (token) => {
    const response = await api.get('/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response;
  }
};
