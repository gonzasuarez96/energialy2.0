const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Tenders', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    contractType: {
      type: DataTypes.ENUM,
      values: [
        'Licitación área (Licitación pública de área)',
        'Servicio completo (Desarrollo total de un proyecto)',
        'Individual (Servicio específico en un proyecto)',
      ],
      allowNull: false,
    },
    majorSector: {
      type: DataTypes.ENUM,
      values: ['Upstream', 'Midstream', 'Downstream'],
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
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showBudget: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    validityDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'expired', 'working', 'completed', 'cancelled'],
      defaultValue: 'published',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
