// src/components/ErrorComponent.jsx

import React from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';

// Import a suitable icon from the MUI icons package.
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

/**
 * A reusable component to display a consistent, user-friendly error message.
 * 
 * @param {object} props - The component's props.
 * @param {string} props.message - The error message to display. Defaults to a generic message.
 * @returns {React.ReactElement} An error display component.
 */
const ErrorComponent = ({ message = 'An unexpected error occurred. Please try again later.' }) => {
  return (
    // Using the MUI Alert component provides a pre-styled, accessible container for messages.
    // `severity="error"` gives it the standard red error styling.
    <Alert 
      severity="error"
      // We can add an icon for better visual communication.
      icon={<ReportProblemIcon fontSize="inherit" />}
      sx={{ 
        mt: 4, // Add some margin at the top
        mx: 'auto', // Center the alert horizontally
        maxWidth: '600px', // Give it a max-width for readability
      }}
    >
      <AlertTitle>Error</AlertTitle>
      <Typography variant="body1">
        {message}
      </Typography>
    </Alert>
  );
};

export default ErrorComponent;