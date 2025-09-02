const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Designers = require("../models/designerSchema");

// Insert designer-based fashion data only if not already inserted
router.get("/insert-designers", async (req, res) => {
  try {
    const count = await Designers.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: "Designer fashion data already inserted." });
    }

    const rawData = fs.readFileSync(path.join(__dirname, "../data/designers.json"), "utf-8");

    const jsonData = JSON.parse(rawData);

    const cleanedData = jsonData.map(item => ({
      ...item,
    //   product_price: item.product_price || item["product_ price"] || "",
    }));

    await Designers.insertMany(cleanedData);
    res.status(201).json({ message: "Designer fashion data inserted successfully." });
  } catch (error) {
  console.error("❌ Insertion error:", error); // <-- Add this
  res.status(500).json({ error: "Failed to insert Designer fashion data." });
}
});

router.get("/designers", async (req, res) => {
  try {
    const products = await Designers.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err });
  }
});

module.exports = router;
