const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Messages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Campo para identificar al senderId
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    // Campo para identificar al receiverId
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
