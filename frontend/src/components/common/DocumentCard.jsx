import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
} from '@mui/material';
import { SimpleIcon } from './';

// Placeholder image cho document
const ImagePlaceholder = ({ height = 180, title = 'Document' }) => (
  <Box
    sx={{
      height,
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <SimpleIcon
        icon="fas fa-file"
        size="2.5rem"
        color="#bbb"
        sx={{ mb: 1 }}
      />
      <Typography variant="body2" color="#bbb">
        {title}
      </Typography>
    </Box>
  </Box>
);

export default function DocumentCard({
  document = {},
  onClick,
  showReadMore = true,
  variant = 'default',
}) {
  const {
    title = 'Document Title',
    author = 'Author Name',
    category = 'General',
    uploadedAt = '2024-01-15',
    likes = 0,
    thumbnail = null,
    description = '',
    tags = [],
    fileUrl = null,
  } = document;

  const getCategoryColor = (category) => {
    const colors = {
      'Computer Science': '#40C4FF',
      Mathematics: '#FF6B6B',
      Physics: '#4ECDC4',
      Chemistry: '#45B7D1',
      Biology: '#96CEB4',
      Engineering: '#FECA57',
      Business: '#FF9FF3',
      General: '#95A5A6',
    };
    return colors[category] || colors['General'];
  };

  const handleCardClick = () => {
    if (onClick) onClick(document);
  };
  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(document);
  };
  const handleDownloadClick = (e) => {
    e.stopPropagation();
    if (fileUrl) window.open(fileUrl, '_blank');
  };

  // ----- Variant Compact -----
  if (variant === 'compact') {
    return (
      <Card
        sx={{
          display: 'flex',
          height: 120,
          width: '100%', // cho responsive theo Grid item
          cursor: onClick ? 'pointer' : 'default',
          '&:hover': { boxShadow: 3 },
        }}
        onClick={handleCardClick}
      >
        {/* Thumbnail */}
        {!thumbnail ? (
          <Box sx={{ width: 120, flexShrink: 0 }}>
            <ImagePlaceholder height={120} title="Document" />
          </Box>
        ) : (
          <CardMedia
            component="img"
            sx={{ width: 120, flexShrink: 0 }}
            image={thumbnail}
            alt={title}
          />
        )}

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 0.25,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.25 }}
            >
              by {author}
            </Typography>
          </Box>

          <Chip
            label={category}
            size="small"
            sx={{
              backgroundColor: getCategoryColor(category),
              color: 'white',
              fontSize: '0.75rem',
              alignSelf: 'flex-start',
            }}
          />
        </CardContent>
      </Card>
    );
  }
  // ----- Variant Detailed -----
  if (variant === 'detailed') {
    return (
      <Card
        sx={{
          height: '100%',
          width: '100%', // cho responsive theo Grid item
          cursor: 'pointer',
          '&:hover': { boxShadow: 3 },
        }}
        onClick={handleCardClick}
      >
        {!thumbnail ? (
          <ImagePlaceholder height={200} title="Document Preview" />
        ) : (
          <CardMedia
            component="img"
            height="200"
            image={thumbnail}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        )}

        <CardContent
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          {/* Title, Author */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            by {author}
          </Typography>

          {/* Category & Uploaded */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip
              label={category}
              size="small"
              sx={{
                backgroundColor: getCategoryColor(category),
                color: 'white',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {uploadedAt}
            </Typography>
          </Box>

          {/* Description */}
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          )}

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {tags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          {/* Additional detailed info */}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1 }}
          >
            {document.fileUrl && (
              <Typography variant="body2" color="text.secondary">
                File: PDF/Doc available
              </Typography>
            )}
            {document.downloads && (
              <Typography variant="body2" color="text.secondary">
                Downloads: {document.downloads}
              </Typography>
            )}
            {document.size && (
              <Typography variant="body2" color="text.secondary">
                Size: {document.size}
              </Typography>
            )}
            {document.views && (
              <Typography variant="body2" color="text.secondary">
                Views: {document.views}
              </Typography>
            )}
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            {showReadMore && (
              <Button size="small" variant="text" onClick={handleReadMoreClick}>
                Read More
              </Button>
            )}
            {fileUrl && (
              <Button size="small" variant="text" onClick={handleDownloadClick}>
                Download
              </Button>
            )}
            {likes > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SimpleIcon icon="fas fa-heart" size="1rem" color="#FF6B6B" />
                <Typography variant="body2">{likes}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }

  // ----- Variant Default (full) -----
  return (
    <Card
      sx={{
        height: '100%',
        width: '100%', // cho responsive theo Grid item
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
      }}
      onClick={handleCardClick}
    >
      {!thumbnail ? (
        <ImagePlaceholder height={180} title="Document Preview" />
      ) : (
        <CardMedia
          component="img"
          height="180"
          image={thumbnail}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          by {author}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip
            label={category}
            size="small"
            sx={{ backgroundColor: getCategoryColor(category), color: 'white' }}
          />
          <Typography variant="body2" color="text.secondary">
            {uploadedAt}
          </Typography>
        </Box>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            {showReadMore && (
              <Button
                variant="text"
                size="small"
                sx={{ p: 0, textTransform: 'none' }}
                onClick={handleReadMoreClick}
              >
                Read More
              </Button>
            )}
            {fileUrl && (
              <Button
                variant="text"
                size="small"
                sx={{ p: 0, textTransform: 'none' }}
                onClick={handleDownloadClick}
              >
                Download
              </Button>
            )}
          </Box>
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
