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
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{
            fontWeight: 800,
            letterSpacing: 0.5,
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

          {/* Profile Icon */}
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

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                mt: 1,
                minWidth: 160,
              },
            }}
          >
            {linksToRender.map((link) => (
              <MenuItem
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleClose}
                sx={{
                  fontWeight: 500,
                  color: "#000",
                  "&:hover": {
                    background: "rgba(102,126,234,0.1)",
                  },
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
                  fontWeight: 500,
                  color: "#000",
                  "&:hover": {
                    background: "rgba(102,126,234,0.1)",
                  },
                }}
              >
                Profile
              </MenuItem>
            )}

            {isLoggedIn && (
              <MenuItem
                onClick={handleLogout}
                sx={{
                  fontWeight: 500,
                  color: "#000",
                  "&:hover": {
                    background: "rgba(225,29,72,0.12)",
                  },
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
