const {
  getAllTenders,
  filterTendersByName,
  getTenderById,
  createTender,
  updateTender,
  deleteTender
} = require('../controllers/tendersController');

const getTendersHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const tenders = filter ? await filterTendersByName(filter) : await getAllTenders();
    res.status(200).json(tenders);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getTenderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTender = await getTenderById(id);
    res.status(200).json(foundTender);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createTenderHandler = async (req, res) => {
  try {
    const body = req.body;
    const newTender = await createTender(body);
    res.status(201).json(newTender);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateTenderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedTender = await updateTender(id, body);
    res.status(200).json(updatedTender);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteTenderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingTenders = await deleteTender(id);
    res.status(200).json(remainingTenders);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getTendersHandler,
  getTenderByIdHandler,
  createTenderHandler,
  updateTenderHandler,
  deleteTenderHandler
};