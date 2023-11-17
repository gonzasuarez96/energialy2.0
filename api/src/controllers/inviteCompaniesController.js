const { Companies, Users } = require('../db');
const { sendInviteCompanies } = require('../services/resend');

const postInviteCompanies = async (body) => {
  const { companyId, emails } = body;
  if (!companyId) {
    const error = new Error('Missing sender company ID.');
    error.status = 400;
    throw error;
  }
  if (!emails) {
    const error = new Error('Missing receiver emails.');
    error.status = 400;
    throw error;
  }
  const foundCompany = await Companies.findByPk(companyId, {
    include: [{ model: Users }],
  });
  const companyName = foundCompany.name;
  console.log(companyName);
  const resendResponse = await sendInviteCompanies(emails, companyName);
  return resendResponse;
};

module.exports = {
  postInviteCompanies,
};
