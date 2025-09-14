const API_BASE_URL = '/api/course';

const getToken = () => {
  return localStorage.getItem('userToken');
};

export const courseService = {
  getAllCourses: async (filter = '', offset = 0, limit = 10) => {
    const params = new URLSearchParams();
    if (filter) params.append('filter', filter);
    if (offset) params.append('offset', offset);
    if (limit) params.append('limit', limit);
 
    const token = getToken();

    try {
      const response = await fetch(`${API_BASE_URL}/get-all-course?${params}`,
        { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({ message: 'Failed to get error details' }));
        return { error: true, ...errorData };
      }

      return response.json();

    } catch (error) {
      console.error('Network or other error:', error);
      return { error: true, message: 'Network error, please check your connection.' };
    }
  }
};

