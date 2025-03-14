import React, { useState } from "react";
// import { TextField, Button, Container, Typography } from "@mui/material";
import { loginUser } from "../api/api";
import {  useNavigate } from "react-router-dom";
// import {Avatar, Box, FormControlLabel, Paper, Checkbox} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  Container,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  
  //   try {
  //     const user = await loginUser({ email, password });
  //     console.log("Login successful:", user);
  
  //     // Store user details in localStorage
  //     localStorage.setItem("user_id", user.user.id);
  //     localStorage.setItem("username", user.user.username);  // Make sure to store username here
  //     localStorage.setItem("token", user.token);  // Assuming `user.token` contains the JWT
  
  //     alert(`Welcome, ${user.user.username}!`);
  
  //     // Redirect to the post page with user_id and username in state
  //     navigate("/", { state: { user_id: user.user.id, username: user.user.username, token: user.token } });
  
  //   } catch (err) {
  //     setError(err.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");



  // const handleLogin = async (e) => {

  //   e.preventDefault();
  //   try {
  //     const response = await loginUser({ email, password });
  //     // localStorage.setItem("token", response.data.token);
  //     alert("Login successful!", response);
     
  //   } catch (error) {
  //     alert("Login failed!" , error);
  //   }
  // };


  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !password ||
      password.length < 4 ||
      password.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit =async (e) => {
    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !email) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !password) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    console.log("Email : " + email);
    console.log("Password : " + password);
    console.log("Remember : " + rememberMe);

    //Show Successfull Submittion
    setSuccess("Form Submitted Successfully");

    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const user = await loginUser({ email, password });
      console.log("Login successful:", user);
  
      // Store user details in localStorage
      localStorage.setItem("user_id", user.user.id);
      localStorage.setItem("username", user.user.username);  // Make sure to store username here
      localStorage.setItem("token", user.token);  // Assuming `user.token` contains the JWT
  
      alert(`Welcome, ${user.user.username}!`);
  
      // Redirect to the post page with user_id and username in state
      navigate("/", { state: { user_id: user.user.id, username: user.user.username, token: user.token } });
  
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }




  };
  
  return (
    // <Container  maxWidth="xs">
    //   {/* <Typography variant="h4">Login</Typography>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <form onSubmit={handleLogin}>
    //     <TextField
    //       name="email"
    //       label="Email"
    //       fullWidth
    //       margin="normal"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <TextField
    //       label="Password"
    //       type="password"
    //       name="password"
    //       fullWidth
    //       margin="normal"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Button type="submit" variant="contained" color="primary">
    //     {loading ? "Logging in..." : "Login"}
    //     </Button>

        
    //   </form> */}


    //   {/* <Paper elevation={10} sx={{ marginTop: 8, padding: 2, width: "100%", maxWidth: 360, mx: "auto", marginBottom:10 }}>
    //     <Avatar
    //       sx={{
    //         mx: "auto",
    //         bgcolor: "secondary.main",
    //         textAlign: "center",
    //         mb: 1,
    //       }}
    //     >
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
    //       Sign In
    //     </Typography>
    //     <Box component="form" onSubmit={handleLogin}   sx={{ mt: 1 }}>
    //       <TextField
    //         name="email"
    //         label="Email"
    //         fullWidth
    //         margin="normal"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Enter username"
    //         required
    //         autoFocus
    //         sx={{ mb: 2 }}
    //       />
    //       <TextField
    //         label="Password"
    //         type="password"
    //         name="password"
    //         fullWidth
    //         margin="normal"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Enter password"
    //         required
            
    //       />
    //       <FormControlLabel
    //         control={<Checkbox value="remember" color="primary" />}
    //         label="Remember me"
    //       />
    //       {error && <p style={{ color: "red" }}>{error}</p>}
    //       <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
    //       {loading ? "Logging in..." : "Login"}
    //       </Button>
    //     </Box>
        
    //   </Paper> */}
      
    // </Container>
    
    <Container>
      <div>
    <div style={{ marginTop: "5px" }}>
      <TextField
        label="Email Address"
        fullWidth
        error={emailError}
        id="standard-basic"
        variant="standard"
        sx={{ width: "100%" }}
        
        InputProps={{}}
        size="small"
        onBlur={handleEmail}
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}

      />  
    </div>
    <div style={{ marginTop: "5px" }}>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel
          error={passwordError}
          htmlFor="standard-adornment-password"
        >
          Password
        </InputLabel>
        <Input
          error={passwordError}
          onBlur={handlePassword}
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)
          }
          name="password"
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>

    <div style={{ fontSize: "10px" }}>
      <Checkbox
        {...label}
        size="small"
        onChange={(event) => setRememberMe(event.target.checked)}
      />
      Remember Me
    </div>

    <div style={{ marginTop: "10px" }}>
      <Button
        variant="contained"
        fullWidth
        startIcon={<LoginIcon />}
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </div>

    {/* Show Form Error if any */}
    {formValid && (
      <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
        <Alert severity="error" size="small">
          {formValid}
        </Alert>
      </Stack>
    )}

    {/* Show Form Error if any */}
    {error && (
      <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
        <Alert severity="error" size="small">
          {error}
        </Alert>
      </Stack>
    )}

    {/* Show Success if no issues */}
    {success && (
      <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
        <Alert severity="success" size="small">
          {success}
        </Alert>
      </Stack>
    )}

    {/* <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
      <a>Forgot Password</a>
      <br />
      Do you have an account ?{" "}
      <small style={{ textDecoration: "underline", color: "blue" }}>
        Sign Up
      </small>
    </div> */}
  </div>
    </Container>


  );
};

export default Login;
