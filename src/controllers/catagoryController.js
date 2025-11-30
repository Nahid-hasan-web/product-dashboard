const authModel = require("../models/authModel");
const catagoryModel = require("../models/catagoryModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dorn2tiyl",
  api_key: "325214164479862",
  api_secret: "pp5uWG8ynmAPXSQqW7lYsaewAZE",
});
// ---------------------------------- add catgory --------------------------------------

const addCatagory = async (req, res) => {
  try {
    const { catagoryName } = req.body;
    const existCatagory = await catagoryModel.findOne({ catagoryName });
    if (existCatagory) return res.status(400).send("Catagory already exisit");

    const productImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: Date.now(),
    });

    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
    const currentUser = await authModel.findOne({ email: req.user.email });

    if (!currentUser)
      return res.status(401).send("user is not valid to create catagory");

    await new catagoryModel({
      catagoryName,
      catagoryImage: productImage.url,
      creatorName: currentUser.userName,
      creatorEmail: currentUser.email,
    }).save();
    res.send("catagroy created");
  } catch (err) {
    res.status(500).send(`internal server error ${err}`);
  }
};
// ----------------------------------get product catgory --------------------------------------
const get_category = async (req, res) => {
  try {
    const exisistCategory = await catagoryModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $addFields: {
          totalProducts: { $size: "$products" }, // count products
        },
      },
      {
        $project: {
          products: 0,
        },
      },
    ]);

    res.status(200).json({ categorys: exisistCategory });
  } catch (err) {
    res.status(500).json(`Internal server error ${err}`);
  }
};
// ----------------------------------Delete product catgory --------------------------------------
const delete_category =  async(req,res)=>{
  try{
    const {categoryId}  = req.body
    if(!categoryId) return res.status(404).json('Category id required')
    await catagoryModel.findByIdAndDelete(categoryId)  
    res.status(200).json('Delete sucess')
  }
  catch(err){
    res.status(500).json(`internal server ${err}`)
  }
}
module.exports = { addCatagory, get_category ,delete_category };
