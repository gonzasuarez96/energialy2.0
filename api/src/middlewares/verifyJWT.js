const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET } = process.env;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing access token.' });
  const accessToken = authHeader.split(' ')[1];
  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: err.message });
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
