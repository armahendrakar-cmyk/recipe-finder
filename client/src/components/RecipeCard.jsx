// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb, strCategory } = recipe;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        component={Link}
        to={`/recipe/${idMeal}`}
        sx={{ flexGrow: 1 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={strMealThumb}
          alt={strMeal}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ pb: '14px !important' }}>
          {strCategory && (
            <div className="recipe-card-tag">{strCategory}</div>
          )}
          <Typography className="recipe-card-title-text" gutterBottom>
            {strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
