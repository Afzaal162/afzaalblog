import React, { useState, useEffect } from "react";
import { Box, TextField, Button, ButtonGroup, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const Header = ({ search, setSearch, category, setCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sync category from URL if needed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category") || "ALL";
    setCategory(urlCategory);
  }, [location.search, setCategory]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    const query = search.trim();
    if (cat === "ALL") {
      navigate(`/?${query ? `search=${encodeURIComponent(query)}` : ""}`);
    } else {
      navigate(
        `/?category=${encodeURIComponent(cat)}${query ? `&search=${encodeURIComponent(query)}` : ""}`
      );
    }
  };

  const handleSearch = () => {
    const query = search.trim();
    if (category === "ALL") {
      navigate(`/?${query ? `search=${encodeURIComponent(query)}` : ""}`);
    } else {
      navigate(`/?category=${encodeURIComponent(category)}${query ? `&search=${encodeURIComponent(query)}` : ""}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
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
