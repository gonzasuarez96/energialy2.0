const {
  getAllCompanies,
  filterCompaniesByName,
  getCompanyByID,
  createCompany,
  updateCompany
} = require('../controllers/companiesController');

const getCompaniesHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const companies = filter ? await filterCompaniesByName(filter) : await getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getCompanyByIDHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCompany = await getCompanyByID(id);
    res.status(200).json(foundCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createCompanyHandler = async (req, res) => {
  try {
    const { name, description, cuit, locations, employeeCount, categories, profilePicture, bannerPicture } = req.body;
    const newCompany = await createCompany(name, description, cuit, locations, employeeCount, categories, profilePicture, bannerPicture);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateCompanyHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, locations, employeeCount, profilePicture, bannerPicture, categories, isActive } = req.body;
    const updatedCompany = await updateCompany(id, name, description, locations, employeeCount, profilePicture, bannerPicture, categories, isActive);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getCompaniesHandler,
  getCompanyByIDHandler,
  createCompanyHandler,
  updateCompanyHandler
};