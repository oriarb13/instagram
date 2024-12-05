import { Box, Typography } from "@mui/material";

import Posts
const HomePage = () => {
    return (
        <>
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    backgroundSize: "cover",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                    // backgroundColor: "green",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "hsl(0, 0%, 7%)",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                        textAlign: "center",
                    }}
                >
                    Welcome to My Homepage
                </Typography>
            </Box>
        </>
    );
};

export default HomePage;
