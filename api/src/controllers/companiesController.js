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

const createCompany = async (name, description, cuit, locations, employeeCount, categories) => {
  if (!name || !description || !cuit || !locations || !employeeCount || !categories) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  }

  const newCompany = await Companies.create({ name, description, cuit, employeeCount });

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

const updateCompany = async (id, name, description, cuit, locations, employeeCount, categories, isActive) => {
  const foundCompany = await Companies.findByPk(id);
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }

  await foundCompany.update({ name, description, cuit, employeeCount, isActive });

  if (locations) {
    for (const location of foundCompany.Locations) {
      await foundCompany.removeLocation(location);
    }
    for (const locationID of locations) {
      const foundLocation = await Locations.findByPk(locationID);
      await foundCompany.addLocation(foundLocation);
    }
  }

  if (categories) {
    for (const category of foundCompany.Categories) {
      await foundCompany.removeCategory(category);
    }
    for (const categoryID of categories) {
      const foundCategory = await Categories.findByPk(categoryID);
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
