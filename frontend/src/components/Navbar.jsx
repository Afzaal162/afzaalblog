import React, { useContext, useState } from "react";
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
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      position="static"
      sx={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            cursor: "pointer",
            "&:hover": { color: "#667eea" },
            transition: "0.3s",
          }}
          onClick={() => navigate("/")}
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
                fontWeight: "bold",
                color: "black", // ✅ Font color black
                "&:hover": {
                  color: "black", // ✅ Keep black on hover
                  transform: "translateY(-2px)",
                },
                transition: "0.3s",
              }}
            >
              {link.label}
            </Button>
          ))}

          {/* Profile Icon */}
          {isLoggedIn && (
            <IconButton
              component={Link}
              to="/profile"
              sx={{
                ml: 1,
                color: "black", // ✅ Black icon color
                "&:hover": { transform: "scale(1.1)" },
                transition: "0.3s",
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
                fontWeight: "bold",
                color: "black", // ✅ Black font
                "&:hover": { color: "#e52e71" },
                transition: "0.3s",
              }}
            >
              Logout
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <MenuIcon sx={{ color: "black" }} /> {/* ✅ Black menu icon */}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {linksToRender.map((link) => (
              <MenuItem
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleClose}
                sx={{
                  color: "black", // ✅ Black font
                  "&:hover": { background: "rgba(102,126,234,0.1)" },
                }}
              >
                {link.label}
              </MenuItem>
            ))}

            {isLoggedIn && (
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleClose}
                sx={{
                  color: "black",
                  "&:hover": { background: "rgba(102,126,234,0.1)" },
                }}
              >
                Profile
              </MenuItem>
            )}

            {isLoggedIn && (
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "black",
                  "&:hover": { background: "rgba(229,46,113,0.1)" },
                }}
              >
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
