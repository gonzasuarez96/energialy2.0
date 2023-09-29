const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Documents', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.ENUM,
      values: [
        'estatutoSocial',
        'inscripcionAFIP',
        'cuit',
        'actasReunion',
        'cartaPoder',
        'estadosContables',
        'licencias',
        'censoAgropecuario',
        'registroAccionistas',
        'cumplimientoCensal',
        'ddjjIVA',
        'ddjjSujetoObligado',
        'constanciaUIF',
        'compreNeuquino',
      ],
      allowNull: false,
    },
    attachment: {
      type: DataTypes.JSONB,
      // attachment: {
      //   "fileKey": "0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
      //   "fileUrl": "https://utfs.io/f/0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
      //   "fileName": "jwt-handbook-v0_14_1.pdf",
      //   "fileSize": 1728914
      // }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
