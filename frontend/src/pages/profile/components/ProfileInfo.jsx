import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Chip,
  CardContent,
  Stack
} from '@mui/material';
import { Edit as EditIcon, Person as PersonIcon } from '@mui/icons-material';
import { formatUserName, getUserInitials, getUserAvatar } from '../utils/profileUtils';
import { defaultUserInfo } from '../constants/profileConstants';

export default function ProfileInfo({ user, onEditProfile }) {
  const userName = formatUserName(user);
  const userInitials = getUserInitials(user);
  const userAvatar = getUserAvatar(user);
  
  const userInfo = {
    ...defaultUserInfo,
    name: userName,
    email: user?.email || 'No email provided',
    username: user?.username || 'No username',
    role: user?.role || 'user',
    status: user?.status || 'active',
    uid: user?.uid || 'No ID'
  };

  return (
    <Card 
      elevation={1} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="flex-start" gap={3}>
          {/* Avatar */}
          <Avatar
            src={userAvatar}
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              fontWeight: 600
            }}
          >
            {userInitials}
          </Avatar>

          {/* User Info */}
          <Box flexGrow={1}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              {userInfo.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              @{user?.username || 'username'}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {userInfo.email}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
              <Chip 
                label={`Role: ${userInfo.role}`} 
                size="small" 
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Status: ${userInfo.status}`} 
                size="small" 
                color={userInfo.status === 'active' ? 'success' : 'default'}
                variant="outlined"
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              User ID: {userInfo.uid}
            </Typography>
          </Box>

          {/* Edit Button */}
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEditProfile}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
