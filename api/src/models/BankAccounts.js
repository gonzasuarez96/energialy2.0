const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("BankAccounts", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        "waiting approval",
        "request changes",
        "accepted",
      ],
      defaultValue: "waiting approval",
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
