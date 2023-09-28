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
        'Estatuto social',
        'Inscripción en AFIP',
        'CUIT',
        'Actas de Reunión de Directorio',
        'Carta Poder',
        'Estados contables',
        'Licencias o autorizaciones',
        'Censo Nacional Agropecuario',
        'Registro de accionistas',
        'Cumplimiento Censal',
        'DD.JJ. IVA',
        'DD.JJ. Sujeto Obligado',
        'Constancia de UIF',
        'Compre Neuquino',
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
