const { BankAccounts, Companies, Users, Documents, FinanceProducts } = require('../db');
const { sendBankEmailNewBankAccount, sendCompanyEmailBankAccountOpen, sendCompanyEmailBankAccountRequireChanges } = require('../services/resend');

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
      financeProducts: bankAccounts.FinanceProducts,
      company: bankAccounts.Company,
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
        model: FinanceProducts,
        attributes: ['id', 'productName', 'status'],
      },
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'businessName', 'fiscalAdress', 'cuit', 'companyEmail', 'legalManager'],
        include: { model: Documents, attributes: ['name', 'attachment'] },
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
    const error = new Error(`Missing required attributes of the company to create a bank account.`);
    error.status = 400;
    throw error;
  }
  if (foundCompany.BankAccount) {
    const error = new Error(`Company ${foundCompany.name} already has a bank account.`);
    error.status = 400;
    throw error;
  }
  const newBankAccount = await BankAccounts.create(body);
  await newBankAccount.setCompany(foundCompany);
  const foundNewBankAccount = await BankAccounts.findByPk(newBankAccount.id, {
    include: [
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'businessName', 'fiscalAdress', 'cuit', 'companyEmail', 'legalManager'],
        include: { model: Documents, attributes: ['name', 'attachment'] },
      },
      {
        model: FinanceProducts,
        attributes: ['id', 'productName', 'status'],
      },
    ],
  });
  const receiver = 'energialy@bancodecomercio.com.ar';
  const companyName = foundNewBankAccount.Company.name;
  await sendBankEmailNewBankAccount(receiver, companyName);
  return cleanBankAccounts(foundNewBankAccount);
};

const updateBankAccount = async (id, body) => {
  const foundBankAccount = await BankAccounts.findByPk(id, {
    include: [
      {
        model: FinanceProducts,
        attributes: ['id', 'productName', 'status'],
      },
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture', 'businessName', 'fiscalAdress', 'cuit', 'companyEmail', 'legalManager'],
        include: [
          {
            model: Documents,
            attributes: ['name', 'attachment'],
          },
          {
            model: Users,
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
        ],
      },
    ],
  });
  if (!foundBankAccount) {
    const error = new Error(`BankAccount with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  if (body.status === 'open') {
    if (foundBankAccount.status === 'open') {
      const error = new Error(`BankAccount with id ${id} already open.`);
      error.status = 404;
      throw error;
    }
    await foundBankAccount.update(body);
    await foundBankAccount.update({ statusMessage: null });
    const openHomebanking = await FinanceProducts.create({
      productName: 'Home Banking',
      status: 'accepted',
    });
    const openPesoSavingsAccount = await FinanceProducts.create({
      productName: 'CC en pesos $',
      status: 'accepted',
    });
    const openUSDSavingsAccount = await FinanceProducts.create({
      productName: 'CC en dólares u$s',
      status: 'accepted',
    });
    await openHomebanking.setBankAccount(foundBankAccount);
    await openPesoSavingsAccount.setBankAccount(foundBankAccount);
    await openUSDSavingsAccount.setBankAccount(foundBankAccount);
    const foundAgainBankAccount = await BankAccounts.findByPk(id, {
      include: [
        {
          model: FinanceProducts,
          attributes: ['id', 'productName', 'status'],
        },
        {
          model: Companies,
          attributes: ['id', 'name', 'profilePicture', 'businessName', 'fiscalAdress', 'cuit', 'companyEmail', 'legalManager'],
          include: [
            {
              model: Documents,
              attributes: ['name', 'attachment'],
            },
            {
              model: Users,
              attributes: ['id', 'firstName', 'lastName', 'email'],
            },
          ],
        },
      ],
    });
    const receiver = foundAgainBankAccount.Company.Users[0].email;
    const companyOwnerName = foundAgainBankAccount.Company.Users[0].firstName;
    const companyName = foundAgainBankAccount.Company.name;
    await sendCompanyEmailBankAccountOpen(receiver, companyOwnerName, companyName);
    return cleanBankAccounts(foundAgainBankAccount);
  } else if (body.status === 'require changes') {
    await foundBankAccount.update(body);
    const receiver = foundBankAccount.Company.Users[0].email;
    const companyOwnerName = foundBankAccount.Company.Users[0].firstName;
    const companyName = foundBankAccount.Company.name;
    await sendCompanyEmailBankAccountRequireChanges(receiver, companyOwnerName, companyName);
  } else {
    await foundBankAccount.update(body);
  }
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
