const { postInviteCompanies } = require('../controllers/inviteCompaniesController');

const postInviteCompaniesHandler = async (req, res) => {
  try {
    const body = req.body;
    const invitationSent = await postInviteCompanies(body);
    res.status(201).json(invitationSent);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  postInviteCompaniesHandler,
};
