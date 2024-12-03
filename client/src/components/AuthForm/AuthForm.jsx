import { Box, Container, Paper, Stack } from "@mui/material";

import Login from "./LogIn";
import Signup from "./SignUp";

import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container maxWidth="xs">
            <Container
                elevation={10}
                sx={{
                    marginTop: 8,
                    padding: 2,
                    bgcolor: "hsl(0, 0%, 0%)",
                    border: 1,
                    borderColor: "hsl(0, 0%, 33%)",
                }}
            >
                {isLogin ? <Login /> : <Signup />}
            </Container>

            <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                border={0.1}
                borderColor={"grey.500"}
                mt={2}
            >
                <Box>
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </Box>
                <Box
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                        cursor: "pointer",
                        color: "#1976d2",
                        fontWeight: "bold",
                        padding: 3,
                    }}
                >
                    {isLogin ? "Sign up" : "Log in"}
                </Box>
            </Stack>
        </Container>
    );
};

export default AuthForm;
