const { Router } = require('express');
const {
  getSkillsHandler,
  getSkillByIDHandler,
  createSkillHandler,
  updateSkillHandler,
  // deleteSkillHandler
} = require('../../handlers/skillsHandler');

const skillsRouter = Router();

skillsRouter.get('/', getSkillsHandler);
skillsRouter.get('/:id', getSkillByIDHandler);
skillsRouter.post('/', createSkillHandler);
skillsRouter.put('/:id', updateSkillHandler);
// skillsRouter.delete('/:id', deleteSkillHandler);

module.exports = skillsRouter;