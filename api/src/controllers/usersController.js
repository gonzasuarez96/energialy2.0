const { Users } = require('../db');

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  /*
  [
    { id: '1', email: 'user1@example.com', isActive: true },
    { id: '2', email: 'user2@example.com', isActive: false }
  ];
*/
  return allUsers;
};

const getUserByID = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  return user;
};

const updateUserProfile = async (id, newData) => {
  const user = await Users.findByPk(id);
  if (!user) {
    const error = new Error(`User with id ${id} not found.`);
    error.status = 404;
    throw error;
  }
  
  // actualizo los datos del perfil del usuario con newData
  await user.update(newData);
  
  return user;
};

module.exports = {
  getAllUsers,
  getUserByID,
  updateUserProfile
};


/* get traer usuarios por id 
y un put para editar el perfil del usuario */