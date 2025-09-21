const generateSlug = require("../helpers/generateSlug")
const productsModel = require("../models/productsModel")




// --------------------------------------- add product 
const addProduct = async (req,res)=>{
        const {address} = req.body

        await productsModel({
            address
        }).save()

        res.send('data added')
}



module.exports = {addProduct}