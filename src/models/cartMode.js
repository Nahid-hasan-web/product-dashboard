const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  items: [
    {
      productid: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      qty:{
        type:Number,
        default:1
      }
    },
  ],
});


module.exports = mongoose.model('product_cart' , cartSchema)