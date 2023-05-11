const express = require('express');
const allBooks = require('./routers/books');
const allBooks2 = require('./routers/books2');
// Import the admin API router
const adminRouter = require('./routers/admin');
const {createDatabase} = require('./db');

// Create a new Express.js app instance
const app = express();
const port = 9700;



// Call the createDatabase function to create the LiteDB database and insert data
createDatabase();

app.use('/api/v1/books', allBooks);
app.use('/api/v2/books', allBooks2);
// Mount the admin API router to the /api/v1/admin endpoint
app.use('/api/v1/admin', adminRouter);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
