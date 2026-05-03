// src/context/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { login as loginService } from '../services/authService';
// 1. Import necessary hooks from React.
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';



// A helper function to parse the JWT.
// This function will decode the payload part of the token.
const parseJwt = (token) => {
  try {
    // The payload is the second part of the token, between the two dots.
    // btoa/atob are for base64 encoding/decoding. atob decodes a base64 string.
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    // If the token is malformed, parsing will fail.
    return null;
  }
};

// 2. Create the context object. 
// We export it so other components can use it with the `useContext` hook.
// `createContext(null)` initializes the context with a default value of `null`.
export const AuthContext = createContext(null);
export const useAuth = () => {
  return useContext(AuthContext);
};
// 3. Create the Provider component. 
// This component will wrap our application and manage the authentication state.
// It takes `children` as a prop, which will be the rest of our application components.
export const AuthProvider = ({ children }) => {
  // 4. State to hold the user object. It's `null` if no user is logged in.
  const [user, setUser] = useState(null);

  // 5. State to handle the initial loading period while we check for a token.
  // We start as `true` because we are initially loading.
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // 6. Use `useEffect` to check for a token in localStorage when the app first loads.
  useEffect(() => {
    // This effect runs only once, on component mount, due to the empty dependency array `[]`.
    const token = localStorage.getItem('token');
    if (token) {
      // If a token is found, parse it to get user data.
      // IMPORTANT: In a production app, you would make an API call to your backend
      // here to verify the token is still valid. For this project, client-side
      // parsing is sufficient to re-establish the user's session for the UI.
      const decodedUser = parseJwt(token);
      
      // Check if the token is expired. The 'exp' claim is in seconds.
      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        // If the token is valid, set the user state.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser({
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
        });
      } else {
        // If the token is expired or invalid, remove it.
        localStorage.removeItem('token');
      }
    }
    // We are done checking, so set loading to false.
    setLoading(false);
  }, []);

  // 7. Define the `login` function. This will be called from our LoginPage.
  // It takes the user data and token returned from our API.
  const login = async (email, password) => {
  const response = await loginService(email, password);

  
  localStorage.setItem('token', response.token);

  
  const decodedUser = parseJwt(response.token);

  setUser({
    id: decodedUser.id,
    name: decodedUser.name,
    email: decodedUser.email,
  });
};

  // 8. Define the `logout` function.
  const logout = () => {
    // Clear the user from our state.
    setUser(null);
    // Remove the token from localStorage.
    localStorage.removeItem('token');
    navigate('/');
  };

  // 9. The value that will be provided to all consuming components.
  // We package our state and functions into a single object.
  const authContextValue = {
    user,
    loading,
    login,
    logout,
  };

  // 10. Return the Provider component.
  // It wraps the `children` (our app) and makes the `authContextValue` available to them.
  // We don't render anything until the initial token check is complete.
  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};