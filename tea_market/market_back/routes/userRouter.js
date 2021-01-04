const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

//register

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;
    //validate
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password must have more than 5 characters." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Account with this email already exists." });

    const existingVendor = await User.findOne({ displayName: displayName });
    if (existingVendor)
      return res
        .status(400)
        .json({ msg: "That display name is already taken." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: passwordHash, displayName });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    // matching credentials
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "There is no accounts with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//delete user

router.delete("/deleteUser", auth, async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user);

    //validation 
    if (!password)
      return res.status(400).json({ msg: "Please, enter your password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const deletedProducts = await Product.deleteMany({ userId: req.user });
    res.json(deletedProducts);
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

//token validation

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Updating User Info

//name
router.patch("/changeName", auth, async (req, res) => {
  try {
    const { newName, password, _id } = req.body;

    //validate
    if (!newName || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    // matching credentials
    const user = await User.findOne({ _id: _id });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const existingVendor = await User.findOne({ displayName: newName });
    if (existingVendor)
      return res
        .status(400)
        .json({ msg: "That display name is already taken." });

    const updatedName = await User.updateOne(
      { _id: _id },
      { $set: { displayName: newName } }
    );

    return res.json(updatedName);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//email

router.patch("/changeEmail", auth, async (req, res) => {
  try {
    const { newEmail, password, _id } = req.body;

    //validate
    if (!newEmail || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    // matching credentials
    const user = await User.findOne({ _id: _id });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const existingVendor = await User.findOne({ email: newEmail });
    if (existingVendor)
      return res.status(400).json({ msg: "That email is already in use." });

    const updatedEmail = await User.updateOne(
      { _id: _id },
      { $set: { email: newEmail } }
    );

    return res.json(updatedEmail);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//password

router.patch("/changePassword", async (req, res) => {
  try {
    const { _id, newPassword, passwordCheck, password } = req.body;
    //validate
    if (!password || !passwordCheck || !newPassword)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (newPassword.length < 5)
      return res
        .status(400)
        .json({ msg: "Password must have more than 5 characters." });
    if (newPassword !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    // matching credentials
    const user = await User.findOne({ _id: _id });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await User.updateOne(
      { _id: _id },
      { $set: { password: passwordHash } }
    );

    return res.json(updatedPassword);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//Cart actions
router.put("/addToCart", auth, async (req, res) => {
  try {
    const { _id, productId } = req.body;

    const newCartProduct = await User.updateOne(
      { _id: _id },
      { $addToSet: { cart: productId } }
    );

    return res.json(newCartProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/removeFromCart", auth, async (req, res) => {
  try {
    const { _id, productId } = req.body;

    const removedProduct = await User.updateOne(
      { _id: _id },
      { $pull: { cart: productId } }
    );

    return res.json(removedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Wishlist actions

router.put("/addToWishlist", auth, async (req, res) => {
  try {
    const { _id, productId } = req.body;

    const newWishlistProduct = await User.updateOne(
      { _id: _id },
      { $addToSet: { wishlist: productId } }
    );

    return res.json(newWishlistProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/removeFromWishlist", auth, async (req, res) => {
  try {
    const { _id, productId } = req.body;

    const removedProduct = await User.updateOne(
      { _id: _id },
      { $pull: { wishlist: productId } }
    );

    return res.json(removedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Getting user info
//get User name + id

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
    cart: user.cart,
    wishlist: user.wishlist,
  });
});



router.post("/vendorName", async (req, res) => {
  const user = await User.findById(req.body.userName);
  res.json({
    vendorName: user.displayName,
  });
});

module.exports = router;
