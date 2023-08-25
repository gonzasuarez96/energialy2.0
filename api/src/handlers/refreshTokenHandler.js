const { refreshToken } = require('../controllers/refreshTokenController');

const refreshTokenHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const newAccessToken = await refreshToken(cookies);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { refreshTokenHandler }