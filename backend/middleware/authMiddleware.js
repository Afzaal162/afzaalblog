import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ message: "Token invalid or expired" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }
    req.user = user;
    console.log("User authenticated:", user.email); // Debug log
    next();
  } catch (error) {
    console.error("AuthMiddleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export default authMiddleware;
