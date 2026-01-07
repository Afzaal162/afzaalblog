import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x200.png?text=No+Image";

const BlogCard = ({ blog, onReadMore }) => {
  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length).split(" ").slice(0, -1).join(" ") + "..." : text;
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 320, md: 345 },
        m: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.35)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative", overflow: "hidden", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <CardMedia
          component="img"
          height="200"
          image={blog.image || DEFAULT_IMAGE}
          alt={blog.title}
          sx={{
            transition: "transform 0.5s, filter 0.5s",
            "&:hover": {
              transform: "scale(1.1)",
              filter: "brightness(0.85)",
            },
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {truncate(blog.title, 50)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncate(blog.description, 120)}
        </Typography>
      </CardContent>

      {/* Read More Button */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="contained"
          onClick={onReadMore}
          sx={{
            px: 4,
            py: 1.5,
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 3,
            "&:hover": {
              background: "linear-gradient(90deg, #764ba2, #667eea)",
              transform: "translateY(-2px)",
            },
            transition: "0.3s",
          }}
        >
          Read More
        </Button>
      </Box>
    </Card>
  );
};

export default BlogCard;
