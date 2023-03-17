const express = require('express');
const cors = require("cors");
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  //res.send('This Back-End Home Route');
  res.json({ message: "This Back-End Home Route!" });
});

app.get('/express_backend', (req, res) => { //Line 9
  res.json({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

// test for PostgreSQL


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // default port for PostgreSQL
});


app.get('/db', (req, res) => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('PostgreSQL connected:', res.rows[0].now);
    pool.end();
  });
  res.json({ message: "PostgreSQL connected:"});
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
