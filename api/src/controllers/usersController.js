const { Users, Companies } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      // hashedPassword: users.hashedPassword,
      // refreshToken: users.refreshToken,
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
      attributes: ['id', 'name'],
    },
  });
  return cleanUsers(allUsers);
};

const getUserById = async (id) => {
  const foundUser = await Users.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
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
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
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
      attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
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

const resetPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    const user = await Users.findOne({ where: { email } });
    console.log('User:', user);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    user.hashedPassword = hashedPassword;
    await user.save();
    console.log('Password updated');

    return res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  getAllUsers,
  updateUserProfile,
  resetPassword,
  getUserById,
  getUserByEmail,
};
