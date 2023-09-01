const { Router } = require('express');
const registerRouter = require('./register');
const authRouter = require('./auth');
const refreshRouter = require('./refresh');
const logoutRouter = require('./logout');
const verifyJWT = require('../middlewares/verifyJWT');
const usersRouter = require('./resources/usersRouter');
const companiesRouter = require('./resources/companiesRouter');
const categoriesRouter = require('./resources/categoriesRouter');
const subcategoriesRouter = require('./resources/subcategoriesRouter');
const locationsRouter = require('./resources/locationsRouter');
const organizationTypesRouter = require('./resources/organizationTypesRouter');

const router = Router();

// Auth Server
router.use('/register', registerRouter);
router.use('/auth', authRouter);
router.use('/refresh', refreshRouter);
router.use('/logout', logoutRouter);

// Resource Server
<<<<<<< HEAD
//router.use(verifyJWT);
=======
// router.use(verifyJWT);
>>>>>>> f6840d7137d30ec5a476453da81552875dd722e6
router.use('/users', usersRouter);
router.use('/companies', companiesRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter)
router.use('/locations', locationsRouter);
router.use('/organizationTypes', organizationTypesRouter);

module.exports = router;