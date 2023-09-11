const { Users } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
  getUserByID,
  updateUserProfile,
  resetPassword,

};

