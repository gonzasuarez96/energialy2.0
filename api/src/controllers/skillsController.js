const { Skills } = require('../db');
const { Op } = require('sequelize');

const getAllSkills = async () => {
  const allSkills = await Skills.findAll();
  return allSkills;
};

const filterSkillsByName = async (name) => {
  const filteredSkills = await Skills.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return filteredSkills;
};

const getSkillByID = async (id) => {
  const foundSkill = await Skills.findByPk(id);
  if (!foundSkill) {
    const error = new Error(`Skill with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return foundSkill;
};

const createSkill = async (name) => {
  if (!name) {
    const error = new Error("Missing required attributes.");
    error.status = 400;
    throw error;
  };
  const newSkill = await Skills.create({ name });
  return newSkill;
};

const updateSkill = async (id, name, isActive) => {
  const foundSkill = await Skills.findByPk(id);
  if (!foundSkill) {
    const error = new Error(`Skill with id ${id} not found.`);
    error.status = 404;
    throw error;
  };
  await foundSkill.update({ name, isActive });
  return foundSkill;
};

module.exports = {
  getAllSkills,
  filterSkillsByName,
  getSkillByID,
  createSkill,
  updateSkill
};
