const { Proposals, Tenders, Companies, Locations, Users } = require('../db');
const { Op } = require('sequelize');
const { sendEmployerEmailProposalReceived, sendSupplierEmailProposalAccepted, sendSupplierEmailProposalDeclined } = require('../services/resend');

const cleanProposals = (proposals) => {
  if (Array.isArray(proposals)) {
    const cleanProposalsArray = proposals.map((proposal) => ({
      id: proposal.id,
      company: proposal.Company,
      totalAmount: proposal.totalAmount,
      status: proposal.status,
      projectDuration: proposal.projectDuration,
      tender: proposal.Tender,
      isActive: proposal.isActive,
    }));
    return cleanProposalsArray;
  } else {
    const cleanProposalDetail = {
      id: proposals.id,
      company: proposals.Company,
      totalAmount: proposals.totalAmount,
      serviceFee: proposals.serviceFee,
      serviceAmount: proposals.serviceAmount,
      receiverAmount: proposals.receiverAmount,
      status: proposals.status,
      description: proposals.description,
      projectDuration: proposals.projectDuration,
      tender: proposals.Tender,
      attachments: proposals.attachments,
      isActive: proposals.isActive,
      createdAt: proposals.createdAt,
      updatedAt: proposals.updatedAt,
    };
    return cleanProposalDetail;
  }
};

const calculateFee = (totalAmount, serviceFeePercentage) => {
  if (typeof serviceFeePercentage !== 'number' || serviceFeePercentage < 0 || serviceFeePercentage > 100) {
    throw new Error('Service fee percentage must be a number between 0 and 100.');
  }
  const serviceAmount = (totalAmount * serviceFeePercentage) / 100;
  const receiverAmount = totalAmount - serviceAmount;
  return { serviceAmount, receiverAmount };
};

const getAllProposals = async () => {
  const allProposals = await Proposals.findAll({
    include: [
      {
        model: Tenders,
        attributes: ['id', 'title', 'budget', 'description', 'contractType', 'majorSector', 'validityDate', 'status'],
        include: {
          model: Companies,
          attributes: ['id', 'name'],
        },
      },
      {
        model: Companies,
        attributes: ['id', 'name', 'profilePicture'],
      },
    ],
  });
  return cleanProposals(allProposals);
};

const getProposalById = async (id) => {
  const foundProposal = await Proposals.findByPk(id, {
    include: [
      {
        model: Tenders,
        attributes: ['id', 'title', 'budget', 'majorSector', 'projectDuration'],
        include: [
          {
            model: Locations,
            attributes: ['name'],
          },
          {
            model: Companies,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
    ],
  });
  if (!foundProposal) {
    const error = new Error(`Proposal with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return cleanProposals(foundProposal);
};

const createProposal = async (body) => {
  const { totalAmount, projectDuration, description, tenderId, companyId, attachments } = body;
  if (!totalAmount || !projectDuration || !description || !tenderId || !companyId) {
    const error = new Error('Missing required attributes.');
    error.status = 400;
    throw error;
  }
  const { serviceAmount, receiverAmount } = calculateFee(totalAmount, 1); // Hardcoded serviceFee; hay que ajustar el fee conforme la suscripción del usuario

  const foundTender = await Tenders.findByPk(tenderId, {
    include: {
      model: Companies,
      attributes: ['id', 'name'],
    },
  });
  const foundCompany = await Companies.findByPk(companyId);
  if (foundTender.Company.id === companyId) {
    const error = new Error("Can't create a proposal over your own tender.");
    error.status = 400;
    throw error;
  }
  const newProposal = await Proposals.create({ totalAmount, serviceAmount, receiverAmount, projectDuration, description, attachments });
  await newProposal.setTender(foundTender);
  await newProposal.setCompany(foundCompany);
  const createdProposal = await Proposals.findByPk(newProposal.id, {
    include: [
      {
        model: Tenders,
        attributes: ['id', 'title', 'budget', 'majorSector', 'projectDuration'],
        include: [
          {
            model: Locations,
            attributes: ['name'],
          },
          {
            model: Companies,
            attributes: ['id', 'name'],
            include: {
              model: Users,
              attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
            },
          },
        ],
      },
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
    ],
  });
  const employerEmail = createdProposal.Tender.Company.Users[0].email;
  const employerName = createdProposal.Tender.Company.Users[0].firstName;
  const supplierCompanyName = createdProposal.Company.name;
  const tenderTitle = createdProposal.Tender.title;
  const proposalAmount = createdProposal.totalAmount;
  const proposalDuration = createdProposal.projectDuration;
  await sendEmployerEmailProposalReceived(employerEmail, employerName, supplierCompanyName, tenderTitle, proposalAmount, proposalDuration);
  return cleanProposals(createdProposal);
};

const updateProposal = async (id, body) => {
  const { status } = body;
  const foundProposal = await Proposals.findByPk(id, {
    include: [
      {
        model: Tenders,
        attributes: ['id', 'title', 'budget', 'status', 'majorSector', 'projectDuration'],
        include: [
          {
            model: Locations,
            attributes: ['name'],
          },
          {
            model: Companies,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: Companies,
        attributes: ['id', 'name'],
        include: {
          model: Users,
          attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
        },
      },
    ],
  });
  if (!foundProposal) {
    const error = new Error(`Proposal with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundProposal.update(body);
  if (status === 'accepted') {
    const foundTender = await Tenders.findByPk(foundProposal.TenderId, {
      include: { model: Proposals },
    });
    await foundTender.update({ status: 'working' });
    const filteredProposals = foundTender.Proposals.filter((proposal) => proposal.id !== foundProposal.id);
    for (const proposal of filteredProposals) {
      const proposalInstance = await Proposals.findByPk(proposal.id, {
        include: [
          {
            model: Tenders,
            attributes: ['id', 'title', 'budget', 'status', 'majorSector', 'projectDuration'],
            include: [
              {
                model: Locations,
                attributes: ['name'],
              },
              {
                model: Companies,
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: Companies,
            attributes: ['id', 'name'],
            include: {
              model: Users,
              attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
            },
          },
        ],
      });
      await proposalInstance.update({ status: 'declined' });
      const receiver = proposalInstance.Company.Users[0].email;
      const supplierName = proposalInstance.Company.Users[0].firstName;
      const employerCompanyName = proposalInstance.Tender.Company.name;
      const tenderTitle = proposalInstance.Tender.title;
      await sendSupplierEmailProposalDeclined(receiver, supplierName, employerCompanyName, tenderTitle);
    }
    const receiver = foundProposal.Company.Users[0].email;
    const supplierName = foundProposal.Company.Users[0].firstName;
    const employerCompanyName = foundProposal.Tender.Company.name;
    const tenderTitle = foundProposal.Tender.title;
    await sendSupplierEmailProposalAccepted(receiver, supplierName, employerCompanyName, tenderTitle);
  }
  return cleanProposals(foundProposal);
};

const deleteProposal = async (id) => {
  const foundProposal = await Proposals.findByPk(id);
  if (!foundProposal) {
    const error = new Error(`Proposal with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  await foundProposal.destroy();
  const remainingProposals = await Proposals.findAll({
    include: [
      {
        model: Tenders,
        attributes: ['id', 'title', 'budget', 'majorSector', 'projectDuration'],
        include: [
          {
            model: Locations,
            attributes: ['name'],
          },
          {
            model: Companies,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: Companies,
        attributes: ['id', 'name'],
      },
    ],
  });
  return cleanProposals(remainingProposals);
};

module.exports = {
  getAllProposals,
  getProposalById,
  createProposal,
  updateProposal,
  deleteProposal,
};
