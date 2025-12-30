import express from "express";
import {
  getAllBlogs,
  addBlog,
  getBlogById,
  editBlog,
  deleteBlog,
  getBlogsByCategory,
  getMyBlogs,
} from "../controllers/blogController.js";

import uploadCloud from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   PUBLIC ROUTES
=========================== */
router.get("/", getAllBlogs);                     // GET all blogs
router.get("/:id", getBlogById);                 // GET single blog by ID
router.get("/category/:category", getBlogsByCategory); // GET blogs by category

/* ===========================
   PROTECTED ROUTES
=========================== */
router.post("/add", protect, uploadCloud.single("image"), addBlog); // Add new blog
router.get("/my-blogs", protect, getMyBlogs);                       // Get logged-in user blogs
router.put("/edit/:id", protect, uploadCloud.single("image"), editBlog); // Edit blog
router.delete("/:id", protect, deleteBlog);                         // Delete blog

export default router;
