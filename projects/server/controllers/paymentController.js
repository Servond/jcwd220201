const {
  Order,
  ProductStock,
  Product,
  Address,
  Status,
  OrderItem,
  User,
  Warehouse,
  Stock,
  sequelize,
} = require("../models")
const fs = require("fs")
const emailer = require("../lib/emailer")
const moment = require("moment")

const getWarehousesInfo = require("../lib/checkout/getWarehousesInfo")
const compareWarehouseDistances = require("../lib/checkout/compareWarehouseDistances")
const getDestinationInfo = require("../lib/checkout/getDestinationInfo")

const handlebars = require("handlebars")
const { Op } = require("sequelize")
const { Console } = require("console")

const paymentController = {
  getPayment: async (req, res) => {
    try {
      const {
        _limit = 6,
        _page = 1,
        _sortDir = "ASC",
        _sortBy = "UserId",
        WarehouseId = "",
        UserId = "",
        StatusId = "",
        product_name = "",
      } = req.query

      if (
        _sortBy === "UserId" ||
        _sortBy === "WarehouseId" ||
        _sortBy === "StatusId" ||
        UserId ||
        WarehouseId ||
        StatusId
      ) {
        if (!Number(WarehouseId)) {
          const findPayment = await Order.findAndCountAll({
            attributes: [
              "id",
              "payment_date",
              "total_price",
              "StatusId",
              "UserId",
              "WarehouseId",
            ],
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            order: [[_sortBy, _sortDir]],
            include: [
              { model: Warehouse, attributes: ["Warehouse_name"] },
              {
                model: OrderItem,
                attributes: ["ProductId"],
                include: [
                  {
                    model: Product,
                    attributes: ["product_name"],
                    where: {
                      [Op.or]: [
                        {
                          product_name: {
                            [Op.like]: `%${product_name}%`,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            WarehouseId: WarehouseId,
          })
          return res.status(200).json({
            message: "Get All Payment",
            data: findPayment.rows,
            dataCount: findPayment.count,
          })
        }

        const findPayment = await Order.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          order: [[_sortBy, _sortDir]],
          include: [
            { model: Warehouse, attributes: ["Warehouse_name"] },
            {
              model: OrderItem,
              attributes: ["ProductId"],
              include: [
                {
                  model: Product,
                  attributes: ["product_name"],
                  where: {
                    [Op.or]: [
                      {
                        product_name: {
                          [Op.like]: `%${product_name}%`,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
          WarehouseId: WarehouseId,
        })
        return res.status(200).json({
          message: "Get All paument",
          data: findPayment.rows,
          dataCount: findPayment.count,
        })
      }

      const findPayment = await Order.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["UserId", _sortDir]],
        include: [
          { model: OrderItem, attributes: ["ProductId"] },
          { model: Warehouse, attributes: ["Warehouse_name"] },
          { model: Product, attributes: ["product_name"] },
        ],
      })

      return res.status(200).json({
        message: "Get All Payment",
        data: findPayment.rows,
        dataCount: findPayment.count,
      })

      // let allOrder = await Order.findAll({
      //   attributes: [
      //     "id",
      //     "payment_date",
      //     "total_price",
      //     "StatusId",
      //     "UserId",
      //     "WarehouseId",
      //   ],
      //   include: [
      //     {
      //       model: OrderItem,
      //       include: [{ model: Product, attributes: ["product_name"] }],
      //     },
      //     {
      //       model: db.Courier,
      //     },
      //     {
      //       model: db.User,
      //     },

      //     {
      //       model: db.Status,
      //     },
      //   ],
      //   order: [["id", "ASC"]],
      // })

      // return res.status(200).json({
      //   message: "Get all user order payment",
      //   data: allOrder,
      // })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getPaymentById: async (req, res) => {
    try {
      const findOrderById = await db.Order.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["payment_date", "total_price", "UserId"],
        include: [
          {
            model: db.OrderItem,
            include: [db.Product],
          },
          {
            model: db.Courier,
          },
          {
            model: db.User,
          },

          {
            model: db.Status,
          },
        ],
        order: [["id", "ASC"]],
      })

      return res.status(200).json({
        message: "Get payment by Id",
        data: findOrderById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  findNearestWarehouse: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user

      if (!UserId) {
        return res.status(401).json({
          message: "Terjadi kesalahan, silakan login terlebih dahulu",
        })
      }

      // Get shipping address
      const shippingAddress = await Address.findOne({
        where: {
          [Op.and]: [{ UserId }, { is_selected: true }],
        },
      })

      // Get shipping address longitude and latitude
      const [latitude, longitude] = shippingAddress.pinpoint.split(", ")
      const shippingAddressCoordinates = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      }

      // Get warehouse addresses
      const warehousesInfo = await getWarehousesInfo()

      // Sort warehouse by distance to shipping address
      const sortedWarehouse = compareWarehouseDistances(
        shippingAddressCoordinates,
        warehousesInfo
      )

      const [nearestWarehouse] = sortedWarehouse.splice(0, 1)

      // Send successful response
      return res.status(200).json({
        message: "Gudang terdekat ditemukan",
        data: {
          nearestWarehouse,
          nearestBranches: sortedWarehouse,
        },
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  findPaymentStatus: async (req, res) => {
    try {
      const status = await db.Order.findAll({
        where: {
          attribute: { StatusId: req.body.StatusId },
        },
      })

      return res.status(200).json({
        message: "find status",
        data: status,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
    }
  },

  confirmPayment: async (req, res) => {
    try {
      const { id } = req.params
      const { WarehouseId, stock, ProductId } = req.body

      const findOrder = await Order.findOne({
        include: [{ model: Warehouse }],
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "Order is not found",
        })
      }

      // Get shipping address
      const shippingAddress = await Address.findOne({
        where: {
          is_selected: true,
        },
      })

      // Get shipping address longitude and latitude
      const [latitude, longitude] = shippingAddress.pinpoint.split(", ")
      const shippingAddressCoordinates = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      }

      // Get warehouse addresses
      const warehousesInfo = await getWarehousesInfo()

      // Sort warehouse by distance to shipping address
      const sortedWarehouse = compareWarehouseDistances(
        shippingAddressCoordinates,
        warehousesInfo
      )

      const [nearestWarehouse] = sortedWarehouse.splice(0, 1)
      const nearestBranches = sortedWarehouse

      const orderItems = await OrderItem.findAll({
        where: {
          OrderId: findOrder.id,
        },
        include: [{ model: Product }],
      })

      // Check overall product availability
      for (let item of orderItems) {
        const { ProductId, quantity } = item

        const stockDetails = await ProductStock.findAll({
          where: {
            ProductId,
          },
        })

        const totalStock = stockDetails.reduce((accumulator, current) => {
          return accumulator + current.stock
        }, 0)

        console.log(totalStock, "totalStock")

        // Cancel order if one of the product is not available
        if (totalStock < quantity) {
          return res.status(422).json({
            message: "Transaksi gagal",
            description: "Ada barang yang tidak tersedia di keranjang Anda",
          })
        }
      }

      // Check products availability in the nearest warehouse

      for (let item of orderItems) {
        const { ProductId, quantity } = item

        // Get available stock from the nearest warehouse
        const { stock } = await ProductStock.findOne({
          raw: true,
          where: {
            [Op.and]: [
              { ProductId },
              { WarehouseId: nearestWarehouse.warehouseInfo.id },
            ],
          },
        })

        console.log(nearestWarehouse, "near warehouse")

        // Make a request to nearest branches if additional stock is needed
        const requestItemsForm = []
        console.log(requestItemsForm, "form")

        if (stock < quantity) {
          // Calculate items needed
          let itemsNeeded = !stock ? quantity : quantity - stock

          // Check stock availability from nearest branches
          for (let branch of nearestBranches) {
            const { stock: nearestBranchStock } = await ProductStock.findOne({
              raw: true,
              where: {
                [Op.and]: [
                  { ProductId },
                  { WarehouseId: branch.warehouseInfo.id },
                ],
              },
            })
            console.log(nearestBranchStock, "stock")

            const time = moment().format()

            /*
              Continue checking from subsequent nearest branches if stock not available
              from the current nearest branch
            */

            if (!nearestBranchStock) {
              continue
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
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              })

              // if (quantity > stock) {
              //   const update = await ProductStock.update(
              //     {
              //       stock: 0,
              //     },
              //     {
              //       where: {
              //         id: id,
              //         ProductId: findOrder.ProductId,
              //         WarehouseId: findOrder.WarehouseId,
              //       },
              //     }
              //   )
              // } else if (quantity <= stock) {
              //   const update = await ProductStock.update(
              //     {
              //       stock: 0,
              //     },
              //     {
              //       where: {
              //         id: id,
              //         ProductId: findOrder.ProductId,
              //         WarehouseId: findOrder.WarehouseId,
              //       },
              //     }
              //   )
              //   console.log(update, "up")
              // }

              // update jumlah klo = 0, kalau < stock update 0
              // stock >= update stock semula dikurangi item needed

              itemsNeeded -= nearestBranchStock

              if (!itemsNeeded) {
                break
              }

              continue
            }

            /*
              Create request draft consisting of the number of items needed if available stock
              is greater than items needed
            */

            if (nearestBranchStock >= itemsNeeded) {
              console.log(itemsNeeded, "need")
              console.log(quantity, "quantity")
              requestItemsForm.push({
                ProductId,
                quantity: itemsNeeded,
                StockRequest: {
                  date: time,
                  is_approved: true,
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              })

              break
            }
          }
          const updateStock = await ProductStock.update(
            { stock: quantity[item] },
            {
              where: {
                id: id,
                ProductId: findOrderProductId,
                WarehouseId: findOrder.WarehouseId,
              },
            }
          )

          console.log(updateStock, "update")
        }
      }

      const { id: statusId } = await Status.findOne({
        where: {
          status: "diproses",
        },
      })

      await Order.update(
        {
          StatusId: statusId,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findApproveTrasanction = await Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: User }],
      })

      const totalBill = findApproveTrasanction.total_price
      const paymentDate = moment(findApproveTrasanction.payment_date).format(
        "dddd, DD MMMM YYYY, HH:mm:ss"
      )
      const transactionLink = `process.env.DOMAIN_NAME/transaction-list`

      const rawHTML = fs.readFileSync("templates/payment/approve.html", "utf-8")

      const compiledHTML = handlebars.compile(rawHTML)

      const htmlResult = compiledHTML({
        email: findApproveTrasanction.User.email,
        totalBill: totalBill.toLocaleString(),

        dateAndTime: `${paymentDate} WIB`,
        transactionListLink: transactionLink,
      })

      await emailer({
        to: findApproveTrasanction.User.email,
        html: htmlResult,
        subject: "Payment Verified",
        text: "Thank You",
        attachments: [
          {
            filename: "logo.png",
            path: `${__dirname}/../templates/images/logo.png`,
            cid: "logo",
          },
        ],
      })

      return res.status(200).json({
        message: "confirm payment success",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
    }
  },
  rejectPayment: async (req, res) => {
    try {
      const { id } = req.params

      const findOrder = await Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "order not found",
        })
      }

      const { id: statusId } = await Status.findOne({
        where: {
          status: "menunggu pembayaran",
        },
      })

      await Order.update(
        {
          StatusId: statusId,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findOrderId = await Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: User }],
      })

      const link = `process.env.DOMAIN_NAME/payment/wired/${findOrderId.id}`

      const template = fs.readFileSync(
        "./templates/payment/reject.html",
        "utf-8"
      )

      const compiledHTML = handlebars.compile(template)

      const htmlResult = compiledHTML({
        email: findOrderId.User.email,
        link,
      })

      await emailer({
        to: findOrderId.User.email,
        subject: "Reject Payment",
        html: htmlResult,
        text: "Please reupload your payment proof",
        attachments: [
          {
            filename: "logo.png",
            path: `${__dirname}/../templates/images/logo.png`,
            cid: "logo",
          },
        ],
      })

      return res.status(200).json({
        message: "Payment Rejected",
        data: findOrderId,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = paymentController
