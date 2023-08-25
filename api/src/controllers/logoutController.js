const { Users } = require('../db');

const logout = async (cookies) => {
  if (!cookies?.jwt) {
    const error = new Error("No cookies to clear.");
    error.status = 404; // No content
    throw error;
  };
  const refreshToken = cookies.jwt;
  const foundUser = await Users.findOne({ where: { refreshToken: refreshToken } });
  if (!foundUser) {
    const error = new Error("No user to log out.");
    error.status = 404;
    throw error;
  };
  await foundUser.update({ refreshToken: null });
  return foundUser;
};

module.exports = { logout }