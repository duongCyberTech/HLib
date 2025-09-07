import {
  Grid,
  Fade,
  Paper,
  Typography,
  Button,
  Box,
  Skeleton,
  Card,
  CardContent
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { CourseCard } from '../../../components/common';
import { viewModes } from '../constants/courseConstants';

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {[...Array(8)].map((_, index) => (
      <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
        <Card sx={{ height: 400 }}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="rectangular" width={100} height={32} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const EmptyState = ({ onShowAll }) => (
  <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
    <SchoolIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom>
      Không tìm thấy khóa học nào
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
    </Typography>
    <Button
      variant="contained"
      onClick={onShowAll}
      sx={{ textTransform: 'none' }}
    >
      Xem tất cả khóa học
    </Button>
  </Paper>
);

const LoadMoreButton = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
    <Button
      variant="outlined"
      size="large"
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        px: 4,
        py: 1.5
      }}
    >
      Xem thêm khóa học
    </Button>
  </Box>
);

export default function CourseGrid({
  courses,
  loading,
  viewMode,
  onCourseClick,
  onShowAll
}) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (courses.length === 0) {
    return <EmptyState onShowAll={onShowAll} />;
  }

  return (
    <>
      <Fade in={!loading}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid
              size={{
                xs: 12,
                md: viewMode === viewModes.LIST ? 12 : 6,
                lg: viewMode === viewModes.LIST ? 12 : 4
              }}
              key={course.id}
            >
              <CourseCard
                course={course}
                onClick={onCourseClick}
                variant={viewMode === viewModes.LIST ? 'compact' : 'default'}
              />
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* Load More Button (for future pagination) */}
      {courses.length > 0 && <LoadMoreButton />}
    </>
  );
}
