import axios from "axios";

import {
    Avatar,
    Box,
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    // Grid,
    // Link,
    FormControl,
    IconButton,
    FilledInput,
    InputLabel,
    InputAdornment,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    // const [isLogin, setIsLogin] = useState(true);
    //inputs
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        //empty input error handling
        setUsernameError(false);
        setPasswordError(false);

        let hasError = false;

        if (!usernameInput.trim()) {
            setUsernameError(true);
            hasError = true;
        }
        if (!passwordInput.trim()) {
            setPasswordError(true);
            hasError = true;
        }

        if (hasError) return;

        console.log(usernameInput);
        console.log(passwordInput);

        try {
            const response = await axios.post(
                "http://localhost:3000/sign-in",
                { username: usernameInput, password: passwordInput },
                { withCredentials: true }
            );

            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    // const [emalInput, setEmailInput] = useState();

    //Input Errors
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // password visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="xs">
            <Container sx={{ my: 2, padding: 2 }}>
                <h1>Instagram</h1>
                <Avatar
                    sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                        textAlign: "center",
                        mb: 1,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    Sign In
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    ///?????????????
                    // noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        label="Enter username"
                        fullWidth
                        variant="filled"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        autoFocus
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                        error={usernameError} // Displays red border if true
                        helperText={usernameError ? "Username is required" : ""} // Custom error message
                        id="filled-error-helper-text"
                    />
                    <FormControl
                        fullWidth
                        sx={{
                            input: { color: "white" },
                            label: { color: "hsl(0, 0%, 66%)" },
                            mb: 2,
                            bgcolor: "hsl(0, 0%, 7%)",
                            border: 1,
                        }}
                        variant="filled"
                    >
                        <InputLabel
                            error={passwordError}
                            htmlFor="filled-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordInput}
                            error={passwordError}
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
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff
                                                sx={{ color: "white" }}
                                            />
                                        ) : (
                                            <Visibility
                                                sx={{ color: "white" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {passwordError && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                Password is required
                            </Typography>
                        )}
                    </FormControl>

                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Container>
        </Container>
    );
};

export default Login;
