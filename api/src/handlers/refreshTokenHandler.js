const { refreshToken } = require('../controllers/refreshTokenController');

const refreshTokenHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = await refreshToken(cookies);
    res.status(200).json({ accessToken });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = { refreshTokenHandler }