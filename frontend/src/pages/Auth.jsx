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

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;

      if (isLogin) {
        res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        login(res.data.token);
        navigate("/");
      } else {
        res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
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
      px={2} // ✅ horizontal padding for mobile
      bgcolor="#f5f5f5"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400, // ✅ responsive instead of minWidth
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
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

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              {isLogin ? "Login" : "Signup"}
            </Button>
          </form>

          <Typography
            mt={2}
            textAlign="center"
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </Typography>

          {message && (
            <Typography
              mt={2}
              textAlign="center"
              color={message.includes("successful") ? "green" : "red"}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
