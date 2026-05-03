// src/pages/RecipePage.jsx
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { getRecipeById } from '../services/recipeService';
import { AuthContext } from '../context/AuthContext';
import { addFavorite } from '../services/favoriteService'; // Our new service function!
import Loader from '../components/Loader';
import './RecipePage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import { Container, Grid, Box, Typography, Button, Stack, Alert } from '@mui/material';

// This page will display the full details of a single, selected recipe.
// For now, it's just a simple placeholder.
const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  // --- HIGHLIGHT: Consume the AuthContext to get the user status ---
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  // --- HIGHLIGHT: Add state for user feedback messages ---
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null); // reset
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
          console.error('Failed to fetch recipe details', error);
          setError('Failed to load recipe');
      } finally {
          setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);
  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleSaveToFavorites = async () => {
    // Clear any previous feedback messages
    setFeedback({ message: '', type: '' });

    try {
      // Call our service function, passing the current recipe's ID
      const response = await addFavorite(recipe.idMeal);
      // On success, set a positive feedback message
      setFeedback({ message: response.message || 'Saved to favorites!', type: 'success' });
    } catch (err) {
      // On error, set a negative feedback message using the error from the backend
      setFeedback({ message: err.message || 'Failed to save favorite.', type: 'error' });
    }
  };
  
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients;
  };
  // For now, we'll just log the state to see the data arrive.
  // In the next step, we'll use this data to render the UI.
  

  return (
    <Container sx={{ py: 4 }}>
      {/* --- HIGHLIGHT: The main responsive layout using Grid --- */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column: Image */}
        <Grid item xs={12} md={5}>
          {/* We use Box with component="img" for better styling control. */}
          <Box
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: '100%',
              borderRadius: 2, // Corresponds to theme.shape.borderRadius * 2
              boxShadow: 3, // Applies a theme-based shadow
            }}
          />
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={7}>
          {/* Stack is perfect for arranging items vertically with consistent spacing. */}
          <Stack spacing={2}>
            <Typography variant="h3" component="h1">
              {recipe.strMeal}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Category: {recipe.strCategory} | Area: {recipe.strArea}
            </Typography>

            {/* Conditionally render the save button */}
            {user && (
              <Button variant="contained" onClick={handleSaveToFavorites} sx={{ alignSelf: 'flex-start' }}>
                Save to Favorites
              </Button>
            )}

            {/* Display feedback alert */}
            {feedback.message && (
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            )}

            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Ingredients
              </Typography>
              {getIngredients().map((ing, index) => (
                <Typography key={index} variant="body1" component="p">
                  - {ing}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {recipe.strInstructions}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipePage;