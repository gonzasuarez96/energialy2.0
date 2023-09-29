const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentsController');

const getDocumentsHandler = async (req, res) => {
  try {
    const allDocuments = await getAllDocuments();
    res.status(200).json(allDocuments);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getDocumentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundDocument = await getDocumentById(id);
    res.status(200).json(foundDocument);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createDocumentHandler = async (req, res) => {
  try {
    const body = req.body;
    const newDocument = await createDocument(body);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateDocumentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedDocument = await updateDocument(id, body);
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteDocumentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingDocuments = await deleteDocument(id);
    res.status(200).json(remainingDocuments);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getDocumentsHandler,
  getDocumentByIdHandler,
  createDocumentHandler,
  updateDocumentHandler,
  deleteDocumentHandler,
};
