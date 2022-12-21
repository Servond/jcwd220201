const { Address, sequelize } = require("../models");
const { Op } = require("sequelize");

const checkoutController = {
  getAddresses: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get user addresses
      const addresses = await Address.findAll({
        where: {
          UserId,
        },
        order: [
          ["is_default", "DESC"],
          ["label", "ASC"],
        ],
      });

      const selectedAddress = addresses.find((address) => address.is_selected);

      // Send successful response
      return res.status(200).json({
        message: "Daftar alamat berhasil diambil",
        data: { selectedAddress, addresses },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  selectAddress: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get address id
      const { id } = req.body;

      // Update selected address
      await sequelize.transaction(async (t) => {
        await Address.update(
          { is_selected: false },
          {
            where: {
              [Op.and]: [{ UserId }, { is_selected: true }],
            },
            transaction: t,
          }
        );
      });

      await sequelize.transaction(async (t) => {
        await Address.update(
          { is_selected: true },
          {
            where: {
              [Op.and]: [{ id }, { UserId }],
            },
            transaction: t,
          }
        );
      });

      // Send successful response
      return res.status(200).json({
        message: "Alamat berhasil diubah",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = checkoutController;
