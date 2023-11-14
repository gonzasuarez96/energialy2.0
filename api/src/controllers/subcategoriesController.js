const { Subcategories, Categories, Companies } = require('../db');
const { Op } = require('sequelize');

const cleanSubcategories = (subcategories) => {
  if (Array.isArray(subcategories)) {
    const cleanSubcategoriesArray = subcategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      parentCategory: subcategory.Category,
      isActive: subcategory.isActive,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }));
    return cleanSubcategoriesArray;
  } else {
    const cleanSubcategoriesObj = {
      id: subcategories.id,
      name: subcategories.name,
      parentCategory: subcategories.Category,
      companies: subcategories.Companies,
      isActive: subcategories.isActive,
      createdAt: subcategories.createdAt,
      updatedAt: subcategories.updatedAt,
    };
    return cleanSubcategoriesObj;
  }
};

const getAllSubcategories = async () => {
  const allSubcategories = await Subcategories.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Categories,
      attributes: ['id', 'name'],
    },
  });
  return cleanSubcategories(allSubcategories);
};

const filterSubcategoriesByName = async (name) => {
  const filteredSubcategories = await Subcategories.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Categories,
      attributes: ['id', 'name', 'isActive'],
    },
  });
  return cleanSubcategories(filteredSubcategories);
};

const getSubcategoryById = async (id) => {
  const foundSubcategory = await Subcategories.findByPk(id, {
    include: [
      {
        model: Categories,
        attributes: ['id', 'name', 'isActive'],
      },
      {
        model: Companies,
        attributes: ['id', 'name', 'foundationYear', 'annualRevenue', 'employeeCount', 'isActive'],
        through: { attributes: [] },
      },
    ],
  });
  if (!foundSubcategory) {
    const error = new Error(`Subcategory with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanSubcategories(foundSubcategory);
};

const createSubcategory = async (name, categoryId) => {
  if (!name || !categoryId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const foundCategory = await Categories.findByPk(categoryId);
  if (!foundCategory) {
    const error = new Error(`Parent category with id ${categoryId} not found.`);
    error.status = 404;
    throw error;
  }
  const newSubcategory = await Subcategories.create({ name });
  await newSubcategory.setCategory(foundCategory);
  const createdSubcategory = await Subcategories.findByPk(newSubcategory.id, {
    include: {
      model: Categories,
      attributes: ['id', 'name'],
    },
  });
  return cleanSubcategories(createdSubcategory);
};

const updateSubcategory = async (id, name, isActive) => {
  const foundSubcategory = await Subcategories.findByPk(id, {
    include: {
      model: Categories,
      attributes: ['id', 'name'],
    },
  });
  if (!foundSubcategory) {
    const error = new Error(`Subcategory with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundSubcategory.update({ name, isActive });
  return cleanSubcategories(foundSubcategory);
};

const deleteSubcategory = async (id) => {
  const foundSubcategory = await Subcategories.findByPk(id);
  if (!foundSubcategory) {
    const error = new Error(`Subcategory with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundSubcategory.destroy();
  const remainingSubcategories = await Subcategories.findAll({
    include: {
      model: Categories,
      attributes: ['id', 'name'],
    },
  });
  return cleanSubcategories(remainingSubcategories);
};

module.exports = {
  getAllSubcategories,
  filterSubcategoriesByName,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
