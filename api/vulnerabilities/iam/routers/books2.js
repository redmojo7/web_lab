const express = require('express');
const router = express.Router();
const {getDatabase} = require('../db');

router.get('/', (req, res) => {
  db = getDatabase();
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

    res.render('book', { title: 'Books', books: books });
  });

  db.close((error) => {
    if (error) {
      console.error('Error closing database:', error);
    }
  });
});

module.exports = router;
