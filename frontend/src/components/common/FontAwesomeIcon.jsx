import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
      <i className={`${icon} ${className}`} />
    </AnimatedIcon>
  );
}
