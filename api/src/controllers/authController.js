const { Users } = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { sendPasswordResetRequestEmail, sendPasswordResetSuccessfullyEmail } = require('../services/resend');

const userLogin = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }
  const foundUser = await Users.findOne({ where: { email: email } });
  if (!foundUser) {
    const error = new Error('Email not registered.');
    error.status = 401;
    throw error;
  }
  const match = await bcrypt.compare(password, foundUser.hashedPassword);
  if (!match) {
    const error = new Error('Incorrect password.');
    error.status = 401;
    throw error;
  }
  const accessToken = jwt.sign({ email: foundUser.email }, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
  const refreshToken = jwt.sign({ email: foundUser.email }, REFRESH_TOKEN_SECRET, { expiresIn: 24 * 60 * 60 });
  await foundUser.update({ refreshToken });
  return { accessToken, refreshToken };
};

const requestResetPassword = async (email) => {
  if (!email) {
    const error = new Error('There is no email on the body request.');
    error.status = 400;
    throw error;
  }
  const foundUser = await Users.findOne({ where: { email: email } });
  if (!foundUser) {
    const error = new Error(`User with email ${email} not found.`);
    error.status = 404;
    throw error;
  }
  let resetToken = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(resetToken, 10);
  await foundUser.update({ resetToken: hash });
  const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}&id=${foundUser.id}`;
  await sendPasswordResetRequestEmail(email, foundUser.firstName, resetLink);
  return resetLink;
};

const resetPassword = async (userId, token, password) => {
  if (!userId || !token || !password) {
    const error = new Error('Missing required body params.');
    error.status = 404;
    throw error;
  }
  const foundUser = await Users.findByPk(userId);
  if (!foundUser) {
    const error = new Error(`User with id ${userId} not found.`);
    error.status = 404;
    throw error;
  }
  if (!foundUser.resetToken) {
    const error = new Error('User has no password reset token.');
    error.status = 401;
    throw error;
  }
  const isValid = await bcrypt.compare(token, foundUser.resetToken);
  if (!isValid) {
    const error = new Error('Invalid or expired password reset token.');
    error.status = 401;
    throw error;
  }

  const hash = await bcrypt.hash(password, 10);
  await foundUser.update({ hashedPassword: hash });
  await sendPasswordResetSuccessfullyEmail(foundUser.email, foundUser.firstName);
  await foundUser.update({ resetToken: null });
  return true;
};

module.exports = { userLogin, requestResetPassword, resetPassword };
