import { VALIDATION_PATTERNS, ERROR_MESSAGES } from './constants';

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

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (password !== confirmPassword) return ERROR_MESSAGES.PASSWORD_MISMATCH;
  return null;
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

// Format helpers
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '0đ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// String helpers
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

// Storage helpers
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// URL helpers
export const buildImageUrl = (path, options = {}) => {
  if (!path) return '/assets/default-avatar.png';
  
  const { width, height, quality = 'auto' } = options;
  let url = path;
  
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width);
    if (height) params.append('h', height);
    params.append('q', quality);
    url += `?${params.toString()}`;
  }
  
  return url;
};

// Error handling helpers
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return ERROR_MESSAGES.SERVER_ERROR;
};

// Debounce helper
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
