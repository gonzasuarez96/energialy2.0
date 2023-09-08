const { Router } = require('express');
const {
  getProposalsHandler,
  getProposalByIdHandler,
  createProposalHandler,
  updateProposalHandler,
  deleteProposalHandler
} = require('../../handlers/proposalsHandler');

const proposalsRouter = Router();

proposalsRouter.get('/', getProposalsHandler);
proposalsRouter.get('/:id', getProposalByIdHandler);
proposalsRouter.post('/', createProposalHandler);
proposalsRouter.put('/:id', updateProposalHandler);
proposalsRouter.delete('/:id', deleteProposalHandler);

module.exports = proposalsRouter;