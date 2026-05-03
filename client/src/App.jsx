// Remove the useEffect import and the searchRecipes import, as they are no longer needed here.

// 1. Import the necessary components from react-router-dom
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';
// 2. Import your newly created page components
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import { Box } from '@mui/material';
function App() {
  // The App component now acts as the main container for our routes.
  // We no longer need the useEffect for fetching initial data here.
  return (
    // --- HIGHLIGHT: Modify the root div to be a flex container ---
    // This Box replaces the top-level `div`.
    // By setting minHeight to '100vh' and using a column-based flex layout,
    // we create a container that ensures the footer can be pushed to the bottom.
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* The `main` element will now grow to fill available space, pushing the footer down. */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          {/* All your existing routes remain unchanged */}
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/favorites" 
            element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* --- HIGHLIGHT: Add the Footer component at the end --- */}
      {/* It's placed outside of <main> for semantic correctness. */}
      <Footer />
    </Box>
  );
}

export default App;