const { Categories, Subcategories } = require('../db');
const { Op } = require('sequelize');

const cleanCategories = (categories) => {
  if (Array.isArray(categories)) {
    const cleanCategoriesArray = categories.map(category => ({
      id: category.id,
      name: category.name,
      subcategories: category.Subcategories,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }));
    return cleanCategoriesArray;
  } else {
    const cleanCategoryObj = {
      id: categories.id,
      name: categories.name,
      subcategories: categories.Subcategories,
      isActive: categories.isActive,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt
    };
    return cleanCategoryObj;
  };
};

const cleanSubcategories = (subcategories) => {
  if (Array.isArray(subcategories)) {
    const cleanSubcategoriesArray = subcategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      parentCategory: subcategory.Category,
      isActive: subcategory.isActive,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt
    }));
    return cleanSubcategoriesArray;
  } else {
    const cleanSubcategoriesObj = {
      id: subcategories.id,
      name: subcategories.name,
      parentCategory: subcategories.Category,
      isActive: subcategories.isActive,
      createdAt: subcategories.createdAt,
      updatedAt: subcategories.updatedAt
    };
    return cleanSubcategoriesObj;
  };
};

const getAllCategories = async () => {
  const allCategories = await Categories.findAll({
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  return cleanCategories(allCategories);
};

const filterCategoriesByName = async (name) => {
  const filteredCategories = await Categories.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  const filteredSubcategories = await Subcategories.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
    include: {
      model: Categories,
      attributes: ["id", "name", "isActive"]
    }
  });
  return [...cleanCategories(filteredCategories), ...cleanSubcategories(filteredSubcategories)];
};

const getCategoryByID = async (id) => {
  const foundCategory = await Categories.findByPk(id, {
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  if (!foundCategory) {
    const foundSubcategory = await Subcategories.findByPk(id, {
      include: {
        model: Categories,
        attributes: ["id", "name", "isActive"]
      }
    });
    if (!foundSubcategory) {
      const error = new Error(`Category with id ${id} not found.`);
      error.status = 404;
      throw error;
    };
    return cleanSubcategories(foundSubcategory);
  };
  return cleanCategories(foundCategory);
};

const createCategory = async (name, categoryID) => {
  if (!name) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  if (categoryID) {
    const foundCategory = await Categories.findByPk(categoryID);
    if (!foundCategory) {
      const error = new Error(`Parent category with id ${categoryID} not found.`);
      error.status = 404;
      throw error;
    };
    let newSubcategory = await Subcategories.create({ name });
    await newSubcategory.setCategory(foundCategory);
    newSubcategory = await Subcategories.findByPk(newSubcategory.id, {
      include: {
        model: Categories,
        attributes: ["id", "name", "isActive"]
      }
    });
    return cleanSubcategories(newSubcategory);
  } else {
    const newCategory = await Categories.create({ name });
    return cleanCategories(newCategory);
  };
};

const updateCategory = async (id, name, isActive) => {
  const foundCategory = await Categories.findByPk(id, {
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  if (!foundCategory) {
    const foundSubcategory = await Subcategories.findByPk(id, {
      include: {
        model: Categories,
        attributes: ["id", "name", "isActive"]
      }
    });
    if (!foundSubcategory) {
      const error = new Error(`Category with id ${id} not found.`);
      error.status = 404;
      throw error;
    };
    await foundSubcategory.update({ name, isActive });
    return cleanSubcategories(foundSubcategory);
  };
  for (const subcategory of foundCategory.Subcategories) {
    const subcategoryInstance = await Subcategories.findByPk(subcategory.id);
    await subcategoryInstance.update({ isActive });
  };
  await foundCategory.update({ name, isActive });
  return cleanCategories(foundCategory);
};

const deleteCategory = async (id) => {
  const foundCategory = await Categories.findByPk(id, {
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  if (!foundCategory) {
    const foundSubcategory = await Subcategories.findByPk(id);
    if (!foundSubcategory) {
      const error = new Error(`Category with id ${id} not found.`);
      error.status = 404;
      throw error;
    };
    await foundSubcategory.destroy();
  } else {
    if (foundCategory.Subcategories) {
      const error = new Error(`Parent category with id ${id} have subcategories. Must delete all subcategories first.`);
      error.status = 403;
      throw error;
    }
    await foundCategory.destroy();
  };
  const remainingCategories = await Categories.findAll({
    include: {
      model: Subcategories,
      attributes: ["id", "name", "isActive"]
    }
  });
  return cleanCategories(remainingCategories);
};

module.exports = {
  getAllCategories,
  filterCategoriesByName,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory
};
