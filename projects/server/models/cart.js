"use strict"
const Sequelize = require("sequelize")
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.CartItem)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "carts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_user_id_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  )
  return Cart
}
