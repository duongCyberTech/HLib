import { Box } from '@mui/material';
import { Header, Sidebar } from '../components/common';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: '#fafafa',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
