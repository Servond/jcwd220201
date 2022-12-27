const db = require("../models")
const { validationResult, Result } = require("express-validator")
const { Op } = require("sequelize")

const AdminUser = db.User

module.exports = {
  createAdminUser: async (req, res) => {
    try {
      //   // Validate user input
      //   const errors = validationResult(req)
      //   if (!errors.isEmpty()) {
      //     return res
      //       .status(400)
      //       .json({ message: "Format email salah", errors: errors.array() })
      //   }

      // Create admin data
      const { name, email, password, roleId } = req.body

      const newAdminUser = await AdminUser.create({
        name: name,
        email: email,
        password: password,
        is_verified: 1,
        roleId: roleId,
      })

      return res.status(201).json({
        message: "Admin User Created",
        data: newWarehouse,
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getAllAdminUser: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllAdminUser = await AdminUser.findAndCountAll({
        where: {
          [Op.or]: [{ roleId: 1 }, { roleId: 2 }],
        },
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["id", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Admin Users",
        data: findAllAdminUser.rows,
        dataCount: findAllAdminUser.count,
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getAllUser: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllUser = await AdminUser.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["id", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Users",
        data: findAllUser.rows,
        dataCount: findAllUser.count,
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getAdminUserById: async (req, res) => {
    try {
      const { id } = req.params

      const adminUserById = await AdminUser.findOne({
        where: {
          id,
        },
      })

      if (!adminUserById) {
        return res.status(400).json({
          message: "User not found",
        })
      }

      return res.status(200).json({
        message: "Get user by ID",
        data: adminUserById,
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  updateAdminUserById: async (req, res) => {
    try {
      const { id } = req.params

      await AdminUser.update({ ...req.body }, { where: { id: id } })

      return res.status(200).json({
        message: "Admin Data Updated",
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  deleteAdminUserById: async (req, res) => {
    try {
      const { id } = req.params

      const adminUserById = await AdminUser.findOne({
        where: {
          id,
        },
      })

      if (!adminUserById) {
        return res.status(400).json({
          message: "Admin User not found",
        })
      }

      await AdminUser.destroy({
        where: {
          id,
        },
      })

      return res.status(200).json({
        message: "Admin User Deleted",
      })
      //
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}
