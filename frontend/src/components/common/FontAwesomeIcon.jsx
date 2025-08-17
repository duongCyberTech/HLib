import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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

// Styled component for animated Font Awesome icons
const AnimatedIcon = styled(Box)(({ theme, animation = 'hover' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  
  // Base animations
  ...(animation === 'hover' && {
    '&:hover': {
      transform: 'scale(1.1)',
      color: theme.palette.primary.main,
    }
  }),
  
  ...(animation === 'bounce' && {
    '&:hover': {
      animation: 'bounce 0.6s ease-in-out',
    }
  }),
  
  ...(animation === 'pulse' && {
    '&:hover': {
      animation: 'pulse 1s infinite',
    }
  }),
  
  ...(animation === 'rotate' && {
    '&:hover': {
      transform: 'rotate(360deg)',
    }
  }),
  
  ...(animation === 'shake' && {
    '&:hover': {
      animation: 'shake 0.5s ease-in-out',
    }
  }),
  
  // Keyframe animations
  '@keyframes bounce': {
    '0%, 20%, 60%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-10px)',
    },
    '80%': {
      transform: 'translateY(-5px)',
    },
  },
  
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  
  '@keyframes shake': {
    '0%, 100%': {
      transform: 'translateX(0)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translateX(-5px)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translateX(5px)',
    },
  },
}));

export default function FontAwesomeIcon({
  icon,
  size = '1rem',
  color,
  animation = 'hover',
  className = '',
  onClick,
  ...props
}) {
  // Convert FontAwesome class to Material-UI icon name
  const iconName = fontAwesomeToMuiMap[icon] || icon;

  // Get the Material-UI icon component
  const MuiIcon = getIconByName(iconName);

  if (MuiIcon) {
    return (
      <AnimatedIcon
        animation={animation}
        onClick={onClick}
        sx={{
          fontSize: size,
          color: color,
          ...props.sx
        }}
        {...props}
      >
        <MuiIcon />
      </AnimatedIcon>
    );
  }

  // Fallback: return a placeholder if icon not found
  console.warn(`Icon not found: ${icon} (mapped to: ${iconName})`);
  return (
    <AnimatedIcon
      animation={animation}
      onClick={onClick}
      sx={{
        fontSize: size,
        color: color,
        ...props.sx
      }}
      {...props}
    >
      ?
    </AnimatedIcon>
  );
}
