const { Router } = require('express');
const {
  getSubcategoriesHandler,
  getSubcategoryByIdHandler,
  createSubcategoryHandler,
  updateSubcategoryHandler,
  deleteSubcategoryHandler
} = require('../../handlers/subcategoriesHandler');

const subcategoriesRouter = Router();

subcategoriesRouter.get('/', getSubcategoriesHandler);
subcategoriesRouter.get('/:id', getSubcategoryByIdHandler);
subcategoriesRouter.post('/', createSubcategoryHandler);
subcategoriesRouter.put('/:id', updateSubcategoryHandler);
subcategoriesRouter.delete('/:id', deleteSubcategoryHandler);

module.exports = subcategoriesRouter;