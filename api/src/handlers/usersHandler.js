const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserProfile,
  resetPassword
} = require('../controllers/usersController');

const { sendPasswordEmail } = require("../services/sendPasswordEmail");

const sendEmailHandler = async (req, res) => {
  try {
    const { email } = req.body;
    sendPasswordEmail(email);
    res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getUsersHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const users = email ? await getUserByEmail(email) : await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateUserProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedUser = await updateUserProfile(id, newData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const resetPasswordHandler = async (req, res) => {
  try {
    await resetPassword(req, res); 
  } catch (error) {
    console.error('Error en el handler de restablecimiento de contraseña:', error);
    return res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor.' });
  }
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  updateUserProfileHandler,
  sendEmailHandler,
  resetPasswordHandler
};


