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

    res.send('cart added sucessfully');
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

// --------------------------------------------- select Qty controller -----------------------------------------
const select_qty = async (req, res) => {
  try {
    const { userId, cartItem, qty } = req.body;

    if (!userId || !cartItem)
      return res.status(400).send("userId and cartItem required");

    const existingCart = await cartModel.findOne({ userId });

    if (!existingCart)
      return res.status(404).send("Cart not found");

    let updated = false;

    cartItem.forEach((item) => {
      const existingProduct = existingCart.cartItem.find(
        (p) => p.productId.toString() === item.productId.toString()
      );

      if (existingProduct) {
        existingProduct.quantity = qty || 1;
        updated = true;
      }
    });

    if (updated) {
      // Tell Mongoose the array was modified
      existingCart.markModified("cartItem");
      await existingCart.save();
    }

    res.status(200).send(existingCart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};





module.exports = { addToCart , select_qty};
