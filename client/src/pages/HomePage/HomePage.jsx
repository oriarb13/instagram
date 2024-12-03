import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "../../components/PageLayout/Navbar";
const HomePage = () => {
    return (
        <>
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    backgroundSize: "cover",
                    margin: 0, // Ensure no margins
                    padding: 0, // Ensure no padding
                    overflow: "hidden", // Prevent scrolling
                }}
            >
                <NavBar />
                <Typography
                    variant="h1"
                    sx={{
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                    }}
                >
                    Welcome to My Homepage
                </Typography>
            </Box>
        </>
    );
};

export default HomePage;
