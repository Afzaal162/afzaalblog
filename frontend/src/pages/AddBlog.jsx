import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Stack, MenuItem } from "@mui/material";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      setMessage("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to add a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${API_URL}/api/blogs/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Blog added successfully!");
      console.log("Blog added response:", res.data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (err) {
      console.error("Error adding blog:", err.response || err);
      setMessage(
        err.response?.data?.message || "Failed to add blog. Check console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 4,
        px: 2,
        background: "rgba(30,30,30,0.85)", // dark glass background
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
      >
        Add Blog
      </Typography>

      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#ccc" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#667eea" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
          }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#ccc" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#667eea" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
          }}
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#ccc" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#667eea" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: "#667eea",
            "&:hover": { backgroundColor: "#5566cc" },
          }}
        >
          {image ? "Change Image" : "Upload Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Typography>Selected: {image.name}</Typography>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#667eea",
            "&:hover": { backgroundColor: "#5566cc" },
          }}
        >
          {loading ? "Adding..." : "Add Blog"}
        </Button>

        {message && (
          <Typography
            sx={{ mt: 2, textAlign: "center" }}
            color={message.includes("successfully") ? "green" : "error"}
          >
            {message}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default AddBlog;
