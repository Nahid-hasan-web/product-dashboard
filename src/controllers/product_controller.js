const { generateOTP } = require("../helpers/genarators");
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
    // ------------- upload images to cludinary

    const thumbnail = await cloudinary.uploader.upload(thumbnailPath, {
      public_id: Date.now(),
      folder: "thumbnails",
    });

    fs.unlink(thumbnailPath, (err) => {
      if (err) console.log(err);
    });

    // ------------------ upload sub images
    const subImages = await Promise.all(
      subImagePath.map(async (item) => {
        const subImagesLink = await cloudinary.uploader.upload(item.path, {
          public_id: Date.now(),
          folder: "subimages",
        });
        fs.unlink(item.path, (err) => {
          if (err) console.log(err);
        });
        return subImagesLink.url;
      })
    );

    await new productsModel({
      title,
      description,
      stock,
      price,
      discontPrice,
      discountPercent,
      categoryId,
      varients: JSON.parse(varients),
      review,
      slug,
      thumbnail: thumbnail.url,
      subImages,
    }).save();

    res.status(201).send("product uploaded sucessful");
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

// --------------------------------------- update product
const update_Product = async (req, res) => {
  try {
    const {
      title,
      description,
      stock,
      price,
      discountPercent,
      categoryId,
      varients,
      slug,
    } = req.body;
    // ------------- search the product
    const exisitProduct = await productsModel.findOne({ slug });

    if (!exisitProduct) return res.status(404).send("product not found");
    // ------------ deleting prev thumbnail
    req.files.thumbnail &&
      (await cloudinary.uploader.destroy(
        exisitProduct.thumbnail.split("/").slice(7).join("/").split(".")[0]
      ));
    // ------------ deleting prev subImages

    req.files.subImages &&
      (await Promise.all(
        exisitProduct.subImages.map(async (item) => {
          await cloudinary.uploader.destroy(
            item.split("/").slice(7).join("/").split(".")[0]
          );
        })
      ));
    // -------------- getting images path
    const thumbnailPath = req.files.thumbnail[0].path;
    const subImagePath = req.files.subImages;
    // ------------- upload images to cludinary

    const thumbnail = await cloudinary.uploader.upload(thumbnailPath, {
      public_id: Date.now(),
      folder: "thumbnails",
    });

    // ------------------ upload sub images
    const subImages = await Promise.all(
      subImagePath.map(async (item) => {
        const subImagesLink = await cloudinary.uploader.upload(item.path, {
          public_id: Date.now(),
          folder: "subimages",
        });
        fs.unlink(item.path, (err) => {
          if (err) console.log(err);
        });
        return subImagesLink.url;
      })
    );

    // --------------------- object for update info
    const updateInfo = {};

    if (title) updateInfo.title = title;
    if (description) updateInfo.description = description;
    if (stock) updateInfo.stock = stock;
    if (price) updateInfo.price = price;
    if (discountPercent) updateInfo.discountPercent = discountPercent;
    if (discountPercent)
      updateInfo.discontPrice = price - (price * discountPercent) / 100;
    if (categoryId) updateInfo.categoryId = categoryId;
    if (varients) updateInfo.varients = varients;
    if (thumbnail) updateInfo.thumbnail = thumbnail.url;
    if (subImages) updateInfo.subImages = subImages;

    // ------------------ update info
    // await  exisitProduct(updateInfo).save;

    res.status(200).send(updateInfo);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};
module.exports = { addProduct, update_Product };
