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
    required: true,
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

  categoryId: {
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
      options: [],
      AdditionalPrice: { type: String, default: null },
    },
  ],
  review: [
    {
      reivewerName: { type: String, default: null },
      reviewRating: { type: String, default: null },
      reviewComment: { type: String, rdefault: null },
    },
  ],
});

module.exports = mongoose.model("products", productSchema);
