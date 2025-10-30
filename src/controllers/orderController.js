const cartModel = require("../models/cartModel")

const placeOrder =async (req,res)=>{
    try{
    const {customerName , phone , distick , address , email , cartId ,cuponCode , comment} = req.body

    if(!customerName || !phone || !distick || !address || !email|| !cartId|| !cuponCode ) return res.status(404).send('all fild requried')
     
    let shippingCost = null
    distick === 'Dhaka'? shippingCost = 80 : shippingCost = 150
    
    
    const exisitCart = await cartModel.findOne({_id:cartId}).populate('cartItem.productId' , 'discontPrice')




    res.send(exisitCart)
    }
    catch(err){
        res.status(500).send('Internal server error')
    }
}


module.exports = {placeOrder}