import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import CreatePost from "../../components/CreatePost/CreatePost.jsx";


const CreatePostPage = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Create a New Post
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ marginBottom: 3, color: "text.secondary" }}
                >
                    Share your thoughts, ideas, or updates with your friends.
                </Typography>
                <Box>
                    <CreatePost />
                </Box>
            </Paper>
        </Container>
    );
};


export default CreatePostPage;



