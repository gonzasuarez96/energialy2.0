const { Locations, Companies } = require('../db');
const { Op } = require('sequelize');

const cleanLocations = (locations) => {
  if (Array.isArray(locations)) {
    const cleanLocationsArray = locations.map((location) => ({
      id: location.id,
      name: location.name,
      isActive: location.isActive,
    }));
    return cleanLocationsArray;
  } else {
    const cleanLocationDetail = {
      id: locations.id,
      name: locations.name,
      companies: locations.Companies,
      isActive: locations.isActive,
      createdAt: locations.createdAt,
      updatedAt: locations.updatedAt,
    };
    return cleanLocationDetail;
  }
};

const getAllLocations = async () => {
  const allLocations = await Locations.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return cleanLocations(allLocations);
};

const filterLocationsByName = async (name) => {
  const filteredLocations = await Locations.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return cleanLocations(filteredLocations);
};

const getLocationById = async (id) => {
  const foundLocation = await Locations.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'foundationYear', 'annualRevenue', 'employeeCount'],
      through: { attributes: [] },
    },
  });
  if (!foundLocation) {
    const error = new Error(`Location with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanLocations(foundLocation);
};

const createLocation = async (name) => {
  if (!name) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const newLocation = await Locations.create({ name });
  return cleanLocations(newLocation);
};

const updateLocation = async (id, name, isActive) => {
  const foundLocation = await Locations.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'foundationYear', 'annualRevenue', 'employeeCount'],
      through: { attributes: [] },
    },
  });
  if (!foundLocation) {
    const error = new Error(`Location with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundLocation.update({ name, isActive });
  return cleanLocations(foundLocation);
};

const deleteLocation = async (id) => {
  const foundLocation = await Locations.findByPk(id);
  if (!foundLocation) {
    const error = new Error(`Location with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundLocation.destroy();
  const remainingLocations = await Locations.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return cleanLocations(remainingLocations);
};

module.exports = {
  getAllLocations,
  filterLocationsByName,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
};
