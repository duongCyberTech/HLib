import { Box } from '@mui/material';
import { getIconByName } from './Icons';

// FontAwesome to Material-UI icon mapping
const fontAwesomeToMuiMap = {
  'fas fa-user-circle': 'person',
  'fas fa-user': 'person',
  'fas fa-home': 'home',
  'fas fa-graduation-cap': 'school',
  'fas fa-comments': 'chat',
  'fas fa-bookmark': 'bookmark',
  'fas fa-file-alt': 'document',
  'fas fa-heart': 'favorite',
  'fas fa-chart-line': 'trending-up',
  'fab fa-google': 'google',
  'fab fa-facebook': 'facebook',
  'fab fa-apple': 'apple',
  'fas fa-user-lock': 'lock',
  'fas fa-sign-out-alt': 'logout',
  'fas fa-users': 'people',
  'fas fa-chart-bar': 'bar-chart',
  'fas fa-star': 'favorite',
  'fas fa-cog': 'settings',
  'fas fa-search': 'search',
  'fas fa-plus': 'add',
  'fas fa-edit': 'edit',
  'fas fa-trash': 'delete',
  'fas fa-download': 'download',
  'fas fa-upload': 'upload',
  'fas fa-share': 'share',
  'fas fa-bell': 'notifications',
  'fas fa-envelope': 'email',
  'fas fa-phone': 'phone',
  'fas fa-image': 'image',
  'fas fa-video': 'video',
  'fas fa-file': 'file',
  'fas fa-folder': 'folder',
  'fas fa-check': 'check',
  'fas fa-times': 'close',
  'fas fa-arrow-left': 'arrow-back',
  'fas fa-arrow-right': 'arrow-forward',
  'fas fa-info': 'info',
  'fas fa-warning': 'warning',
  'fas fa-error': 'error',
  'fas fa-help': 'help'
};

// Simple icon component using Material-UI icons
export default function SimpleIcon({
  icon,
  size = '1rem',
  color = 'inherit',
  animation = 'none',
  onClick,
  sx = {},
  ...props
}) {
  // Convert FontAwesome class to Material-UI icon name
  const iconName = fontAwesomeToMuiMap[icon] || icon;

  // Get the Material-UI icon component
  const MuiIcon = getIconByName(iconName);

  if (MuiIcon) {
    // Use Material-UI Icon
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

  // Fallback: return a placeholder or null if icon not found
  console.warn(`Icon not found: ${icon} (mapped to: ${iconName})`);
  return (
    <Box
      onClick={onClick}
      sx={{
        fontSize: size,
        color: color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        width: size,
        height: size,
        ...sx
      }}
      {...props}
    >
      ?
    </Box>
  );
}
