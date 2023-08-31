const { Users } = require('../db');

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  return allUsers;
};

const getUserByID = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return user;
};

const updateUserProfile = async (id, newData) => {
  const user = await Users.findByPk(id);
  if (!user) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await user.update(newData);
  return user;
};

module.exports = {
  getAllUsers,
  getUserByID,
  updateUserProfile
};

