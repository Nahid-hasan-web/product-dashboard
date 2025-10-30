const placeOrder = (req,res)=>{
    try{
    const {customerName , phone , distick , address , email , cartId ,cuponCode} = req.body

    if(!customerName || !phone || !distick || !address || !email|| !cartId|| !cuponCode ) return res.status(404).send('all fild requried')
     
    let shippingCost = null
    distick === 'Dhaka'? shippingCost = 80 : shippingCost = 150

    console.log(shippingCost)


    res.send('this is place order')
    }
    catch(err){
        res.status(500).send('Internal server error')
    }
}


module.exports = {placeOrder}