import React from "react";
import { Box } from "@mui/material";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p>No blogs found.</p>
      )}
    </Box>
  );
};

export default BlogList;
