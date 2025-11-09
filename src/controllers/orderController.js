const { generateOTP } = require("../helpers/genarators");
const sendMail = require("../helpers/mailSender");
const cartModel = require("../models/cartModel");
const cuponModel = require("../models/cuponModel");
const orderModel = require("../models/orderModel");
const orderInvoice = require("../templates/orderInvoice");

// ----------------------------------------------- create an order -----------------------------------------------
// post /order/place-order

const placeOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      distick,
      address,
      email,
      cartId,
      cuponCode,
      comment,
    } = req.body;

    // --------------- fildr validations
    if (!customerName || !phone || !distick || !address || !email || !cartId)
      return res.status(404).send("all fildes required");

    // ------------------ finding data from db

    const exisitCart = await cartModel
      .findOne({ _id: cartId })
      .populate("cartItem.productId" , "title thumbnail discontPrice")
      .select("cartItem");

    const totalPrice = exisitCart.cartItem.reduce((sum, products) => {
      return sum + products.productId.discontPrice;
    }, 0);

    // --------------- all calulations
    let shippingCost = 120;

    if (distick == "Dhaka") shippingCost = 80;

    const exisitCupon = await cuponModel.findOne({ cuponCode });

    const totalAmmount =
      totalPrice + shippingCost - (exisitCupon?.discountPirce || 0);

    const orderNo = generateOTP();

    await orderModel({
      customerName,
      phone,
      distick,
      address,
      email,
      cartId,
      cuponCode,
      comment,
      shippingCost,
      totalAmmount,
      orderNo,
      orderDate: new Date().toLocaleDateString(),
    }).save();
    // ---------------- send email

    sendMail(
      email,
      "Order invoice",
      orderInvoice(
        orderNo,
        customerName,
        phone,
        address,
        exisitCart.cartItem,
        totalAmmount,
        shippingCost,
        exisitCupon?.discountPirce || 0,
        totalAmmount
      )
    );

    res.status(200).send(exisitCart.cartItem);
  } catch (err) {
    res.status(500).send(`Internal server error ${err}`);
  }
};
// ----------------------------------------------- get all order -----------------------------------------------
// get /order/get-orders?date=27/5/25&

const get_All_orders = async (req, res) => {
  try {
    const { filter, startDate, endDate } = req.query;
    let query = {};

    if (filter === "last-week") {
      // Last 7 days
      const now = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      query.orderDate = { $gte: lastWeek, $lte: now };
    } else if (filter === "range") {
      // Custom date range
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Please provide startDate and endDate",
          });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      query.orderDate = { $gte: start, $lte: end };
    } else if (filter === "all") {
      query = {};
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid filter type" });
    }

    const orders = await orderModel.find(query).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      filterUsed: filter,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder, get_All_orders };
