const {
    getAllUsers,
    getUserByID,
    updateUserProfile,
  } = require('../controllers/usersController');
  
  const getUsersHandler = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
  
  const getUserByIDHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserByID(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
  
  const updateUserProfileHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body; // Nuevos datos para el perfil del usuario
      const updatedUser = await updateUserProfile(id, newData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getUsersHandler,
    getUserByIDHandler,
    updateUserProfileHandler,
  };