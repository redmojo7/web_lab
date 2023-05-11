const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

router.get('/', (req, res) => {
  db = getDatabase();
  db.all('SELECT * FROM books LIMIT 2', [], (error, rows) => {
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

// Define a route for deleting a book
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  const bookId = req.params.id;

  db.run('DELETE FROM books WHERE id = ?', bookId, function (error) {
    if (error) {
      console.error('Error deleting book:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.sendStatus(204);
  });

  db.close((error) => {
    if (error) {
      console.error('Error closing database:', error);
    }
  });
});


module.exports = router;
