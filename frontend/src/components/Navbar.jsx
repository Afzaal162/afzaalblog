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
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">AfzaalBlog</Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {linksToRender.map((link) => (
            <Button
              key={link.label}
              color="inherit"
              component={Link}
              to={link.path}
            >
              {link.label}
            </Button>
          ))}

          {/* 👤 Profile Icon */}
          {isLoggedIn && (
            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              sx={{ ml: 1 }}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {linksToRender.map((link) => (
              <MenuItem
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleClose}
              >
                {link.label}
              </MenuItem>
            ))}

            {isLoggedIn && (
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleClose}
              >
                Profile
              </MenuItem>
            )}

            {isLoggedIn && (
              <MenuItem onClick={handleLogout}>
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
