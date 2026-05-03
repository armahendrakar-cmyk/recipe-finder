// src/components/ProtectedRoute.jsx

import React from 'react';
// 1. Import the necessary hooks from 'react-router-dom' for navigation and location tracking.
import { Navigate, useLocation } from 'react-router-dom';

// 2. Import our custom `useAuth` hook to access the authentication context.
// This hook provides us with the `user` and `loading` state.
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component that protects routes from unauthenticated access.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The component/page to render if the user is authenticated.
 * @returns {React.ReactElement} - The protected component or a redirection to the login page.
 */
const ProtectedRoute = ({ children }) => {
  // 3. Destructure `user` and `loading` from our authentication context.
  const { user, loading } = useAuth();

  // 4. Get the current location object. This contains information about the current URL.
  // We'll use this to redirect the user back to their intended page after they log in.
  const location = useLocation();

  // 5. Handle the initial loading state.
  // While the AuthContext is checking for a token in localStorage, the `loading` state is true.
  // We should render a loading indicator (or nothing) to prevent a "flicker" where the user
  // is momentarily redirected to /login before the token is verified.
  if (loading) {
    // You can replace this with a more sophisticated spinner component later.
    return <div>Loading...</div>;
  }

  // 6. The core logic: check if a user is authenticated.
  // If the `user` object is null or undefined, it means the user is not logged in.
  if (!user) {
    // 7. If not authenticated, redirect to the login page.
    // We use the `<Navigate>` component from react-router-dom to perform the redirection.
    // `to="/login"` specifies the destination.
    // `replace` is a crucial prop: it replaces the current entry in the history stack
    // instead of pushing a new one. This prevents the user from getting stuck in a redirect
    // loop if they press the back button.
    // `state={{ from: location }}` passes the current location object to the login page.
    // This allows the login page to know where the user was trying to go.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 8. If the user is authenticated, render the children components.
  // `children` will be the actual page component that this `ProtectedRoute` is wrapping
  // (e.g., `<FavoritesPage />`).
  return children;
};

export default ProtectedRoute;