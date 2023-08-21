const { Router } = require("express");
const { logoutHandler } = require("../handlers/logoutHandler");

const logoutRouter = Router();

logoutRouter.get('/', logoutHandler);

module.exports = logoutRouter;