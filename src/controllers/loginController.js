// const User = require("../models/userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     // Trim input
//     email = email?.trim();

//     // Check if all fields are filled
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please provide email and password" });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Ensure JWT secret is set
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined in environment variables.");
//     }

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Set token in HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // only https in production
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Send back user info (no password)
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
