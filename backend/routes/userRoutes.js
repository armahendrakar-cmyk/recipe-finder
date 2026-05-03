// Import the Express library, which is necessary to create a router.
const express = require('express');

// Create a new router instance by calling the Router() method from Express.
// This 'router' object will be used to define our user-specific routes.
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// Here is where we will define our routes in the upcoming tasks.
// For example: router.post('/register', registerUser);
// And:         router.post('/login', loginUser);

// Export the router object so it can be imported and used in our main server.js file.
// This is a standard part of the Node.js module system.
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;