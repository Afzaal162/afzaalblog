import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Fade,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

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
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: 2,
        background: "linear-gradient(135deg, #1f1f1f 0%, #121212 100%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={5}
          gap={2}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: "#fff", letterSpacing: 1 }}
          >
            Dashboard
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/add-blog")}
            sx={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
              px: 3,
              "&:hover": {
                background: "linear-gradient(90deg, #764ba2, #667eea)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              },
              transition: "0.3s",
            }}
          >
            Add Blog
          </Button>
        </Stack>

        {/* Content */}
        {loading ? (
          <Typography
            sx={{
              textAlign: "center",
              mt: 6,
              fontSize: "1.2rem",
              color: "#ccc",
            }}
          >
            Loading blogs...
          </Typography>
        ) : blogs.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              mt: 6,
              fontSize: "1.2rem",
              color: "#ccc",
            }}
          >
            No blogs found.
          </Typography>
        ) : (
          <Stack spacing={4}>
            {blogs.map((blog, index) => (
              <Fade in timeout={400 + index * 150} key={blog._id}>
                <Card
                  sx={{
                    backdropFilter: "blur(14px)",
                    background: "rgba(50,50,50,0.75)",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "#fff" }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#ccc"
                      mb={1}
                    >
                      {blog.description.substring(0, 150)}...
                    </Typography>
                    <Typography
                      variant="caption"
                      color="#aaa"
                    >
                      Category: {blog.category} | Author:{" "}
                      {blog.author?.name || "Unknown"}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      sx={{
                        color: "#fff",
                        background: "linear-gradient(90deg, #667eea, #764ba2)",
                        "&:hover": {
                          background: "linear-gradient(90deg, #764ba2, #667eea)",
                        },
                        fontWeight: "bold",
                      }}
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      sx={{
                        ml: 1,
                        fontWeight: "bold",
                      }}
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
