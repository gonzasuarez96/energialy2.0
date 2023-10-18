const {
  BankAccounts,
  Companies,
  Documents,
  FinanceProducts,
} = require('../db');

const cleanBankAccounts = (bankAccounts) => {
  if (Array.isArray(bankAccounts)) {
    const cleanBankAccountsArray = bankAccounts.map((bankAccount) => ({
      id: bankAccount.id,
      status: bankAccount.status,
      statusMessage: bankAccount.statusMessage,
      company: bankAccount.Company,
      isActive: bankAccount.isActive,
    }));
    return cleanBankAccountsArray;
  } else {
    const cleanBankAccountDetail = {
      id: bankAccounts.id,
      status: bankAccounts.status,
      statusMessage: bankAccounts.statusMessage,
      company: bankAccounts.Company,
      financeProducts: bankAccounts.FinanceProducts,
      isActive: bankAccounts.isActive,
      createdAt: bankAccounts.createdAt,
      updatedAt: bankAccounts.updatedAt,
    };
    return cleanBankAccountDetail;
  }
};

const getAllBankAccounts = async () => {
  const allBankAccounts = await BankAccounts.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  return cleanBankAccounts(allBankAccounts);
};

const getBankAccountById = async (id) => {
  const foundBankAccount = await BankAccounts.findByPk(id, {
    include: [
      {
        model: Companies,
        attributes: [
          'id',
          'name',
          'profilePicture',
          'businessName',
          'fiscalAdress',
          'cuit',
          'companyEmail',
          'legalManager',
        ],
        include: { model: Documents, attributes: ['name', 'attachment'] },
      },
      {
        model: FinanceProducts,
        attributes: ['id', 'productName', 'status', 'additionalData'],
      },
    ],
  });
  if (!foundBankAccount) {
    const error = new Error(`BankAccount with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanBankAccounts(foundBankAccount);
};

const createBankAccount = async (body) => {
  const { companyId } = body;
  if (!companyId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const foundCompany = await Companies.findByPk(companyId, {
    include: [{ model: Documents }, { model: BankAccounts }],
  });
  if (
    !foundCompany.businessName ||
    !foundCompany.fiscalAdress ||
    !foundCompany.cuit ||
    !foundCompany.companyEmail ||
    !foundCompany.legalManager 
    // !foundCompany.documents
  ) {
    const error = new Error(
      `Missing required attributes of the company to create a bank account.`
    );
    error.status = 400;
    throw error;
  }
  if (foundCompany.BankAccount) {
    const error = new Error(
      `Company ${foundCompany.name} already has a bank account.`
    );
    error.status = 400;
    throw error;
  }
  const newBankAccount = await BankAccounts.create();
  await newBankAccount.setCompany(foundCompany);
  const foundNewBankAccount = await BankAccounts.findByPk(newBankAccount.id, {
    include: {
      model: Companies,
      attributes: [
        'id',
        'name',
        'profilePicture',
        'businessName',
        'fiscalAdress',
        'cuit',
        'companyEmail',
        'legalManager',
      ],
      include: { model: Documents, attributes: ['name', 'attachment'] },
    },
  });
  return cleanBankAccounts(foundNewBankAccount);
};

const updateBankAccount = async (id, body) => {
  const { status } = body;
  const foundBankAccount = await BankAccounts.findByPk(id, {
    include: {
      model: Companies,
      attributes: [
        'id',
        'name',
        'profilePicture',
        'businessName',
        'fiscalAdress',
        'cuit',
        'companyEmail',
        'legalManager',
      ],
      include: { model: Documents, attributes: ['name', 'attachment'] },
    },
  });
  if (!foundBankAccount) {
    const error = new Error(`BankAccount with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  if (status === 'open') {
    if (
      !foundBankAccount.Company.businessName ||
      !foundBankAccount.Company.fiscalAdress ||
      !foundBankAccount.Company.cuit ||
      !foundBankAccount.Company.companyEmail ||
      !foundBankAccount.Company.legalManager ||
      !foundBankAccount.Company.Documents
    ) {
      const error = new Error(`Missing info to open bank account.`);
      error.status = 400;
      throw error;
    }
  }
  await foundBankAccount.update(body);
  return cleanBankAccounts(foundBankAccount);
};

const deleteBankAccount = async (id) => {
  const foundBankAccount = await BankAccounts.findByPk(id);
  if (!foundBankAccount) {
    const error = new Error(`BankAccount with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundBankAccount.destroy();
  const remainingBankAccounts = await BankAccounts.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Companies,
      attributes: ['id', 'name', 'profilePicture'],
    },
  });
  return cleanBankAccounts(remainingBankAccounts);
};

module.exports = {
  getAllBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
