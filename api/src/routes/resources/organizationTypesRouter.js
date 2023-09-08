const { Router } = require('express');
const {
  getOrganizationTypesHandler,
  getOrganizationTypeByIDHandler,
  createOrganizationTypeHandler,
  updateOrganizationTypeHandler,
  // deleteOrganizationTypeHandler
} = require('../../handlers/organizationTypesHandler');

const organizationTypesRouter = Router();

organizationTypesRouter.get('/', getOrganizationTypesHandler);
organizationTypesRouter.get('/:id', getOrganizationTypeByIDHandler);
organizationTypesRouter.post('/', createOrganizationTypeHandler);
organizationTypesRouter.put('/:id', updateOrganizationTypeHandler);
// organizationTypesRouter.delete('/:id', deleteOrganizationTypeHandler);

module.exports = organizationTypesRouter;