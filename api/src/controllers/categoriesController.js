const { Categories, Subcategories, Companies } = require('../db');
const { Op } = require('sequelize');

const cleanCategories = (categories) => {
  if (Array.isArray(categories)) {
    const cleanCategoriesArray = categories.map((category) => ({
      id: category.id,
      name: category.name,
      subcategories: category.Subcategories,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
    return cleanCategoriesArray;
  } else {
    const cleanCategoryObj = {
      id: categories.id,
      name: categories.name,
      subcategories: categories.Subcategories,
      companies: categories.Companies,
      isActive: categories.isActive,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
    };
    return cleanCategoryObj;
  }
};

const getAllCategories = async () => {
  const allCategories = await Categories.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Subcategories,
      attributes: ['id', 'name', 'isActive'],
    },
  });
  return cleanCategories(allCategories);
};

const filterCategoriesByName = async (name) => {
  const filteredCategories = await Categories.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Subcategories,
      attributes: ['id', 'name', 'isActive'],
    },
  });
  return cleanCategories(filteredCategories);
};

const getCategoryByID = async (id) => {
  const foundCategory = await Categories.findByPk(id, {
    include: [
      {
        model: Subcategories,
        attributes: ['id', 'name', 'isActive'],
      },
      {
        model: Companies,
        attributes: ['id', 'name', 'foundationYear', 'annualRevenue', 'employeeCount', 'isActive'],
        through: { attributes: [] },
      },
    ],
  });
  if (!foundCategory) {
    const error = new Error(`Category with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanCategories(foundCategory);
};

const createCategory = async (name) => {
  if (!name) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const newCategory = await Categories.create({ name });
  return cleanCategories(newCategory);
};

const updateCategory = async (id, name, isActive) => {
  const foundCategory = await Categories.findByPk(id, {
    include: {
      model: Subcategories,
      attributes: ['id', 'name', 'isActive'],
    },
  });
  if (!foundCategory) {
    const error = new Error(`Category with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundCategory.update({ name, isActive });
  for (const subcategory of foundCategory.Subcategories) {
    const subcategoryInstance = await Subcategories.findByPk(subcategory.id);
    await subcategoryInstance.update({ isActive });
  }
  return cleanCategories(foundCategory);
};

const deleteCategory = async (id) => {
  const foundCategory = await Categories.findByPk(id);
  if (!foundCategory) {
    const error = new Error(`Category with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  if (foundCategory.Subcategories) {
    const error = new Error(`Category with id ${id} have subcategories. Must delete all subcategories first.`);
    error.status = 403;
    throw error;
  }
  await foundCategory.destroy();
  const remainingCategories = await Categories.findAll({
    include: {
      model: Subcategories,
      attributes: ['id', 'name', 'isActive'],
    },
  });
  return cleanCategories(remainingCategories);
};

module.exports = {
  getAllCategories,
  filterCategoriesByName,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
};
