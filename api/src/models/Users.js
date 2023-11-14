const { DataTypes } = require('sequelize');

// Exporting the function that defines the model
module.exports = (sequelize) => {
  sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'superAdmin', 'bank'],
      allowNull: false,
      defaultValue: 'admin',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
