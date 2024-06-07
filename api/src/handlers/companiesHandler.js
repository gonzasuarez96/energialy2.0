const {
  getAllCompanies,
  filterCompaniesByName,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
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

const getCompanyByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCompany = await getCompanyById(id);
    res.status(200).json(foundCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createCompanyHandler = async (req, res) => {
  try {
    const body = req.body;
    const newCompany = await createCompany(body);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateCompanyHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedCompany = await updateCompany(id, body);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteCompanyHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCompany(id);
    res.status(204).end();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getCompaniesHandler,
  getCompanyByIdHandler,
  createCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
};