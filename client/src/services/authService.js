// src/services/authService.js

// 1. Import axios for making HTTP requests
import axios from 'axios';

// 2. Get the base URL of our backend API from the environment variables
const API_URL = import.meta.env.VITE_BACKEND_API_URL + '/api/users';


export const register = async (userData) => {
  try {
    // We use axios.post for creating new resources.
    // The first argument is the full URL endpoint. We construct it by appending '/register' to our base API_URL.
    // The second argument is the data payload (the request body) we want to send.
    // Axios automatically stringifies this JavaScript object into JSON for us.
    const response = await axios.post(`${API_URL}/register`, userData);

    // If the request is successful, the backend will send back data (user object and token).
    // We return this data so it can be used by the component that called this function.
    return response.data;
  } catch (error) {
    // If the backend returns an error (e.g., email already exists), axios will throw an error.
    // We log the detailed error for debugging and then re-throw it so the calling
    // component's catch block can handle it and display a message to the user.
    console.error('Registration failed:', error.response.data);
    throw error.response.data;
  }
};


export const login = async (userData) => {
  try {
    // The logic is very similar to the register function.
    // We make a POST request to the '/login' endpoint with the user's credentials.
    const response = await axios.post(`${API_URL}/login`, userData);

    // Return the successful response data.
    return response.data;
  } catch (error) {
    // Handle and re-throw any errors from the backend (e.g., invalid credentials).
    console.error('Login failed:', error.response.data);
    throw error.response.data;
  }
};