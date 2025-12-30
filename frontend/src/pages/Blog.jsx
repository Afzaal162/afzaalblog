import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use environment variable for API
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        setBlog(res.data);

        const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        setComments(savedComments);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, API_URL]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
    setComment("");
  };

  if (loading) return <Typography sx={{ textAlign: "center", mt: 5 }}>Loading blog...</Typography>;
  if (!blog) return <Typography sx={{ textAlign: "center", mt: 5 }}>Blog not found.</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h4" gutterBottom>{blog.title}</Typography>
      <img
        src={blog.image || "https://via.placeholder.com/600x300?text=No+Image"}
        alt={blog.title}
        style={{ width: "100%", maxHeight: 300, objectFit: "cover", marginBottom: 16 }}
      />
      <Typography variant="body1" paragraph>{blog.description}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Comments</Typography>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {comments.length === 0 ? (
            <Typography>No comments yet.</Typography>
          ) : (
            comments.map((cmt, index) => (
              <Typography key={index} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}>
                {cmt}
              </Typography>
            ))
          )}
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Add
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogPage;
