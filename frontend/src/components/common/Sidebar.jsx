import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Typography, 
  Divider 
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  School as CoursesIcon,
  Forum as ThreadsIcon,
  Collections as CollectionsIcon,
  Description as DocumentsIcon,
  Favorite as FavoriteIcon,
  Assessment as RevenueIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';

const menuItems = [
  { 
    text: 'My account', 
    icon: <AccountIcon />, 
    path: '/profile' 
  },
  { 
    text: 'Courses', 
    icon: <CoursesIcon />, 
    path: '/courses' 
  },
  { 
    text: 'Threads', 
    icon: <ThreadsIcon />, 
    path: '/threads' 
  },
  { 
    text: 'My Collections', 
    icon: <CollectionsIcon />, 
    path: '/collections' 
  },
  { 
    text: 'My Documents', 
    icon: <DocumentsIcon />, 
    path: '/documents' 
  },
  { 
    text: 'Favorite Documents', 
    icon: <FavoriteIcon />, 
    path: '/favorites' 
  },
  { 
    text: 'Revenue Report', 
    icon: <RevenueIcon />, 
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
        backgroundColor: '#f5f5f5',
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
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
