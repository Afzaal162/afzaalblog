import React, { useState, useEffect } from "react";
import { Box, TextField, Button, ButtonGroup, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const categories = ["ALL", "WEBDEV", "APPDEV", "IOS DEV", "AI&ML"];

const Header = ({ search, setSearch, category, setCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        `/?category=${encodeURIComponent(cat)}${
          query ? `&search=${encodeURIComponent(query)}` : ""
        }`
      );
    }
  };

  const handleSearch = () => {
    const query = search.trim();
    if (category === "ALL") {
      navigate(`/?${query ? `search=${encodeURIComponent(query)}` : ""}`);
    } else {
      navigate(
        `/?category=${encodeURIComponent(category)}${
          query ? `&search=${encodeURIComponent(query)}` : ""
        }`
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      {/* Search Input & Button */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
        <TextField
          label="Search blogs..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            width: { xs: "90%", sm: "300px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              background: "rgba(255,255,255,0.6)",
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
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
          Search
        </Button>
      </Box>

      {/* Category Buttons */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
        <ButtonGroup variant="outlined" aria-label="categories">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(cat)}
              sx={{
                fontWeight: "bold",
                borderRadius: 2,
                px: 2,
                mx: 0.5,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                },
                transition: "0.3s",
                background:
                  cat === category ? "linear-gradient(90deg, #667eea, #764ba2)" : "",
                color: cat === category ? "#fff" : "inherit",
              }}
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
