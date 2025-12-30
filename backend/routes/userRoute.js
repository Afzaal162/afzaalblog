import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js";

const router = express.Router();

// GET logged-in user's profile
router.get("/profile", authMiddleware, async (req, res) => {
  console.log("Profile route hit");
  console.log("User from middleware:", req.user);
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Profile route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET blogs created by logged-in user
router.get("/my-blogs", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
