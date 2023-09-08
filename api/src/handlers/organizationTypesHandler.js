// const {
//   getAllOrganizationTypes,
//   filterOrganizationTypesByName,
//   getOrganizationTypeByID,
//   createOrganizationType,
//   updateOrganizationType
// } = require('../controllers/organizationTypesController');

// const getOrganizationTypesHandler = async (req, res) => {
//   try {
//     const { filter } = req.query;
//     const organizationTypes = filter ? await filterOrganizationTypesByName(filter) : await getAllOrganizationTypes();
//     res.status(200).json(organizationTypes);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// const getOrganizationTypeByIDHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const foundOrganizationType = await getOrganizationTypeByID(id);
//     res.status(200).json(foundOrganizationType);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// const createOrganizationTypeHandler = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newOrganizationType = await createOrganizationType(name);
//     res.status(201).json(newOrganizationType);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// const updateOrganizationTypeHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, isActive } = req.body;
//     const updatedOrganizationType = await updateOrganizationType(id, name, isActive);
//     res.status(200).json(updatedOrganizationType);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getOrganizationTypesHandler,
//   getOrganizationTypeByIDHandler,
//   createOrganizationTypeHandler,
//   updateOrganizationTypeHandler
// }