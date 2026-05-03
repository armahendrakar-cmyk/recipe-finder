require('dotenv').config();
// Import the Express package
// 'require' is a built-in Node.js function to include modules.
// In this case, we are importing the Express.js framework.
const connectDB = require('./config/db');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
// --- HIGHLIGHT: Import the new favoriteRoutes file ---
const favoriteRoutes = require('./routes/favoriteRoutes');

connectDB();
// Initialize an Express application
// We call the express() function to create a new application instance.
// This 'app' object will be used to configure our server.
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
// Define a port for the server to listen on
// Ports are like doors to a computer. Our server will "listen" on this door for any incoming network traffic.
// We choose a port number above 1024 to avoid conflicts with standard system services.
// We are hardcoding it for now, but we will soon make this dynamic using environment variables.
const PORT = process.env.PORT || 5000;

// Create a basic route to test the server
// app.get() is a method to define a handler for GET HTTP requests to a specific URL path.
// The first argument is the path, in this case, the root ('/').
// The second argument is a callback function that runs when a request hits this path.
// This function receives two important objects: 'req' (request) and 'res' (response).
app.get('/', (req, res) => {
  // The 'req' object contains information about the incoming request (e.g., headers, query parameters).
  // The 'res' object is used to send a response back to the client.
  // res.send() sends a response of various types; here, we send a simple string.
  res.send('API is running...');
});
app.use(notFound);
app.use(errorHandler);

// Start the server and make it listen on the specified port
// app.listen() binds the server to the specified port and starts listening for connections.
// The first argument is the port number.
// The second argument is an optional callback function that executes once the server starts successfully.
// It's a best practice to log a message to the console to confirm that the server is up and running.
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);