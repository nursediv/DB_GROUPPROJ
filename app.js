const express = require('express');
const cors = require('cors');

// Instantiate the express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next(); // Pass control to the next handler
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Art Gallery API' });
});

const artworksRoutes = require('./routes/artworks');
app.use('/api/artworks', artworksRoutes);

// Catch-all for 404 Not Found responses
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;