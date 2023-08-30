const { Categories, Subcategories } = require('../db');
const { Op } = require('sequelize');

const getAllCategories = async () => {
  const allCategories = await Categories.findAll();
  return allCategories;
};

const filterCategoriesByName = async (name) => {
  const filteredCategories = await Categories.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return filteredCategories;
};

const getCategoryByID = async (id) => {
  const foundCategory = await Categories.findByPk(id);
  if (!foundCategory) {
    const error = new Error(`Category with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return foundCategory;
};

const createCategory = async (name) => {
  if (!name) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  const newCategory = await Categories.create({ name });
  return newCategory;
};

const updateCategory = async (id, name, isActive) => {
  const foundCategory = await Categories.findByPk(id);
  if (!foundCategory) {
    const error = new Error(`Category with id ${id} not found.`);
    error.status = 404;
    throw error;
  };
  await foundCategory.update({ name, isActive });
  return foundCategory;
};

module.exports = {
  getAllCategories,
  filterCategoriesByName,
  getCategoryByID,
  createCategory,
  updateCategory
};
