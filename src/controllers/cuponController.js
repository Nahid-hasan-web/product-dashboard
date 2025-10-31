const cuponModel = require("../models/cuponModel")

const add_cupon = (req,res)=>{
    const {cuponCode , discountPirce} = req.body

    if(!cuponCode || !discountPirce) return res.status(404).send('all fildes required')


    new cuponModel({cuponCode , discountPirce}).save()





    res.status(200).send('cupon added')
}

module.exports = {add_cupon}