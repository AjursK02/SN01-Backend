const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
  },
  gender: { type: String },
  topSize: { type: String },
  bottomSize: { type: String },
  fitPreferences: { type: String },
  favoriteCelebrity: [{ type: String }],
  favoriteInfluencer: [{ type: String }],
  favoriteMovie: [{ type: String }],
  favoriteTvShow: [{ type: String }],
  favoriteDesigner: [{ type: String }],
  favoriteBrands: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
