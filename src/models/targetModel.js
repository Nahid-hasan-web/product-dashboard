const mongoose = require("mongoose");

const targetShema = new mongoose.Schema({
  targetMo: {
    type: Number,
    require: true,
  },
  targetYear: {
    type: Number,
    require: true,
  },
  targetAmount: {
    type: Number,
    require: true,
  },
},{ timestamps:true});




module.exports = mongoose.model('revenueTargets' , targetShema)