import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";

const SearchPage = () => {
  const { query } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
        const filtered = res.data.filter(
          (b) =>
            b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.description.toLowerCase().includes(query.toLowerCase())
        );
        setBlogs(filtered);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [query]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>Loading blogs...</Typography>
      ) : blogs.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>No blogs found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid key={blog._id} item xs={12} sm={6} md={4}>
              <BlogCard blog={blog} onReadMore={() => { window.location.href = `/blog/${blog._id}` }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;
