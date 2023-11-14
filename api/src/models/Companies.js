const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Companies', {
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
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    bannerPicture: {
      type: DataTypes.STRING,
    },
    foundationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annualRevenue: {
      type: DataTypes.ENUM,
      values: [
        'No Revelado',
        '0 - 10M U$S',
        '10M - 100M U$D',
        '100M - 1B U$S',
        '+1B U$S',
      ],
      allowNull: false,
    },
    employeeCount: {
      type: DataTypes.ENUM,
      values: [
        'Menos de 50 empleados',
        'De 50 a 200 empleados',
        'De 200 a 1000 empleados',
        'De 1000 a 5000 empleados',
        'Mas de 5000 empleados',
      ],
      allowNull: false,
    },
    organizationType: {
      type: DataTypes.ENUM,
      values: [
        'Organismo Público',
        'Operadora',
        'PyME',
        'Cámara/Cluster/Federación',
        'Profesional independiente',
        'Servicios especiales',
      ],
      allowNull: false,
      defaultValue: 'PyME',
    },
    businessName: {
      type: DataTypes.STRING,
    },
    fiscalAdress: {
      type: DataTypes.STRING,
    },
    cuit: {
      type: DataTypes.STRING,
    },
    companyEmail: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    legalManager: {
      type: DataTypes.JSONB,
      // "legalManager": {
      //   "firstName": "Tim",
      //   "lastName": "Cook",
      //   "email": "tim@apple.com",
      //   "position": "CEO",
      //   "phoneNumber": "+5491112345678"
      // },
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    multimedia: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    experience: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    certifications: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    homologations: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
