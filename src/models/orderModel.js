const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  distick: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.ObjectId,
    ref: "product_cart",
  },
  shippingCost: {
    type: Number,
    require: true,
  },
  cuponCode: {
    type: String,
    default: null,
  },
  comment: {
    type: String,
    default: null,
  },
  totalAmmount: {
    type: Number,
    require: true,
  },
  orderNo: {
    type: Number,
    require: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Order confirmed", "processed", "shipped", "delivered", "cancelled"],
  },
  orderDate:{
    type:Date,
    required:true
  }
});

module.exports = mongoose.model("orders", orderSchema);
