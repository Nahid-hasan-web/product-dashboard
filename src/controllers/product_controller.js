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
  try {
    // ---------- getting info from the body
    const {
      title,
      description,
      stock,
      price,
      discountPercent,
      categoryId,
      varients,
      review,
    } = req.body;
    // -------------- creating slug
    const slug = generateSlug(title)
    
    // -------------- getting images path  
    const thumbnailPath = req.files.thumbnail[0].path
    const subImagePath  = req.files.subImages

    // ------------- upload images to cludinary
    const thumbnail = cloudinary.uploader.upload(thumbnailPath , {public_id:Date.now() , folder:"thumbnails"})
    const subImagesLink =await Promise.all(subImagePath?.map((item)=>{
     return cloudinary.uploader.upload(item.path , {public_id:Date.now() , folder:"subimages"})
    }))

   const subImages =  subImagesLink.map((item)=>{return item.url})

    



  } catch (err) {
    res.send(err);
  }
};

module.exports = { addProduct };
