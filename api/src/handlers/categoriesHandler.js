const {
  getAllCategories,
  filterCategoriesByName,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController');

const getCategoriesHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const categories = filter ? await filterCategoriesByName(filter) : await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getCategoryByIDHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCategory = await getCategoryByID(id);
    res.status(200).json(foundCategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createCategoryHandler = async (req, res) => {
  try {
    const { name, categoryID } = req.body;
    const newCategory = await createCategory(name, categoryID);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const updatedCategory = await updateCategory(id, name, isActive);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingCategories = await deleteCategory(id);
    res.status(200).json(remainingCategories);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getCategoriesHandler,
  getCategoryByIDHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
}