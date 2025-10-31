const cuponModel = require("../models/cuponModel");

const add_cupon = (req, res) => {
  try {
    const { cuponCode, discountPirce } = req.body;

    if (!cuponCode || !discountPirce)
      return res.status(404).send("all fildes required");

    new cuponModel({ cuponCode, discountPirce }).save();

    res.status(200).send("cupon added");
  } catch (err) {
    res.send(`Internal server error ${err}`);
  }
};

const update_cupon =  async (req, res) => {
  try {
    const { cuponId, cuponCode, discountPirce } = req.body;

    const exisistCupon = await cuponModel.find({_id:cuponId})

    if(cuponCode) exisistCupon.cuponCode = cuponCode
    if(discountPirce) exisistCupon.discountPirce = discountPirce

    exisistCupon.save()


  } catch (err) {
    res.send(`Internal server error ${err}`);
  }
};
const get_cupon =  async (req, res) => {
  try {
    const allCupon = await cuponModel.find()
    
    res.status(200).send(allCupon)
  } catch (err) {
    res.send(`Internal server error ${err}`);
  }
};
const delete_cupon =  async (req, res) => {
  try {
    const {cuponId} = req.body
   await cuponModel.findByIdAndDelete({cuponId})
    
    res.status(200).send('cupon deleted sucessfully')
  } catch (err) {
    res.send(`Internal server error ${err}`);
  }
};

module.exports = { add_cupon, update_cupon ,get_cupon,delete_cupon};
