import { Box, Container } from '@mui/material';
import { Header, Footer } from '../components/common';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
