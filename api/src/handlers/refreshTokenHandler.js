const { refreshToken } = require('../controllers/refreshTokenController');

const refreshTokenHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = await refreshToken(cookies);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { refreshTokenHandler }