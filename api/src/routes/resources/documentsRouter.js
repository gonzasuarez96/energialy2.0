const { Router } = require('express');
const {
  getDocumentsHandler,
  getDocumentByIdHandler,
  createDocumentHandler,
  updateDocumentHandler,
  deleteDocumentHandler,
} = require('../../handlers/documentsHandler');

const documentsRouter = Router();

documentsRouter.get('/', getDocumentsHandler);
documentsRouter.get('/:id', getDocumentByIdHandler);
documentsRouter.post('/', createDocumentHandler);
documentsRouter.put('/:id', updateDocumentHandler);
documentsRouter.delete('/:id', deleteDocumentHandler);

module.exports = documentsRouter;
