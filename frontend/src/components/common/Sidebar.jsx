import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { SimpleIcon } from './';

const menuItems = [
  {
    text: 'My account',
    icon: 'fas fa-user-circle',
    path: '/profile'
  },
  {
    text: 'Courses',
    icon: 'fas fa-graduation-cap',
    path: '/courses'
  },
  {
    text: 'Threads',
    icon: 'fas fa-comments',
    path: '/threads'
  },
  {
    text: 'My Collections',
    icon: 'fas fa-bookmark',
    path: '/collections'
  },
  {
    text: 'My Documents',
    icon: 'fas fa-file-alt',
    path: '/documents'
  },
  {
    text: 'Favorite Documents',
    icon: 'fas fa-heart',
    path: '/favorites'
  },
  {
    text: 'Revenue Report',
    icon: 'fas fa-chart-line',
    path: '/revenue'
  }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        height: 'calc(100vh - 64px)', // Subtract header height
        backgroundColor: '#ffffffff',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0, // Prevent shrinking
        overflow: 'hidden'
      }}
    >
      {/* User Profile Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Avatar 
          src={user?.avata || user?.avatar} 
          alt={user?.fname}
          sx={{ width: 40, height: 40 }}
        >
          {user?.fname?.charAt(0) || 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.fname ? `${user.fname} ${user.lname}` : 'User'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email || 'user@example.com'}
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  transform: 'translateX(5px)',
                  boxShadow: '0 2px 8px rgba(64, 196, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateX(3px)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SimpleIcon
                  icon={item.icon}
                  size="1.2rem"
                  color={location.pathname === item.path ? '#09034dff' : '#09034dff'}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: {
                    style: {
                      fontSize: '0.9rem',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
                      color: '#040035ff'
                    }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
