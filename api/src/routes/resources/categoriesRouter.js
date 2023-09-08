const { Router } = require('express');
const {
  getCategoriesHandler,
  getCategoryByIDHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} = require('../../handlers/categoriesHandler');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategoriesHandler);
categoriesRouter.get('/:id', getCategoryByIDHandler);
categoriesRouter.post('/', createCategoryHandler);
categoriesRouter.put('/:id', updateCategoryHandler);
categoriesRouter.delete('/:id', deleteCategoryHandler);

module.exports = categoriesRouter;