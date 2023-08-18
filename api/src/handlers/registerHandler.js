const { newUserRegister } = require('../controllers/registerController');

const newUserRegisterHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await newUserRegister(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = { newUserRegisterHandler };