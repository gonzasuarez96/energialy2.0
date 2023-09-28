const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('BankAccounts', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['waiting approval', 'require changes', 'open'],
      defaultValue: 'waiting approval',
      allowNull: false,
    },
    statusMessage: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
