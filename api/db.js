const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // default port for PostgreSQL
  });

async function connectToDB() {
  try {
    await pool.connect();
    console.log('Connected to the database!');
    return pool;
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}


// Get a user by email
async function getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    console.debug(`[getUserByEmail]: ${query.values}`);
    const { rows } = await pool.query(query);
    console.debug(`[getUserByEmail] rows.length = : ${rows.length}`);
    return rows[0];
  }
  
  // Get a user by ID
  async function getUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }
  
  module.exports = {
    connectToDB, 
    pool,
    getUserByEmail,
    getUserById,
  };