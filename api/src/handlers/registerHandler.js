const { newUserRegister } = require('../controllers/registerController');

const newUserRegisterHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newUser = await newUserRegister(email, password, firstName, lastName);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { newUserRegisterHandler };