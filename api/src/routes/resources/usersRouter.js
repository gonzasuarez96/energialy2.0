const { Router } = require('express');
const {
  getUsersHandler,
  getUserByIdHandler,
  updateUserProfileHandler,
  sendEmailHandler,
  resetPasswordHandler,
  // createUserHandler,
  // deleteUserHandler,
} = require('../../handlers/usersHandler');

const usersRouter = Router();

usersRouter.get('/', getUsersHandler);
usersRouter.get('/:id', getUserByIdHandler);
usersRouter.put('/:id', updateUserProfileHandler);
usersRouter.post('/enviar-email', sendEmailHandler);
usersRouter.post('/reset-password/:email', resetPasswordHandler);
// usersRouter.delete('/:id', deleteUserHandler);

module.exports = usersRouter;