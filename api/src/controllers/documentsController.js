const { Documents, Companies } = require('../db');

const cleanDocuments = (documents) => {
  if (Array.isArray(documents)) {
    const cleanDocumentsArray = documents.map((document) => ({
      id: document.id,
      name: document.name,
      attachment: document.attachment,
      company: document.Company,
      isActive: document.isActive,
    }));
    return cleanDocumentsArray;
  } else {
    const cleanDocumentDetail = {
      id: documents.id,
      name: documents.name,
      attachment: documents.attachment,
      company: documents.Company,
      isActive: documents.isActive,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
    };
    return cleanDocumentDetail;
  }
};

const getAllDocuments = async () => {
  const allDocuments = await Documents.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  return cleanDocuments(allDocuments);
};

const getDocumentById = async (id) => {
  const foundDocument = await Documents.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  if (!foundDocument) {
    const error = new Error(`Document with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanDocuments(foundDocument);
};

const createDocument = async (body) => {
  const { name, attachment, companyId } = body;
  if (!name || !attachment || !companyId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const foundCompany = await Companies.findByPk(companyId, {
    include: { model: Documents },
  });
  const documents = foundCompany.Documents;
  const documentExists = documents.some((document) => document.name === name);
  if (documentExists) {
    const error = new Error(`${foundCompany.name} already has ${name} document.`);
    error.status = 400;
    throw error;
  }
  const newDocument = await Documents.create({ name, attachment });
  await newDocument.setCompany(foundCompany);
  const foundNewDocument = await Documents.findByPk(newDocument.id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  return cleanDocuments(foundNewDocument);
};

const updateDocument = async (id, body) => {
  const foundDocument = await Documents.findByPk(id, {
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  if (!foundDocument) {
    const error = new Error(`Document with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundDocument.update(body);
  return cleanDocuments(foundDocument);
};

const deleteDocument = async (id) => {
  const foundDocument = await Documents.findByPk(id);
  if (!foundDocument) {
    const error = new Error(`Document with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundDocument.destroy();
  const remainingDocuments = await Documents.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return cleanDocuments(remainingDocuments);
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
