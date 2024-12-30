import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import CreatePost from "../../components/CreatePost/CreatePost.jsx";

const CreatePostPage = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                >
                    Create a New Post
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ marginBottom: 3, color: "#555" }}
                >
                    Share your thoughts, ideas, or updates with your friends.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3,
                    }}
                >
                    <CreatePost />
                </Box>
            </Paper>
        </Container>
    );
};

export default CreatePostPage;
