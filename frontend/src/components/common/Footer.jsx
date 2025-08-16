import { Box, Typography, Link, Container, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              HCMUT Forum
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Academic forum for HCMUT students and faculty.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/dashboard" variant="body2" display="block" color="text.secondary">
              Dashboard
            </Link>
            <Link href="/profile" variant="body2" display="block" color="text.secondary">
              Profile
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Help Center
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Privacy Policy
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Terms of Service
            </Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 HCMUT Academic Forum. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
