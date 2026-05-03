// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import necessary MUI components
import { Box, Typography, Button, Container } from '@mui/material';

/**
 * A page to be displayed when a user navigates to a URL that does not exist.
 * It provides a clear 404 message and a link to return to the homepage.
 */
const NotFoundPage = () => {
  return (
    // Container centers the content and provides a max-width.
    <Container component="main" maxWidth="md" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          color="primary" 
          sx={{ fontWeight: 'bold' }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Oops! Page Not Found.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        
        {/* The MUI Button component can be integrated with React Router's Link
            by using the `component` prop. This gives us a theme-styled button
            that behaves like a navigation link. */}
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;