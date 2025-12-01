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

    const exisitCart = await cartModel.findOne({ _id: cartId }).populate({
      path: "cartItem.productId",
      select: "title thumbnail discontPrice",
      strictPopulate: false, // Don't fail if product missing
    })
    .select("cartItem");

    if (!exisitCart) return res.status(404).send("cart not found");

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
      orderDate: new Date(),
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

    res.status(200).json("order confirmed");
  } catch (err) {
    console.log(err);
    res.status(500).json(`Internal server error ${err}`);
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
    } else if (startDate && endDate) {
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
    const totalOrder = await orderModel.find().countDocuments();

    res.status(200).json({
      success: true,
      filterUsed: filter,
      count: orders.length,
      data: orders,
      totalOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ----------------------------------------------- get Customer list -----------------------------------------------
const getCustomerList = async (req, res) => {
  try {
    const customerList = await orderModel.aggregate([
      {
        $group: {
          _id: "$email", // Group by email (unique identifier)
          customerName: { $first: "$customerName" },
          phone: { $first: "$phone" },
          email: { $first: "$email" },
          totalOrders: { $sum: 1 }, // Count orders
          totalPurchase: { $sum: "$totalAmmount" } // Sum of all purchases
        }
      },
      {
        $project: {
          _id: 0, // Hide _id
          customerName: 1,
          phone: 1,
          email: 1,
          totalOrders: 1,
          totalPurchase: 1
        }
      },
      {
        $sort: { totalPurchase: -1 } // Sort by highest spender first
      }
    ]);

    res.status(200).json({
      success: true,
      data: customerList
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { placeOrder, get_All_orders  ,getCustomerList};
