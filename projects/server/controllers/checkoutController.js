const { Address, sequelize } = require("../models");

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

      const defaultAddress = addresses.find((element) => element.is_default);

      // Send successful response
      return res.status(200).json({
        message: "Daftar alamat berhasil diambil",
        data: { defaultAddress, addresses },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = checkoutController;
