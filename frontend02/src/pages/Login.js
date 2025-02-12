import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { loginUser } from "../api/api";
// import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

;

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();  // Ensure clean input
  const password = e.target.password.value.trim();

  console.log("Submitting:", { email, password }); // Debugging log

  if (!email || !password) {
    console.error("Missing email or password");
    return;
  }

  try {
    const data = await loginUser(email, password);
    console.log("Login Successful", data);
    alert("Login Successful")
  } catch (error) {
    console.error("Login error:", error);
    alert("Login error")
  }
};
  

  // async function handleLogin(email, password) {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/users/login", {
  //       email,  // Should be a string, not an object
  //       password
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Login failed:", error.response?.data);
  //     throw error;
  //   }

  // }

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
        name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
        name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
