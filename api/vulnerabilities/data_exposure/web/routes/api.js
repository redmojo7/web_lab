// import necessary modules
import getPublicIPAddress from '../ip.js';
import express from 'express';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { Pool } = pg;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// generate a salt to use when hashing the password
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const secret = 'mysecret';

const apiRouter = express.Router();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // default port for PostgreSQL
});

console.debug(`[api.js]: ${process.env.DB_USER} ${process.env.DB_HOST} ${process.env.DB_NAME} ${process.env.DB_PASSWORD}`);

apiRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.debug(`[login]: ${email} ${password}`)
  try {
    // Query the database for the user with the given email and password
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.debug(`[login] result: ${result.rows.length}`);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      //const hashedPassword = await bcrypt.hash(password, salt);
      //console.debug(`[login] hashedPassword: ${hashedPassword}`);
      // Compare the user's input password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // If the password matches, redirect to the homepage
        //res.redirect('/');
        // If the password matches, get the user's public IP address
        getPublicIPAddress().then(ipAddress => {
          console.log(`[login][${user.email}] IP address: ${ipAddress}`); // Output the IP address to the console
          // Update the database with the IP address
          pool.query('UPDATE users SET ip = $1 WHERE id = $2', [ipAddress, user.id])
        });
        res.send('Logged in');
      } else {
        // If the password doesn't match, redirect back to the login page with an error message
        res.render('index', { title: 'Login', email: email, error: 'Invalid email or password' });
      }
    } else {
      // If the user doesn't exist, redirect back to the login page with an error message
      res.render('index', { title: 'Login', email: email, error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.render('error', { title: 'Error', email: email, error: 'Something went wrong' });
  }
});


apiRouter.get('/register', async (req, res) => {

});

apiRouter.get('/anonymous', async (req, res) => {
  try {
    // Query the database to retrieve all users' information
    //const users = await pool.query('SELECT name, email, ip, profile_url, birthday FROM users');
    // Render the users' information to the page
    //res.render('anonymous', { users: users.rows, title: 'Anonymous' });
    res.render('anonymous', { users: [], title: 'Anonymous' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

apiRouter.get('/users', async (req, res) => {
  try {
    // Query the database to retrieve all users' information
    const users = await pool.query('SELECT name, email, ip, profile_url, birthday FROM users');
    // Render the users' information to the page
    res.send(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

apiRouter.get('/images/:id', (req, res) => {
  const id = req.params.id;
  const imagePath = path.join(__dirname, `./images/${id}.jpeg`);
  console.debug(`[images] ${imagePath}`);
  // Check if the file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Image not found');
  }

  // Read the file and send it in the response
  const file = fs.readFileSync(imagePath);
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(file, 'binary');
});


apiRouter.get('/resetpasswd', async (req, res) => {
  res.render('resetpasswd', {
    title: 'Reset Password',
    error: undefined,  // set error to null if it's not defined
    data: {}  // set data to an empty object if it's not defined
  });
});

apiRouter.post('/resetpasswd/check', async (req, res) => {
  const { email, dob, city } = req.body;
  console.debug(`[resetpasswd] ${email} ${dob} ${city}`)

  // Perform any necessary validation here
  const errorMsm = 'The information you provided does not match';
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      // User not found
      //return res.status(400).send('User not found');
      console.debug(`[resetpasswd] User not found`);
      return res.render('resetpasswd', { title: 'Reset Password', error: errorMsm, data: req.body });
    }

    if (user.rows.length > 1) {
      // Multiple users found
      console.debug(`[resetpasswd] Multiple users found`);
      return res.render('resetpasswd', { title: 'Reset Password', error: errorMsm, data: req.body });
    }

    const address = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [user.rows[0].id]);
    if (address.rows.length === 0) {
      // User has no address
      console.debug(`[resetpasswd] User has no address`);
      return res.render('resetpasswd', { title: 'Reset Password', error: errorMsm, data: req.body });
    }

    if (address.rows[0].city.toLowerCase() !== city.toLowerCase()) {
      // City does not match
      console.debug(`[resetpasswd] City does not match`);
      return res.render('resetpasswd', { title: 'Reset Password', error: errorMsm, data: req.body });
    }

    // Check if birthday matches
    console.debug(`[resetpasswd] user.birthday: ${user.rows[0].birthday}`);
    console.debug(`[resetpasswd] req.body.dob: ${req.body.dob}`);
    const userBirthday = new Date(user.rows[0].birthday).toISOString().substring(0, 10); // convert to ISO format (YYYY-MM-DD)
    const reqBirthday = req.body.dob;
    if (userBirthday !== reqBirthday) {
      console.debug(`[resetpasswd] Birthday does not match`);
      return res.render('resetpasswd', { title: 'Reset Password', error: errorMsm, data: req.body });
    }

    const payload = { user_id: user.rows[0].id };
    console.log(`[debug] payload: ${JSON.stringify(payload)}`);

    const token = jwt.sign(payload, secret);
    console.debug(`[resetpasswd] token: ${token}`)
    res.render('reset', { title: 'Reset Password', token: token});
    // Send email with password reset link

  } catch (err) {
    console.error(`[resetpasswd] Error: ${err.message}`);
    res.status(500).send('Internal server error');
  }
});

apiRouter.post('/reset/action', async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.query;

  // Verify that passwords match
  if (password !== confirmPassword) {
    return res.render('reset', { title: 'Reset Password', token: token, error: "Passwords do not match"});
  }

  try {
    // Decode the JWT token to get the user_id
    console.debug(`[reset] token: ${token}`)
    console.debug(`[reset] secret: ${secret}`)
    const decoded = jwt.verify(token, secret);
    console.debug(`[reset] decoded: ${JSON.stringify(decoded)}`);

    console.log(`[reset] reset Password for [user_id]=: ${decoded.user_id}`)

    const hashedPassword = await bcrypt.hash(password, salt);

    // Perform password reset operations using the user_id
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decoded.user_id]);
    // Redirect to login page after successful password reset
    //return res.render('reset', { title: 'Reset Password', token: token, resetSuccess: true });
    return res.redirect('/');
  } catch (err) {
    console.error(`Error decoding token: ${err.message}`);
    return res.status(400).send('Invalid or expired token');
  }
});


// export apiRouter
export default apiRouter;