const {
  getAllSkills,
  filterSkillsByName,
  getSkillByID,
  createSkill,
  updateSkill
} = require('../controllers/skillsController');

const getSkillsHandler = async (req, res) => {
  try {
    const { filter } = req.query;
    const skills = filter ? await filterSkillsByName(filter) : await getAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getSkillByIDHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSkill = await getSkillByID(id);
    res.status(200).json(foundSkill);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const createSkillHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const newSkill = await createSkill(name);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const updateSkillHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const updatedSkill = await updateSkill(id, name, isActive);
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  getSkillsHandler,
  getSkillByIDHandler,
  createSkillHandler,
  updateSkillHandler
}