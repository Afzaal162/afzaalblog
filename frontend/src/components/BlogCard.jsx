import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x200.png?text=No+Image";

const BlogCard = ({ blog, onReadMore }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        m: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.3)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box sx={{ overflow: "hidden", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <CardMedia
          component="img"
          height="200"
          image={blog.image || DEFAULT_IMAGE}
          alt={blog.title}
          sx={{
            transition: "transform 0.5s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{ fontWeight: "bold" }}
        >
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.description.slice(0, 120)}...
        </Typography>
      </CardContent>

      <Button
        variant="contained"
        onClick={onReadMore}
        sx={{
          m: 1,
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: 2,
          "&:hover": {
            background: "linear-gradient(90deg, #764ba2, #667eea)",
            transform: "translateY(-2px)",
          },
          transition: "0.3s",
        }}
      >
        Read More
      </Button>
    </Card>
  );
};

export default BlogCard;
