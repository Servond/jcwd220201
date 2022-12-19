const { Op } = require("sequelize")
const db = require("../models")

const warehouseUserController = {
  createUserHouse: async (req, res) => {
    try {
      // const UserId = req.body

      const findUser = await db.User.findByPk(req.UserId)

      if (!findUser) {
        throw new Error("User tidak ditemukan")
      }
      const findWarehouse = await db.Warehouse.findByPk(req.body.WarehouseId)

      if (!findWarehouse) {
        throw new Error("Warehouse tidak ditemukan")
      }

      const findUserById = await db.User.findOne({
        where: { id: { [Op.like]: UserId } },
      })

      if (findUserById) {
        return res.status(400).json({
          message: "UserId sudah telah ada",
        })
      }

      const newWarehouseUser = await db.WarehousesUser.create({
        UserId: findUser,
        WarehouseId: findWarehouse,
      })

      return res.status(200).json({
        message: "Warehouse user telah ditambahkan",
        data: newWarehouseUser,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllWareUser: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllWareUser = await db.WarehousesUser.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["UserId", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Warehouse User",
        data: findAllWareUser.rows,
        dataCount: findAllWareUser.count,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
  updateWareUserById: async (req, res) => {
    try {
      const { id } = req.params

      await db.WarehousesUser.update({ ...req.body }, { where: { id: id } })

      return res.status(200).json({
        message: "Warehouse user telah update",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },

  deleteWareUserById: async (req, res) => {
    try {
      const { id } = req.params

      const wareUserById = await db.WarehousesUser.findOne({
        where: {
          id,
        },
      })

      if (!wareUserById) {
        return res.status(400).json({
          message: "Category not found",
        })
      }

      await db.WarehousesUser.destroy({
        where: {
          id,
        },
      })

      return res.status(200).json({
        message: "Warehouse user telah  dihapus",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = warehouseUserController
