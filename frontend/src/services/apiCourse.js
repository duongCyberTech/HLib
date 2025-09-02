import axios from 'axios';

// Dedicated axios instance for Course service (runs on port 3002)
const apiCourse = axios.create({
  baseURL: 'http://localhost:3002/api/course',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Return response.data directly
apiCourse.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error.message)
);

export default apiCourse;


