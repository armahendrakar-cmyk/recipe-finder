// src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
// Import the shared styles.
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import './AuthForm.css';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

const LoginPage = () => {
  // State for email and password.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // The exact same generic handler works here because it's based on the input's 'name' attribute.


  // The submit handler will log the login data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to log in.');
    }
  };

  return (
    // <Container> centers its content horizontally and applies a max-width for readability.
    <Container component="main" maxWidth="xs">
      {/* <Box> provides a wrapper for our form content. We use the sx prop to create
          a centered, column-based flex container. */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        {/* We use Box as our form element for easy styling with `sx`. */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Conditionally render an Alert for displaying login errors. */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;