const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Campo para identificar al remitente
    remitenteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    // Campo para identificar al destinatario
    destinatarioId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
