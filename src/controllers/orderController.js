const placeOrder = (req,res)=>{
    const {customerName , phone , email , address , comment , productsId } = req.body
    



    res.send('this is place order')
}


module.exports = {placeOrder}