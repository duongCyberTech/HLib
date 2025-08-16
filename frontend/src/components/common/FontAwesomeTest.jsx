import { Box, Typography, Grid, Paper } from '@mui/material';

export default function FontAwesomeTest() {
  const testIcons = [
    'fas fa-user',
    'fas fa-home',
    'fas fa-heart',
    'fas fa-star',
    'fab fa-google',
    'fab fa-facebook',
    'fas fa-graduation-cap',
    'fas fa-comments'
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Font Awesome Test Page
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Testing Font Awesome icons. If you see actual icons below, Font Awesome is working:
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {testIcons.map((iconClass, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Box sx={{ fontSize: '2rem', mb: 1 }}>
                <i className={iconClass}></i>
              </Box>
              <Typography variant="caption">
                {iconClass}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Direct HTML Test:
        </Typography>
        <Box sx={{ fontSize: '2rem', display: 'flex', gap: 2 }}>
          <i className="fas fa-user"></i>
          <i className="fas fa-home"></i>
          <i className="fas fa-heart"></i>
          <i className="fab fa-google"></i>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          CSS Classes Test:
        </Typography>
        <Box sx={{ fontSize: '1.5rem', display: 'flex', gap: 2, flexDirection: 'column' }}>
          <div>
            <span>fa-solid fa-user: </span>
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <span>fas fa-user: </span>
            <i className="fas fa-user"></i>
          </div>
          <div>
            <span>fa fa-user: </span>
            <i className="fa fa-user"></i>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
