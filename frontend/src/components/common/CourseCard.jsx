import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  Rating,
  Avatar,
  Badge,
  Stack,
  Divider
} from '@mui/material';
import { SimpleIcon } from './';
import { formatCurrency } from '../../utils/helpers';

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
  // Enhanced course data structure
  const {
    title = '',
    instructor = '',
    instructorAvatar = '',
    category = '',
    date = '',
    likes = 0,
    image = null,
    description = '',
    duration = '',
    level = '',
    students = 0,
    rating = 0,
    reviewCount = 0,
    price = 0,
    originalPrice = 0,
    discount = 0,
    tags = [],
    featured = false,
    bestseller = false,
    new: isNew = false,
    certificateProvided = false,
    language = '',
    completionRate = 0
  } = course;

  // Category colors mapping
  const getCategoryColor = (category) => {
    const colors = {
      'Computer Science': '#40C4FF',
      'Khoa học máy tính': '#40C4FF',
      'Mathematics': '#FF6B6B',
      'Toán học': '#FF6B6B',
      'Physics': '#4ECDC4',
      'Vật lý': '#4ECDC4',
      'Chemistry': '#45B7D1',
      'Hóa học': '#45B7D1',
      'Biology': '#96CEB4',
      'Sinh học': '#96CEB4',
      'Engineering': '#FECA57',
      'Kỹ thuật': '#FECA57',
      'Business': '#FF9FF3',
      'Kinh doanh': '#FF9FF3',
      'Design': '#9C27B0',
      'Thiết kế': '#9C27B0',
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
            boxShadow: 3,
            transform: 'translateY(-2px)'
          } : {},
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ display: 'flex', height: 140, position: 'relative' }}>
          {/* Status Badges */}
          {(isNew || bestseller || featured) && (
            <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
              <Stack direction="row" spacing={0.5}>
                {isNew && (
                  <Chip
                    label="MỚI"
                    size="small"
                    sx={{
                      bgcolor: '#4CAF50',
                      color: 'white',
                      fontSize: '0.6875rem',
                      height: 20
                    }}
                  />
                )}
                {bestseller && (
                  <Chip
                    label="BÁN CHẠY"
                    size="small"
                    sx={{
                      bgcolor: '#FF9800',
                      color: 'white',
                      fontSize: '0.6875rem',
                      height: 20
                    }}
                  />
                )}
                {featured && (
                  <Chip
                    label="NỔI BẬT"
                    size="small"
                    sx={{
                      bgcolor: '#E91E63',
                      color: 'white',
                      fontSize: '0.6875rem',
                      height: 20
                    }}
                  />
                )}
              </Stack>
            </Box>
          )}

          {!image ? (
            <Box sx={{ width: 140, flexShrink: 0 }}>
              <ImagePlaceholder height={140} title="Course" />
            </Box>
          ) : (
            <CardMedia
              component="img"
              sx={{ width: 140, flexShrink: 0, objectFit: 'cover' }}
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
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3
              }}>
                {title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                {instructorAvatar && (
                  <Avatar
                    src={instructorAvatar}
                    sx={{ width: 20, height: 20 }}
                  />
                )}
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {instructor}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, minHeight: '20px' }}>
                {rating > 0 && (
                  <>
                    <Rating value={rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      ({reviewCount})
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={category}
                size="small"
                sx={{
                  backgroundColor: getCategoryColor(category),
                  color: 'white',
                  fontSize: '0.75rem'
                }}
              />

              {price > 0 && (
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {formatCurrency ? formatCurrency(price) : `${price.toLocaleString()}đ`}
                  </Typography>
                  {originalPrice > price && (
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        fontSize: '0.6875rem'
                      }}
                    >
                      {formatCurrency ? formatCurrency(originalPrice) : `${originalPrice.toLocaleString()}đ`}
                    </Typography>
                  )}
                </Box>
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
      {/* Status Badges */}
      {(isNew || bestseller || featured) && (
        <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <Stack direction="column" spacing={0.5}>
            {isNew && (
              <Chip
                label="MỚI"
                size="small"
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              />
            )}
            {bestseller && (
              <Chip
                label="BÁN CHẠY"
                size="small"
                sx={{
                  bgcolor: '#FF9800',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              />
            )}
            {featured && (
              <Chip
                label="NỔI BẬT"
                size="small"
                sx={{
                  bgcolor: '#E91E63',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              />
            )}
          </Stack>
        </Box>
      )}

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
          mb: 1,
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

        {/* Instructor with Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {instructorAvatar && (
            <Avatar
              src={instructorAvatar}
              sx={{ width: 24, height: 24 }}
            />
          )}
          <Typography variant="body2" color="text.secondary">
            {instructor}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, minHeight: '24px' }}>
          {rating > 0 && (
            <>
              <Rating value={rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                {rating.toFixed(1)} ({reviewCount} đánh giá)
              </Typography>
            </>
          )}
        </Box>

        {/* Category and Course Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
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
            {level}
          </Typography>
          {students > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SimpleIcon icon="fas fa-users" size="0.75rem" color="#666" />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {students.toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Course Stats */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap', minHeight: '20px' }}>
          {duration && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SimpleIcon icon="fas fa-clock" size="0.75rem" color="#666" />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {duration}
              </Typography>
            </Box>
          )}
          {certificateProvided && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SimpleIcon icon="fas fa-certificate" size="0.75rem" color="#4CAF50" />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Chứng chỉ
              </Typography>
            </Box>
          )}
          {language && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {language}
            </Typography>
          )}
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5, minHeight: '32px' }}>
          {tags.length > 0 && (
            <>
              {tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.6875rem',
                    height: 24,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              ))}
              {tags.length > 3 && (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', alignSelf: 'center' }}>
                  +{tags.length - 3} thêm
                </Typography>
              )}
            </>
          )}
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.5,
          minHeight: '3rem' // Ensures consistent height for 2 lines
        }}>
          {description || ''}
        </Typography>

        {/* Spacer to push price and actions to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Price Section */}
        <Box sx={{ mb: 2, minHeight: '40px' }}>
          {price > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {formatCurrency ? formatCurrency(price) : `${price.toLocaleString()}đ`}
              </Typography>
              {originalPrice > price && (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary'
                    }}
                  >
                    {formatCurrency ? formatCurrency(originalPrice) : `${originalPrice.toLocaleString()}đ`}
                  </Typography>
                  {discount > 0 && (
                    <Chip
                      label={`-${discount}%`}
                      size="small"
                      sx={{
                        bgcolor: '#FF5722',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    />
                  )}
                </>
              )}
            </Box>
          )}
        </Box>

        {/* Actions - Fixed position from bottom */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                Xem chi tiết
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {completionRate > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SimpleIcon icon="fas fa-chart-line" size="0.875rem" color="#4CAF50" />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {completionRate}%
                </Typography>
              </Box>
            )}
            {likes > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SimpleIcon icon="fas fa-heart" size="0.875rem" color="#FF6B6B" />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {likes}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
