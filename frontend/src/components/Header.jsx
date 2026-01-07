import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "WEBDEV", label: "Web Development" },
  { name: "APPDEV", label: "App Development" },
  { name: "IOS DEV", label: "iOS Development" },
  { name: "AI&ML", label: "AI & Machine Learning" },
];

const Header = () => {
  const navigate = useNavigate();

  const handleExplore = (cat) => {
    navigate(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        mb: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))",
        backdropFilter: "blur(14px)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{ color: "#1f2933" }}
      >
        Explore Trending Categories 🚀
      </Typography>

      {/* Carousel Container */}
      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <motion.div
          style={{
            display: "flex",
            gap: "20px",
          }}
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...categories, ...categories].map((cat, index) => (
            <Box
              key={index}
              sx={{
                minWidth: { xs: 260, md: 300 },
                p: 3,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {cat.label}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Discover latest articles, tutorials, and insights related to{" "}
                {cat.label}.
              </Typography>

              <Button
                onClick={() => handleExplore(cat.name)}
                sx={{
                  mt: 3,
                  background: "#fff",
                  color: "#5a4fcf",
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    background: "#f1f1f1",
                    transform: "translateY(-2px)",
                  },
                  transition: "0.3s",
                }}
              >
                Explore →
              </Button>
            </Box>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Header;
