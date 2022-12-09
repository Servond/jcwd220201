const { Address, sequelize } = require("../models");

// Own library imports
const getCoordinate = require("../lib/address/getCoordinate");

const addressController = {
  addNewAddress: async (req, res) => {
    try {
      // Get user id and new address
      const {
        id,
        newAddress: {
          recipient,
          phone,
          label,
          address,
          city,
          province,
          postalCode,
          isDefault,
        },
      } = req.body;

      // Get the coordinates of said address
      const pinpoint = await getCoordinate(city);

      // Send error response in case of invalid coordinate
      if (!pinpoint) {
        return res.status(400).json({
          message: "Pastikan kamu masukkan nama kota yang ada di Indonesia",
        });
      }

      // Persist user address in the Addresses table
      await sequelize.transaction(async (t) => {
        await Address.create(
          {
            user_id: id,
            recipient,
            phone,
            label,
            address,
            city,
            province,
            postal_code: postalCode,
            pinpoint,
            is_default: isDefault,
          },
          { transaction: t }
        );
      });

      // Send success response
      return res.status(201).json({
        message: "Alamat berhasil ditambahkan",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = addressController;
