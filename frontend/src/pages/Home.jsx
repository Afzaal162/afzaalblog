import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  Fade,
} from "@mui/material";
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

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setSearch(q);
  }, [location.search]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/api/blogs`;
        if (category && category !== "ALL") {
          url = `${API_URL}/api/blogs/category/${category}`;
        }

        const res = await axios.get(url);
        let data = res.data;

        if (search) {
          data = data.filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, search, API_URL]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 80px)",
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(18px)",
          borderRadius: 5,
          boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
          py: { xs: 3, md: 5 },
        }}
      >
        {/* Header */}
        <Header
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {/* Content */}
        {loading ? (
          <Fade in timeout={500}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 8,
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Loading blogs...
            </Typography>
          </Fade>
        ) : blogs.length === 0 ? (
          <Fade in timeout={500}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 8,
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              No blogs found.
            </Typography>
          </Fade>
        ) : (
          <Grid container spacing={4} mt={1}>
            {blogs.map((blog, index) => (
              <Fade
                in
                timeout={600 + index * 120}
                key={blog._id}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      transition: "0.35s ease",
                      "&:hover": {
                        transform: "translateY(-10px) scale(1.01)",
                      },
                    }}
                  >
                    <BlogCard
                      blog={blog}
                      onReadMore={() =>
                        navigate(`/blog/${blog._id}`)
                      }
                    />
                  </Box>
                </Grid>
              </Fade>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
