const mongoose = require('mongoose')


const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String,
        default:null
    },
    phoneNo:{
        type: String,
        default:null
    },
    otp: {
        type: String,
    },
    otpexpiredAt: {
        type:Date
    },
    isverified:{
        type:Boolean,
        default:false
    }
    
} , {timestamps:true})

module.exports = mongoose.model("auth" , authSchema)