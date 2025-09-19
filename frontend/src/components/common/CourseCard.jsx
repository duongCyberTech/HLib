import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom'
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
  variant = 'default'
}) {
  // Backend API data structure - chỉ sử dụng các field có sẵn
  const {
    course_id = '',
    title = '',
    description = '',
    price = '',
    is_active = true
  } = course;

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
            boxShadow: 3,
            transform: 'translateY(-2px)'
          } : {},
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={handleCardClick}
      >
      <Box sx={{ display: 'flex', height: 140, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
            <Chip
              label= {is_active ? "HOẠT ĐỘNG" : "KHÔNG HOẠT ĐỘNG"}
              size="small"
              sx={{
                bgcolor: is_active ? '#4CAF50' : '#ff0000ff',
                color: 'white',
                fontSize: '0.6875rem',
                height: 20
              }}
            />
          </Box>

          {/* Course Image Placeholder */}
          <Box sx={{ width: 140, flexShrink: 0 }}>
            <ImagePlaceholder height={140} title="Course" />
          </Box>

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
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3
              }}>
                {title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: '0.875rem'
              }}>
                {description}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                ID: {course_id.slice(0, 8)}...
              </Typography>

              {parseFloat(price) > 0 && (
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  {`${price}đ`}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          boxShadow: 4,
          transform: 'translateY(-4px)'
        } : {},
        transition: 'all 0.3s ease-in-out',
        position: 'relative'
      }}
      onClick={handleCardClick}
    >
      {/* Status Badge - chỉ hiển thị trạng thái active */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
        <Chip
          label={is_active ? "HOẠT ĐỘNG" : "KHÔNG HOẠT ĐỘNG"}
          size="small"
          sx={{
            bgcolor: is_active ? '#4CAF50' : '#ff0000ff',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        />
      </Box>

      {/* Course Image Placeholder */}
      <ImagePlaceholder height={200} title="Course Image" />

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
          mb: 2,
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

        {/* Course ID */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            ID: {course_id}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.5,
          minHeight: '4.5rem' // Ensures consistent height for 3 lines
        }}>
          {description || 'Không có mô tả'}
        </Typography>

        {/* Spacer to push price and actions to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Price Section */}
        <Box sx={{ mb: 2, minHeight: '40px' }}>
          {parseFloat(price) > 0 ? (
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
              {`${price}đ`}
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4CAF50' }}>
              Miễn phí
            </Typography>
          )}
        </Box>

        {/* Actions - Fixed position from bottom */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1
        }}>
          {showReadMore && (
            <Button
              variant="text"
              size="small"
              onClick={handleReadMoreClick}
              sx={{
                color: '#1976d2',
                fontWeight: 500,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto'
              }}
            >
              <Link to={`/course/${course_id}`}>
                Xem chi tiết
              </Link>
            </Button>   
          )}

          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {is_active ? 'Đang hoạt động' : 'Không hoạt động'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}