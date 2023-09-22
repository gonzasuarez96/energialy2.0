const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Finances", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    financeProduct: {
      type: DataTypes.ENUM,
      values: [
        "CC en pesos $",
        "CC en dólares u$s",
        "Home Banking",
        "Tarjeta de crédito",
        "Cheques a terceros",
        "Cheques propios",
        "E-Cheqs",
        "COMEX",
        "Factura crédito electrónica",
        "Préstamo a sola firma",
        "Préstamo con garantía",
      ],
      allowNull: false,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        "sent",
        "accepted",
        "declined",
      ],
      defaultValue: "sent",
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
