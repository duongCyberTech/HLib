import { Box, Typography, Grid, Container } from '@mui/material';
import { CourseCard } from '../../components/common';

export default function CoursesDemo() {
  // Sample course data - sẽ được thay thế bằng data từ backend
  const sampleCourses = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      instructor: 'Dr. Nguyen Van A',
      category: 'Computer Science',
      date: '2024-01-15',
      likes: 45,
      description: 'Learn the fundamentals of machine learning including supervised and unsupervised learning algorithms.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: 234,
      image: null // Sẽ dùng placeholder xám
    },
    {
      id: 2,
      title: 'Advanced Mathematics Concepts',
      instructor: 'Prof. Tran Thi B',
      category: 'Mathematics',
      date: '2024-01-14',
      likes: 32,
      description: 'Deep dive into advanced mathematical concepts including calculus, linear algebra, and statistics.',
      duration: '12 weeks',
      level: 'Advanced',
      students: 156,
      image: null // Sẽ dùng placeholder xám
    },
    {
      id: 3,
      title: 'Physics Laboratory Guidelines',
      instructor: 'Dr. Le Van C',
      category: 'Physics',
      date: '2024-01-13',
      likes: 28,
      description: 'Comprehensive guide to physics laboratory experiments and safety procedures.',
      duration: '6 weeks',
      level: 'Beginner',
      students: 89,
      image: null // Sẽ dùng placeholder xám
    },
    {
      id: 4,
      title: 'Software Engineering Principles',
      instructor: 'Dr. Pham Van D',
      category: 'Computer Science',
      date: '2024-01-12',
      likes: 67,
      description: 'Learn software engineering best practices, design patterns, and project management.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 312,
      image: null // Sẽ dùng placeholder xám
    },
    {
      id: 5,
      title: 'Organic Chemistry Fundamentals',
      instructor: 'Prof. Hoang Thi E',
      category: 'Chemistry',
      date: '2024-01-11',
      likes: 19,
      description: 'Introduction to organic chemistry including molecular structures and reactions.',
      duration: '14 weeks',
      level: 'Beginner',
      students: 145,
      image: null // Sẽ dùng placeholder xám
    },
    {
      id: 6,
      title: 'Business Analytics',
      instructor: 'Dr. Vo Van F',
      category: 'Business',
      date: '2024-01-10',
      likes: 41,
      description: 'Learn how to analyze business data and make data-driven decisions.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: 198,
      image: null // Sẽ dùng placeholder xám
    }
  ];

  const handleCourseClick = (course) => {
    console.log('Course clicked:', course);
    // Sẽ navigate đến course detail page
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Course Cards Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reusable CourseCard component với các variant khác nhau
        </Typography>
      </Box>

      {/* Default Variant */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Default Variant
        </Typography>
        <Grid container spacing={3}>
          {sampleCourses.slice(0, 3).map((course) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
              <CourseCard 
                course={course}
                onClick={handleCourseClick}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Detailed Variant */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Detailed Variant
        </Typography>
        <Grid container spacing={3}>
          {sampleCourses.slice(3, 5).map((course) => (
            <Grid size={{ xs: 12, md: 6 }} key={course.id}>
              <CourseCard 
                course={course}
                onClick={handleCourseClick}
                variant="detailed"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Compact Variant */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Compact Variant
        </Typography>
        <Grid container spacing={2}>
          {sampleCourses.map((course) => (
            <Grid size={{ xs: 12, md: 6 }} key={course.id}>
              <CourseCard 
                course={course}
                onClick={handleCourseClick}
                variant="compact"
                showReadMore={false}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Usage Instructions */}
      <Box sx={{ 
        mt: 6, 
        p: 3, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Cách sử dụng CourseCard Component
        </Typography>
        <Typography variant="body2" component="pre" sx={{ 
          fontFamily: 'monospace',
          backgroundColor: 'white',
          p: 2,
          borderRadius: 1,
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`import { CourseCard } from '../../components/common';

// Basic usage
<CourseCard 
  course={courseData}
  onClick={handleCourseClick}
/>

// With variants
<CourseCard 
  course={courseData}
  variant="detailed"    // 'default', 'compact', 'detailed'
  showReadMore={true}
  onClick={handleCourseClick}
/>

// Course data structure
const courseData = {
  id: 1,
  title: 'Course Title',
  instructor: 'Instructor Name',
  category: 'Computer Science',
  date: '2024-01-15',
  likes: 45,
  description: 'Course description...',
  duration: '8 weeks',
  level: 'Intermediate',
  students: 234,
  image: 'https://example.com/image.jpg'
};`}
        </Typography>
      </Box>
    </Container>
  );
}
