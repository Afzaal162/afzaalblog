import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
