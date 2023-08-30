const { logout } = require('../controllers/logoutController');

const logoutHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const foundUser = await logout(cookies);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { logoutHandler }