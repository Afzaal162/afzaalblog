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

/* ===============================
   PUBLIC ROUTES
================================ */
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/category/:category", getBlogsByCategory);

/* ===============================
   PROTECTED ROUTES
================================ */
router.post("/add", protect, uploadCloud.single("image"), addBlog);
router.get("/my-blogs", protect, getMyBlogs);
router.put("/edit/:id", protect, uploadCloud.single("image"), editBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
