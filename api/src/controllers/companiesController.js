const { Companies, Locations, Skills } = require('../db');
const { Op } = require('sequelize');

const getAllCompanies = async () => {
  const allCompanies = await Companies.findAll();
  return allCompanies;
};

const filterCompaniesByName = async (name) => {
  const filteredCompanies = await Companies.findAll({
    where: {
      companyName: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return filteredCompanies;
};

const getCompanyByID = async (id) => {
  const foundCompany = await Companies.findByPk(id);
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return foundCompany;
};

const createCompany = async (name, description, cuit, locations, employeeCount, skills) => {
  if (!name || !description || !cuit || !locations || !employeeCount || !skills) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  const newCompany = await Companies.create({ name, description, cuit, employeeCount });
  for (const locationID of locations) {
    const foundLocation = await Locations.findByPk(locationID);
    await newCompany.addLocation(foundLocation);
  };
  for (const skillID of skills) {
    const foundSkill = await Skills.findByPk(skillID);
    await newCompany.addSkill(foundSkill);
  };
  return newCompany;
};

const updateCompany = async (id, name, description, cuit, locations, employeeCount, skills, isActive) => {
  const foundCompany = await Companies.findByPk(id);
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  };
  await foundCompany.update({ name, description, cuit, employeeCount, isActive });
  if (locations) {
    for (const location of foundCompany.Locations) {
      await foundCompany.removeLocation(location);
    };
    for (const locationID of locations) {
      const foundLocation = await Locations.findByPk(locationID);
      await newCompany.addLocation(foundLocation);
    };
  };
  if (skills) {
    for (const skill of foundCompany.Skills) {
      await foundCompany.removeSkill(skill);      
    };
    for (const skillID of skills) {
      const foundSkill = await Skills.findByPk(skillID);
      await newCompany.addSkill(foundSkill);
    };
  };
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
