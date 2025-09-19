const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Celebrities = require("../models/celebritySchema");
const Influencers = require("../models/influencerSchema");
const Movies = require("../models/movieSchema");
const TvShows = require("../models/tvShowSchema");
const Designers = require("../models/designerSchema");
const { verifyToken } = require("../middleware/authMiddleware");

// GET Look Tracker Outfits
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Collect all favorites
    const {
      favoriteCelebrity = [],
      favoriteInfluencer = [],
      favoriteMovie = [],
      favoriteTvShow = [],
      favoriteDesigner = []
    } = user;


    // Fetch from each collection
    const celebOutfits = await Celebrities.find({ celebrity_name: { $in: favoriteCelebrity } });
    const influencerOutfits = await Influencers.find({ influencer_name: { $in: favoriteInfluencer } });
    const movieOutfits = await Movies.find({ movie_name: { $in: favoriteMovie } });
    const tvShowOutfits = await TvShows.find({ show_name: { $in: favoriteTvShow } });
    const designerOutfits = await Designers.find({ designer_name: { $in: favoriteDesigner } });

//     console.log({
//   celebCount: celebOutfits.length,
//   influencerCount: influencerOutfits.length,
//   movieCount: movieOutfits.length,
//   tvShowCount: tvShowOutfits.length,
//   designerCount: designerOutfits.length,
// });

    // Merge all outfits
    let allOutfits = [
      ...celebOutfits,
      ...influencerOutfits,
      ...movieOutfits,
      ...tvShowOutfits,
      ...designerOutfits,
    ];

    // Randomly pick 4
    const shuffled = allOutfits.sort(() => 0.5 - Math.random());
    const selectedOutfits = shuffled.slice(0, 4);

    res.json({ outfits: selectedOutfits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET all favorites (full page)
router.get("/all", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const {
      favoriteCelebrity = [],
      favoriteInfluencer = [],
      favoriteMovie = [],
      favoriteTvShow = [],
      favoriteDesigner = [],
    } = user;

    const celebOutfits = await Celebrities.find({ celebrity_name: { $in: favoriteCelebrity } });
    const influencerOutfits = await Influencers.find({ influencer_name: { $in: favoriteInfluencer } });
    const movieOutfits = await Movies.find({ movie_name: { $in: favoriteMovie } });
    const tvShowOutfits = await TvShows.find({ show_name: { $in: favoriteTvShow } });
    const designerOutfits = await Designers.find({ designer_name: { $in: favoriteDesigner } });

    let allOutfits = [
      ...celebOutfits,
      ...influencerOutfits,
      ...movieOutfits,
      ...tvShowOutfits,
      ...designerOutfits,
    ];

    res.json({ outfits: allOutfits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
