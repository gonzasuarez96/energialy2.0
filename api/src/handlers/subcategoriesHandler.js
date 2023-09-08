const {
  getAllSubcategories,
  filterSubcategoriesByName,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategoriesController');

const getSubcategoriesHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const subcategories = filter ? await filterSubcategoriesByName(filter) : await getAllSubcategories();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getSubcategoryByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSubcategory = await getSubcategoryById(id);
    res.status(200).json(foundSubcategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createSubcategoryHandler = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newSubcategory = await createSubcategory(name, categoryId);
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateSubcategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const updatedSubcategory = await updateSubcategory(id, name, isActive);
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteSubcategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingSubcategories = await deleteSubcategory(id);
    res.status(200).json(remainingSubcategories);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getSubcategoriesHandler,
  getSubcategoryByIdHandler,
  createSubcategoryHandler,
  updateSubcategoryHandler,
  deleteSubcategoryHandler
}