//Here we will write the logic to connect to our database

// const mongoose = require("mongoose")

//connecting to database
// const connectDB = async()=>{
//     await mongoose.connect("mongodb+srv://ajursinsights:5AyeIV42RwlLm8R8@sanav.jzgwn46.mongodb.net/")
// }

// module.exports = connectDB;

// const mongoose = require("mongoose");
// require('dotenv').config(); // Load .env variables

// const connectDB = async () => {
//     await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// };

// module.exports = connectDB;

// src/config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database connected...");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;
