const { Router } = require('express');
const usersRouter = require('./usersRouter.js');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;