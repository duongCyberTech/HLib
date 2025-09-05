export const filterCourses = (courses, filters) => {
  const { searchTerm, selectedCategory, selectedLevel, activeTab } = filters;
  let filtered = [...courses];

  if (activeTab === 1) {
    filtered = filtered.filter(course => course.featured);
  }

  if (searchTerm) {
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if (selectedCategory !== 'Tất cả') {
    filtered = filtered.filter(course => course.category === selectedCategory);
  }

  if (selectedLevel !== 'Tất cả') {
    filtered = filtered.filter(course => course.level === selectedLevel);
  }

  return filtered;
};

export const sortCourses = (courses, sortBy) => {
  return [...courses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default:
        return 0;
    }
  });
};

export const getFilteredAndSortedCourses = (courses, filters, sortBy) => {
  const filtered = filterCourses(courses, filters);
  return sortCourses(filtered, sortBy);
};
