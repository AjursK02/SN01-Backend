const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  influencer_name: { type: String, required: true },
  influencer_image: { type: String, required: true },
  product_name: { type: String, required: true },
  product_image: { type: String, required: true },
  product_price: { type: String, default: null },
  product_link: { type: String, required: true },
  clickCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Influencers", influencerSchema);
