const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//Passport
const passport = require('passport');
const saml = require('passport-saml');
const fs = require('fs');
const path = require('path');


const port = 9100;

var app = express();
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

console.log("DIRNAME: ", __dirname + '/certs/');


// read the file synchronously
const usersJson = fs.readFileSync('users.json');

// parse the JSON into a JavaScript object
const users = JSON.parse(usersJson);
console.log(users);

const hostname = process.env.HOSTNAME || 'localhost';

passport.serializeUser((user, done) => {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});


var samlStrategy = new saml.Strategy({
    //config options here
    callbackUrl: `http://${hostname}:9100/login/callback`,
    entryPoint: `http://${hostname}:9200/simplesaml/saml2/idp/SSOService.php`,
    issuer: 'saml-poc',
    identifierFormat: null,
    decryptionPvk: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
    privateCert: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/idp_key.pem', 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true
}, (profile, done) => {
    return done(null, profile);
});

passport.use('samlStrategy', samlStrategy);














app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize({}));
app.use(passport.session({}));





//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login',
    (req, res, next) => {
        console.log('-----------------------------');
        console.log('/Start login handler');
        next();
    },
    passport.authenticate('samlStrategy'),
);

app.post('/login/callback',
    (req, res, next) => {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    (req, res) => {
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log('SAML attributes:', req.user);
        console.log('-----------------------------');
        // If the current user is an administrator, render the administration view
        if (req.user.email === "admin@example.com") {
            
            res.render('admin', { users: users });
        }
        // Otherwise, render the user profile view
        else {
            res.render('profile', { user: req.user });
        }
        //res.send(`User (${JSON.stringify(req.user, null, 2)}) Log in Callback Success`);
    }
);

app.get('/metadata',
    function (req, res) {
        res.type('application/xml');
        res.status(200).send(
            samlStrategy.generateServiceProviderMetadata(
                fs.readFileSync(__dirname + '/cert.pem', 'utf8'),
                fs.readFileSync(__dirname + '/cert.pem', 'utf8')
            )
        );
    }
);




app.listen(9100, () => {
    console.log(`Listening on port ${port}`);
});