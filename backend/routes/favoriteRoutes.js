// routes/favoriteRoutes.js

// 1. Import Express to get access to its Router
const express = require('express');

// 2. Import the `protect` middleware. This is our gatekeeper that ensures
//    only logged-in users can access these routes.
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User'); 
// HIGHLIGHT: And asyncHandler to handle errors cleanly.
const asyncHandler = require('express-async-handler');
// 3. Create a new router instance. This `router` object is what we'll use
//    to define all the routes for the '/api/favorites' path.
const router = express.Router();
router.put('/:recipeId', protect, async (req, res) => {
  try {
    // 1. Get the recipeId from the URL parameters (e.g., /api/favorites/52772)
    const { recipeId } = req.params;
    // 2. Get the new notes content from the request body.
    const { notes } = req.body;

    // A small validation check to ensure notes are provided.
    if (notes === undefined) {
      return res.status(400).json({ message: 'Notes field is required' });
    }

    // 3. Find the user and update the specific favorite in one atomic operation.
    //    `findOneAndUpdate` is the perfect tool for this.
    const updatedUser = await User.findOneAndUpdate(
      // The QUERY part: First, find the user by their ID. Then, within that user's
      // `favorites` array, find the element that has a matching `recipeId`.
      // The dot notation 'favorites.recipeId' is how we query inside an array of objects.
      { _id: req.user.id, 'favorites.recipeId': recipeId },
      
      // The UPDATE part: We use the `$set` operator to update a field.
      // The `favorites.$.notes` syntax is the key. The `$` is the positional
      // operator. It acts as a placeholder for the index of the array element
      // that was matched by the query part. So, it means "update the `notes` field
      // of the specific favorite we found".
      { $set: { 'favorites.$.notes': notes } },
      
      // The OPTIONS part: `{ new: true }` tells Mongoose to return the
      // document *after* the update has been applied. Without this, it would
      // return the document as it was *before* the update.
      { new: true }
    );

    // 4. Check if the update was successful. If `updatedUser` is null, it means
    //    the query didn't find a matching document (either the user doesn't exist,
    //    or they don't have that specific recipe in their favorites).
    if (!updatedUser) {
      return res.status(404).json({ message: 'Favorite recipe not found for this user.' });
    }

    // 5. Send a success response. We can send a message and the updated list of favorites.
    res.status(200).json({
      message: 'Notes updated successfully',
      favorites: updatedUser.favorites,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { recipeId } = req.body;

    const user = await User.findById(req.user._id).select('+favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ correct duplicate check
    const isAlreadyFavorite = user.favorites.some(
      (fav) => fav.recipeId === recipeId
    );

    if (isAlreadyFavorite) {
      return res.status(400).json({ message: 'Recipe is already in favorites' });
    }

    // ✅ correct push (object, not string)
    user.favorites.push({ recipeId });

    await user.save();

    res.status(201).json({
      message: 'Recipe added to favorites successfully',
      favorites: user.favorites,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Here, we will define the controller functions that contain the actual logic
// for interacting with the database. For now, we'll just define them as placeholders.
// In a larger application, these would be in their own `controllers` directory.
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    favorites: user.favorites,
  });
});
/**
 * @desc    Add a recipe to user's favorites
 * @route   POST /api/favorites
 * @access  Private
 */


const removeFavorite = asyncHandler(async (req, res) => {
  // 1. Extract the recipeId from the URL parameters.
  // The route is defined as '/:recipeId', so `req.params.recipeId` will contain the value.
  const { recipeId } = req.params;

  // 2. Use `findByIdAndUpdate` to find the user and modify their document in one step.
  // The first argument is the ID of the document to find, which we get from our `protect` middleware.
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      // The second argument is the update operation.
      // `$pull` is a MongoDB operator that removes from an existing array
      // all instances of a value or values that match a specified condition.
      // Here, we tell it to pull the `recipeId` from the `favorites` array.
      $pull: { favorites: { recipeId } },
    },
    {
      // The third argument is an options object.
      // `new: true` tells Mongoose to return the modified document *after* the update
      // has been applied, rather than the original document. This is what we want.
      new: true,
    }
  );

  // 3. Check if the user was found and updated.
  if (updatedUser) {
    // 4. Send a success response back to the client.
    // It's good practice to send back the updated state of the resource.
    res.status(200).json({
      message: 'Recipe removed from favorites successfully',
      favorites: updatedUser.favorites,
    });
  } else {
    // This case would happen if the user's token is valid but their account
    // was somehow deleted from the database. It's an unlikely edge case.
    res.status(404);
    throw new Error('User not found');
  }
});


// 4. Define the routes and apply the `protect` middleware.
// We can chain routes that have the same path.
// Any request to '/' (which will be mounted as '/api/favorites') will first go
// through the `protect` middleware.
router.route('/')
  .get(protect, getFavorites)   // GET /api/favorites


// For the delete route, which includes a dynamic parameter, we define it separately.
// The `protect` middleware is also applied here.
router.route('/:recipeId')
  .delete(protect, removeFavorite); // DELETE /api/favorites/some_recipe_id

// 5. Export the router so it can be imported and used in our main `server.js` file.
module.exports = router;
