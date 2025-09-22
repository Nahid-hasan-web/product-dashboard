const generateSlug = require("../helpers/generateSlug");
const productsModel = require("../models/productsModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dorn2tiyl",
  api_key: "325214164479862",
  api_secret: "pp5uWG8ynmAPXSQqW7lYsaewAZE",
});

// --------------------------------------- add product
const addProduct = async (req, res) => {
  const mainImagePath = req.files.avatar[0].path;
  const subimagePath = req.files.gallery;

  const productImage = await cloudinary.uploader.upload(mainImagePath, {
    public_id: Date.now(),
    folder: "product thumbnail images",
  });


  const hostImages = subimagePath.map( async(item)=>{
     await cloudinary.uploader.upload(item.path, {
    public_id: Date.now(),
    folder: "product thumbnail images",
  });
  })

  console.log(hostImages)


  res.send(hostImages)
  
};

module.exports = { addProduct };
