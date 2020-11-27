const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/productModel");

router.post("/new",auth, async (req, res) => {
  try {
    const { name, vendor, price, img, type, material, amount } = req.body;

    //validation
    if (!name || !price || !img || !type || !material || !amount)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (price < 0)
      return res.status(400).json({ msg: "Price can't be a negative number." });

    const newProduct = new Product({
      name,
      vendor,
      price,
      img,
      type,
      material,
      amount,
      userId: req.user,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userProducts", auth, async (req, res) => {
  const products = await Product.find({ userId: req.user });
  res.json(products);
});

router.post("/cartProducts", auth, async (req, res) => {
      const cartProducts = await Product.find({ _id: {$in:req.body._id} });
  res.json(cartProducts);
});

router.post("/wishlistProducts", auth, async (req, res) => {
  const wishlistProducts = await Product.find({ _id: {$in:req.body._id} });
res.json(wishlistProducts);
});


router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.delete("/deleteProduct", auth, async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.body._id });
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
