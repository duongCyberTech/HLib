import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { useAuth } from '../../context';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Posts', value: '156', icon: <ArticleIcon /> },
    { label: 'Active Users', value: '1,234', icon: <PeopleIcon /> },
    { label: 'This Month', value: '+23%', icon: <TrendingIcon /> },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      author: 'Dr. Nguyen Van A',
      category: 'Computer Science',
      date: '2024-01-15',
      likes: 45
    },
    {
      id: 2,
      title: 'Advanced Mathematics Concepts',
      author: 'Prof. Tran Thi B',
      category: 'Mathematics',
      date: '2024-01-14',
      likes: 32
    },
    {
      id: 3,
      title: 'Physics Laboratory Guidelines',
      author: 'Dr. Le Van C',
      category: 'Physics',
      date: '2024-01-13',
      likes: 28
    }
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.fname || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your academic community today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #40C4FF, #2196F3)',
              color: 'white',
              height: '100%'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Posts */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Recent Posts
        </Typography>
        <Grid container spacing={3}>
          {recentPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {post.author}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">Read More</Button>
                  <Button size="small" color="secondary">
                    ❤️ {post.likes}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
