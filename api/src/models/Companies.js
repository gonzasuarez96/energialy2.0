const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Companies', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    foundationYear: {
      type: DataTypes.INTEGER,
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    annualRevenue: {
      type: DataTypes.ENUM,
      values: ["No Revelado", "0 - 10M U$S", "10M - 100M U$D", "100M - 1B U$S", "+1B U$S"],
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    bannerPicture: {
      type: DataTypes.STRING,
    },
    numberOfEmployees: {
      type: DataTypes.ENUM,
      values: ["Menos de 50 empleados", "De 50 a 200 empleados", "De 200 a 1000 empleados", "De 1000 a 5000 empleados", "Mas de 5000 empleados"],
    },
    compreNeuquino: {
      type: DataTypes.BOOLEAN
    },
    multimedia: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    experience: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    certifications: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    homologations: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
