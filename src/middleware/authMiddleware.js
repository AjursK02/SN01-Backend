const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const verifyToken = async (req, res, next) => {
  // try {
  //   const token = req.cookies.token; // requires cookie-parser
  //   if (!token) {
  //     return res.status(401).json({ error: "Unauthorized: No token provided" });
  //   }

  //   // Decode & verify JWT
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   // Fetch the user from DB without password
  //   const user = await User.findById(decoded.id).select("-password");
  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   // Attach user to req
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   return res.status(401).json({ error: "Unauthorized: Invalid token" });
  // }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user id in req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };
