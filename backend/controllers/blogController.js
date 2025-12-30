import Blog from "../models/Blog.js";
import mongoose from "mongoose";

/* ===========================
   GET ALL BLOGS (Public)
=========================== */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

/* ===========================
   ADD BLOG (Logged-in User)
=========================== */
export const addBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newBlog = new Blog({
      title,
      description,
      category,
      author: req.user._id,
      image: req.file ? req.file.path : "",
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error adding blog:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   GET SINGLE BLOG
=========================== */
export const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

/* ===========================
   GET LOGGED-IN USER BLOGS
=========================== */
export const getMyBlogs = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const blogs = await Blog.find({ author: req.user._id }).populate(
      "author",
      "name email"
    );

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    res.status(500).json({ message: "Error fetching user blogs" });
  }
};

/* ===========================
   EDIT BLOG (Owner Only)
=========================== */
/* ===========================
   EDIT BLOG (No Author Check)
=========================== */
export const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.category = req.body.category || blog.category;
    if (req.file?.path) blog.image = req.file.path;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Error updating blog" });
  }
};

/* ===========================
   DELETE BLOG (No Author Check)
=========================== */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Error deleting blog" });
  }
};


/* ===========================
   GET BLOGS BY CATEGORY
=========================== */
export const getBlogsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    let blogs;

    if (category === "ALL") {
      blogs = await Blog.find().populate("author", "name email");
    } else {
      blogs = await Blog.find({ category }).populate("author", "name email");
    }

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs by category:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
