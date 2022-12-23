"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class JournalType extends Model {}
  JournalType.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      stock_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock_before: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JournalType",
      timestamps: true,
    }
  )
  return JournalType
}
