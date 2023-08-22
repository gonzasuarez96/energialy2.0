const { Locations } = require('../db');
const { Op } = require('sequelize');

const getAllLocations = async () => {
  const allLocations = await Locations.findAll();
  return allLocations;
};

const filterLocationsByName = async (name) => {
  const filteredLocations = await Locations.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return filteredLocations;
};

const getLocationByID = async (id) => {
  const foundLocation = await Locations.findByPk(id);
  if (!foundLocation) {
    const error = new Error(`Location with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return foundLocation;
};

const createLocation = async (name) => {
  if (!name) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  const newLocation = await Locations.create({ name });
  return newLocation;
};

const updateLocation = async (id, name, isActive) => {
  const foundLocation = await Locations.findByPk(id);
  if (!foundLocation) {
    const error = new Error(`Location with id ${id} not found.`);
    error.status = 404;
    throw error;
  };
  await foundLocation.update({ name, isActive });
  return foundLocation;
};

module.exports = {
  getAllLocations,
  filterLocationsByName,
  getLocationByID,
  createLocation,
  updateLocation
};
