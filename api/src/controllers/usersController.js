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
    const { email } = req.params; // Obtener el correo electrónico desde los parámetros de la URL
    const { newPassword } = req.body; // Obtener la nueva contraseña desde el cuerpo de la solicitud

    // Hashear la nueva contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    // Buscar al usuario por su correo electrónico
    const user = await Users.findOne({ where: { email } });
    console.log('User:', user);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Actualizar la contraseña en la base de datos para el usuario correspondiente
    user.hashedPassword = hashedPassword; // Asegúrate de actualizar el campo correcto (hashedPassword)
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

