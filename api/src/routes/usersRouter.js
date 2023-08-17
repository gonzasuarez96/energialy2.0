const { Router } = require("express");
const {
  userRegisterHandler,
  userLoginHandler,
  // getAllUsersHandler,
} = require("../handlers/usersHandler");

const usersRouter = Router();

usersRouter.post("/register", userRegisterHandler);
usersRouter.post("/auth", userLoginHandler);
// usersRouter.get("/", getAllUsersHandler);

module.exports = usersRouter;
