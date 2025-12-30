import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Chip,
  Stack,
  Container,
  Alert,
} from "@mui/material";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    interests: [],
  });
  const [newInterest, setNewInterest] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email,
          password: "",
          interests: res.data.interests || [],
        });
      })
      .catch((err) => console.log(err));
  }, [API_URL, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() !== "" && !user.interests.includes(newInterest.trim())) {
      setUser((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setUser((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${API_URL}/users/profile`,
        { ...user },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setMessage("Profile updated successfully!"))
      .catch((err) => setMessage("Error updating profile"));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
          fullWidth
        />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Topics of Interest
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
            {user.interests.map((interest, idx) => (
              <Chip
                key={idx}
                label={interest}
                onDelete={() => handleRemoveInterest(interest)}
                color="primary"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add new interest"
              size="small"
              fullWidth
            />
            <Button variant="contained" onClick={handleAddInterest}>
              Add
            </Button>
          </Stack>
        </Box>

        <Button type="submit" variant="contained" color="success">
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfile;
