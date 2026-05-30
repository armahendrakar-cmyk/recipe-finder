// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c47d1a',
      light: '#e8a020',
      dark: '#a8681a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1a1208',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fdf8f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1208',
      secondary: '#6b5030',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h5: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h6: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontFamily: '"DM Sans", sans-serif',
          borderRadius: '10px',
          padding: '10px 22px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #e8a020, #c47d1a)',
          '&:hover': {
            background: 'linear-gradient(135deg, #d49018, #a8681a)',
            boxShadow: '0 4px 16px rgba(196,125,26,0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid rgba(200,160,80,0.15)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontFamily: '"DM Sans", sans-serif',
            '&.Mui-focused fieldset': {
              borderColor: '#c47d1a',
            },
          },
          '& label.Mui-focused': {
            color: '#c47d1a',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: '10px' },
      },
    },
  },
});

export default theme;
