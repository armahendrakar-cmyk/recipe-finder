// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1208',
        color: '#c8a870',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontFamily: '"Playfair Display", serif',
            color: '#f5d898',
            fontSize: '1.05rem',
            mb: 0.5,
          }}
        >
          🍴 RecipeFinder
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#c8a870' }}>
          Recipe Finder © {new Date().getFullYear()} &nbsp;·&nbsp; Built with ❤️ by{' '}
          <Link
            color="inherit"
            href="https://github.com/armahendrakar-cmyk"
            target="_blank"
            sx={{ color: '#e8c080', '&:hover': { color: '#f5d898' } }}
          >
            Anusha R Mahendrakar
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
