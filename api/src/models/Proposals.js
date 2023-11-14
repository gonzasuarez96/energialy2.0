const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Proposals', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
      allowNull: false,
    },
    serviceAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    receiverAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    projectDuration: {
      type: DataTypes.ENUM,
      values: [
        'Menos de una semana',
        'Menos de un mes',
        'De 1 a 3 meses',
        'De 3 a 6 meses',
        'Más de 6 meses',
      ],
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    status: {
      type: DataTypes.ENUM,
      values: ['sent', 'accepted', 'declined'],
      defaultValue: 'sent',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
