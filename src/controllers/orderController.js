const { generateOTP } = require("../helpers/genarators");
const sendMail = require("../helpers/mailSender");
const cartModel = require("../models/cartModel");
const cuponModel = require("../models/cuponModel");
const orderModel = require("../models/orderModel");
const orderInvoice = require("../templates/orderInvoice");


// ----------------------------------------------- create an order -----------------------------------------------  
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
      orderDate : new Date().toLocaleDateString()
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
        totalAmmount , 

      )
    );

    res.status(200).send("order confirmed");
  } catch (err) {
    res.status(500).send(`Internal server error ${err}`);
  }
};
// ----------------------------------------------- get all order -----------------------------------------------
// get http://localhost:8000/order/get-orders?date=27/5/25&
const get_All_orders = (req ,res)=>{
    res.send(req.query)
    
console.log(new Date().toLocaleDateString());
}  






module.exports = { placeOrder,get_All_orders};
