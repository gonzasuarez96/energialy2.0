const { Companies, Users, Locations, Categories, Subcategories, Tenders, Proposals } = require("../db");
const { Op } = require("sequelize");

const cleanCompanies = (companies) => {
  if (Array.isArray(companies)) {
    const cleanCompaniesArray = companies.map((company) => ({
      id: company.id,
      name: company.name,
      profilePicture: company.profilePicture,
      bannerPicture: company.bannerPicture,
      categories: company.Categories,
      subcategories: company.Subcategories,
      locations: company.Locations,
      foundationYear: company.foundationYear,
      annualRevenue: company.annualRevenue,
      employeeCount: company.employeeCount,
      organizationType: company.organizationType,
      isActive: company.isActive,
    }));
    return cleanCompaniesArray;
  } else {
    const cleanCompanyDetail = {
      id: companies.id,
      name: companies.name,
      description: companies.description,
      profilePicture: companies.profilePicture,
      bannerPicture: companies.bannerPicture,
      categories: companies.Categories,
      subcategories: companies.Subcategories,
      locations: companies.Locations,
      foundationYear: companies.foundationYear,
      annualRevenue: companies.annualRevenue,
      employeeCount: companies.employeeCount,
      cuit: companies.cuit,
      organizationType: companies.organizationType,
      tenders: companies.Tenders,
      proposals: companies.Proposals,
      compreNeuquino: companies.compreNeuquino,
      multimedia: companies.multimedia,
      experience: companies.experience,
      services: companies.services,
      certifications: companies.certifications,
      homologations: companies.homologations,
      website: companies.website,
      users: companies.Users,
      isActive: companies.isActive,
      createdAt: companies.createdAt,
      updatedAt: companies.updatedAt
    };
    return cleanCompanyDetail;
  }
};

const getAllCompanies = async () => {
  const allCompanies = await Companies.findAll({
    attributes: ["id", "name", "profilePicture", "bannerPicture", "foundationYear", "annualRevenue", "employeeCount", "organizationType", "isActive"],
    include: [
      {
        model: Categories,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ["id", "name", "CategoryId", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
    ],
  });
  return cleanCompanies(allCompanies);
};

const filterCompaniesByName = async (name) => {
  const filteredCompanies = await Companies.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: Categories,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ["id", "name", "CategoryId", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
    ],
  });
  return cleanCompanies(filteredCompanies);
};

const getCompanyById = async (id) => {
  const foundCompany = await Companies.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "email"]
      },
      {
        model: Categories,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ["id", "name", "CategoryId", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Tenders,
        attributes: ["id", "title", "description", "majorSector", "budget", "projectDuration", "status"],
      },
      {
        model: Proposals,
        attributes: ["id", "totalAmount", "projectDuration", "status"],
        include: {
          model: Tenders,
          attributes: ["id", "title", "budget", "status"]
        }
      }
    ],
  });
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanCompanies(foundCompany);
};

const createCompany = async (body) => {
  const { name, description, locations, subcategories, profilePicture, bannerPicture, foundationYear, annualRevenue, employeeCount, cuit, userId } = body;
  if (!name || !description || !locations || !subcategories || !profilePicture || !bannerPicture || !foundationYear || !annualRevenue || !employeeCount || !cuit || !userId) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  }
  for (const locationId of locations) {
    const foundLocation = await Locations.findByPk(locationId);
    if (!foundLocation) {
      const error = new Error(`Location with id ${locationId} not found.`);
      error.status = 404;
      throw error;
    }
  }
  for (const subcategoryId of subcategories) {
    const foundSubcategory = await Subcategories.findByPk(subcategoryId);
    if (!foundSubcategory) {
      const error = new Error(`Subcategory with id ${subcategoryId} not found.`);
      error.status = 404;
      throw error;
    }
  }
  const newCompany = await Companies.create(body);

  const foundUser = await Users.findByPk(userId);
  await newCompany.addUser(foundUser);

  for (const locationId of locations) {
    const foundLocation = await Locations.findByPk(locationId);
    await newCompany.addLocation(foundLocation);
  }

  for (const subcategoryId of subcategories) {
    const foundSubcategory = await Subcategories.findByPk(subcategoryId);
    const foundParentCategory = await Categories.findByPk(
      foundSubcategory.CategoryId
    );
    await newCompany.addSubcategory(foundSubcategory);
    await newCompany.addCategory(foundParentCategory);
  }

  const createdCompany = await Companies.findByPk(newCompany.id, {
    include: [
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "email"]
      },
      {
        model: Categories,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ["id", "name", "CategoryId", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Proposals,
        attributes: ["id", "totalAmount", "projectDuration", "status"],
        include: {
          model: Tenders,
          attributes: ["id", "title", "budget", "status"]
        }
      }
    ],
  });
  return cleanCompanies(createdCompany);
};

const updateCompany = async (id, body) => {
  const { locations, subcategories } = body;
  const foundCompany = await Companies.findByPk(id, {
    include: [
      { model: Categories },
      { model: Subcategories },
      { model: Locations },
    ],
  });
  if (!foundCompany) {
    const error = new Error(`Company with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  if (locations) {
    for (const locationId of locations) {
      const foundLocation = await Locations.findByPk(locationId);
      if (!foundLocation) {
        const error = new Error(`Location with id ${locationId} not found.`);
        error.status = 404;
        throw error;
      }
    }
  }
  if (subcategories) {
    for (const subcategoryId of subcategories) {
      const foundSubcategory = await Subcategories.findByPk(subcategoryId);
      if (!foundSubcategory) {
        const error = new Error(`Subcategory with id ${subcategoryId} not found.`);
        error.status = 404;
        throw error;
      }
    }
  }

  await foundCompany.update(body);
  if (locations) {
    if (foundCompany.Locations) {
      for (const location of foundCompany.Locations) {
        const foundLocation = await Locations.findByPk(location.id);
        await foundCompany.removeLocation(foundLocation);
      }
    }
    for (const locationId of locations) {
      const foundLocation = await Locations.findByPk(locationId);
      await foundCompany.addLocation(foundLocation);
    }
  }
  if (subcategories) {
    if (foundCompany.Subcategories) {
      for (const subcategory of foundCompany.Subcategories) {
        const foundSubcategory = await Subcategories.findByPk(subcategory.id);
        const foundParentCategory = await Categories.findByPk(foundSubcategory.CategoryId);
        await foundCompany.removeSubcategory(foundSubcategory);
        await foundCompany.removeCategory(foundParentCategory);
      }
    }
    for (const subcategoryId of subcategories) {
      const foundSubcategory = await Subcategories.findByPk(subcategoryId);
      const foundParentCategory = await Categories.findByPk(foundSubcategory.CategoryId);
      await foundCompany.addSubcategory(foundSubcategory);
      await foundCompany.addCategory(foundParentCategory);
    }
  }
  const updatedCompany = await Companies.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "email"]
      },
      {
        model: Categories,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Subcategories,
        attributes: ["id", "name", "CategoryId", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Locations,
        attributes: ["id", "name", "isActive"],
        through: { attributes: [] },
      },
      {
        model: Proposals,
        attributes: ["id", "totalAmount", "projectDuration", "status"],
        include: {
          model: Tenders,
          attributes: ["id", "title", "budget", "status"]
        }
      }
    ],
  });
  return cleanCompanies(updatedCompany);
};

module.exports = {
  getAllCompanies,
  filterCompaniesByName,
  getCompanyById,
  createCompany,
  updateCompany,
};
