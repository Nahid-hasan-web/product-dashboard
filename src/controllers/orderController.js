const { generateOTP } = require("../helpers/genarators");
const cartModel = require("../models/cartModel");
const cuponModel = require("../models/cuponModel");
const orderModel = require("../models/orderModel");

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
      .populate("cartItem.productId")
      .select("cartItem");

    const totalPrice = exisitCart.cartItem.reduce((sum, products) => {
      return sum + products.productId.discontPrice;
    }, 0);

    // --------------- all calulations
    let shippingCost = 120;

    if (distick == "Dhaka") shippingCost = 80;

    const exisitCupon = await cuponModel.findOne({ cuponCode });

    const totalAmmount = totalPrice + shippingCost - (exisitCupon?.discountPirce || 0);

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
      orderNo
    }).save();

    res.status(200).send('order Confirmed');
  } catch (err) {
    res.status(500).send(`Internal server error ${err}`);
  }
};

module.exports = { placeOrder };
