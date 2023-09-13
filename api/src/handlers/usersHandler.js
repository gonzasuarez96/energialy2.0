const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserProfile,
} = require("../controllers/usersController");

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

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  updateUserProfileHandler,
};
