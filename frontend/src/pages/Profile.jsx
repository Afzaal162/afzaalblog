import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  CircularProgress,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view this page.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRes = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const blogsRes = await axios.get(`${API_URL}/api/users/my-blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(blogsRes.data);
      } catch (err) {
        console.error("Error fetching profile or blogs:", err.response || err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, token]);

  const handleEditBlog = (id) => navigate(`/edit-blog/${id}`);

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete blog.");
    }
  };

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "50px auto", color: "#667eea" }} />
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Box sx={{ minHeight: "100vh", py: 6, background: "#121212" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ mb: 5, fontWeight: "bold", color: "#fff", textAlign: "center" }}
        >
          My Profile Dashboard
        </Typography>

        {/* User Info */}
        <Card
          sx={{
            mb: 5,
            background: "rgba(30,30,30,0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            color: "#fff",
            px: 3,
            py: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Email:</strong> {user.email}
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Topics of Interest:
            </Typography>
            {user.interests && user.interests.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {user.interests.map((topic, index) => (
                  <Chip
                    key={index}
                    label={topic}
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                      color: "#fff",
                    }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
                No topics added yet.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* User Blogs */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, fontWeight: "bold", color: "#fff" }}
        >
          My Blogs
        </Typography>

        {blogs.length === 0 ? (
          <Typography color="#ccc">No blogs added yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card
                  sx={{
                    height: "100%",
                    background: "rgba(30,30,30,0.75)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      {blog.description.substring(0, 100)}...
                    </Typography>
                    <Typography
                      variant="caption"
                      color="#aaa"
                      sx={{ mt: 1, display: "block" }}
                    >
                      Category: {blog.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        color: "#fff",
                        background: "linear-gradient(90deg, #667eea, #764ba2)",
                        "&:hover": {
                          background: "linear-gradient(90deg, #764ba2, #667eea)",
                        },
                      }}
                      onClick={() => handleEditBlog(blog._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      sx={{ ml: 1, fontWeight: "bold" }}
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
