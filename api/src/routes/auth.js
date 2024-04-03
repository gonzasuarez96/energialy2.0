const { Router } = require('express');
const { userLoginHandler, requestResetPasswordHandler, resetPasswordHandler } = require('../handlers/authHandler');

const authRouter = Router();

authRouter.post('/', userLoginHandler);
authRouter.post('/requestResetPassword', requestResetPasswordHandler);
authRouter.post('/resetPassword', resetPasswordHandler);

module.exports = authRouter;
