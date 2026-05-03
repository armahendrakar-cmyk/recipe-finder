// src/components/Navbar.jsx

// 1. Import React, the useContext hook, and the Link component from react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';

// 2. Import the AuthContext we created
import { useAuth } from '../context/AuthContext'; // HIGHLIGHT: Import and use the custom hook

// 3. Import the CSS for our Navbar
import './Navbar.css';

const Navbar = () => {
  // 4. Use the useContext hook to get the current user and logout function from our AuthContext
  const { user, logout } = useAuth(); // HIGHLIGHT: Cleaner access to the context value

  const handleLogout = () => {
    // We will implement the full logout logic in the next task.
    // For now, this function calls the logout method from our context.
    logout();
    // After logging out, we might want to navigate the user to the homepage.
    // We can add that logic here or in the context itself.
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Link the brand/logo to the homepage */}
        <Link to="/" className="navbar-logo">RecipeFinder</Link>
      </div>

      <ul className="navbar-links">
        {/* 5. This is the core of our dynamic UI. We use a ternary operator to check if a `user` object exists. */}
        {user ? (
          // If `user` exists, the user is logged in. Show these links.
          <>
            <li className="navbar-greeting">Welcome, {user.name}!</li>
            <li>
              <Link to="/favorites">My Favorites</Link>
            </li>
            <li>
              {/* This button will trigger the logout process. */}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          // If `user` is null, the user is logged out. Show these links.
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;