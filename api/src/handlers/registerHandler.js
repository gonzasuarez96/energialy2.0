const { newUserRegister } = require('../controllers/registerController');

const newUserRegisterHandler = async (req, res) => {
  try {
    const body = req.body;
    const newUser = await newUserRegister(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { newUserRegisterHandler };
