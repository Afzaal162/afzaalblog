import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Stack, Card, CardContent, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // make sure no trailing slash

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [API_URL]);

  // Delete blog with token
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a blog");
        return;
      }

      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err.response || err);
      alert(err.response?.data?.message || "Failed to delete blog.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" onClick={() => navigate("/add-blog")}>Add Blog</Button>
      </Stack>

      {loading ? (
        <Typography>Loading blogs...</Typography>
      ) : blogs.length === 0 ? (
        <Typography>No blogs found.</Typography>
      ) : (
        <Stack spacing={2}>
          {blogs.map((blog) => (
            <Card key={blog._id}>
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Category: {blog.category} | Author: {blog.author?.name || "Unknown"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/edit-blog/${blog._id}`)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>Delete</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Dashboard;
