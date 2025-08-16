import { Box } from '@mui/material';
import {
  Person as PersonIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Chat as ChatIcon,
  Bookmark as BookmarkIcon,
  Description as DescriptionIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Lock as LockIcon,
  ExitToApp as ExitToAppIcon,
  Article as ArticleIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';

// Icon mapping for fallback
const iconMap = {
  'fas fa-user-circle': PersonIcon,
  'fas fa-user': PersonIcon,
  'fas fa-home': HomeIcon,
  'fas fa-graduation-cap': SchoolIcon,
  'fas fa-comments': ChatIcon,
  'fas fa-bookmark': BookmarkIcon,
  'fas fa-file-alt': DescriptionIcon,
  'fas fa-heart': FavoriteIcon,
  'fas fa-chart-line': TrendingUpIcon,
  'fab fa-google': GoogleIcon,
  'fab fa-facebook': FacebookIcon,
  'fab fa-apple': AppleIcon,
  'fas fa-user-lock': LockIcon,
  'fas fa-sign-out-alt': ExitToAppIcon,
  'fas fa-users': PeopleIcon,
  'fas fa-chart-bar': BarChartIcon
};

// Simple icon component with Font Awesome fallback to MUI
export default function SimpleIcon({
  icon,
  size = '1rem',
  color = 'inherit',
  animation = 'none',
  onClick,
  sx = {},
  ...props
}) {
  // No animations for static design
  const getAnimationStyle = () => {
    return {};
  };

  // Try Font Awesome first, fallback to MUI icon
  const MuiIcon = iconMap[icon];

  if (MuiIcon) {
    // Use MUI Icon as fallback
    return (
      <MuiIcon
        onClick={onClick}
        sx={{
          fontSize: size,
          color: color,
          cursor: onClick ? 'pointer' : 'default',
          ...sx
        }}
        {...props}
      />
    );
  }

  // Try Font Awesome
  return (
    <Box
      component="i"
      className={icon}
      onClick={onClick}
      sx={{
        fontSize: size,
        color: color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        ...sx
      }}
      {...props}
    />
  );
}
