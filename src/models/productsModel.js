const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  address: [
    {
      rode: {
        type: String,
        required: true,
      },
      arrea: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    }
  ],
});

module.exports = mongoose.model("products", productSchema);
