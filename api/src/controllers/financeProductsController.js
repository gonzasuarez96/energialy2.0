const { FinanceProducts, BankAccounts, Companies, Users } = require('../db');
const { sendBankEmailNewFinanceProduct, sendCompanyEmailFinanceProductAccepted, sendCompanyEmailFinanceProductDeclined } = require('../services/resend');

const cleanFinanceProducts = (financeProducts) => {
  if (Array.isArray(financeProducts)) {
    const cleanFinanceProductsArray = financeProducts.map((financeProduct) => ({
      id: financeProduct.id,
      productName: financeProduct.productName,
      status: financeProduct.status,
      additionalData: financeProduct.additionalData,
      bankAccount: financeProduct.BankAccount,
      isActive: financeProduct.isActive,
    }));
    return cleanFinanceProductsArray;
  } else {
    const cleanFinanceProductDetail = {
      id: financeProducts.id,
      productName: financeProducts.productName,
      status: financeProducts.status,
      additionalData: financeProducts.additionalData,
      bankAccount: financeProducts.BankAccount,
      isActive: financeProducts.isActive,
      createdAt: financeProducts.createdAt,
      updatedAt: financeProducts.updatedAt,
    };
    return cleanFinanceProductDetail;
  }
};

const getAllFinanceProducts = async () => {
  const allFinanceProducts = await FinanceProducts.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: BankAccounts,
      attributes: ["id", "status"],
      include: {
        model: Companies,
        attributes: ["id", "name", "profilePicture"],
      },
    },
  });
  return cleanFinanceProducts(allFinanceProducts);
};

const getFinanceProductById = async (id) => {
  const foundFinanceProduct = await FinanceProducts.findByPk(id, {
    include: {
      model: BankAccounts,
      attributes: ['id', 'status'],
      include: {
        model: Companies,
        attributes: ['id', 'name'],
      },
    },
  });
  if (!foundFinanceProduct) {
    const error = new Error(`FinanceProduct with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanFinanceProducts(foundFinanceProduct);
};

const createFinanceProduct = async (body) => {
  const { productName, bankAccountId } = body;
  if (!productName || !bankAccountId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const foundBankAccount = await BankAccounts.findByPk(bankAccountId, {
    include: { model: FinanceProducts },
  });
  const financeProducts = foundBankAccount.FinanceProducts;
  if (productName === 'CC en pesos $' || productName === 'CC en dólares u$s' || productName === 'Home Banking') {
    const financeProductExist = financeProducts.some((financeProduct) => financeProduct.productName === productName);
    if (financeProductExist) {
      const error = new Error(`This bank account already have a ${productName}`);
      error.status = 400;
      throw error;
    }
  }
  const newFinanceProduct = await FinanceProducts.create(body);
  await newFinanceProduct.setBankAccount(foundBankAccount);
  const foundNewFinanceProduct = await FinanceProducts.findByPk(newFinanceProduct.id, {
    include: {
      model: BankAccounts,
      attributes: ['id', 'status'],
      include: {
        model: Companies,
        attributes: ['id', 'name'],
      },
    },
  });
  const receiver = 'energialy@bancodecomercio.com.ar';
  const companyName = foundNewFinanceProduct.BankAccount.Company.name;
  await sendBankEmailNewFinanceProduct(receiver, companyName);
  return cleanFinanceProducts(foundNewFinanceProduct);
};

const updateFinanceProduct = async (id, body) => {
  const foundFinanceProduct = await FinanceProducts.findByPk(id, {
    include: {
      model: BankAccounts,
      attributes: ['id', 'status'],
      include: {
        model: Companies,
        attributes: ['id', 'name'],
        include: {
          model: Users,
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      },
    },
  });
  if (!foundFinanceProduct) {
    const error = new Error(`FinanceProduct with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  if (body.status === 'accepted') {
    if (foundFinanceProduct.status === 'accepted') {
      const error = new Error(`Finance product with id ${id} already accepted.`);
      error.status = 404;
      throw error;
    }
    await foundFinanceProduct.update(body);
    const receiver = foundFinanceProduct.BankAccount.Company.Users[0].email;
    const companyOwnerName = foundFinanceProduct.BankAccount.Company.Users[0].firstName;
    const companyName = foundFinanceProduct.BankAccount.Company.name;
    await sendCompanyEmailFinanceProductAccepted('juancruz.roldan19@gmail.com', companyOwnerName, companyName);
  } else if (body.status === 'declined') {
    if (foundFinanceProduct.status === 'declined') {
      const error = new Error(`Finance product with id ${id} already declined.`);
      error.status = 404;
      throw error;
    }
    await foundFinanceProduct.update(body);
    const receiver = foundFinanceProduct.BankAccount.Company.Users[0].email;
    const companyOwnerName = foundFinanceProduct.BankAccount.Company.Users[0].firstName;
    const companyName = foundFinanceProduct.BankAccount.Company.name;
    await sendCompanyEmailFinanceProductDeclined('juancruz.roldan19@gmail.com', companyOwnerName, companyName);
  } else {
    await foundFinanceProduct.update(body);
  }
  return cleanFinanceProducts(foundFinanceProduct);
};

const deleteFinanceProduct = async (id) => {
  const foundFinanceProduct = await FinanceProducts.findByPk(id);
  if (!foundFinanceProduct) {
    const error = new Error(`FinanceProduct with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundFinanceProduct.destroy();
  const remainingFinanceProducts = await FinanceProducts.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: BankAccounts,
      attributes: ['id', 'status'],
      include: {
        model: Companies,
        attributes: ['id', 'name'],
      },
    },
  });
  return cleanFinanceProducts(remainingFinanceProducts);
};

module.exports = {
  getAllFinanceProducts,
  getFinanceProductById,
  createFinanceProduct,
  updateFinanceProduct,
  deleteFinanceProduct,
};
