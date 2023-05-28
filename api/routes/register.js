const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const saltRounds = 10;

async function register(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const { rowCount } = await pool.query(checkUserQuery, [email]);
    if (rowCount > 0) {
      // User already exists, return an error response 
      return res.status(409).json({
        message: 'User already exists'
      });
    }

    // User doesn't exist, insert a new user
    const insertUserQuery = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email';
    const { rows } = await pool.query(insertUserQuery, [email, hashedPassword]);

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'User registered successfully',
      id: rows[0].id,
      email: rows[0].email,
      token
    });
  } catch (error) {
    console.error('Error while registering the user', error);
    res.status(500).json({
      message: 'An error occurred while registering the user'
    });
  }
}


module.exports = { register };
