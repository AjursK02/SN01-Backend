// // Signup Controller (Merged)
// const User = require("../models/userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Helper function for checking password strength
// const isPasswordStrong = (password) => {
//   const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//   return strongRegex.test(password);
// };

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     // Validate all fields
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ error: "Please fill all the fields." });
//     }

//     // Check password match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match." });
//     }

//     // Check password strength
//     if (!isPasswordStrong(password)) {
//       return res.status(400).json({
//         error:
//           "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists with this email." });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Set token in HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Send response
//     res.status(201).json({
//       message: "User registered successfully!",
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };
