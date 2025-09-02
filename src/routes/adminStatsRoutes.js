const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

// GET /api/admin/stats  → returns all admin dashboard stats
router.get("/", async (req, res) => {
  try {
    // Run DB queries in parallel for speed
    const [totalUsers, activeUsersLast24h] = await Promise.all([
      // Count all users
      User.countDocuments({}),

      // Example “active users” metric: users updated in last 24h (uses timestamps)
      User.countDocuments({
        updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
    ]);

    res.status(200).json({
      totalUsers,
      activeUsersLast24h,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
});

module.exports = router;
