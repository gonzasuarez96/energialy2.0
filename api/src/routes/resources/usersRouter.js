const { Router } = require('express');
const {
  getUsersHandler,
<<<<<<< HEAD
   getUserByIDHandler,
   updateUserProfileHandler,
   sendEmailHandler,
   resetPasswordHandler,
=======
  getUserByIdHandler,
  updateUserProfileHandler,
>>>>>>> 19b26a991e37cccaace56b48e01e7a990936ed1d
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