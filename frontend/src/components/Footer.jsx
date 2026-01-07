import React from "react";
import { Box, Typography, Stack, IconButton, Container, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 8,
        py: 6,
        background: "rgba(25,25,25,0.9)",
        backdropFilter: "blur(12px)",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        {/* Logo / Site Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, letterSpacing: 1, color: "#fff" }}
        >
          MyBlogSite
        </Typography>

        {/* Quick Links (Optional) */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          spacing={3}
          mb={2}
        >
          <Typography sx={{ cursor: "pointer", "&:hover": { color: "#667eea" } }}>
            Home
          </Typography>
          <Typography sx={{ cursor: "pointer", "&:hover": { color: "#667eea" } }}>
            Blog
          </Typography>
          <Typography sx={{ cursor: "pointer", "&:hover": { color: "#667eea" } }}>
            About
          </Typography>
          <Typography sx={{ cursor: "pointer", "&:hover": { color: "#667eea" } }}>
            Contact
          </Typography>
        </Stack>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />

        {/* Social Icons */}
        <Stack direction="row" justifyContent="center" spacing={2} mb={2}>
          {[FacebookIcon, TwitterIcon, LinkedInIcon].map((Icon, idx) => (
            <IconButton
              key={idx}
              href="#"
              target="_blank"
              sx={{
                color: "#fff",
                "&:hover": { color: "#667eea", transform: "scale(1.3)" },
                transition: "0.3s",
              }}
            >
              <Icon fontSize="large" />
            </IconButton>
          ))}
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          © 2025 MyBlogSite. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
