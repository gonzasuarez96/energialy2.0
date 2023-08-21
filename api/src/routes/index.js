const { Router } = require('express');
const registerRouter = require('./register');
const authRouter = require('./auth');
const refreshRouter = require('./refresh');
const logoutRouter = require('./logout');

const router = Router();

// Auth Server
router.use('/register', registerRouter);
router.use('/auth', authRouter);
router.use('/refresh', refreshRouter);
router.use('/logout', logoutRouter);

// Resource Server

module.exports = router;