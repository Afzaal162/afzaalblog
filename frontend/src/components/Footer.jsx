import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        py: 3,
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography variant="body1">© 2025 MyBlogSite. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
