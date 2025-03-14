import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { registerUser  } from "../api/api";
import { useNavigate } from "react-router-dom";
import { InputAdornment,FormControl,InputLabel,IconButton,Input,Alert,Stack,} from "@mui/material";




// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";


// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const Register = () => {
  // const [username, setUserame] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const navigate = useNavigate()
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await registerUser({ username, email, password });
  //     alert("Registration successful! Please login.");
  //     navigate("/login" );
  //   } catch (error) {
  //     alert("Email Already Registered!");
  //   }
  // };

  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inputs Errors
  const [usernameError, setUserameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!username) {
      setUserameError(true);
      return;
    }

    setUserameError(false);
  };

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
      password.length < 5 ||
      password.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const navigate = useNavigate();

  //handle Submittion
  const handleSubmit = async (e) => {


    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      alert("Registration successful! Please login.");
      navigate("/signUpOrSignIn" );
    } catch (error) {
      alert("Email Already Registered!");
    }



    setSuccess(null);
    //First of all Check for Errors

    // IF username error is true
    if (usernameError || !username) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

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
    console.log("Username : " + username);
    console.log("Email : " + email);
    console.log("Password : " + password);

    //Show Successfull Submittion
    setSuccess("Form Submitted Successfully");

    

  };
  return (
    // <Container>
    //   {/* <Typography variant="h4">Register</Typography>
    //   <form onSubmit={handleRegister}>
    //     <TextField
    //       label="Username"
    //       fullWidth
    //       margin="normal"
    //       value={username}
    //       onChange={(e) => setUserame(e.target.value)}
    //     />
    //     <TextField
    //       label="Email"
    //       fullWidth
    //       margin="normal"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <TextField
    //       label="Password"
    //       type="password"
    //       fullWidth
    //       margin="normal"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Button type="submit" variant="contained" color="primary">
    //       Register
    //     </Button>
    //   </form> */}


      
    // </Container>
    <Container>
      <div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          error={usernameError}
          label="Username"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={username}
          InputProps={{}}
          onChange={(event) => {
            setUserame(event.target.value);
          }}
          onBlur={handleUsername}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={email}
          InputProps={{}}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          Sign Up
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

export default Register;
