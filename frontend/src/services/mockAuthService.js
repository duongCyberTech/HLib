// Mock authentication service for testing without backend
const mockUsers = [
  {
    id: '1',
    email: 'admin@hcmut.edu.vn',
    password: 'admin123',
    fname: 'Admin',
    lname: 'User',
    mname: 'Test',
    username: 'admin',
    avata: null,
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@hcmut.edu.vn',
    password: 'user123',
    fname: 'Student',
    lname: 'User',
    mname: 'Test',
    username: 'student',
    avata: null,
    role: 'user'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  // Login user
  login: async (email, password) => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    return { token };
  },

  // Register user (mock)
  register: async (userData) => {
    await delay(1000);
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      uid: `mock-uid-${Date.now()}`
    };
    mockUsers.push(newUser);
    return { data: { uid: newUser.uid } };
  },

  // Verify token
  verifyToken: async (token) => {
    await delay(500);
    
    if (!token || !token.startsWith('mock-token-')) {
      throw new Error('Invalid token');
    }
    
    const userId = token.split('-')[2];
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return { user };
  },

  // Get user profile
  getProfile: async () => {
    await delay(500);
    
    const token = localStorage.getItem('token');
    if (!token || !token.startsWith('mock-token-')) {
      throw new Error('No valid token');
    }
    
    const userId = token.split('-')[2];
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return { user };
  },

  // Verify OTP (mock)
  verifyOTP: async (uid, otp) => {
    await delay(1000);
    if (otp === '123456') {
      return { message: 'OTP verified successfully' };
    }
    throw new Error('Invalid OTP');
  },

  // Request OTP (mock)
  requestOTP: async (uid) => {
    await delay(1000);
    return { message: 'OTP sent successfully' };
  },

  // Forgot password (mock)
  forgotPassword: async (email) => {
    await delay(1000);
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }
    return { message: 'Password reset email sent' };
  },

  // Reset password (mock)
  resetPassword: async (email, otp, newPassword) => {
    await delay(1000);
    return { message: 'Password reset successfully' };
  },

  // Update profile (mock)
  updateProfile: async (userData) => {
    await delay(1000);
    return { message: 'Profile updated successfully', user: userData };
  }
};
