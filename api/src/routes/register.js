const { Router } = require('express');
const { newUserRegisterHandler } = require('../handlers/registerHandler');

const registerRouter = Router();

registerRouter.post('/', newUserRegisterHandler);

module.exports = registerRouter;
