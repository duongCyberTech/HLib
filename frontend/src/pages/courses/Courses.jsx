import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { 
  CourseFilters, 
  CourseGrid, 
  CourseHeader, 
  CourseStats 
} from './components';
import { mockCourses } from './data/mockCourses';
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
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
