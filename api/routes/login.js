const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user) => {
        if (err || !user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        req.login(user, { session: false }, async (err) => {
          if (err) {
            res.send(err);
          }
    
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          res.status(200).json({ id: user.id, email: user.email, token: token });
        });
      })(req, res);
});

module.exports = router;
