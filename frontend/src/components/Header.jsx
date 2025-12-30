import React, { useState } from "react";
import { Box, TextField, Button, ButtonGroup, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("ALL");

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    if (cat === "ALL") {
      navigate("/"); // All blogs
    } else {
      navigate(`/category/${cat}`); // Specific category
    }
  };

  const handleSearch = () => {
    const query = search.trim();
    if (query) {
      // Navigate to Home with search query param
      navigate(`/?search=${encodeURIComponent(query)}${category !== "ALL" ? `&category=${category}` : ""}`);
    } else {
      // If empty search, just stay on current category
      if (category === "ALL") navigate("/");
      else navigate(`/category/${category}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch(); // Search on Enter
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <TextField
        label="Search blogs..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ width: { xs: "90%", sm: "50%" }, mb: 3, mr: 1 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
        <ButtonGroup variant="outlined" aria-label="categories">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default Header;
