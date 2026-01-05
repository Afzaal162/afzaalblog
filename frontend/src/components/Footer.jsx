import React from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 4,
        px: 2,
        borderRadius: 3,
        textAlign: "center",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        color: "#fff",
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        © 2025 MyBlogSite. All Rights Reserved.
      </Typography>

      {/* Optional Social Icons */}
      <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
        <IconButton
          href="#"
          target="_blank"
          sx={{
            color: "#fff",
            "&:hover": { color: "#667eea", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="#"
          target="_blank"
          sx={{
            color: "#fff",
            "&:hover": { color: "#667eea", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          href="#"
          target="_blank"
          sx={{
            color: "#fff",
            "&:hover": { color: "#667eea", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
