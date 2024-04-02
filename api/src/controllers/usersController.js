const { Users, Companies } = require('../db');

const cleanUsers = (users) => {
  if (Array.isArray(users)) {
    const cleanUsersArray = users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      company: user.Company,
      isActive: user.isActive,
    }));
    return cleanUsersArray;
  } else {
    const cleanUserDetail = {
      id: users.id,
      email: users.email,
      hashedPassword: users.hashedPassword,
      refreshToken: users.refreshToken,
      resetToken: users.resetToken,
      firstName: users.firstName,
      lastName: users.lastName,
      position: users.position,
      role: users.role,
      company: users.Company,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    };
    return cleanUserDetail;
  }
};

const getAllUsers = async () => {
  const allUsers = await Users.findAll({
    include: {
      model: Companies,
      attributes: ['id', 'name', 'subscription'],
    },
  });
  return cleanUsers(allUsers);
};

const getUserById = async (id) => {
  const foundUser = await Users.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture', 'subscription'],
    },
  });
  if (!foundUser) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanUsers(foundUser);
};

const getUserByEmail = async (email) => {
  const foundUser = await Users.findOne({
    where: { email: email },
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture', 'subscription'],
    },
  });
  if (!foundUser) {
    const error = new Error(`User with email ${email} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanUsers(foundUser);
};

const updateUserProfile = async (id, newData) => {
  const foundUser = await Users.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture', 'subscription'],
    },
  });
  if (!foundUser) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundUser.update(newData);
  return cleanUsers(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserProfile,
};
