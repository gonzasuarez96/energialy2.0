// DON'T USE THIS MODEL

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrganizationTypes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
