"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PaymentStatus extends Model {
    static associate(models) {
      PaymentStatus.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  PaymentStatus.init(
    {
      payment: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaymentStatus",
      timestamps: false,
    }
  )
  return PaymentStatus
}
