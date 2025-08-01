// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const TvShows = require("../models/tvShowSchema");

// // Insert movie-based fashion data only if not already inserted
// router.get("/insert-tvShows", async (req, res) => {
//   try {
//     const count = await TvShows.countDocuments();
//     if (count > 0) {
//       return res.status(200).json({ message: "TV fashion data already inserted." });
//     }

//     const rawData = fs.readFileSync(path.join(__dirname, "../data/tvShows.json"), "utf-8");

//     const jsonData = JSON.parse(rawData);

//     const cleanedData = jsonData.map(item => ({
//       ...item,
//     }));

//     await TvShows.insertMany(cleanedData);
//     res.status(201).json({ message: "TV fashion data inserted successfully." });
//   } catch (error) {
//   console.error("❌ Insertion error:", error); // <-- Add this
//   res.status(500).json({ error: "Failed to insert TV fashion data." });
// }
// });

// router.get("/tvShows", async (req, res) => {
//   try {
//     const products = await TvShows.find({});
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Fetch failed", error: err });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TvShows = require("../models/tvShowSchema");

router.get("/insert-tvShows", async (req, res) => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../data/tvShows.json"),
      "utf-8"
    );
    const jsonData = JSON.parse(rawData);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const item of jsonData) {
      

      // Unique match criteria — adjust if needed
      const match = {
        actor_name: item.actor_name,
        product_name: item.product_name,
        product_link: item.product_link,
      };

      const existing = await TvShows.findOne(match);

      if (existing) {
        // If document exists, update the show_name if it's missing or different
        const update = {};

        if (!existing.show_name || existing.show_name !== item.show_name) {
          update.show_name = item.show_name;
        }

        if (Object.keys(update).length > 0) {
          await TvShows.updateOne(match, { $set: update });
          updatedCount++;
        }
      } else {
        // Insert new item
        await TvShows.create({
          ...item,
        });
        insertedCount++;
      }
    }

    res.status(200).json({
      message: `✅ Inserted ${insertedCount} new items, updated ${updatedCount} existing items with show_name.`,
    });
  } catch (error) {
    console.error("❌ Insertion error:", error);
    res.status(500).json({ error: "Failed to insert or update movie data." });
  }
});

router.get("/tvShows", async (req, res) => {
  try {
    const products = await TvShows.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err });
  }
});

module.exports = router;
