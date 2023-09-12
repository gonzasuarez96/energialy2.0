const { Users } = require('../db');

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  return allUsers;
};

const getUserById = async (id) => {
  const foundUser = await Users.findByPk(id);
  if (!foundUser) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return foundUser;
};

const updateUserProfile = async (id, newData) => {
  const foundUser = await Users.findByPk(id);
  if (!foundUser) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundUser.update(newData);
  return foundUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserProfile
};

