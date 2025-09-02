import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context';
import { FontAwesomeIcon, CourseCard } from '../../components/common';
import { coursesService } from '../../services/coursesService';
import { useApi } from '../../hooks/useApi';
import { normalizeCourse } from '../../utils/course';

export default function Dashboard() {
  const { user } = useAuth();
  const { loading, error, execute } = useApi();
  const [recentCourses, setRecentCourses] = useState([]);

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

  useEffect(() => {
    const fetchRecent = async () => {
      const { success, data } = await execute(() => coursesService.list({ page: 1, limit: 6, sort: '-createdAt' }));
      if (success) {
        const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        setRecentCourses(items.map(normalizeCourse));
      }
    };
    fetchRecent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {loading && (
          <Typography variant="body2" color="text.secondary">Loading...</Typography>
        )}
        {error && (
          <Typography variant="body2" color="error">{error}</Typography>
        )}
        {!loading && !error && (
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
        )}
      </Box>
    </Container>
  );
}
