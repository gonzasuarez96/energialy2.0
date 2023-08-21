const { logout } = require('../controllers/logoutController');

const logoutHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = await logout(cookies);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ accessToken });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = { logoutHandler }