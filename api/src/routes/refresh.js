const { Router } = require("express");
const { refreshTokenHandler } = require("../handlers/refreshTokenHandler");

const refreshRouter = Router();

refreshRouter.get('/', refreshTokenHandler);

module.exports = refreshRouter;