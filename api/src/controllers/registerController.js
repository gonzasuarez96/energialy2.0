const { Users } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require("../services/sendEmail");

const newUserRegister = async (email, password, firstName, lastName) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.status = 400;
    throw error;
  }

  const duplicate = await Users.findOne({ where: { email: email } });
  if (duplicate) {
    const error = new Error("Email already registered.");
    error.status = 409;
    throw error;
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    email,
    hashedPassword: hashedPwd,
    firstName,
    lastName
  });

  const token = jwt.sign({ userId: newUser.id }, 'secretKey', { expiresIn: '1d' });

  sendConfirmationEmail(email, token);

  return newUser;
};

module.exports = { newUserRegister }; 