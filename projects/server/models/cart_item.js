"use strict"
const Sequelize = require("sequelize")
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart)
      CartItem.belongsTo(models.Product)
    }
  }
  CartItem.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carts",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cart_items",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_cart_id_idx",
          using: "BTREE",
          fields: [{ name: "cart_id" }],
        },
        {
          name: "fk_product_id_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  )
  return CartItem
}
