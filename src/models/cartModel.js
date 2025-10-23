const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref:'auth',
    required: true,
  },
  cartItem: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'products'
      },
      qty:{
        type:Number,
        default:1
      }
    },
  ],
});


module.exports = mongoose.model('product_cart' , cartSchema)