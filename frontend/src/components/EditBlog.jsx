import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Stack, MenuItem } from "@mui/material";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        const blog = res.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setCategory(blog.category);
        setImage(blog.image ? blog.image : null);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image instanceof File) formData.append("image", image);

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update a blog");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_URL}/blogs/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Add token here
        },
      });
      alert("Blog updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating blog:", err.response || err);
      alert(err.response?.data?.message || "Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Blog</Typography>

      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" component="label">
          {image instanceof File ? "Change Image" : "Upload Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt="preview"
            style={{ width: "100%", marginTop: 10 }}
          />
        )}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditBlog;
