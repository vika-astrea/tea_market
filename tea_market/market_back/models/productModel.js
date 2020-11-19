const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendor: { type: String, required: true },
  price: { type: Number },
  img: { type: String, required: true },  
  type: { type: String, required: true },
  material: { type: String, required: true },
  amount: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = Product = mongoose.model("product", productSchema);
