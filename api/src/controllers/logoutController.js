const { Users } = require('../db');

const logout = async (cookies) => {
  if (!cookies?.jwt) {
    const error = new Error("No cookie to clear.");
    error.status = 204; // No content
    throw error;
  };
  const refreshToken = cookies.jwt;
  const foundUser = await Users.findOne({ where: { refreshToken: refreshToken } });
  if (!foundUser) {
    const error = new Error("No refresh token to delete found in db.");
    error.status = 204;
    throw error;
  };
  await foundUser.update({ refreshToken: null });
};

module.exports = { logout }