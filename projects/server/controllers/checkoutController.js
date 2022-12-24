const {
  Address,
  Cart,
  Courier,
  Order,
  ProductStock,
  StockRequest,
  StockRequestItem,
  Status,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const moment = require("moment");

// Own library imports
const getWarehousesInfo = require("../lib/checkout/getWarehousesInfo");
const compareWarehouseDistances = require("../lib/checkout/compareWarehouseDistances");
const getDestinationInfo = require("../lib/checkout/getDestinationInfo");

// Configure axios default settings (RAJAONGKIR)
axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = "a459ef892f867c9cc0f57401a1396524";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

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

      // Sort warehouse by distance to shipping address
      const sortedWarehouse = compareWarehouseDistances(
        shippingAddressCoordinates,
        warehousesInfo
      );

      const [nearestWarehouse] = sortedWarehouse.splice(0, 1);

      // Send successful response
      return res.status(200).json({
        message: "Gudang terdekat ditemukan",
        data: {
          nearestWarehouse,
          nearestBranches: sortedWarehouse,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getDestinationInfo: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get destination address
      const { destinationAddress } = req.body;

      // Get destination info
      const warehousesInfo = await getDestinationInfo(destinationAddress);

      // Return successful response
      return res.status(200).json({
        message: "Informasi alamat pengiriman berhasil diambil",
        data: warehousesInfo,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getCartItems: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Find all checked items in the cart
      const checkedItems = await Cart.findAll({
        where: {
          [Op.and]: [{ UserId }, { is_checked: true }],
        },
        include: [{ model: Product }],
      });

      // Return successful response
      return res.status(200).json({
        message: "Berhasil mengambil data keranjang",
        data: checkedItems,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getCouriers: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get couriers
      const couriers = await Courier.findAll();

      // Send successful response
      return res.status(200).json({
        message: "Berhasil mengambil data kurir",
        data: couriers,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getShippingMethod: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      const { origin, destination, weight, courier } = req.body;

      // Get shipping details
      const response = await axios.post("/cost", {
        origin,
        destination,
        weight,
        courier,
      });

      const {
        rajaongkir: {
          results: [data],
        },
      } = response.data;

      return res.status(200).json({
        message: "Berhasil mengambil metode pengiriman",
        data,
      });
    } catch (err) {
      // console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  createOrder: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        });
      }

      // Get order details
      const {
        cartItems,
        sortedWarehouse,
        courierId,
        addressId,
        shippingService,
        shippingCost,
        totalPrice,
      } = req.body;

      // Check overall product availability
      for (let item of cartItems) {
        const { ProductId, quantity } = item;

        const stockDetails = await ProductStock.findAll({
          where: {
            ProductId,
          },
        });

        const totalStock = stockDetails.reduce((accumulator, current) => {
          return accumulator + current.stock;
        }, 0);

        // Cancel order if one of the product is not available
        if (totalStock < quantity) {
          return res.status(422).json({
            message: "Maaf, ada barang yang tidak tersedia di keranjang Anda",
            description: "Silakan cek kembali nanti",
          });
        }
      }

      // Create new order
      const { id: statusId } = await Status.findOne({
        where: {
          status: "menunggu pembayaran",
        },
      });

      await sequelize.transaction(async (t) => {
        await Order.create(
          {
            shipping_service: shippingService,
            total_price: totalPrice,
            AddressId: addressId,
            CourierId: courierId,
            StatusId: statusId,
            UserId,
            shipping_cost: shippingCost,
            ShipmentFromWarehouseId:
              sortedWarehouse.nearestWarehouse.warehouseInfo.id,
          },
          {
            transaction: t,
          }
        );
      });

      // Check products availability in the nearest warehouse
      for (let item of cartItems) {
        const { ProductId, quantity } = item;
        const { nearestWarehouse, nearestBranches } = sortedWarehouse;

        // Get available stock from the nearest warehouse
        const { stock: nearestWarehouseStock } = await ProductStock.findOne({
          where: {
            [Op.and]: [
              { ProductId },
              { WarehouseId: nearestWarehouse.warehouseInfo.id },
            ],
          },
          attributes: ["stock"],
        });

        // Make a request to nearest branches if additional stock is needed
        if (nearestWarehouseStock < quantity) {
          // Calculate items needed
          let itemsNeeded = !nearestWarehouseStock
            ? quantity
            : quantity - nearestWarehouseStock;

          // Create request form
          const requestItemsForm = [];

          // Check stock availability from nearest branches
          for (let branch of nearestBranches) {
            const { stock: nearestBranchStock } = await ProductStock.findOne({
              where: {
                [Op.and]: [
                  { ProductId },
                  { WarehouseId: branch.warehouseInfo.id },
                ],
              },
            });

            const time = moment().format();

            /*
              Continue checking from subsequent nearest branches if stock not available
              from the current nearest branch
            */
            if (!nearestBranchStock) {
              continue;
            }

            /*
              Create request draft consisting of available items if available stock is less than
              or equal to items needed
            */
            if (nearestBranchStock <= itemsNeeded) {
              requestItemsForm.push({
                ProductId,
                quantity: nearestBranchStock,
                StockRequest: {
                  date: time,
                  is_approved: true,
                  approved_date: time,
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              });

              itemsNeeded -= nearestBranchStock;

              // End search if quantity is met
              if (!itemsNeeded) {
                break;
              }

              //  Continue checking for available stock from subsequent nearest branches
              //  if quantity is not met
              continue;
            }

            /*
              Create request draft consisting of the number of items needed if available stock 
              is greater than items needed
            */
            if (nearestBranchStock >= itemsNeeded) {
              requestItemsForm.push({
                ProductId,
                quantity: itemsNeeded,
                StockRequest: {
                  date: time,
                  is_approved: true,
                  approved_date: time,
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              });

              // End search
              break;
            }
          }

          // Request needed product to the nearest branches
          await sequelize.transaction(async (t) => {
            const time = moment().format();

            await StockRequestItem.bulkCreate(requestItemsForm, {
              include: StockRequest,
            });
          });
        }
      }

      /* TODO LIST */
      // Create new order
      // Update product stock
      // Record changes in journal

      return res.status(200).json({
        message: "berhasil",
        // data: nearestWarehouseStock,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = checkoutController;
