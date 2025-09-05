import { Box } from '@mui/material';

export default function AuthLayout({ children }) {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#05326d'
    }}>
      {/* Background Video */}




      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 1, height: 'calc(100% - 100px)' }}>
        {children}
      </Box>
    </Box>
  );
}
