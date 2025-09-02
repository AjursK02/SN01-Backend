const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { verifyToken } = require("../middleware/authMiddleware"); //  verifies JWT

// Save or update profile
router.put("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT decoded in middleware
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { $set: req.body }, // overwrite with new profile data
      { new: true }
    ).select("-password"); // don’t send back password

    res.json({ message: "Profile updated", user: updatedProfile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await User.findById(userId).select("-password");
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
