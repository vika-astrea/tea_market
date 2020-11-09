const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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

    const existingUser = await User.findOne({email: email }) 
    if (existingUser) 
    return res
        .status(400)
        .json({ msg: "Account with this email already exists." }); 
        
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({email, password: passwordHash, displayName});
    const savedUser= await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
