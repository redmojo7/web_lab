const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

function createDatabase() {
  const dbFile = 'books.db';

  // Delete the old database file if it exists
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
  const db = new sqlite3.Database('books.db');

  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' }
  ];

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT)');

    const insertStmt = db.prepare('INSERT INTO books (id, title, author) VALUES (?, ?, ?)');

    books.forEach(book => {
      insertStmt.run(book.id, book.title, book.author);
    });

    insertStmt.finalize();
  });

  db.close();
}

function getDatabase() {
  return new sqlite3.Database('books.db');
}

module.exports = {
  createDatabase,
  getDatabase
};
