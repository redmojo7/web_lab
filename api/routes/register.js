const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const saltRounds = 10;

async function register(req, res) {
  const { email, password, first_name, last_name } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const queryText = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email';
    const { rows } = await pool.query(queryText, [email, hashedPassword, first_name, last_name]);

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'User registered successfully',
      id: rows[0].id,
      email: rows[0].email,
      token
    });
  } catch (error) {
    console.error('Error while inserting user into the database', error);
    res.status(500).json({
      message: 'An error occurred while registering the user'
    });
  }
}

module.exports = { register };
