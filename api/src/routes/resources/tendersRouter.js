const { Router } = require('express');
const {
  getTendersHandler,
  getTenderByIdHandler,
  createTenderHandler,
  updateTenderHandler,
  deleteTenderHandler
} = require('../../handlers/tendersHandler');

const tendersRouter = Router();

tendersRouter.get('/', getTendersHandler);
tendersRouter.get('/:id', getTenderByIdHandler);
tendersRouter.post('/', createTenderHandler);
tendersRouter.put('/:id', updateTenderHandler);
tendersRouter.delete('/:id', deleteTenderHandler);

module.exports = tendersRouter;