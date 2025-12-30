import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const navigate = useNavigate();
  const location = useLocation();

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setSearch(q);
  }, [location.search]);

  // Fetch blogs based on search or category
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `${process.env.REACT_APP_API_URL}/blogs`;
        const params = {};
        if (category && category !== "ALL") params.category = category;
        if (search) params.search = search;

        const res = await axios.get(url, { params });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, search]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with search and categories */}
      <Header search={search} setSearch={setSearch} category={category} setCategory={setCategory} />

      {loading ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>Loading blogs...</Typography>
      ) : blogs.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>No blogs found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid key={blog._id} item xs={12} sm={6} md={4}>
              <BlogCard
                blog={blog}
                onReadMore={() => navigate(`/blog/${blog._id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
