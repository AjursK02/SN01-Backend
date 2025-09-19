const express = require("express");
const router = express.Router();
// const { signup } = require("../controllers/signupController");
// const { login } = require("../controllers/loginController");
const { logout } = require("../controllers/logoutController");
// const { authenticateUser } = require("../middleware/authMiddleware");
const User = require("../models/userSchema");
const { verifyToken } = require("../middleware/authMiddleware");
const { getMe } = require("../controllers/meController");
const { googleAuth } = require("../controllers/googleAuthController");


// router.post("/signup", signup);
// router.post("/login", login);
router.post("/google", googleAuth);
router.post("/logout", verifyToken, logout);
// router.get("/me", verifyToken, getMe);
router.get("/me", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, verifyToken, getMe);


// // GET current logged-in user
// router.get("/me", authenticateUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     res.json({ user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
