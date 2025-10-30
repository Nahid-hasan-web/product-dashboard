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
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
    },
  ],
  shippingCost: {
    type: Number,
    require: true,
  },

  cuponCode: {
    type: String,
    default:null
  },
  comment: {
    type: String,
    default:null
  },
  totalAmmount: {
    type: Number,
    require: true,
  },

  deliveryStatus: {
    type: String,
    enum: ["Order confirmed", "processed", "shipped", "delivered", "cancelled"],
  },
});

module.exports = mongoose.model("orders", orderSchema);
