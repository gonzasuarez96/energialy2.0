const { Router } = require('express');
const {
  getLocationsHandler,
  getLocationByIdHandler,
  createLocationHandler,
  updateLocationHandler,
  deleteLocationHandler,
} = require('../../handlers/locationsHandler');

const locationsRouter = Router();

locationsRouter.get('/', getLocationsHandler);
locationsRouter.get('/:id', getLocationByIdHandler);
locationsRouter.post('/', createLocationHandler);
locationsRouter.put('/:id', updateLocationHandler);
locationsRouter.delete('/:id', deleteLocationHandler);

module.exports = locationsRouter;
