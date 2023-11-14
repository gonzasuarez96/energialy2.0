const {
  getAllFinanceProducts,
  getFinanceProductById,
  createFinanceProduct,
  updateFinanceProduct,
  deleteFinanceProduct,
} = require('../controllers/financeProductsController');

const getFinanceProductsHandler = async (req, res) => {
  try {
    const allFinanceProducts = await getAllFinanceProducts();
    res.status(200).json(allFinanceProducts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getFinanceProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundFinanceProduct = await getFinanceProductById(id);
    res.status(200).json(foundFinanceProduct);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createFinanceProductHandler = async (req, res) => {
  try {
    const body = req.body;
    const newFinanceProduct = await createFinanceProduct(body);
    res.status(201).json(newFinanceProduct);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateFinanceProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedFinanceProduct = await updateFinanceProduct(id, body);
    res.status(200).json(updatedFinanceProduct);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteFinanceProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingFinanceProducts = await deleteFinanceProduct(id);
    res.status(200).json(remainingFinanceProducts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getFinanceProductsHandler,
  getFinanceProductByIdHandler,
  createFinanceProductHandler,
  updateFinanceProductHandler,
  deleteFinanceProductHandler,
};
