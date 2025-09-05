import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  Avatar
} from '@mui/material';
import { SimpleIcon } from './';

// Placeholder component for course images
const ImagePlaceholder = ({ height = 200, title = 'Course Image' }) => (
  <Box
    sx={{
      height: height,
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e0e0e0',
      borderRadius: height === 120 ? '4px 0 0 4px' : '4px 4px 0 0'
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <SimpleIcon
        icon="fas fa-image"
        size={height === 120 ? "1.5rem" : "2.5rem"}
        color="#bbb"
        sx={{ mb: 1 }}
      />
      <Typography
        variant="body2"
        color="#bbb"
        sx={{
          fontSize: height === 120 ? '0.75rem' : '0.875rem',
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

export default function CourseCard({ 
  course = {},
  onClick,
  showReadMore = true,
  variant = 'default' // 'default', 'compact', 'detailed'
}) {
  // Default course data structure
  const {
    title = 'Course Title',
    instructor = 'Instructor Name',
    category = 'General',
    date = '2024-01-15',
    likes = 0,
    image = null,
    description = '',
    duration = '',
    level = 'Beginner',
    students = 0
  } = course;

  // Category colors mapping
  const getCategoryColor = (category) => {
    const colors = {
      'Computer Science': '#40C4FF',
      'Mathematics': '#FF6B6B', 
      'Physics': '#4ECDC4',
      'Chemistry': '#45B7D1',
      'Biology': '#96CEB4',
      'Engineering': '#FECA57',
      'Business': '#FF9FF3',
      'General': '#95A5A6'
    };
    return colors[category] || colors['General'];
  };



  const handleCardClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(course);
    }
  };

  if (variant === 'compact') {
    return (
      <Card 
        sx={{ 
          height: '100%',
          cursor: onClick ? 'pointer' : 'default',
          '&:hover': onClick ? {
            boxShadow: 3
          } : {}
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ display: 'flex', height: 120 }}>
          {!image ? (
            <Box sx={{ width: 120, flexShrink: 0 }}>
              <ImagePlaceholder height={120} title="Course" />
            </Box>
          ) : (
            <CardMedia
              component="img"
              sx={{ width: 120, flexShrink: 0 }}
              image={image}
              alt={title}
            />
          )}
          <CardContent sx={{
            flex: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Box>
              <Typography variant="h6" component="h3" sx={{
                fontSize: '1rem',
                fontWeight: 600,
                mb: 0.25,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3
              }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                by {instructor}
              </Typography>
            </Box>
            <Chip
              label={category}
              size="small"
              sx={{
                backgroundColor: getCategoryColor(category),
                color: 'white',
                fontSize: '0.75rem',
                alignSelf: 'flex-start'
              }}
            />
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          boxShadow: 3
        } : {}
      }}
      onClick={handleCardClick}
    >
      {/* Course Image */}
      {!image ? (
        <ImagePlaceholder height={200} title="Course Image" />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover'
          }}
        />
      )}
      
      {/* Course Content */}
      <CardContent sx={{
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Course Title */}
        <Typography variant="h6" component="h3" sx={{
          fontWeight: 600,
          mb: 0.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          minHeight: '3rem',
          lineHeight: 1.4
        }}>
          {title}
        </Typography>

        {/* Instructor */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          by {instructor}
        </Typography>

        {/* Category and Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Chip
            label={category}
            size="small"
            sx={{
              backgroundColor: getCategoryColor(category),
              color: 'white',
              fontWeight: 500
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>

        {/* Additional Info for detailed variant */}
        {variant === 'detailed' && (
          <Box sx={{ mb: 1.5 }}>
            {duration && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <SimpleIcon icon="fas fa-clock" size="0.875rem" color="#666" />
                <Typography variant="body2" color="text.secondary">
                  {duration}
                </Typography>
              </Box>
            )}
            {level && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <SimpleIcon icon="fas fa-signal" size="0.875rem" color="#666" />
                <Typography variant="body2" color="text.secondary">
                  {level}
                </Typography>
              </Box>
            )}
            {students > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SimpleIcon icon="fas fa-users" size="0.875rem" color="#666" />
                <Typography variant="body2" color="text.secondary">
                  {students} students
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Description */}
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{
            mb: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5
          }}>
            {description}
          </Typography>
        )}

        {/* Spacer to push actions to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Actions - Fixed position from bottom */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1.5
        }}>
          {showReadMore && (
            <Button
              variant="text"
              size="small"
              onClick={handleReadMoreClick}
              sx={{
                color: getCategoryColor(category),
                fontWeight: 500,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto'
              }}
            >
              Read More
            </Button>
          )}

          {likes > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SimpleIcon icon="fas fa-heart" size="1rem" color="#FF6B6B" />
              <Typography variant="body2" color="text.secondary">
                {likes}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}