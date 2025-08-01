const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_name: String,
  actor_name: String,
  actor_image: String,
  product_image: String,
  product_name: String,
  product_price: String,
  product_link: String,
}, { timestamps: true });

module.exports = mongoose.model('Movies', movieSchema);
