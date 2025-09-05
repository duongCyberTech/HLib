import {
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { categories, levels, sortOptions, viewModes, courseTabs } from '../constants/courseConstants';

export default function CourseFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  totalCourses,
  featuredCount
}) {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
        />
      </Box>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }
          }}
        >
          <Tab label={`Tất cả khóa học (${totalCourses})`} />
          <Tab label={`Khóa học nổi bật (${featuredCount})`} />
        </Tabs>
      </Box>

      {/* Filters Row */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flex: 1 }}>
          {/* Category Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={selectedCategory}
              label="Danh mục"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Level Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Cấp độ</InputLabel>
            <Select
              value={selectedLevel}
              label="Cấp độ"
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              value={sortBy}
              label="Sắp xếp"
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* View Mode Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Hiển thị:
          </Typography>
          <IconButton
            size="small"
            onClick={() => setViewMode(viewModes.GRID)}
            sx={{
              bgcolor: viewMode === viewModes.GRID ? 'primary.main' : 'transparent',
              color: viewMode === viewModes.GRID ? 'white' : 'text.secondary',
              '&:hover': {
                bgcolor: viewMode === viewModes.GRID ? 'primary.dark' : 'action.hover'
              }
            }}
          >
            <ViewModuleIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setViewMode(viewModes.LIST)}
            sx={{
              bgcolor: viewMode === viewModes.LIST ? 'primary.main' : 'transparent',
              color: viewMode === viewModes.LIST ? 'white' : 'text.secondary',
              '&:hover': {
                bgcolor: viewMode === viewModes.LIST ? 'primary.dark' : 'action.hover'
              }
            }}
          >
            <ViewListIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
