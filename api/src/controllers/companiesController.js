const {Companies, Locations, Categories, Subcategories } = require('../db');
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
  if (!name || !description || !cuit || !employeeCount || !profilePicture || !bannerPicture || !locations.length || !categories.length) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  }

  for (const locationID of locations) {
    const foundLocation = await Locations.findByPk(locationID);
    if (!foundLocation) {
      const error = new Error(`Location with id ${locationID} not found.`);
      error.status = 404;
      throw error;
    }
  }

  for (const categoryID of categories) {
    const foundCategory = await Categories.findByPk(categoryID);
    if (!foundCategory) {
      const error = new Error(`Category with id ${categoryID} not found.`);
      error.status = 404;
      throw error;
    }
  }

  const newCompany = await Companies.create({ name, description, cuit, employeeCount, profilePicture, bannerPicture });

  for (const locationID of locations) {
    const foundLocation = await Locations.findByPk(locationID);
    await newCompany.addLocation(foundLocation);
  }

  for (const categoryID of categories) {
    const foundCategory = await Categories.findByPk(categoryID);
    await newCompany.addCategory(foundCategory);
  }

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
    for (const location of foundCompany.Locations) {
      await foundCompany.removeLocation(location);
    }
    for (const locationID of locations) {
      const foundLocation = await Locations.findByPk(locationID);
      if (!foundLocation) {
        const error = new Error(`Location with id ${locationID} not found.`);
        error.status = 404;
        throw error;
      }
      await foundCompany.addLocation(foundLocation);
    }
  }

  if (categories) {
    for (const category of foundCompany.Categories) {
      await foundCompany.removeCategory(category);
    }
    for (const categoryID of categories) {
      const foundCategory = await Categories.findByPk(categoryID);
      if (!foundCategory) {
        const error = new Error(`Category with id ${categoryID} not found.`);
        error.status = 404;
        throw error;
      }
      await foundCompany.addCategory(foundCategory);
    }
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