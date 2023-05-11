// Import the Express.js framework
const express = require('express');
const ejs = require('ejs');
const { getDatabase } = require('../db');

// Create a new router instance
const router = express.Router();

// Define a route for the /api/v1/admin endpoint
router.get('/', (req, res) => {
  const db = getDatabase();

  db.all('SELECT * FROM books', [], (error, rows) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const books = rows.map(row => ({
      id: row.id,
      title: row.title,
      author: row.author
    }));

    res.render('admin', { title: 'Admin', books: books });
  });

  db.close((error) => {
    if (error) {
      console.error('Error closing database:', error);
    }
  });
});

// Export the router so it can be mounted in the main app
module.exports = router;
