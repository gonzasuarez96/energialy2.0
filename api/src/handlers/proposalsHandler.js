const {
  getAllProposals,
  getProposalById,
  createProposal,
  updateProposal,
  deleteProposal
} = require('../controllers/proposalsController');

const getProposalsHandler = async (req, res) => {
  try {
    const allProposals = await getAllProposals();
    res.status(200).json(allProposals);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getProposalByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProposal = await getProposalById(id);
    res.status(200).json(foundProposal);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createProposalHandler = async (req, res) => {
  try {
    const body = req.body;
    const newProposal = await createProposal(body);
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateProposalHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProposal = await updateProposal(id, body);
    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteProposalHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingProposals = await deleteProposal(id);
    res.status(200).json(remainingProposals);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getProposalsHandler,
  getProposalByIdHandler,
  createProposalHandler,
  updateProposalHandler,
  deleteProposalHandler
};