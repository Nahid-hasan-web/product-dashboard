const cartModel = require("../models/cartModel")

// --------------------------------------------- Add to cart controller -----------------------------------------
const addToCart = async (req,res)=>{
    const {productId , userId} = req.body

    const exisistUser = await  cartModel({userId}) 

    res.send(exisistUser)
}

module.exports = {addToCart}