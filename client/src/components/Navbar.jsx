// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">🍴</div>
          RecipeFinder
        </Link>
      </div>

      <ul className="navbar-links">
        {user ? (
          <>
            <li className="navbar-greeting">Welcome, {user.name}!</li>
            <li>
              <Link to="/favorites">My Favorites</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-register-btn" style={{
                padding: '0.45rem 1.2rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e8a020, #c47d1a)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
