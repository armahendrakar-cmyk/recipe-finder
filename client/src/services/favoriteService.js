import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/favorites`;

export const addFavorite = async (recipeId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = { recipeId };

  const response = await axios.post(API_URL, body, config);
  return response.data;
};

export const getFavorites = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const removeFavorite = async (recipeId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${recipeId}`, config);
  return response.data;
};

// --- HIGHLIGHT: THIS IS THE NEW FUNCTION YOU ARE ADDING ---

/**
 * Sends a PUT request to the backend to update the notes for a specific favorite recipe.
 * This is a protected action and requires a JWT for authorization.
 *
 * @param {string} recipeId - The ID of the recipe whose notes are being updated.
 * @param {string} notes - The new notes content to be saved.
 * @returns {Promise<object>} A promise that resolves to the success message from the backend.
 */
export const updateFavoriteNote = async (recipeId, notes) => {
  // 1. Retrieve the JWT from localStorage. This is the user's proof of identity.
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token not found.');
  }

  // 2. Create the Axios configuration object with the Authorization header.
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 3. Create the request body. The backend PUT endpoint is expecting an object
  //    with a `notes` property.
  const body = { notes };

  try {
    // 4. Make the PUT request using axios.
    //    - The URL includes the recipeId to identify the specific resource.
    //    - The second argument is the request body (the new notes).
    //    - The third is the configuration object with our auth header.
    const response = await axios.put(`${API_URL}/${recipeId}`, body, config);
    
    // 5. Return the success response from the backend.
    return response.data;
  } catch (error) {
    // 6. Handle any errors and re-throw a meaningful message for the component to catch.
    throw error.response?.data || new Error('Failed to update notes.');
  }
};