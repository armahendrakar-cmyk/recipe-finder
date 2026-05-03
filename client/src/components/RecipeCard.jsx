// src/components/RecipeCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
/**
 * A "presentational" component responsible for displaying a single recipe's
 * summary information in a card format.
 * @param {{ recipe: Object }} props - The props object.
 * @param {Object} props.recipe - The recipe object containing details like name and image.
 *                                It's expected to have `strMeal` and `strMealThumb` properties.
 */
const RecipeCard = ({ recipe }) => {
  // We use destructuring to pull out the specific properties we need from the recipe object.
  // This makes the JSX below cleaner and easier to read.
  const { idMeal, strMeal, strMealThumb } = recipe;

 return (
    // <Card> is the root container. It provides the background, border-radius, and shadow (elevation).
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* <CardActionArea> makes the entire card surface a single, clickable button-like area.
          It provides a beautiful ripple effect on interaction.
          The `component={Link}` and `to={...}` props are the key to integrating
          with React Router. It tells MUI to render a Link component but style it
          like a CardActionArea.
      */}
      <CardActionArea
        component={Link}
        to={`/recipe/${idMeal}`}
        sx={{ flexGrow: 1 }} // Allows the action area to grow and fill the card height
      >

        {/* <CardMedia> is optimized for displaying images or videos in a card. */}
        <CardMedia
          // We tell it to render an `<img>` tag under the hood.
          component="img"
          // We can set a fixed height for consistency.
          height="200"
          // The `image` prop is the URL for the media.
          image={strMealThumb}
          // The `alt` text is crucial for accessibility.
          alt={strMeal}
        />

        {/* <CardContent> provides standard padding for the card's text content. */}
        <CardContent>

          {/* <Typography> is used for all text to ensure it adheres to the theme's
              typographic scale (font sizes, weights, and line heights).
          */}
          <Typography gutterBottom variant="h6" component="div">
            {strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard; 