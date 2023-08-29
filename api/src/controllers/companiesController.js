const { Companies, Locations, Categories, Subcategories } = require('../db');
const { Op } = require('sequelize');

const getAllCompanies = async () => {
  const allCompanies = await Companies.findAll({
    include: [
      { model: Locations },
      {
        model: Categories,
        include: [{ model: Subcategories }],
      },
    ],
  });
  return allCompanies;
};

const filterCompaniesByName = async (name) => {
  const filteredCompanies = await Companies.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      { model: Locations },
      {
        model: Categories,
        include: [{ model: Subcategories }],
      },
    ],
  });
  return filteredCompanies;
};

const getCompanyByID = async (id) => {
  const foundCompany = await Companies.findByPk(id, {
    include: [
      { model: Locations },
      {
        model: Categories,
        include: [{ model: Subcategories }],
      },
    ],
  });

  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }

  return foundCompany;
};

const createCompany = async (name, description, cuit, locations, employeeCount, categories, profilePicture, bannerPicture) => {
  if (!name || !description || !locations || !employeeCount || !categories || !profilePicture || !bannerPicture) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  }

  const newCompany = await Companies.create({ name, description, cuit, employeeCount, profilePicture, bannerPicture });

  const locationPromises = locations.map(async (locationID) => {
    const foundLocation = await Locations.findByPk(locationID);
    await newCompany.addLocation(foundLocation);
  });
  await Promise.all(locationPromises);

  const categoryPromises = categories.map(async (categoryID) => {
    const foundCategory = await Categories.findByPk(categoryID);
    await newCompany.addCategory(foundCategory);
  });
  await Promise.all(categoryPromises);

  return newCompany;
};

const updateCompany = async (id, name, description, locations, employeeCount, profilePicture, bannerPicture, categories, isActive) => {
  const foundCompany = await Companies.findByPk(id);
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }

  await foundCompany.update({ name, description, profilePicture, bannerPicture, employeeCount, isActive });

  if (locations) {
    const currentLocations = foundCompany.Locations.map(location => location.id);
    const locationsToRemove = currentLocations.filter(locationID => !locations.includes(locationID));
    const locationsToAdd = locations.filter(locationID => !currentLocations.includes(locationID));

    const removeLocationPromises = locationsToRemove.map(async (locationID) => {
      await foundCompany.removeLocation(locationID);
    });
    await Promise.all(removeLocationPromises);

    const addLocationPromises = locationsToAdd.map(async (locationID) => {
      const foundLocation = await Locations.findByPk(locationID);
      await foundCompany.addLocation(foundLocation);
    });
    await Promise.all(addLocationPromises);
  }

  if (categories) {
    const currentCategories = foundCompany.Categories.map(category => category.id);
    const categoriesToRemove = currentCategories.filter(categoryID => !categories.includes(categoryID));
    const categoriesToAdd = categories.filter(categoryID => !currentCategories.includes(categoryID));

    const removeCategoryPromises = categoriesToRemove.map(async (categoryID) => {
      await foundCompany.removeCategory(categoryID);
    });
    await Promise.all(removeCategoryPromises);

    const addCategoryPromises = categoriesToAdd.map(async (categoryID) => {
      const foundCategory = await Categories.findByPk(categoryID);
      await foundCompany.addCategory(foundCategory);
    });
    await Promise.all(addCategoryPromises);
  }

  const updatedCompany = await Companies.findByPk(id);
  return updatedCompany;
};

module.exports = {
  getAllCompanies,
  filterCompaniesByName,
  getCompanyByID,
  createCompany,
  updateCompany
};
