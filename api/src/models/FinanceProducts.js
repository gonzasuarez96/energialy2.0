const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("FinanceProducts", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productName: {
      type: DataTypes.ENUM,
      values: [
        "CC en pesos $",
        "CC en dólares u$s",
        "Home Banking",
        "Tarjeta de crédito",
        "Cheques propios",
        "Cheques a terceros",
        "E-Cheqs",
        "Factura de crédito electrónica",
        "Préstamo a sola firma",
        "Préstamo con garantía",
        "COMEX",
      ],
      allowNull: false,
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
    aditionalData: {
      type: DataTypes.JSONB,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
