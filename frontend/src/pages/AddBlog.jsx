import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token"); // ✅ get JWT token

    if (!token) {
      alert("You must be logged in to add a blog");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/blogs/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ include token
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (err) {
      console.error("Error adding blog:", err.response || err);
      alert(
        `Failed to add blog. ${
          err.response?.data?.message || "Check console for details."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Blog
      </Typography>

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
          {image ? "Change Image" : "Upload Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <>
            <Typography>Selected: {image.name}</Typography>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "100%", marginTop: 10 }}
            />
          </>
        )}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Adding..." : "Add Blog"}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBlog;
