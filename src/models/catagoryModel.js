const mongoose = require('mongoose')

const catagorySchema = new mongoose.Schema({
    catagoryName:{
        type:String,
        required:true
    },
    catagoryImage:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true,
    },
    creatorEmail:{
        type:String,
        required:true
    }
} ,{timestamps:true})

module.exports = mongoose.model('productCatagory' , catagorySchema)