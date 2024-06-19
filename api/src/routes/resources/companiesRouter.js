const { Router } = require('express');
const {
  getCompaniesHandler,
  getCompanyByIdHandler,
  createCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} = require('../../handlers/companiesHandler');

const companiesRouter = Router();

companiesRouter.get('/', getCompaniesHandler);
companiesRouter.get('/:id', getCompanyByIdHandler);
companiesRouter.post('/', createCompanyHandler);
companiesRouter.put('/:id', updateCompanyHandler);
companiesRouter.delete('/:id', deleteCompanyHandler);

module.exports = companiesRouter;