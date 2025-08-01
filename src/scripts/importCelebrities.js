// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const Celebrities = require("../models/celebritySchema");

// const router = express.Router();

// router.get("/insert-celebs", async (req, res) => {
//   try {
//     const alreadyInserted = await Celebrities.findOne({});
//     if (alreadyInserted) {
//       return res.status(400).json({ message: "Products already inserted." });
//     }

//     const rawData = fs.readFileSync(
//       path.join(__dirname, "../data/celebrities.json"),
//       "utf-8"
//     );
//     const jsonData = JSON.parse(rawData);

//     const formattedProducts = [];

//     for (const slug in jsonData) {
//       const items = jsonData[slug];

//       items.forEach((item) => {
//         if (
//           item.celebrity_name &&
//           item.celebrity_image &&
//           item.product_name &&
//           item.product_image &&
//           item.product_link
//         ) {
//           formattedProducts.push({
//             celebrity_name: item.celebrity_name,
//             celebrity_image: item.celebrity_image,
//             product_name: item.product_name,
//             product_image: item.product_image,
//             product_price: item.product_price || null,
//             product_link: item.product_link,
//           });
//         }
//       });
//     }

//     await Celebrities.insertMany(formattedProducts);
//     res
//       .status(200)
//       .json({ message: `Inserted ${formattedProducts.length} products.` });
//   } catch (err) {
//     console.error("❌ Error inserting data:", err);
//     res.status(500).json({ message: "Insertion failed", error: err });
//   }
// });

// router.get("/celebs", async (req, res) => {
//   try {
//     const products = await Celebrities.find({});
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Fetch failed", error: err });
//   }
// });

// module.exports = router;


const express = require("express");
const fs = require("fs");
const path = require("path");
const Celebrities = require("../models/celebritySchema");

const router = express.Router();

router.get("/insert-celebs", async (req, res) => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../data/celebrities.json"),
      "utf-8"
    );
    const jsonData = JSON.parse(rawData);

    const formattedProducts = [];

    for (const slug in jsonData) {
      const items = jsonData[slug];

      items.forEach((item) => {
        if (
          item.celebrity_name &&
          item.celebrity_image &&
          item.product_name &&
          item.product_image &&
          item.product_link
        ) {
          formattedProducts.push({
            celebrity_name: item.celebrity_name,
            celebrity_image: item.celebrity_image,
            product_name: item.product_name,
            product_image: item.product_image,
            product_price: item.product_price || null,
            product_link: item.product_link,
          });
        }
      });
    }

    let insertedCount = 0;

    for (const product of formattedProducts) {
      const exists = await Celebrities.findOne({
        celebrity_name: product.celebrity_name,
        product_name: product.product_name,
        product_link: product.product_link,
      });

      if (!exists) {
        await Celebrities.create(product);
        insertedCount++;
      }
    }

    res
      .status(200)
      .json({ message: `✅ Inserted ${insertedCount} new products.` });
  } catch (err) {
    console.error("❌ Error inserting data:", err);
    res.status(500).json({ message: "Insertion failed", error: err });
  }
});

router.get("/celebs", async (req, res) => {
  try {
    const products = await Celebrities.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err });
  }
});

module.exports = router;
