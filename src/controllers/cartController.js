const cartModel = require("../models/cartModel");

// --------------------------------------------- Add to cart controller -----------------------------------------
const addToCart = async (req, res) => {
  try {
    const { userId, cartItem } = req.body;

    if (!userId || !cartItem)
      return res.status(404).send("user id and product id requried");

    const exisistCart = await cartModel.findOne({ userId });

    if (exisistCart) {
      cartItem.map((item) => {
        const exisitProduct = exisistCart.cartItem.find(
          (cp) => cp.productId == item.productId
        );
        if (exisitProduct) {
          exisitProduct.qty += 1;
        } else {
          exisistCart.cartItem.push(item);
        }
      });
      await exisistCart.save();

      return res.status(200).send("update product cart");
    }

    await cartModel({ userId, cartItem }).save();

    res.send("cart added sucessfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
// --------------------------------------------- select Qty controller -----------------------------------------
const select_qty = async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    if (!userId || !productId || !qty)
      return res.status(404).send("all fileds required");

    const exisistCart = await cartModel.findOne({ userId });

    if (!exisistCart)
      return res.status(404).send("this user have not product on cart");

    const findProduct = exisistCart.cartItem.find(
      (fp) => fp.productId == productId
    );
    findProduct.qty = qty;

    await exisistCart.save();

    res.status(200).send(findProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
// --------------------------------------------- Delete cart  -----------------------------------------
//-- delete cart/deleteCart
const delete_cart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) return res.status(404).send("all fileds required");

  await cartModel.updateOne({ userId }, { $pull: { cartItem: { productId } } });

  res.send("product deleted");
};
// --------------------------------------------- Delete cart  -----------------------------------------
//-- get cart/getCart
const get_cart =async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(404).send("User id required");

    const exisistCart =await cartModel.findOne({ userId }).populate('cartItem.productId' , 'title price thumbnail')

    if (!exisistCart) return res.status(404).send("No cart added yet");


    const totalPrice = exisistCart.cartItem.reduce((sum , no)=>{
       return  (Number(no.productId.price)*no.qty) + sum 
    },0) 
    res.status(200).send({cartItem:exisistCart.cartItem , total:totalPrice});
  } catch (err) {
    console.log(err)
    res.status(500).send("internal server error");
  }
};

module.exports = { addToCart, select_qty, delete_cart, get_cart };
