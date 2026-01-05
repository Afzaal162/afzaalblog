import React, { useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const res = await axios.post(
          `${API_URL}/api/auth/login`,
          { email, password }
        );
        login(res.data.token);
        navigate("/");
      } else {
        await axios.post(
          `${API_URL}/api/auth/signup`,
          { name, email, password }
        );
        setIsLogin(true);
        setMessage("Signup successful. Please login.");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Fade in timeout={600}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: 4,
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              color="white"
              gutterBottom
            >
              {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              color="rgba(255,255,255,0.8)"
              mb={3}
            >
              {isLogin
                ? "Login to continue"
                : "Signup to get started"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: "bold",
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #ff8a00, #e52e71)",
                  color: "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {isLogin ? "Login" : "Signup"}
              </Button>
            </form>

            <Typography
              mt={3}
              textAlign="center"
              color="white"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </Typography>

            {message && (
              <Typography
                mt={2}
                textAlign="center"
                color={
                  message.includes("successful")
                    ? "#00ff99"
                    : "#ffcccc"
                }
              >
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Auth;
