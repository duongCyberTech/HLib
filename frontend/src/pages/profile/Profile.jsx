import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Button,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon } from '@mui/icons-material';
import { useAuth } from '../../context';

export default function Profile() {
  const { user } = useAuth();

  const userInfo = {
    name: `${user?.fname || 'John'} ${user?.mname || 'M'} ${user?.lname || 'Doe'}`,
    email: user?.email || 'john.doe@hcmut.edu.vn',
    avatar: user?.avatar || '/assets/default-avatar.png',
    joinDate: '2024-01-01',
    department: 'Computer Science',
    studentId: '2021001234',
    posts: 15,
    followers: 234,
    following: 89
  };

  const recentActivity = [
    { action: 'Posted', item: 'Introduction to React Hooks', date: '2024-01-15' },
    { action: 'Liked', item: 'Advanced JavaScript Concepts', date: '2024-01-14' },
    { action: 'Commented on', item: 'Database Design Principles', date: '2024-01-13' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Avatar 
                  src={userInfo.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                >
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {userInfo.department}
                </Typography>
                <Chip 
                  label={`ID: ${userInfo.studentId}`} 
                  size="small" 
                  variant="outlined"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <EmailIcon color="action" />
                <Typography variant="body2">
                  {userInfo.email}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Member since {new Date(userInfo.joinDate).toLocaleDateString()}
              </Typography>

              <Button 
                variant="contained" 
                startIcon={<EditIcon />}
                fullWidth
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats and Activity */}
        <Grid item xs={12} md={8}>
          {/* Stats */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {userInfo.posts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Posts
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {userInfo.followers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {userInfo.following}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              {recentActivity.map((activity, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">
                    <strong>{activity.action}</strong> "{activity.item}"
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(activity.date).toLocaleDateString()}
                  </Typography>
                  {index < recentActivity.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
