const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/productModel");

router.post("/new", auth, async (req, res) => {
  try {
    const {name, vendor, price,img, type,material, amount} = req.body;

    //validation
    if (!name||!vendor||!price||!img||!type||!material||!amount)
    return res.status(400).json({ msg: "Not all fields have been entered." });

    const newProduct= new Product({
      name, vendor, price, img, type, material, amount, userId:req.user
    });
    
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userProducts", auth, async(req,res)=>{
  const products = await Product.find({userId: req.user});
  res.json(products)
})

module.exports = router;
