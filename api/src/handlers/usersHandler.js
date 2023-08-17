const {
  userRegister,
  userLogin,
} = require('../controllers/usersController');

const userRegisterHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await userRegister(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwt = await userLogin(email, password);
    res.status(200).json({ msg: "Login successful!"});
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = {
  userRegisterHandler,
  userLoginHandler,
}