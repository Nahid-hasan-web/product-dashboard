const authModel = require('../models/authModel');

const cloudinary = require('cloudinary').v2

    cloudinary.config({ 
        cloud_name: 'dorn2tiyl', 
        api_key: '325214164479862', 
        api_secret: 'pp5uWG8ynmAPXSQqW7lYsaewAZE' 
    });
    

const addCatagory = async (req ,res)=>{
    // const {catagoryImage} = req.body
    
    // const productImage = await cloudinary.uploader.upload(req.file.path, {public_id:Date.now() ,})


    const createdUser = await authModel.find({email:req.user.email})       



    res.send(createdUser)
    
    

}

module.exports = {addCatagory}