import {
    Avatar,
    Box,
    Container,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
    Checkbox,
    Button,
    // Grid,
    // Link,
    FormControl,
    IconButton,
    OutlinedInput,
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(usernameInput);
        console.log(passwordInput);
    };

    //inputs
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
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
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <h1>Auth Page</h1>
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
                    sx={{ textAlign: "center" }}
                >
                    Sign In
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        // id="outlined-basic"
                        label="Enter username"
                        fullWidth
                        required
                        variant="outlined"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        autoFocus
                        sx={{ mb: 2 }}
                        error={usernameError}
                        id="outlined-error-helper-text"
                        helperText="Incorrect entry."
                    />

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel
                            error={passwordError}
                            htmlFor="outlined-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
