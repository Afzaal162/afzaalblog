import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Container,
} from "@mui/material";

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
      console.log(res.data);

      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (err) {
      console.error(err.response || err);
      setMessage(err.response?.data?.message || "Failed to add blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: 2,
        background:
          "linear-gradient(135deg, #1f1f1f 0%, #121212 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: 6,
          px: 4,
          borderRadius: 4,
          background: "rgba(30,30,30,0.85)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          color: "#fff",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            letterSpacing: 1,
          }}
        >
          Add New Blog
        </Typography>

        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "#aaa" },
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
            rows={5}
            required
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "#aaa" },
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
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "#aaa" },
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
            fullWidth
            sx={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": { background: "linear-gradient(90deg, #764ba2, #667eea)" },
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
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography sx={{ mb: 1 }}>{image.name}</Typography>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": { background: "linear-gradient(90deg, #764ba2, #667eea)" },
            }}
          >
            {loading ? "Adding..." : "Add Blog"}
          </Button>

          {message && (
            <Typography
              sx={{ mt: 2, textAlign: "center", fontWeight: 500 }}
              color={message.includes("successfully") ? "success.main" : "error"}
            >
              {message}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default AddBlog;
