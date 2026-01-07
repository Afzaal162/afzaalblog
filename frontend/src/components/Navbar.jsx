import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const open = Boolean(anchorEl);

  // 👉 Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleClose();
  };

  const authLinks = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Add Blog", path: "/add-blog" },
  ];

  const guestLinks = [{ label: "Login", path: "/login" }];
  const linksToRender = isLoggedIn ? authLinks : guestLinks;

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        background: scrolled
          ? "#ffffff" // solid when scrolled
          : "rgba(255,255,255,0.35)", // glass when top
        backdropFilter: scrolled ? "none" : "blur(14px)",
        borderBottom: scrolled
          ? "1px solid #e5e7eb"
          : "1px solid rgba(255,255,255,0.3)",
        transition: "all 0.35s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{
            fontWeight: 800,
            cursor: "pointer",
            color: "#111",
            "&:hover": { color: "#667eea" },
            transition: "0.3s",
          }}
        >
          AfzaalBlog
        </Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {linksToRender.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.path}
              sx={{
                mx: 1,
                fontWeight: 600,
                color: "#000",
                textTransform: "none",
                "&:hover": {
                  color: "#000",
                  transform: "translateY(-2px)",
                },
                transition: "0.25s",
              }}
            >
              {link.label}
            </Button>
          ))}

          {/* Profile */}
          {isLoggedIn && (
            <IconButton
              component={Link}
              to="/profile"
              sx={{
                ml: 1,
                color: "#000",
                "&:hover": { transform: "scale(1.1)" },
                transition: "0.25s",
              }}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          )}

          {/* Logout */}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              sx={{
                ml: 1,
                fontWeight: 600,
                color: "#000",
                textTransform: "none",
                "&:hover": { color: "#e11d48" },
                transition: "0.25s",
              }}
            >
              Logout
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleMenu}>
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {linksToRender.map((link) => (
              <MenuItem
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleClose}
                sx={{ color: "#000" }}
              >
                {link.label}
              </MenuItem>
            ))}

            {isLoggedIn && (
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleClose}
                sx={{ color: "#000" }}
              >
                Profile
              </MenuItem>
            )}

            {isLoggedIn && (
              <MenuItem onClick={handleLogout} sx={{ color: "#e11d48" }}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
