import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { 
  CourseFilters, 
  CourseGrid, 
  CourseHeader, 
  CourseStats 
} from './components';
import { courseService } from '../../services/courseService';
import { viewModes, courseTabs } from './constants/courseConstants';
import { getFilteredAndSortedCourses } from './utils/courseUtils';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState(viewModes.GRID);
  const [activeTab, setActiveTab] = useState(courseTabs.ALL);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const result = await courseService.getAllCourses();

        if (result.error) {
          // Xử lý lỗi từ API (vd: token sai, không có quyền)
          console.error('API Error:', result.message);
          setCourses([]); // Xóa danh sách khóa học cũ nếu có lỗi
        } else if (result.data) {
          setCourses(result.data);
        }

      } catch (error){
        // Xử lý lỗi mạng hoặc lỗi javascript
        console.error('Error fetching courses: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  useEffect(() => {
    const filters = {
      searchTerm,
      selectedCategory,
      selectedLevel,
      activeTab
    };
    
    const result = getFilteredAndSortedCourses(courses, filters, sortBy);
    setFilteredCourses(result);
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy, activeTab]);

  const handleCourseClick = (course) => {
    console.log('Course clicked:', course);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedLevel('Tất cả');
  };

  const handleShowAll = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedLevel('Tất cả');
    setActiveTab(courseTabs.ALL);
  };

  const featuredCount = courses.filter(c => c.featured).length;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <CourseHeader />

      {/* Search and Filter Section */}
      <CourseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCourses={courses.length}
        featuredCount={featuredCount}
      />

      {/* Results Info */}
      <CourseStats
        filteredCount={filteredCourses.length}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        onClearFilters={handleClearFilters}
      />

      {/* Courses Grid/List */}
      <CourseGrid
        courses={filteredCourses}
        loading={loading}
        viewMode={viewMode}
        onCourseClick={handleCourseClick}
        onShowAll={handleShowAll}
      />
    </Container>
  );
}
