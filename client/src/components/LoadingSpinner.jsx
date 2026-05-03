// src/components/LoadingSpinner.jsx

import React from 'react';

// Import the necessary components from Material-UI.
import { Box, CircularProgress } from '@mui/material';

/**
 * A reusable component that displays a centered loading spinner.
 * It's designed to be a drop-in replacement for any full-page loading state.
 */
const LoadingSpinner = () => {
  return (
    // The Box component acts as a versatile wrapper. We use the `sx` prop for styling.
    <Box
      sx={{
        // Use Flexbox to enable easy centering.
        display: 'flex',
        // Center the content horizontally.
        justifyContent: 'center',
        // Center the content vertically.
        alignItems: 'center',
        // Ensure the box takes up a significant portion of the screen's height,
        // so the spinner appears in the middle of the view, not at the very top.
        // '80vh' means 80% of the viewport height.
        minHeight: '80vh',
      }}
    >
      {/* The CircularProgress component itself. It works out of the box
          with a default size and the theme's primary color. */}
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;