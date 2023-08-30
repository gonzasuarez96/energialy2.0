const { userLogin } = require('../controllers/authController');

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userLogin(email, password);
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly not available for JavaScript & maxAge = 1 day
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { userLoginHandler }