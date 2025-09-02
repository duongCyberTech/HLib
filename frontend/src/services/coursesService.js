import apiCourse from './apiCourse';

export const coursesService = {
  // Get paginated list of courses
  list: async (params = {}) => {
    // Backend expects: filter (string), limit, offset
    const { page = 1, limit = 12, search } = params;
    const offset = (Number(page) - 1) * Number(limit);
    const query = { limit, offset };
    if (search) query.filter = search;
    return apiCourse.get('/get-all-course', { params: query });
  },

  // Get a single course by id
  getById: async (courseId) => {
    return apiCourse.get(`/get-course/${courseId}`);
  }
};


