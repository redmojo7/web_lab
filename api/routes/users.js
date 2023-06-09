const express = require('express');
const router = express.Router();
const {pool} = require('../db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/*
// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //Check if user ID in token matches the ID in the request
    
    if (req.user.id !== parseInt(id)) {
      return res.status(401).send('Unauthorized');
    }
    
    console.debug(sql);
    const { rows } = await pool.query(sql);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
*/

// Create a user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const { rows } = await pool.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const { rows } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const { id } = req.user;
    const { rows } = await pool.query('SELECT email, first_name, last_name FROM users WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const {email, first_name, last_name} = rows[0];
    res.json({email, first_name, last_name});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
