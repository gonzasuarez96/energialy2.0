const { Router } = require('express');
const {
  // getUsersHandler,
  // getUserByIDHandler,
  // createUserHandler,
  // updateUserHandler,
  // deleteUserHandler
} = require('../../handlers/usersHandler');

const usersRouter = Router();

// usersRouter.get('/', getUsersHandler);
// usersRouter.get('/:id', getUserByIDHandler);
// usersRouter.post('/', createUserHandler);
// usersRouter.put('/:id', updateUserHandler);
// usersRouter.delete('/:id', deleteUserHandler);

module.exports = usersRouter;