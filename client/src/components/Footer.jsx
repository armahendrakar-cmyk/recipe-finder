// src/components/Footer.jsx

import React from 'react';
// Import the necessary layout and typography components from MUI
import { Box, Container, Typography, Link } from '@mui/material';

/**
 * A responsive footer component for the application.
 * It displays copyright information and uses the theme's secondary color for the background.
 */
const Footer = () => {
  return (
    // We use a Box with the `component="footer"` prop for correct semantic HTML.
    // The `sx` prop is used for styling.
    <Box
      component="footer"
      sx={{
        // Use the secondary color's `main` shade from our theme for the background.
        // This demonstrates the power of your centralized theme!
        bgcolor: 'secondary.main',
        // The text color should contrast with the dark background.
        color: 'white',
        // Add some vertical padding using the theme's spacing unit (py = padding-y).
        py: 3,
        // The `mt: 'auto'` is a flexbox trick we'll enable in App.jsx.
        // It pushes the footer to the bottom of the container.
        mt: 'auto',
      }}
    >
      {/* Container centers the content horizontally, matching the rest of the app. */}
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Recipe Finder © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {'Built with ❤️ by '}
          {/* The MUI Link component is theme-aware and better for external links than a plain <a> tag. */}
          <Link color="inherit" href="https://github.com/armahendrakar-cmyk" target="_blank">
            Anusha R Mahendrakar
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;