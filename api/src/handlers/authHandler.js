const { userLogin } = require('../controllers/authController');

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userLogin(email, password);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly not available for JavaScript & maxAge = 1 day
    res.status(200).json({ accessToken });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = { userLoginHandler }