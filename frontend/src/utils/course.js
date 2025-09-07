// Map API course shape to CourseCard props shape
export const normalizeCourse = (apiCourse = {}) => {
  const {
    id,
    title,
    instructor,
    teacher,
    category,
    createdAt,
    likes,
    description,
    duration,
    level,
    studentsCount,
    imageUrl,
    thumbnail,
  } = apiCourse;

  const instructorName = instructor?.name || teacher?.name || instructor || teacher || '';

  return {
    id: id ?? apiCourse._id,
    title: title || '',
    instructor: instructorName,
    category: category || 'General',
    date: createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '',
    likes: likes || 0,
    image: imageUrl || thumbnail || null,
    description: description || '',
    duration: duration || '',
    level: level || '',
    students: studentsCount || 0,
  };
};


