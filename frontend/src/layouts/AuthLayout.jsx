import { Box, Typography } from '@mui/material';

export default function AuthLayout({ children }) {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header with Logo */}
      <Box
        mb={2}
        sx={{
          marginLeft: 5,
          mt: -10,
          display: "flex",
          gap: 2,
          alignItems: "center",
          marginTop: 5,
          position: 'relative',
          zIndex: 1
        }}
      >
        <img src="/assets/Logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
        <Typography
          variant="h5"
          color="#40C4FF"
          fontWeight="bold"
          sx={{
            fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
            letterSpacing: '0.5px'
          }}
        >
          HCMUT ACADEMIC FORUM
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 1, height: 'calc(100% - 100px)' }}>
        {children}
      </Box>
    </Box>
  );
}
