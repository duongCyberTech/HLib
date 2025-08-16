import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container
} from '@mui/material';
import { useAuth } from '../../context';
import { FontAwesomeIcon, CourseCard } from '../../components/common';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Courses',
      value: '156',
      icon: 'fas fa-graduation-cap',
      color: '#FF6B6B'
    },
    {
      label: 'Active Students',
      value: '1,234',
      icon: 'fas fa-users',
      color: '#4ECDC4'
    },
    {
      label: 'This Month',
      value: '+23%',
      icon: 'fas fa-chart-line',
      color: '#45B7D1'
    },
  ];

  // Mock recent courses data
  const recentCourses = [
    {
      id: 1,
      title: 'Advanced Data Structures',
      instructor: 'Dr. Nguyen Van Minh',
      category: 'Computer Science',
      date: '2024-01-20',
      likes: 89,
      description: 'Deep dive into advanced data structures including trees, graphs, and hash tables with practical implementations.',
      duration: '10 weeks',
      level: 'Advanced',
      students: 145,
      image: null
    },
    {
      id: 2,
      title: 'Linear Algebra Applications',
      instructor: 'Prof. Tran Thi Lan',
      category: 'Mathematics',
      date: '2024-01-18',
      likes: 67,
      description: 'Explore real-world applications of linear algebra in machine learning, computer graphics, and engineering.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: 203,
      image: null
    },
    {
      id: 3,
      title: 'Quantum Physics Fundamentals',
      instructor: 'Dr. Le Van Duc',
      category: 'Physics',
      date: '2024-01-16',
      likes: 54,
      description: 'Introduction to quantum mechanics principles and their applications in modern technology.',
      duration: '12 weeks',
      level: 'Advanced',
      students: 98,
      image: null
    },
    {
      id: 4,
      title: 'Software Engineering Practices',
      instructor: 'Dr. Pham Thi Mai',
      category: 'Computer Science',
      date: '2024-01-15',
      likes: 123,
      description: 'Learn industry best practices for software development, testing, and project management.',
      duration: '14 weeks',
      level: 'Intermediate',
      students: 267,
      image: null
    }
  ];

  const handleCourseClick = (course) => {
    console.log('Course clicked:', course);
    // Navigate to course detail page
  };



  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.fname || user?.email?.split('@')[0] || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your academic community today.
        </Typography>
        {user && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Logged in as: {user.email} ({user.role || 'user'})
          </Typography>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
              color: 'white',
              height: '100%'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    width: 56,
                    height: 56
                  }}>
                    <FontAwesomeIcon
                      icon={stat.icon}
                      size="1.5rem"
                      color="white"
                    />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Courses */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Recent Courses
        </Typography>
        <Grid container spacing={3}>
          {recentCourses.map((course) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
              <CourseCard
                course={course}
                onClick={handleCourseClick}
                variant="default"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
