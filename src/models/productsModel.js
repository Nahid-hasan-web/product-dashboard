const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: String,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  subImages: [],
  price: {
    type: String,
    requried: true,
  },
  discontPrice: {
    type: String,
    default: null,
  },
  discountPercent: {
    type: String,
    default: null,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
    enum: ["pending", "active", "reject"],
  },
  varients: [
    {
      varientName: { type: String, default: null },
      options: [
        {
          color: { type: String, default: null },
          size: { type: String, default: null },
          additionalPrict: {
            type: String,
            default: null,
          },
        },
      ],
    },
  ],
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
