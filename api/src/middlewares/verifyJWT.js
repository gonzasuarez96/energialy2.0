const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.send(401).json({ error: "Missing access token" });
  console.log(authHeader); // "Bearer accessToken"
  const accessToken = authHeader.split(' ')[1];
  jwt.verify(
    accessToken,
    ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ error: err.message });
      req.user = decoded.email; // ¿¿ req.user ??
      next();
    }
  );
};

module.exports = { verifyJWT }