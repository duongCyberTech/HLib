import { Box, Typography, Button } from '@mui/material';

export default function CourseStats({
  filteredCount,
  searchTerm,
  selectedCategory,
  selectedLevel,
  onClearFilters
}) {
  const hasActiveFilters = searchTerm || selectedCategory !== 'Tất cả' || selectedLevel !== 'Tất cả';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="body1" color="text.secondary">
        Hiển thị {filteredCount} khóa học
        {searchTerm && ` cho "${searchTerm}"`}
        {selectedCategory !== 'Tất cả' && ` trong ${selectedCategory}`}
        {selectedLevel !== 'Tất cả' && ` - ${selectedLevel}`}
      </Typography>

      {hasActiveFilters && (
        <Button
          variant="outlined"
          size="small"
          onClick={onClearFilters}
          sx={{ textTransform: 'none' }}
        >
          Xóa bộ lọc
        </Button>
      )}
    </Box>
  );
}
