import React, { useState, useContext } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ✅ Make sure there is NO trailing slash
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;

      if (isLogin) {
        // ✅ Correct API path
        res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        login(res.data.token);
        setMessage("Login successful!");
        navigate("/");
      } else {
        res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
        setMessage(res.data.message || "Signup successful. Please login.");
        setIsLogin(true);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Auth error:", err);
      // Display message from server if available
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ minWidth: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isLogin ? "Login" : "Signup"}
          </Typography>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              {isLogin ? "Login" : "Signup"}
            </Button>
          </form>

          <Typography
            sx={{ mt: 2, cursor: "pointer", color: "blue" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </Typography>

          {message && <Typography sx={{ mt: 2, color: message.includes("successful") ? "green" : "red" }}>{message}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
