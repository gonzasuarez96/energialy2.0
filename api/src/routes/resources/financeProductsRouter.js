const { Router } = require('express');
const {
  getFinanceProductsHandler,
  getFinanceProductByIdHandler,
  createFinanceProductHandler,
  updateFinanceProductHandler,
  deleteFinanceProductHandler,
} = require('../../handlers/financeProductsHandler');

const financeProductsRouter = Router();

financeProductsRouter.get('/', getFinanceProductsHandler);
financeProductsRouter.get('/:id', getFinanceProductByIdHandler);
financeProductsRouter.post('/', createFinanceProductHandler);
financeProductsRouter.put('/:id', updateFinanceProductHandler);
financeProductsRouter.delete('/:id', deleteFinanceProductHandler);

module.exports = financeProductsRouter;
