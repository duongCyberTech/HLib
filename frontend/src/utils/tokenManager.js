// Token management utility
const TOKEN_KEY = 'token';
const UID_KEY = 'uid';

export const tokenManager = {
  // Get token from localStorage
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Set token in localStorage
  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting token:', error);
      return false;
    }
  },

  // Remove token from localStorage
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(UID_KEY);
      return true;
    } catch (error) {
      console.error('Error removing token:', error);
      return false;
    }
  },

  // Check if token exists
  hasToken: () => {
    const token = tokenManager.getToken();
    return token && token.length > 0;
  },

  // Get UID from localStorage
  getUid: () => {
    try {
      return localStorage.getItem(UID_KEY);
    } catch (error) {
      console.error('Error getting UID:', error);
      return null;
    }
  },

  // Set UID in localStorage
  setUid: (uid) => {
    try {
      if (uid) {
        localStorage.setItem(UID_KEY, uid);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting UID:', error);
      return false;
    }
  },

  // Clear all auth data
  clearAll: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(UID_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  }
};
