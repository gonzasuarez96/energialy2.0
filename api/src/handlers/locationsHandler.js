const {
  getAllLocations,
  filterLocationsByName,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationsController');

const getLocationsHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const locations = filter
      ? await filterLocationsByName(filter)
      : await getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getLocationByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundLocation = await getLocationById(id);
    res.status(200).json(foundLocation);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createLocationHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const newLocation = await createLocation(name);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateLocationHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const updatedLocation = await updateLocation(id, name, isActive);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteLocationHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingLocations = await deleteLocation(id);
    res.status(200).json(remainingLocations);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getLocationsHandler,
  getLocationByIdHandler,
  createLocationHandler,
  updateLocationHandler,
  deleteLocationHandler,
};
