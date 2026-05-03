import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// HIGHLIGHT: Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';


// Find the root element to mount our React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* --- HIGHLIGHT: Wrap the application with ThemeProvider --- */}
      {/* The ThemeProvider makes the `theme` object we created available to every
          component below it in the tree. It must be placed outside of any components
          that will use MUI, so wrapping it around your AuthProvider and App is ideal. */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline is a component that provides a consistent styling baseline.
            It should be placed directly inside the ThemeProvider to ensure it can
            access theme values (like the default background color). */}
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);