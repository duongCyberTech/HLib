import { Box } from '@mui/material';
import { Header, Footer, Sidebar } from '../components/common';

export default function MainLayout({ children }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <Header />

      {/* Main Content Area with Sidebar */}
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            backgroundColor: '#fafafa',
            width: 'calc(100vw - 250px)',
            minHeight: 'calc(100vh - 64px)' // Subtract header height
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
