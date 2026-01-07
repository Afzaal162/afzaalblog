import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    key: "WEBDEV",
    title: "Web Development",
    description: "Build modern websites, scalable backend systems and APIs.",
    image:
      "https://images.unsplash.com/photo-1581276879432-15a19d654956?q=80&w=1200",
  },
  {
    key: "APPDEV",
    title: "App Development",
    description: "Create powerful Android and cross-platform mobile apps.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200",
  },
  {
    key: "IOS DEV",
    title: "iOS Development",
    description: "Design elegant apps for Apple's ecosystem using Swift.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
  },
  {
    key: "AI&ML",
    title: "AI & Machine Learning",
    description: "Build intelligent systems powered by data and automation.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const handleExplore = (category) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: 3, md: 5 },
        mb: 5,
        borderRadius: 5,
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))",
        boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        color="#fff"
        mb={1}
      >
        Explore Tech Categories 🚀
      </Typography>

      <Typography
        textAlign="center"
        color="rgba(255,255,255,0.7)"
        mb={4}
      >
        High-quality blogs curated for modern developers
      </Typography>

      {/* Carousel */}
      <Box sx={{ overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            width: "max-content",
            animation: "scroll 40s linear infinite",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...categories, ...categories].map((cat, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                minWidth: { xs: 320, sm: 420, md: 520 },
                height: { xs: 260, md: 320 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                transition: "0.4s",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
            >
              {/* Background Image */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.85))",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#fff",
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {cat.title}
                  </Typography>
                  <Typography sx={{ mt: 1.5, opacity: 0.9 }}>
                    {cat.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
