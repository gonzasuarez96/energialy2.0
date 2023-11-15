const { Router } = require('express');
const { postInviteCompaniesHandler } = require('../../handlers/inviteCompaniesHandler');

const inviteCompaniesRouter = Router();

inviteCompaniesRouter.post('/', postInviteCompaniesHandler);

module.exports = inviteCompaniesRouter;
