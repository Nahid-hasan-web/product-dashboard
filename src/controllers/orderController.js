const placeOrder = (req,res)=>{
    const {customerName , phone , distick , address , email , products ,cuponCode} = req.body
    



    res.send('this is place order')
}


module.exports = {placeOrder}