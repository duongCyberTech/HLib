import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  PersonIcon,
  HomeIcon,
  FavoriteIcon,
  GoogleIcon,
  FacebookIcon,
  SchoolIcon,
  ChatIcon,
  BarChartIcon,
  TrendingUpIcon,
  PeopleIcon
} from './Icons';

export default function MaterialUIIconsTest() {
  const testIcons = [
    { component: PersonIcon, name: 'Person' },
    { component: HomeIcon, name: 'Home' },
    { component: FavoriteIcon, name: 'Favorite' },
    { component: GoogleIcon, name: 'Google' },
    { component: FacebookIcon, name: 'Facebook' },
    { component: SchoolIcon, name: 'School' },
    { component: ChatIcon, name: 'Chat' },
    { component: BarChartIcon, name: 'Bar Chart' },
    { component: TrendingUpIcon, name: 'Trending Up' },
    { component: PeopleIcon, name: 'People' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Material-UI Icons Test Page
      </Typography>

      <Typography variant="body1" gutterBottom>
        Testing Material-UI icons. All icons below are from Material-UI icons library:
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {testIcons.map((iconData, index) => {
          const IconComponent = iconData.component;
          return (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ fontSize: '2rem', mb: 1, display: 'flex', justifyContent: 'center' }}>
                  <IconComponent sx={{ fontSize: '2rem' }} />
                </Box>
                <Typography variant="caption">
                  {iconData.name}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Direct Icon Components Test:
        </Typography>
        <Box sx={{ fontSize: '2rem', display: 'flex', gap: 2, alignItems: 'center' }}>
          <PersonIcon sx={{ fontSize: '2rem' }} />
          <HomeIcon sx={{ fontSize: '2rem' }} />
          <FavoriteIcon sx={{ fontSize: '2rem' }} />
          <GoogleIcon sx={{ fontSize: '2rem' }} />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Icon Sizes Test:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <span>Small: </span>
            <PersonIcon sx={{ fontSize: '1rem' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <span>Medium: </span>
            <PersonIcon sx={{ fontSize: '1.5rem' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <span>Large: </span>
            <PersonIcon sx={{ fontSize: '2rem' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
