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
    const {
      title,
      description,
      stock,
      price,
      discontPrice,
      discountPercent,
      categoryId,
      varients,
    } = req.body;
    const productVarients = varients? JSON.parse(varients) : []
    const slug = generateSlug(title)


    // ----------------- getting images
    const thumbnailImagePath = req.files.thumbnail[0].path

    const thumbnailImage = await cloudinary.uploader.upload(thumbnailImagePath , {public_id:Date.now() , folder:'thumbnail images'})

    const subImagesArray = await Promise.all(
      req.files.subImages.map((item)=>
        cloudinary.uploader.upload(item.path , {public_id:Date.now() , folder:'sub images'})
      )
    )
    
    const subImages = subImagesArray.map((item)=> item.url)

    // ---------------------------- uploading product Info

    await new productsModel({
      title,
      description,
      stock,
      price,
      discontPrice,
      discountPercent,
      categoryId,
      varients:productVarients,
      slug,
      thumbnail:thumbnailImage.url,
      subImages
    }).save()





    res.send('product added sucessfuly');
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addProduct };
