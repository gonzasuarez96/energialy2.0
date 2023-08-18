const { Router } = require("express");
const { userLoginHandler } = require("../handlers/authHandler");

const authRouter = Router();

authRouter.post('/', userLoginHandler);

module.exports = authRouter;