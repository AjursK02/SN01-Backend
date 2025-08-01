const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  celebrity_name: { type: String, required: true },
  celebrity_image: { type: String, required: true },
  product_name: { type: String, required: true },
  product_image: { type: String, required: true },
  product_price: { type: String, default: null },
  product_link: { type: String, required: true },
});

module.exports = mongoose.model("Celebrities", celebritySchema);
