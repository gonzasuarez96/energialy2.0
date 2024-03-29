const { Companies, Users } = require('../db');
const { sendInviteCompanies } = require('../services/resend');

const postInviteCompanies = async (body) => {
  const { companyId, email } = body;
  if (!companyId) {
    const error = new Error('Missing sender company ID.');
    error.status = 400;
    throw error;
  }
  if (!email) {
    const error = new Error('Missing receiver email.');
    error.status = 400;
    throw error;
  }
  const foundCompany = await Companies.findByPk(companyId, {
    include: [{ model: Users }],
  });
  const companyName = foundCompany.name;
  const resendResponse = await sendInviteCompanies(email, companyName);
  return resendResponse;
};

module.exports = {
  postInviteCompanies,
};
