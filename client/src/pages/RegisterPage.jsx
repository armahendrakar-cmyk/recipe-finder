// src/pages/RegisterPage.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import './AuthForm.css';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';


/**
 * The RegisterPage component. This will eventually contain the form
 * for new users to sign up for an account.
 */
const RegisterPage = () => {
  // 2. Use a single state object to hold all form data. This keeps our state logic tidy.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  // 4. A submit handler that will, for now, just log the captured data.
  const handleSubmit = async(e) => {
    // Prevent the default form submission behavior, which causes a page reload.
    e.preventDefault();
    setError(null);
    try {
      // Call the register function from the service, passing in the form data.
      // We `await` the response from the server.
      const data = await register(formData);
      if (data.token) {
        // 1. Save the token to localStorage
        localStorage.setItem('token', data.token);

        // 2. Update the global AuthContext state with the user data
        register(data);

        // 3. Redirect the user to the homepage
        navigate('/');
      }

      // If successful, the `data` will contain the user object and the JWT.
      // For now, we'll just log it to confirm success.


      // In the next step, we will save the JWT token and redirect the user.
      

    } catch (err) {
      // If the authService throws an error, it will be caught here.
      // The `err` object should contain the message from our backend.
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
    // In the next steps, this is where we will call our authentication service.
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
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Name"
            label="Name"
            id="Name"
            autoComplete="Name"
            value={formData.Name}
            onChange={handleChange}
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

export default RegisterPage;