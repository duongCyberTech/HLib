import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { School as SchoolIcon, Add as AddIcon } from '@mui/icons-material';

export default function ProfileCourses({ courses = [], loading = false }) {
  if (loading) {
    return (
      <Card elevation={1} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Loading courses...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (courses.length === 0) {
    return (
      <Card elevation={1} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Courses Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You haven't enrolled in any courses yet. Start learning today!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Browse Courses
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} md={6} lg={4} key={course.id || index}>
          <Card 
            elevation={1} 
            sx={{ 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 2,
                borderColor: 'primary.main'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {course.title || 'Course Title'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {course.description || 'Course description'}
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Chip 
                  label={course.level || 'Beginner'} 
                  size="small" 
                  color="primary"
                  variant="outlined"
                />
                <Chip 
                  label={course.category || 'General'} 
                  size="small" 
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
