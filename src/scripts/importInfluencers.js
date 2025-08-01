const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Influencers = require("../models/influencerSchema");

// Insert movie-based fashion data only if not already inserted
router.get("/insert-influencers", async (req, res) => {
  try {
    const count = await Influencers.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: "Influencer fashion data already inserted." });
    }

    const rawData = fs.readFileSync(path.join(__dirname, "../data/influencers.json"), "utf-8");

    const jsonData = JSON.parse(rawData);

    const cleanedData = jsonData.map(item => ({
      ...item,
    //   product_price: item.product_price || item["product_ price"] || "",
    }));

    await Influencers.insertMany(cleanedData);
    res.status(201).json({ message: "Influencer fashion data inserted successfully." });
  } catch (error) {
  console.error("❌ Insertion error:", error); // <-- Add this
  res.status(500).json({ error: "Failed to insert Influencer fashion data." });
}
});

router.get("/influencers", async (req, res) => {
  try {
    const products = await Influencers.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err });
  }
});

module.exports = router;
