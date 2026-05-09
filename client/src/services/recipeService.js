// src/services/recipeService.js

// Import the axios library, which we will use to make HTTP requests.
import axios from 'axios';

// Retrieve the API's base URL from the Vite environment variables.
// The 'import.meta.env' object is where Vite exposes these variables.
// This line securely gets the 'https://www.themealdb.com/api/json/v1/1/' string
// that you stored in your .env.local file.
// Add a console log to see if the URL is actually loading
const API_URL = import.meta.env.VITE_RECIPE_API_URL;
console.log("Current Recipe API URL:", API_URL);

// Create a new instance of axios with a custom configuration.
// This is a best practice for managing API communications.
const recipeApi = axios.create({
  // 'baseURL' is a core setting that tells axios to prepend this URL
  // to all outgoing requests made with this instance.
  // So, a request to '/search.php' will automatically become
  // 'https://www.themealdb.com/api/json/v1/1/search.php'.
  baseURL: API_URL,
});

// --- NEWLY ADDED FUNCTION ---

/**
 * Searches for recipes based on a query string.
 * @param {string} query - The search term (e.g., 'chicken', 'beef').
 * @returns {Promise<Array>} A promise that resolves to an array of meal objects.
 *                           Returns an empty array if no meals are found or if an error occurs.
 */
export const searchRecipes = async (query) => {
  // Use a try...catch block for robust error handling.
  // This ensures that if the API call fails for any reason (e.g., network error),
  // our application doesn't crash and can handle the failure gracefully.
  try {
    // Make an asynchronous GET request to the 'search.php' endpoint.
    // We use a template literal to inject the user's search query into the URL's 's' parameter.
    // The 'await' keyword pauses the function execution until the promise from recipeApi.get() is resolved.
    const response = await recipeApi.get(`/search.php?s=${query}`);

    // The actual data from an axios response is contained in the 'data' property.
    // TheMealDB API returns an object: { meals: [...] } if successful, or { meals: null } if no results.
    // To make our component's job easier, we check if `response.data.meals` exists.
    // If it does, we return it. If it's null or undefined, we return an empty array [].
    // This provides a consistent return type, preventing errors when trying to map over a null value.
    return response.data.meals || [];
  } catch (error) {
    // If an error is caught, we log it to the console for debugging purposes.
    // This is crucial for developers to see what went wrong during development.
    console.error('Error fetching recipes:', error);

    // We return an empty array in the case of an error. This ensures that the UI
    // can still render (e.g., showing a "No results found" message) instead of crashing.
    return [];
  }
};
export const getRecipeById = async (id) => {
  try {
    // Make a GET request to the 'lookup.php' endpoint with the meal ID.
    const response = await recipeApi.get(`/lookup.php?i=${id}`);
    
    // The API returns data in the shape { meals: [ ... ] }.
    // If a meal is found, the array will contain one object. We return that object.
    // If no meal is found, `response.data.meals` will be null, so we return null.
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching recipe by ID ${id}:`, error);
    return null;
  }
};