const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByEmail, getUserById } = require('./db');

// Initialize Passport and use the "local" strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      console.debug(`login authentication: email: ${email}`);
      console.debug(`login authentication: user: ${user}`);
      if (!user) {
        console.debug(`login authentication: user not found: ${email}`);
        return done(null, false, { message: 'Incorrect email or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.debug(`login authentication: password did not match: ${email}`);
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = { passport };
