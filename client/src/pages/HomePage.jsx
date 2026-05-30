// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { searchRecipes } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import './HomePage.css';

const CATEGORIES = [
  { emoji: '🍳', name: 'Breakfast' },
  { emoji: '🥗', name: 'Salads' },
  { emoji: '🍲', name: 'Soups' },
  { emoji: '🍝', name: 'Pasta' },
  { emoji: '🥩', name: 'Grills' },
  { emoji: '🍰', name: 'Desserts' },
];

const QUICK_TAGS = ['🍝 Pasta', '🍛 Curry', '🥗 Salads', '🍰 Desserts', '🍕 Pizza'];

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results || []);
    } catch (error) {
      console.error('Search failed:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleTagClick = (tag) => {
    const clean = tag.replace(/^[^\w]+/, '').trim();
    setQuery(clean);
    handleSearch(clean);
  };

  const handleCategoryClick = (name) => {
    setQuery(name);
    handleSearch(name);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">✦ Over 10,000 recipes</div>

          <Typography variant="h1" className="hero-title">
            Find your next<br /><em>favorite meal</em>
          </Typography>

          <Typography variant="body1" className="hero-subtitle">
            Search any dish, ingredient, or cuisine — and discover recipes you'll actually want to make.
          </Typography>

          {/* Search bar */}
          <div className="search-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="search-bar-inner">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Try 'pasta', 'chicken curry', 'vegan tacos'…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="contained" className="search-submit-btn">
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Quick tags */}
          <div className="quick-tags">
            <span className="tag-label">Popular:</span>
            {QUICK_TAGS.map((tag) => (
              <button key={tag} className="quick-tag" onClick={() => handleTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories (only when no search yet) ── */}
      {!searched && (
        <section className="categories-section">
          <div className="section-header">
            <Typography className="section-title">Browse by category</Typography>
            <Typography className="section-subtitle">What are you in the mood for?</Typography>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(({ emoji, name }) => (
              <div key={name} className="cat-card" onClick={() => handleCategoryClick(name)}>
                <div className="cat-emoji">{emoji}</div>
                <div className="cat-name">{name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Results ── */}
      {searched && (
        <section className="results-section">
          <Container maxWidth="xl">
            {loading ? (
              <LoadingSpinner />
            ) : recipes.length > 0 ? (
              <>
                <div className="section-header">
                  <Typography className="section-title">Search Results</Typography>
                  <Typography className="section-subtitle">{recipes.length} recipes found</Typography>
                </div>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {recipes.map((recipe) => (
                    <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography className="no-results-msg">
                No recipes found for "{query}". Try a different search!
              </Typography>
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default HomePage;
