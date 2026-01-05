import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Fade,
} from "@mui/material";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(res.data);

        const savedComments =
          JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
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

  if (loading)
    return (
      <Typography sx={{ textAlign: "center", mt: 5, fontSize: "1.2rem" }}>
        Loading blog...
      </Typography>
    );
  if (!blog)
    return (
      <Typography sx={{ textAlign: "center", mt: 5, fontSize: "1.2rem" }}>
        Blog not found.
      </Typography>
    );

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: 6,
        px: 2,
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e0eafc 100%)",
        minHeight: "100vh",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          color: "#333",
          borderColor: "#aaa",
          "&:hover": { borderColor: "#667eea", color: "#667eea" },
          transition: "0.3s",
        }}
      >
        Back
      </Button>

      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {blog.title}
        </Typography>

        <img
          src={blog.image || "https://via.placeholder.com/600x300?text=No+Image"}
          alt={blog.title}
          style={{
            width: "100%",
            maxHeight: 350,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 20,
          }}
        />

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          {blog.description}
        </Typography>

        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Comments
          </Typography>

          <Stack spacing={1} sx={{ mb: 2 }}>
            {comments.length === 0 ? (
              <Typography>No comments yet.</Typography>
            ) : (
              comments.map((cmt, index) => (
                <Fade in timeout={200 + index * 100} key={index}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.5)",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography>{cmt}</Typography>
                  </Box>
                </Fade>
              ))
            )}
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                background: "rgba(255,255,255,0.6)",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              sx={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(90deg, #764ba2, #667eea)",
                  transform: "translateY(-2px)",
                },
                transition: "0.3s",
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPage;
