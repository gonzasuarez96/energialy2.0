// const { OrganizationTypes } = require('../db');
// const { Op } = require('sequelize');

// const getAllOrganizationTypes = async () => {
//   const allOrganizationTypes = await OrganizationTypes.findAll();
//   return allOrganizationTypes;
// };

// const filterOrganizationTypesByName = async (name) => {
//   const filteredOrganizationTypes = await OrganizationTypes.findAll({
//     where: {
//       name: {
//         [Op.iLike]: `%${name}%`,
//       },
//     },
//   });
//   return filteredOrganizationTypes;
// };

// const getOrganizationTypeByID = async (id) => {
//   const foundOrganizationType = await OrganizationTypes.findByPk(id);
//   if (!foundOrganizationType) {
//     const error = new Error(`Organization type with id ${id} not found.`);
//     error.status = 404;
//     throw error;
//   }
//   return foundOrganizationType;
// };

// const createOrganizationType = async (name) => {
//   if (!name) {
//     const error = new Error("Missing required attributes.");
//     error.status = 400;
//     throw error;
//   };
//   const newOrganizationType = await OrganizationTypes.create({ name });
//   return newOrganizationType;
// };

// const updateOrganizationType = async (id, name, isActive) => {
//   const foundOrganizationType = await OrganizationTypes.findByPk(id);
//   if (!foundOrganizationType) {
//     const error = new Error(`Organization type with id ${id} not found.`);
//     error.status = 404;
//     throw error;
//   };
//   await foundOrganizationType.update({ name, isActive });
//   return foundOrganizationType;
// };

// module.exports = {
//   getAllOrganizationTypes,
//   filterOrganizationTypesByName,
//   getOrganizationTypeByID,
//   createOrganizationType,
//   updateOrganizationType
// };
