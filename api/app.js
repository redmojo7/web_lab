const express = require('express');
const cors = require("cors");
const session = require('express-session');
const { passport } = require('./auth');
const { verifyToken } = require('./middleware');
const {connectToDB} = require('./db');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register'); // Import registerController
const loginRouter = require('./routes/login');
const commandsRouter = require('./routes/commands');
const exercisesRouter = require('./routes/exercises');



const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// Use the users router for /api/users requests
app.use('/api/users', verifyToken, usersRouter);

// Route for the login API
app.use('/api/login', loginRouter);

// Route for the register API
app.post('/api/register', registerRouter.register);

// Route for the commands API
app.use('/api/commands', commandsRouter);

// Route for the commands API
app.use('/api/exercises', exercisesRouter);

app.get('/', (req, res) => {
  //res.send('This Back-End Home Route');
  res.json({ message: "This Back-End Home Route!" });
});

app.get('/express_backend', (req, res) => { //Line 9
  res.json({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

// Connect to the database
connectToDB();

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
