import React, { useState, useContext, useEffect } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ✅ Use environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  // Debug log to make sure env variable works
  useEffect(() => {
    console.log("Backend API URL:", API_URL);
    if (!API_URL) {
      console.error("REACT_APP_API_URL is undefined! Check your .env file location and restart React.");
    }
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert("Backend API URL not set. Check console for details.");
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await axios.post(`${API_URL}/auth/login`, { email, password });
        login(res.data.token); // save token
        setMessage("Login successful!");
        navigate("/");
      } else {
        res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
        setMessage(res.data.message);
        setIsLogin(true);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login/Signup error:", err);
      setMessage(err.response?.data?.message || "Error occurred. Check console.");
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
              />
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              {isLogin ? "Login" : "Signup"}
            </Button>
          </form>

          <Typography
            sx={{ mt: 2, cursor: "pointer", color: "blue" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </Typography>

          {message && <Typography sx={{ mt: 2, color: "green" }}>{message}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
