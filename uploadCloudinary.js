// // uploadCloudinary.js (simplified for single image)
// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const path = require("path");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const imagePath = path.join(__dirname, "src", "images", "movieImages", "nayanthara.jpg");

// const uploadImage = async () => {
//   try {
//     const result = await cloudinary.uploader.upload(imagePath, {
//       folder: "movieImages", // optional: to keep images organized in Cloudinary
//     });

//     console.log("✅ Uploaded:", result.original_filename);

//     // Read existing JSON
//     const jsonFilePath = path.join(__dirname, "imageData", "image-urls.json");
//     let existingData = [];

//     if (fs.existsSync(jsonFilePath)) {
//       const fileData = fs.readFileSync(jsonFilePath);
//       existingData = JSON.parse(fileData);
//     }

//     // Append new image data
//     existingData.push({
//       fileName: "nayanthara",
//       url: result.secure_url,
//     });

//     // Save updated JSON
//     fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
//     console.log("✅ Updated image-urls.json");
//   } catch (err) {
//     console.error("❌ Error uploading image:", err);
//   }
// };

// uploadImage();


require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get CLI args: folder name and output JSON file name
const args = process.argv.slice(2);
const folderName = args[0]; // e.g., "movieImages"
const outputJsonFile = args[1]; // e.g., "movie-image-urls.json"

if (!folderName || !outputJsonFile) {
  console.error("❌ Usage: node uploadCloudinary.js <folderName> <outputJsonFile>");
  process.exit(1);
}

const imagesFolderPath = path.join(__dirname, "src", "images", folderName);
const outputJsonPath = path.join(__dirname, "imageData", outputJsonFile);

const uploadImages = async () => {
  try {
    const files = fs.readdirSync(imagesFolderPath);
    let existingData = [];

    if (fs.existsSync(outputJsonPath)) {
      const rawData = fs.readFileSync(outputJsonPath);
      existingData = JSON.parse(rawData);
    }

    for (const file of files) {
      const filePath = path.join(imagesFolderPath, file);

      // Check if already uploaded (optional optimization)
      const alreadyExists = existingData.find((entry) => entry.fileName === file);
      if (alreadyExists) {
        console.log(`⚠️ Skipped (already uploaded): ${file}`);
        continue;
      }

      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName, // stores in a folder inside Cloudinary
      });

      console.log("✅ Uploaded:", file);

      existingData.push({
        fileName: file,
        url: result.secure_url,
      });
    }

    fs.writeFileSync(outputJsonPath, JSON.stringify(existingData, null, 2));
    console.log(`✅ Updated: ${outputJsonFile}`);
  } catch (err) {
    console.error("❌ Error uploading images:", err);
  }
};

uploadImages();



//to upload images in the cloudinary in we have to write the command 'node uploadCloudinary.js image-folder-name json-folder-name'