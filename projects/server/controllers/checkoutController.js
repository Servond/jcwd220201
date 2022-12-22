const { Address, sequelize } = require("../models");
const { Op } = require("sequelize");

// Own library imports
const axiosInstance = require("../lib/checkout/api");
const getWarehousesInfo = require("../lib/checkout/getWarehousesInfo");
const compareWarehouseDistances = require("../lib/checkout/compareWarehouseDistances");

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
  findNearestWarehouse: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get shipping address
      const shippingAddress = await Address.findOne({
        where: {
          [Op.and]: [{ UserId }, { is_selected: true }],
        },
      });

      // Get shipping address longitude and latitude
      const [latitude, longitude] = shippingAddress.pinpoint.split(", ");
      const shippingAddressCoordinates = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      // Get warehouse addresses
      const warehousesInfo = await getWarehousesInfo();

      // Find nearest warehouse
      const nearestWarehouse = compareWarehouseDistances(
        shippingAddressCoordinates,
        warehousesInfo
      );

      return res.status(200).json({
        message: "Gudang terdekat ditemukan",
        data: nearestWarehouse,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = checkoutController;
