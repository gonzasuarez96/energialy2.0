const { Users } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userLogin = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.status = 400;
    throw error;
  };
  const foundUser = await Users.findOne({ where: { email: email } });
  if (!foundUser) {
    const error = new Error("Email not registered.");
    error.status = 401;
    throw error;
  };
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    const error = new Error("Incorrect password.");
    error.status = 401;
    throw error;
  };
  const accessToken = jwt.sign(
    { email: foundUser.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: 30 } // seconds count
  );
  const refreshToken = jwt.sign(
    { email: foundUser.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: 24 * 60 * 60 }
  );
  await foundUser.update({ refreshToken });
  return { accessToken, refreshToken };
};

module.exports = { userLogin }