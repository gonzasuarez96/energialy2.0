const { Router } = require('express');
const registerRouter = require('./register');
const authRouter = require('./auth');
const refreshRouter = require('./refresh');
const logoutRouter = require('./logout');

const rootRouter = Router();

// Auth Server
rootRouter.use('/register', registerRouter);
rootRouter.use('/auth', authRouter);
// rootRouter.use('/refresh', refreshRouter);
// rootRouter.use('/logout', logoutRouter);

// Resource Server

module.exports = rootRouter;