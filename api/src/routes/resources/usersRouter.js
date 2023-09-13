const { Router } = require('express');
const {
  getUsersHandler,
  getUserByIdHandler,
  updateUserProfileHandler,
  // createUserHandler,
  // deleteUserHandler,
} = require('../../handlers/usersHandler');

const usersRouter = Router();

usersRouter.get('/', getUsersHandler);
usersRouter.get('/:id', getUserByIdHandler);
usersRouter.put('/:id', updateUserProfileHandler);
// usersRouter.delete('/:id', deleteUserHandler);

module.exports = usersRouter;