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
router.get("/look-tracker", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch outfits from each collection using favorites
    const celebrityOutfits = await Celebrities.find({
      name: { $in: user.favoriteCelebrity },
    });

    const influencerOutfits = await Influencers.find({
      name: { $in: user.favoriteInfluencer },
    });

    const movieOutfits = await Movies.find({
      name: { $in: user.favoriteMovie },
    });

    const tvShowOutfits = await TvShows.find({
      name: { $in: user.favoriteTvShow },
    });

    const designerOutfits = await Designers.find({
      name: { $in: user.favoriteDesigner },
    });

    // Merge all results
    let outfits = [
      ...celebrityOutfits,
      ...influencerOutfits,
      ...movieOutfits,
      ...tvShowOutfits,
      ...designerOutfits,
    ];

    // Shuffle array (randomize order)
    outfits = outfits.sort(() => 0.5 - Math.random());

    // Select only 8 items
    outfits = outfits.slice(0, 8);

    res.json(outfits);
  } catch (err) {
    console.error("Error in /look-tracker:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
