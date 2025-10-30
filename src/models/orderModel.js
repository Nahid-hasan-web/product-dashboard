const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    productsId:{
        type:String,
        required:true
    },
    deliveryStatus:{
        type:String,
        enum:['pendding' , 'processed' , 'shipped' , 'delivered' , 'cancelled']
    }
})

module.exports = mongoose.model('orders',orderSchema)
