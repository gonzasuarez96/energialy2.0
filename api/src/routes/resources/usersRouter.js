const { Router } = require('express');
const {
  getUsersHandler,
  getUserByIdHandler,
  updateUserProfileHandler,
  deleteUserHandler,
  createUserHandler,
} = require('../../handlers/usersHandler');

const usersRouter = Router();

usersRouter.get('/', getUsersHandler);
usersRouter.get('/:id', getUserByIdHandler);
usersRouter.put('/:id', updateUserProfileHandler);
usersRouter.delete('/:id', deleteUserHandler);
usersRouter.post('/', createUserHandler);

module.exports = usersRouter;
