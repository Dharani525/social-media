import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username"); // Get from URL state or localStorage

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };


  const handleLogout = () => {
    // Remove the username from localStorage when logging out
    localStorage.removeItem("username");
    
    // Optionally, clear other stored information like user token, etc.
    localStorage.removeItem("token");
  
    // Redirect the user to the login page or home page (optional)
    // window.location.href = "/login"; 
    navigate("/SignUpOrSignIn"); // Redirect to login page, or wherever you need
  };
  return (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Social Media App

      </Typography>
      

      <Typography variant="h6" sx={{ flexGrow: 1 }}> {username} </Typography>


      {token ? (
        <Button   color="inherit" onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/SignUpOrSignIn">Sign Up / Sign In</Button>
          {/* <Button color="inherit" component={Link} to="/register">Register</Button> */}
        </>
      )}
    </Toolbar>
  </AppBar>
);
};

export default Navbar;
