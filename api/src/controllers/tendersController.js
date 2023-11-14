const { Tenders, Proposals, Companies, Locations, Categories, Subcategories } = require('../db');
const { Op } = require('sequelize');

const cleanTenders = (tenders) => {
  if (Array.isArray(tenders)) {
    const cleanTendersArray = tenders.map((tender) => ({
      id: tender.id,
      title: tender.title,
      description: tender.description,
      company: tender.Company,
      subcategories: tender.Subcategories,
      budget: tender.budget,
      showBudget: tender.showBudget,
      public: tender.public,
      status: tender.status,
      contractType: tender.contractType,
      location: tender.Location,
      majorSector: tender.majorSector,
      projectDuration: tender.projectDuration,
      proposals: tender.Proposals,
      isActive: tender.isActive,
    }));
    return cleanTendersArray;
  } else {
    const cleanTenderDetail = {
      id: tenders.id,
      title: tenders.title,
      description: tenders.description,
      company: tenders.Company,
      budget: tenders.budget,
      showBudget: tenders.showBudget,
      public: tenders.public,
      status: tenders.status,
      contractType: tenders.contractType,
      location: tenders.Location,
      address: tenders.address,
      majorSector: tenders.majorSector,
      projectDuration: tenders.projectDuration,
      validityDate: tenders.validityDate,
      categories: tenders.Categories,
      subcategories: tenders.Subcategories,
      proposals: tenders.Proposals,
      isActive: tenders.isActive,
      createdAt: tenders.createdAt,
      updatedAt: tenders.updatedAt,
    };
    return cleanTenderDetail;
  }
};

const getAllTenders = async () => {
  const allTenders = await Tenders.findAll({
    include: [
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  return cleanTenders(allTenders);
};

const filterTendersByName = async (name) => {
  const filteredTenders = await Tenders.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  return cleanTenders(filteredTenders);
};

const getTenderById = async (id) => {
  const foundTender = await Tenders.findByPk(id, {
    include: [
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
      },
      {
        model: Categories,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'projectDuration', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  if (!foundTender) {
    const error = new Error(`Tender with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanTenders(foundTender);
};

const createTender = async (body) => {
  const { title, description, contractType, majorSector, projectDuration, budget, validityDate, locationId, subcategories, companyId } = body;
  if (!title || !description || !contractType || !majorSector || !projectDuration || !budget || !validityDate || !locationId || !subcategories || !companyId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const newTender = await Tenders.create(body);
  for (const subcategoryId of subcategories) {
    const foundSubcategory = await Subcategories.findByPk(subcategoryId);
    const foundParentCategory = await Categories.findByPk(foundSubcategory.CategoryId);
    await newTender.addSubcategory(foundSubcategory);
    await newTender.addCategory(foundParentCategory);
  }
  const foundLocation = await Locations.findByPk(locationId);
  await newTender.setLocation(foundLocation);
  const foundCompany = await Companies.findByPk(companyId);
  await newTender.setCompany(foundCompany);
  const createdTender = await Tenders.findByPk(newTender.id, {
    include: [
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
      },
      {
        model: Categories,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'projectDuration', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  return cleanTenders(createdTender);
};

const updateTender = async (id, body) => {
  const { locationId, subcategories } = body;
  const foundTender = await Tenders.findByPk(id, {
    include: [{ model: Companies }, { model: Categories }, { model: Subcategories }, { model: Locations }],
  });
  if (!foundTender) {
    const error = new Error(`Tender with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundTender.update(body);
  if (locationId) {
    const foundLocation = await Locations.findByPk(locationId);
    await foundTender.setLocation(foundLocation);
  }
  if (subcategories) {
    for (const subcategory of foundTender.Subcategories) {
      const foundSubcategory = await Subcategories.findByPk(subcategory.id);
      const foundParentCategory = await Categories.findByPk(foundSubcategory.CategoryId);
      await foundTender.removeSubcategory(foundSubcategory);
      await foundTender.removeCategory(foundParentCategory);
    }
    for (const subcategoryId of subcategories) {
      const foundSubcategory = await Subcategories.findByPk(subcategoryId);
      const foundParentCategory = await Categories.findByPk(foundSubcategory.CategoryId);
      await foundTender.addSubcategory(foundSubcategory);
      await foundTender.addCategory(foundParentCategory);
    }
  }
  const updatedTender = await Tenders.findByPk(id, {
    include: [
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
      },
      {
        model: Categories,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'projectDuration', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  return cleanTenders(updatedTender);
};

const deleteTender = async (id) => {
  const foundTender = await Tenders.findByPk(id);
  if (!foundTender) {
    const error = new Error(`Tender with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundTender.destroy();
  const remainingTenders = await Tenders.findAll({
    include: [
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
      {
        model: Subcategories,
        attributes: ['id', 'name', 'CategoryId'],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ['id', 'name'],
      },
      {
        model: Proposals,
        attributes: ['id', 'totalAmount', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
    ],
  });
  return cleanTenders(remainingTenders);
};

module.exports = {
  getAllTenders,
  filterTendersByName,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
};
