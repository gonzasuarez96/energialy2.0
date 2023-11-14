const {
  getAllBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require('../controllers/bankAccountsController');

const getBankAccountsHandler = async (req, res) => {
  try {
    const allBankAccounts = await getAllBankAccounts();
    res.status(200).json(allBankAccounts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getBankAccountByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundBankAccount = await getBankAccountById(id);
    res.status(200).json(foundBankAccount);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createBankAccountHandler = async (req, res) => {
  try {
    const body = req.body;
    const newBankAccount = await createBankAccount(body);
    res.status(201).json(newBankAccount);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateBankAccountHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedBankAccount = await updateBankAccount(id, body);
    res.status(200).json(updatedBankAccount);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteBankAccountHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingBankAccounts = await deleteBankAccount(id);
    res.status(200).json(remainingBankAccounts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getBankAccountsHandler,
  getBankAccountByIdHandler,
  createBankAccountHandler,
  updateBankAccountHandler,
  deleteBankAccountHandler,
};
