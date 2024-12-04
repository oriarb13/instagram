import { useState } from "react";
import { useDispatch } from "react-redux"; //redux
import { setUser } from "../../store/slices/userSlice.js";  //redux
import { signUp } from "../../utils/userApi"; 

import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  IconButton,
  FilledInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom"; 

const SignUp = () => {
  const dispatch = useDispatch(); //redux

  // State for form inputs
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // State for error handling
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle password visibility toggle
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    setConfirmPasswordError(false);

    let hasError = false;

    // Input validation
    if (!usernameInput.trim()) {
      setUsernameError(true);
      hasError = true;
    }
    if (!emailInput.trim() || !/\S+@\S+\.\S+/.test(emailInput)) {
      setEmailError(true);
      hasError = true;
    }
    if (!passwordInput.trim()) {
      setPasswordError(true);
      hasError = true;
    }
    if (passwordInput !== confirmPasswordInput) {
      setConfirmPasswordError(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      // Call sign-up API
      const response = await signUp({   //api call to save new user
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      });

      if (response.status==="success") {
        // Dispatch action to store user info in Redux
        dispatch(setUser(usernameInput));  //redux

        // Optionally navigate to home page or login
      } else {
        console.log("Sign-up failed:", response.error);
      }
    } catch (error) {
      console.log("Error occurred during sign-up:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }}>
        <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
          <CreateIcon />
        </Avatar>

        <Typography variant="h5" align="center" sx={{ mt: 1 }}>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="Username"
            fullWidth
            variant="filled"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            error={usernameError}
            helperText={usernameError ? "Username is required" : ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="filled"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            error={emailError}
            helperText={emailError ? "Invalid email" : ""}
            sx={{ mb: 2 }}
          />
          <FormControl
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
          >
            <InputLabel>Password</InputLabel>
            <FilledInput
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
          >
            <InputLabel>Confirm Password</InputLabel>
            <FilledInput
              type={showPassword ? "text" : "password"}
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
            {confirmPasswordError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Passwords do not match
              </Typography>
            )}
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 1 }}
            startIcon={<CreateIcon />}
          >
            Sign Up
          </Button>

          {/* Link to Login page */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
