const { Router } = require('express');
const {
  getBankAccountsHandler,
  getBankAccountByIdHandler,
  createBankAccountHandler,
  updateBankAccountHandler,
  deleteBankAccountHandler,
} = require('../../handlers/bankAccountsHandler');

const bankAccountsRouter = Router();

bankAccountsRouter.get('/', getBankAccountsHandler);
bankAccountsRouter.get('/:id', getBankAccountByIdHandler);
bankAccountsRouter.post('/', createBankAccountHandler);
bankAccountsRouter.put('/:id', updateBankAccountHandler);
bankAccountsRouter.delete('/:id', deleteBankAccountHandler);

module.exports = bankAccountsRouter;
