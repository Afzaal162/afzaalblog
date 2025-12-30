import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x200.png?text=No+Image";

const BlogCard = ({ blog, onReadMore }) => {
  return (
    <Card sx={{ maxWidth: 345, m: "auto", display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        height="200"
        image={blog.image || DEFAULT_IMAGE}
        alt={blog.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.description.slice(0, 120)}...
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={onReadMore}
      >
        Read More
      </Button>
    </Card>
  );
};

export default BlogCard;
