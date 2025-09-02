const mongoose = require("mongoose");

const designerSchema = new mongoose.Schema({
  designer_name: { type: String, required: true },
  designer_image: { type: String, required: true },
  product_name: { type: String, required: true },
  product_image: { type: String, required: true },
  product_price: { type: String, default: null },
  product_link: { type: String, required: true },
  clickCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Designers", designerSchema);
