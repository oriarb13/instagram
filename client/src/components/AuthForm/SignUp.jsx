import axios from "axios"; // Added axios for API integration

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

import { useState } from "react";

const SignUp = () => {
    // State for input fields
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    // State for error handling
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false); // New for password confirmation mismatch

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle password visibility toggle
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Handle form submission
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
            // Basic email format validation
            setEmailError(true);
            hasError = true;
        }
        if (!passwordInput.trim()) {
            setPasswordError(true);
            hasError = true;
        }
        if (passwordInput !== confirmPasswordInput) {
            // Check if passwords match
            setConfirmPasswordError(true);
            hasError = true;
        }

        if (hasError) return; // Stop submission if there are errors

        try {
            // Submit form data to the server
            const response = await axios.post(
                "http://localhost:3000/sign-up",
                {
                    username: usernameInput,
                    email: emailInput,
                    password: passwordInput,
                },
                { withCredentials: true }
            );

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error during sign-up:", error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Container sx={{ marginTop: 8, padding: 2 }}>
                <Box sx={{ fontWeight: "bold", px: 2, mb: 2 }}>
                    <h1>Instagram</h1>
                    Sign up to see photos and videos from your friends.
                </Box>
                <Avatar
                    sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                        textAlign: "center",
                        mb: 1,
                    }}
                >
                    <CreateIcon />
                </Avatar>

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    Sign Up
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {/* Username Input */}
                    <TextField
                        label="Enter username"
                        fullWidth
                        variant="filled"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? "Username is required" : ""}
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                    />

                    {/* Email Input */}
                    <TextField
                        label="Enter email"
                        fullWidth
                        variant="filled"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        error={emailError}
                        helperText={
                            emailError
                                ? "Invalid email format (e.g., user@example.com)"
                                : ""
                        }
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                    />

                    {/* Password Input */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        error={passwordError}
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                    >
                        <InputLabel htmlFor="filled-adornment-password">
                            Password
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    {/* Confirm Password Input */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        error={confirmPasswordError}
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                    >
                        <InputLabel htmlFor="filled-adornment-confirm-password">
                            Confirm Password
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={confirmPasswordInput}
                            onChange={(e) =>
                                setConfirmPasswordInput(e.target.value)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                        {confirmPasswordError && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                Passwords must match
                            </Typography>
                        )}
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Container>
        </Container>
    );
};

export default SignUp;
