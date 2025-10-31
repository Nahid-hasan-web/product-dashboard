const mongoose = require('mongoose')



const cuponSchema = new mongoose.Schema({
    cuponCode:{
        type:String,
        required:true
    },
    discountPirce:{
        type:Number,
        required:true
    },
}) 


module.exports = mongoose.model('copon' , cuponSchema)