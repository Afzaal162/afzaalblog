import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;

  if (error)
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#fff" }}
      >
        My Profile
      </Typography>

      {/* User Info */}
      <Card
        sx={{
          mb: 4,
          background: "rgba(30,30,30,0.85)", // Dark glass card
          backdropFilter: "blur(12px)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant="subtitle1">Topics of Interest:</Typography>
          {user.interests && user.interests.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {user.interests.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  color="primary"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    backgroundColor: "#667eea",
                    color: "#fff",
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="#ccc">
              No topics added yet.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* User Blogs */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
      >
        My Blogs
      </Typography>

      {blogs.length === 0 ? (
        <Typography color="#ccc">No blogs added yet.</Typography>
      ) : (
        blogs.map((blog) => (
          <Card
            key={blog._id}
            sx={{
              mb: 2,
              background: "rgba(30,30,30,0.75)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" },
            }}
          >
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2" color="#ccc">
                {blog.subTitle || blog.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Profile;
