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

module.exports =  { connectToDB, pool };