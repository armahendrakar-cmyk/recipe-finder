// src/pages/HomePage.jsx

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { searchRecipes } from '../services/recipeService';
// HIGHLIGHT: Import the RecipeCard component we just created
import RecipeCard from '../components/RecipeCard';
// HIGHLIGHT: Import the CSS for our page layout
import Loader from '../components/Loader';
import './HomePage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import { Container, Grid, Typography, Box } from '@mui/material';
// This is the main page where users will search for recipes.
// For now, it's just a simple placeholder.
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const handleSearch = async (query) => {
  if (!query) return;

  setLoading(true);
  setSearched(true);

  try {
    const results = await searchRecipes(query);
    setRecipes(results || []);
  } catch (error) {
    console.error("Search failed:", error);
    setRecipes([]);
  } finally {
    setLoading(false);
  }
};

  // You can add this console.log to see the state update in real-time
  return (
    // Container centers our content and gives it a max-width for readability.
    <Container sx={{ py: 4 }}> {/* py is padding on y-axis */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Recipe Finder
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Discover your next favorite meal. Search for any recipe you can imagine!
      </Typography>
      
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

      {/* --- HIGHLIGHT: Replace the old .recipe-grid with MUI's Grid system --- */}
      
      {/* 1. The outer Grid component needs the `container` prop. 
             `spacing={4}` adds consistent space between all grid items. */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {loading ? (
        // Instead of plain text, render your sophisticated spinner component.
        <LoadingSpinner />
      ) : (
        // The rest of your grid rendering logic remains unchanged.
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
      </Grid>

      {searched && !loading && recipes.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No recipes found for "{query}". Please try another search.
        </Typography>
      )}
    </Container>
  );
};

export default HomePage;