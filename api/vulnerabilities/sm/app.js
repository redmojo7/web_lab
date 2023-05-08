const express = require('express');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
const uuid = require('uuid');
var crypto = require('crypto');
const http = require('http');
const db = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1); // enable this if you run behind a proxy (e.g. nginx)
app.set('view engine', 'ejs'); // set the view engine


// Limit login attempts to 5 per 5 minutes
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // 5 requests
    message: "Too many login attempts, please try again later",
});

//Configure redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

const RedisStore = connectRedis(session)


redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

redisClient.flushall((err, succeeded) => {
    if (err) {
        console.error(err);
    } else {
        console.log("All keys cleared from all databases");
    }
});

// Strings
const secret = 'secret$%^134';

redisClient.set('secret', secret, function (err, reply) {
    console.log('set secret:', reply); // OK
});

//Configure session middleware
app.use(session({
    store: new RedisStore({
        client: redisClient,
        stringify: false,
        parse: false
    }),
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        signed: false,
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

app.get("/", (req, res) => {
    const sess = req.session;
    if (sess.username && sess.password) {
        if (sess.username) {
            res.render('home', { username: sess.username });
        }
    } else {
        res.sendFile(__dirname + "/login.html")
    }
});

app.post("/login", limiter, (req, res) => {
    const sess = req.session;
    const { username, password } = req.body;

    console.debug(`login attempt for ----->> ${username}/${password}`);

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }

        if (!row) {
            console.debug(`User ${username} does not exist`);
            res.status(401).end("Wrong Username/Password!");
            return;
        }

        if (row.password === password) {
            sess.username = username;
            sess.password = password;
            console.debug(`login success for ${username}`);
            res.status(200).end("Successfully logged in");
        } else {
            console.debug(`login failed for ${username}.`);
            res.status(401).end("Wrong Username/Password!");
        }
    });
});



app.post("/register", (req, res) => {
    const sess = req.session;
    const { username, password } = req.body;

    // check if user already exists
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }

        if (row) {
            console.debug(`User ${username} already exists`);
            res.status(409).end("Username already taken");
            return;
        }

        // insert new user
        db.run(`INSERT INTO users(username, password) VALUES (?, ?)`, [username, password], (err) => {
            if (err) {
                console.error(err);
                res.status(500).end();
                return;
            }
            console.debug(`Registered successfully for ${username}`);
            res.status(201).end("Registered successfully");
        });
    });
});



app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
    });
});

app.listen(9600, () => {
    console.log("Server started at port 3000")
});

const options = {
    host: 'localhost',
    port: 9600,
    path: '/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const username = 'admin';
const password = 'Vc2udrT74%dc@D';

const data = JSON.stringify({
    username: username,
    password: password
});

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log(body);
    });
    console.debug(`statusCode: ${res.statusCode}`);
});
req.on('error', (error) => {
    console.error(error);
});
req.write(data);
req.end();