import { Box, Typography } from '@mui/material';

export default function CourseHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" sx={{
        fontWeight: 700,
        mb: 1,
        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Khóa học trực tuyến
      </Typography>
    </Box>
  );
}
