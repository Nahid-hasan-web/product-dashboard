const generateSlug = require("../helpers/generateSlug");
const productsModel = require("../models/productsModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
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
    const slug = generateSlug(title);
    // -------------- discount price
    const discontPrice = price - (price * discountPercent) / 100;
    // -------------- getting images path
    const thumbnailPath = req.files.thumbnail[0].path;
    const subImagePath = req.files.subImages;
    console.log(thumbnailPath)
    // ------------- upload images to cludinary
    const thumbnail = await cloudinary.uploader.upload(thumbnailPath, {
      public_id: Date.now(),
      folder: "thumbnails",
    })
    fs.unlink(item.path, (err) => {if(err){console.log(err)}});
    const subImages = await Promise.all(
      subImagePath?.map(async (item) => {
        const subimagesLInk = await cloudinary.uploader.upload(item.path, {
          public_id: Date.now(),
          folder: "subimages",
        });
        fs.unlink(item.path, (err) => {if(err){console.log(err)}});
        return subimagesLInk.url;
      })
    );
console.log(thumbnail.url)
    await new productsModel({
      title,
      description,
      stock,
      price,
      discontPrice,
      discountPercent,
      categoryId,
      varients:JSON.parse(varients),
      review,
      slug,
      thumbnail: thumbnail.url,
      subImages
    }).save()

    res.send('product upload succesfull');
  } catch (err) {
    res.send(err);
  }
};

// --------------------------------------- update product
const update_Product = (req,res)=>{

    const {
      title,
      description,
      stock,
      price,
      discountPercent,
      categoryId,
      varients,
      slug
    } = req.body;

    const updateInfo = {}

    if(title){ updateInfo.title = title}
    if(description){updateInfo.description = description}

   

  res.status(200).send(updateInfo)
}
module.exports = { addProduct,update_Product};
