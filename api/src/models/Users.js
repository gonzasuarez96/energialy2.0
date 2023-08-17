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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
