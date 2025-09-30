const authModel = require("../models/authModel");
const catagoryModel = require("../models/catagoryModel");
const fs = require('fs')
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dorn2tiyl",
  api_key: "325214164479862",
  api_secret: "pp5uWG8ynmAPXSQqW7lYsaewAZE",
});

const addCatagory = async (req, res) => {
  try {
    const { catagoryName } = req.body;

    const existCatagory = await catagoryModel.findOne({ catagoryName });
    if (existCatagory) return res.status(400).send("Catagory already exisit");

    const productImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: Date.now(),
    });

    fs.unlink(req.file.path, (err)=>{console.log(err)})
    const currentUser = await authModel.findOne({ email: req.user.email });

    if (!currentUser)
      return res.status(401).send("user is not valid to create catagory");

    await new catagoryModel({
      catagoryName,
      catagoryImage: productImage.url,
      creatorName: currentUser.userName,
      creatorEmail: currentUser.email,
    }).save()
    res.send("catagroy created");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addCatagory };
