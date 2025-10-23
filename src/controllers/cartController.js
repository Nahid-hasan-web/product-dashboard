const cartModel = require("../models/cartModel");

// --------------------------------------------- Add to cart controller -----------------------------------------
const addToCart = async (req, res) => {
  try {
    const { userId, cartItem } = req.body;

    if (!userId || !cartItem)
      return req.status(404).send("user id and product id requried");

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

    res.send('cart added sucessfully');
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { addToCart };
