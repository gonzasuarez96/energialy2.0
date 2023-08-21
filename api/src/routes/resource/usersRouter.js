const { Router } = require("express");
const {
  // getAllUsersHandler,
} = require("../../handlers/usersHandler");

const usersRouter = Router();

// usersRouter.get("/", getAllUsersHandler);

module.exports = usersRouter;
