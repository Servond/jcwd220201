const db = require("../models");
const bcrypt = require("bcrypt");
const { signToken } = require("../lib/jwt");
const { Op } = require("sequelize");

const User = db.User;

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUserByEmail) {
        return res.status(400).json({
          message: "Email not found",
        });
      }

      // const passwordValid = bcrypt.compareSync(
      //   password,
      //   findUserByEmail.password
      // );

      // if (!passwordValid) {
      //   return res.status(400).json({
      //     message: "Password invalid",
      //   });
      // }

      // Hapus property password dari object yang akan dikirim
      // sebagai response
      // delete findUserByEmail.dataValues.password;

      const token = signToken({
        id: findUserByEmail.id,
      });

      return res.status(201).json({
        message: "Login User",
        data: findUserByEmail,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },

  editUserProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = `http://localhost:8000/${req.file.filename}`;
      }

      const findUserByNameOrEmail = await User.findOne({
        where: {
          [Op.or]: {
            name: req.body.name || "",
            email: req.body.email || "",
          },
        },
      });

      if (findUserByNameOrEmail) {
        return res.status(400).json({
          message: "Name or email has been taken",
        });
      }

      await User.update(
        { ...req.body },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      const findUserById = await User.findByPk(req.user.id);

      return res.status(200).json({
        message: "Edited user data",
        data: findUserById,
      });
    } catch (err) {
      console.log(err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id);

      const renewedToken = signToken({
        id: req.user.id,
      });

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const findUserById = await db.User.findOne({
        while: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        message: "Get user By ID",
        data: findUserById,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const findAllUser = await db.User.findAll({
        where: {
          ...req.query,
        },
      });
      return res.status(200).json({
        message: "Get All User",
        data: findAllUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = authController;
