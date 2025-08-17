import { createTheme } from '@mui/material/styles';

// Custom theme with Roboto-SemiBold font
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto-SemiBold',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    
    // Customize specific typography variants
    h1: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 500,
      textTransform: 'none', // Disable uppercase transformation
    },
    caption: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 400,
    },
    overline: {
      fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
      fontWeight: 400,
    },
  },
  
  // Customize component styles
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Roboto-SemiBold',
          src: `url('./assets/Roboto-SemiBold.ttf') format('truetype')`,
          fontWeight: 600,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        body: {
          fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
          },
        },
      },
    },
  },
  
  // Keep existing color palette
  palette: {
    primary: {
      main: '#40C4FF',
    },
    secondary: {
      main: '#FF4081',
    },
  },
});

export default theme;
