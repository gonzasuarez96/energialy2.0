const { Users } = require('../db');
const bcrypt = require('bcrypt');

const newUserRegister = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.status = 400;
    throw error;
  };
  const duplicate = await Users.findOne({ where: { email: email } });
  if (duplicate) {
    const error = new Error("Email already registered.");
    error.status = 409;
    throw error;
  };
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    email: email,
    hashedPassword: hashedPwd,
  });
  return newUser;
};

module.exports = { newUserRegister }