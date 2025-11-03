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

    let shippingCost = 120;

    if (distick == "Dhaka") shippingCost = 80;

    const exisitCart = await cartModel
      .findOne({ _id: cartId })
      .populate("cartItem.productId")
      .select("cartItem");

    const totalPrice = exisitCart.cartItem.reduce((sum, products) => {
      return sum + products.productId.discontPrice;
    }, 0);



    const exisitCupon = await cuponModel.findOne({cuponCode})

    const totalAmmount =  (totalPrice + shippingCost) -( exisitCupon?.discountPirce || 0 )
    
    console.log(totalAmmount );

    // await orderModel({
    //   customerName,
    //   phone,
    //   distick,
    //   address,
    //   email,
    //   cartId,
    //   cuponCode,
    //   comment,
    //   shippingCost:shippingCost
    // });


    res.send(exisitCart);
  } catch (err) {
    res.status(500).send(`Internal server error ${err}`);
  }
};

module.exports = { placeOrder };
