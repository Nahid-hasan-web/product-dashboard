const { stripTypeScriptTypes } = require("module");
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
    } = req.body;
    console.log(
      title,
      description,
      stock,
      price,
      discountPercent,
      categoryId,
      varients
    );
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

    if (title) exisitProduct.title = title;
    if (description) exisitProduct.description = description;
    if (stock) exisitProduct.stock = stock;
    if (price) exisitProduct.price = price;
    if (discountPercent) exisitProduct.discountPercent = discountPercent;
    if (discountPercent)
      exisitProduct.discontPrice = price - (price * discountPercent) / 100;
    if (categoryId) exisitProduct.categoryId = categoryId;
    if (varients) exisitProduct.varients = JSON.parse(varients);
    if (thumbnail) exisitProduct.thumbnail = thumbnail.url;
    if (subImages) exisitProduct.subImages = subImages;

    // ------------------ update info
    await exisitProduct.save();

    res.status(200).send("update sucess");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
// --------------------------------------- update product
const update_status = async (req, res) => {
  try {
    const { slug, updateAproval } = req.body;
    const exisitProduct = await productsModel.findOne({ slug });

    if (!exisitProduct) return res.status(404).send("product not found");

    if (updateAproval != "active" && updateAproval !== "reject")
      return res.status(400).send("please selecet approved or reject");

    exisitProduct.status = updateAproval;

    await exisitProduct.save();

    res.send("product status updated");
  } catch (err) {
    console.log(err);
    res.status(404).send(`Internal server error ${err}`);
  }
};
// --------------------------------------- give review
const give_review = async (req, res) => {
  try {
    const { slug, reivewerName, reviewRating, reviewComment } = req.body;
    const exisitProduct = await productsModel.findOne({ slug });

    exisitProduct.review.push({ reivewerName, reviewRating, reviewComment });
    await exisitProduct.save();

    res.send(exisitProduct.review);
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal Server Error");
  }
};
// ---------------------------------------- get  singel products
const get_singel_product = async (req, res) => {
  try {
    const { slug } = req.params;

    const exisitProduct = await productsModel.findOne({ slug });

    if (!exisitProduct) return res.status(404).send("product not found");

    res.status(200).send(exisitProduct);
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal Server Error");
  }
};
// ---------------------------------------- get products for dashboard
const get_dashboard_product = async (req, res) => {
  try {
    const { minPirce, maxPrice, sortByPrice, limit, page } = req.query;
    // ---------- find by catagory
    const searchBy = {};

    // ---------- filter by price range
    if (minPirce && maxPrice)
      searchBy.discontPrice = {
        $gte: String(minPirce),
        $lte: String(maxPrice),
      };
    // ---------- sort by
    const sortBy = {};
    if (sortByPrice == "lowToHigh") sortBy.discontPrice = 1;
    if (sortByPrice == "highToLow") sortBy.discontPrice = -1;
    //----------- pagination
    const productLimit = limit || 10;
    const productPage = page || 1;
    const productSkip = limit * (page - 1);

    // --------- product db filteration
    const exisitProduct = await productsModel
      .find(searchBy)
      .sort(sortBy)
      .limit(productLimit)
      .skip(productSkip);

    const totalProducts = await productsModel.countDocuments(searchBy);

    res.send({
      products: exisitProduct,
      skip: productSkip,
      limit: productLimit,
      page: productPage,
      total: totalProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal Server Error");
  }
};
// ---------------------------------------- get products for Public site
const getProducts_public = async (req, res) => {
  try {
    const { minPirce, maxPrice, sortByPrice, limit, page } = req.query;
    const { getProductBy } = req.body;
    // ---------- find by catagory
    const searchBy = { status: "pending" };
    if (getProductBy != "getAllProduct") searchBy.categoryId = getProductBy;

    // ---------- filter by price range
    if (minPirce && maxPrice)
      searchBy.discontPrice = {
        $gte: String(minPirce),
        $lte: String(maxPrice),
      };
    // ---------- sort by
    const sortBy = {};
    if (sortByPrice == "lowToHigh") sortBy.discontPrice = 1;
    if (sortByPrice == "highToLow") sortBy.discontPrice = -1;
    //----------- pagination
    const productLimit = limit || 10;
    const productPage = page || 1;
    const productSkip = limit * (page - 1);

    // --------- product db filteration
    const exisitProduct = await productsModel
      .find(searchBy)
      .sort(sortBy)
      .limit(productLimit)
      .skip(productSkip);
    res.send({
      products: exisitProduct,
      skip: productSkip,
      limit: productLimit,
      page: productPage,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal Server Error");
  }
};

// ---------------------------------------- Delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const exisitProduct = await productsModel.findOneAndDelete({
      _id: productId,
    });

    if (!exisitProduct) return res.status(404).send("product not found");

    res.send("product deleted sucessfull");
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal Server Error");
  }
};
// ---------------------------------------- filter products by status product
const filterPoductsByStatus = async (req, res) => {
  try {
    
    
    const { status } = req.body;
    if(!status) return res.status(404).send('status not found')
    let findBy = {};
    if (status !== "all") findBy = { status };
    const products = await productsModel.find(findBy)
    const allstatusCount = await productsModel.countDocuments(status)
    const activestatusCount = await productsModel.find({status:'active'}).countDocuments()
    const pedingstatusCount = await productsModel.find({status:'pending'}).countDocuments()
    const rejectProducts = await productsModel.find({status:'reject'}).countDocuments()

    
    res.status(200).json({products , allstatusCount , activestatusCount , pedingstatusCount , rejectProducts})
  } catch (err) {
    res.status(500).json(`internal server error ${err}`);
  }
};

module.exports = {
  addProduct,
  update_Product,
  update_status,
  give_review,
  get_dashboard_product,
  get_singel_product,
  deleteProduct,
  getProducts_public,
  filterPoductsByStatus,
};
