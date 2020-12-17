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

router.patch("/updateProduct",auth, async( req, res) => {
  try{
    const {_id, name, vendor, price, img, type, material, amount } = req.body;
        //validation
        if (!name || !price || !img || !type || !material || !amount)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      if (price < 0)
        return res.status(400).json({ msg: "Price can't be a negative number." });

      const updatedProduct = await Product.replaceOne({_id: _id},{
        name: name,
        vendor: vendor,
        price: price,
        img: img,  
        type: type,
        material: material,
        amount:amount,
        userId: req.user,
      });
      res.json(updatedProduct);

  }catch (err) {
    res.status(500).json({ error: err.message });
  }
})

//delete all products from a user
router.delete("/deleteUserProducts", auth, async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany({ userId: req.body.userId });
    res.json(deletedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get product by id

router.post("/product", async (req, res) => {
  const {id} = req.body;
  const product = await Product.findById(id);
  res.json({
    name: product.name,
    vendor: product.vendor,
    price: product.price ,
    img: product.img,  
    type: product.type,
    material: product.material,
    amount:product.amount,    
  });
});


module.exports = router;
