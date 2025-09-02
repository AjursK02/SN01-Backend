const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  show_name: String,
  actor_name: String,
  actor_image: String,
  product_image: String,
  product_name: String,
  product_price: String,
  product_link: String,
  clickCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('TvShows', tvShowSchema);
