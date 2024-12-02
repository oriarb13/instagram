import { Box, Container, Paper, Stack } from "@mui/material";

import Login from "./LogIn";
import Signup from "./SignUp";

import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                {isLogin ? <Login /> : <Signup />}
            </Paper>

            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <Box>
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </Box>
                <Box onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign up" : "Log in"}
                </Box>
            </Stack>
        </Container>
    );
};

export default AuthForm;
