const express = require("express");
const Celebrities = require("../models/celebritySchema");
const Influencers = require("../models/influencerSchema");
const Movies = require("../models/movieSchema");
const TvShows = require("../models/tvShowSchema");
const Designers = require("../models/designerSchema");

const router = express.Router();


// Mapping category name → Model
const categoryModels = {
  celebrities: Celebrities,
  influencers: Influencers,
  movies: Movies,
  tvshows: TvShows,
  designers: Designers,
};

//Increment click counts
router.post("/:category/:id/click", async (req, res) => {
  const { category, id } = req.params;
  const Model = categoryModels[category.toLowerCase()];

  if (!Model) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const updated = await Model.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } }, // increment click count
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: `${category} outfit not found` });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating clicks", error: err });
  }
});

// Fetch top 5 outfits
router.get("/:category/top", async (req, res) => {
  const { category } = req.params;
  const Model = categoryModels[category.toLowerCase()];

  if (!Model) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const topItems = await Model.find().sort({ clickCount: -1 }).limit(5);
    res.json(topItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top outfits", error: err });
  }
});

module.exports = router;

