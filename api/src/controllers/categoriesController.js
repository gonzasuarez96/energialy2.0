const { Categories, Subcategories } = require('../db');
const { Op } = require('sequelize');

const getAllCategories = async () => {
  const allCategories = await Categories.findAll({
    include: {
      model: Subcategories,
      attributes: ["id", "name"]
    }
  });
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
  const foundCategory = await Categories.findByPk(id, {
    include: {
      model: Subcategories,
      attributes: ["id", "name"]
    }
  });
  if (!foundCategory) {
    const foundSubcategory = await Subcategories.findByPk(id, {
      include: {
        model: Categories,
        attributes: ["id", "name"]
      }
    });
    if (!foundSubcategory) {
      const error = new Error(`Category with id ${id} not found.`);
      error.status = 404;
      throw error;
    };
    const foundSubcategoryJSON = {
      id: foundSubcategory.id,
      name: foundSubcategory.name,
      parentCategory: foundSubcategory.Category,
      isActive: foundSubcategory.isActive,
      createdAt: foundSubcategory.createdAt,
      updatedAt: foundSubcategory.updatedAt
    }
    return foundSubcategoryJSON;
  }
  const foundCategoryJSON = {
    id: foundCategory.id,
    name: foundCategory.name,
    subcategories: foundCategory.Subcategories,
    isActive: foundCategory.isActive,
    createdAt: foundCategory.createdAt,
    updatedAt: foundCategory.updatedAt
  }
  return foundCategoryJSON;
};

const createCategory = async (name, parentID) => {
  if (!name) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  if (parentID) {
    const foundCategory = await Categories.findByPk(parentID);
    const newSubcategory = await Subcategories.create({ name });
    await newSubcategory.setCategory(foundCategory);
    return newSubcategory;
  } else {
    const newCategory = await Categories.create({ name });
    return newCategory;
  };
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
