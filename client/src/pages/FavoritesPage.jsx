// src/pages/FavoritesPage.jsx

import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite, updateFavoriteNote } from '../services/favoriteService';
import { getRecipeById } from '../services/recipeService'; // The service to get recipe details
import RecipeCard from '../components/RecipeCard'; // The reusable component to display recipes
// We'll create and import some basic styles to keep things looking neat.
import './FavoritesPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import NotesEditModal from '../components/NotesEditModal'; 
import { Container, Grid, Typography, Box, Button, Paper } from '@mui/material';
/**
 * FavoritesPage Component
 * 
 * This page is designed to display a grid of recipes that the currently
 * logged-in user has saved to their favorites.
 * 
 * For this initial task, it acts as a simple placeholder. In upcoming tasks, 
 * this component will be enhanced with the logic to:
 * 1. Make a protected API call to our backend to get the user's list of favorite recipe IDs.
 * 2. For each ID, make a call to the public recipe API to fetch the full recipe details.
 * 3. Manage loading and error states during these API calls.
 * 4. Render the fetched recipes using the reusable `RecipeCard` component.
 * 5. Provide a button on each card to remove a recipe from the favorites list.
 */
const FavoritesPage = () => {
  // --- HIGHLIGHT: Set up state to manage the component's data and UI status ---
  
  // This state will hold the array of favorite recipe IDs we get from the backend.
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
  // A boolean state to track whether the API call is in progress.
  // This is crucial for showing a loading message to the user.
  const [loading, setLoading] = useState(true);

  // A state to hold any error messages from the API call.
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null); // Clear the selected recipe on close
  };

  const handleSaveNotes = async (recipeId, newNotes) => {
    try {
      // 1. Call our new service function to make the API PUT request.
      await updateFavoriteNote(recipeId, newNotes);

      // 2. THIS IS THE KEY TO AN INSTANT UI UPDATE:
      //    We update our local component state to reflect the change immediately.
      //    It's crucial to do this immutably by creating a new array.
      setFavoriteRecipes(prevRecipes => 
        prevRecipes.map(recipe => {
          // If the recipe's ID matches the one we just updated...
          if (recipe.idMeal === recipeId) {
            // ...return a new object with all the old properties, but with the new notes.
            return { ...recipe, notes: newNotes };
          }
          // Otherwise, return the recipe unchanged.
          return recipe;
        })
      );

      // 3. Close the modal now that the save has been successful.
      handleCloseModal();

    } catch (err) {
      // If the save fails, show an alert to the user.
      // In a real-world app, you might use a more sophisticated notification system (e.g., a "snackbar").
      console.error('Failed to save notes:', err);
      alert(err.message || 'Could not save notes. Please try again.');
    }
  };
  // --- HIGHLIGHT: Use the useEffect hook to fetch data when the component mounts ---
  useEffect(() => {
    // We define an async function inside the effect because the effect function
    // itself cannot be async. This is the standard pattern for async operations in useEffect.
    const fetchAndProcessFavorites = async () => {
      try {
        // Reset error state on a new fetch attempt
        setError(null);
        // Set loading to true before we start the fetch
        setLoading(true);

        // Call our service function to get the list of favorite recipe IDs.
        const response = await getFavorites();
        const favoriteObjects = response.favorites;
        if (!Array.isArray(favoriteObjects) || favoriteObjects.length === 0) {
          setFavoriteRecipes([]); // Ensure the list is empty
          setLoading(false);
          return;
        }
        const recipeIds = favoriteObjects.map(fav => fav.recipeId);
        const recipeDetailPromises = recipeIds.map(id => getRecipeById(id));
        
        // 5. Use `Promise.all()` to efficiently fetch all recipe details in parallel.
        const fetchedRecipeDetails = await Promise.all(recipeDetailPromises);
        
        
        // 4. Use `Promise.all()` to wait for ALL the individual recipe fetches to complete.
        //    This is incredibly efficient as it runs the requests in parallel.
        
        // --- HIGHLIGHT: The final and most important step: merging the data ---
        // 6. We now combine the full recipe details with the notes from our backend.
        //    We map over the `fetchedRecipeDetails` and for each recipe, we find its
        //    corresponding note from the `favoriteObjects` array.
        const combinedFavorites = fetchedRecipeDetails.map(recipe => {
          // Find the original favorite object to get its note.
          const userFavoriteData = favoriteObjects.find(
            fav => fav.recipeId === recipe.idMeal
          );

          // Return a new, merged object.
          return {
            ...recipe, // All properties from TheMealDB (idMeal, strMeal, etc.)
            notes: userFavoriteData ? userFavoriteData.notes : '', // Add the notes property
          };
        });
        
        // 7. Set the final, combined data into our component's state.
        setFavoriteRecipes(combinedFavorites);
        // On success, update our state with the fetched IDs.

      } catch (err) {
        // If an error occurs (e.g., token is invalid, network issue),
        // we capture it and store the error message in our state.
        setError(err.message || 'An error occurred while fetching your favorites.');
      } finally {
        // The `finally` block always runs, whether the try succeeded or failed.
        // This is the perfect place to set loading to false.
        setLoading(false);
      }
    };

    // Call the function to initiate the data fetch.
    fetchAndProcessFavorites();
    
  // The empty dependency array `[]` is crucial. It tells React to run this effect
  // only ONCE, after the initial render (when the component mounts). Without this,
  // the effect would run after every re-render, causing an infinite loop of API calls.
  }, []);

  // --- HIGHLIGHT: Render the UI based on the current state ---
const handleRemoveFavorite = async (recipeId) => {
    try {
      // 1. Call the service function to make the API DELETE request.
      await removeFavorite(recipeId);

      // 2. THIS IS THE KEY TO AN INSTANT UI UPDATE:
      //    We update our local state to reflect the removal without a page refresh.
      //    The `filter` method creates a new array containing only the elements
      //    that pass the test. Here, we keep all recipes whose ID does NOT match
      //    the one we just removed.
      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.idMeal !== recipeId)
      );
    } catch (err) {
      // If the removal fails, we can log it or show a temporary error message.
      console.error('Failed to remove favorite:', err);
      // For a more advanced UX, you could set an error state here.
      alert(err.message || 'Could not remove favorite. Please try again.');
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;
  return (
    <>
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Favorite Recipes
      </Typography>
      
      {favoriteRecipes.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          You haven't saved any favorite recipes yet. Start exploring!
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {favoriteRecipes.map(recipe => (
            // The rendering logic remains the same for now. The `recipe` object
            // just has an extra `notes` property we're not using yet.
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
               {/* This container will be used later for the notes and remove button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* The RecipeCard component, which grows to fill space */}
                <Box sx={{ flexGrow: 1 }}>
                  <RecipeCard recipe={recipe} />
                </Box>
                
                {/* --- HIGHLIGHT: This is the new section for displaying notes --- */}
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, // Add padding inside the paper (2 units = 16px)
                    mt: -1, // A negative margin to slightly overlap the card for a connected feel
                    borderTopLeftRadius: 0, // Flatten the top corners
                    borderTopRightRadius: 0,
                    bgcolor: 'background.default' // Use a subtle background color from the theme
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1, // Add some margin below this header
                  }}></Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    My Notes:
                  </Typography>
                  <Button 
                      variant="outlined" // A less prominent style than "contained"
                      size="small"       // A smaller size appropriate for this context
                      // The onClick handler will be implemented in the next task.
                      // For now, it does nothing.
                      onClick={() => handleOpenModal(recipe)} 
                    >
                      Edit
                  </Button>
                  {/* Here we use a ternary operator for conditional rendering */}
                  {recipe.notes ? (
                    // If a note exists, display it.
                    <Typography variant="body2" sx={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
                      {recipe.notes}
                    </Typography>
                  ) : (
                    // If no note exists, display a placeholder message.
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No notes yet. Add one!
                    </Typography>
                  )}
                </Paper>

                {/* --- END OF HIGHLIGHT --- */}

                {/* The remove button will go here in a later step */}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleRemoveFavorite(recipe.idMeal)}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    {selectedRecipe && (
        <NotesEditModal
          open={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onSave={handleSaveNotes}
        />
      )}
  </>
  );
};


export default FavoritesPage;