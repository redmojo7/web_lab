const jwt = require('jsonwebtoken');
const { getUserById } = require('./db');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
      console.debug(`authentication - decodedToken.id: ${decodedToken.id}`);
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        const user = await getUserById(decodedToken.id);
        if (!user) {
          return res.status(401).json({ error: "Unauthorized access" });
        }
        console.debug(`authentication: for user: ${user.email}`);
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Missing token' });
  }
};

module.exports = {
  verifyToken,
};
