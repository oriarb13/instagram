import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCommentsByPostId } from "../../utils/commentsApi.js";
import PostsList from "../../components/PostUI/Posts.jsx";
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    Alert,
    Paper,
} from "@mui/material";

const HomePage = () => {
    const username = useSelector((state) => state.user.username); // Get the current username
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!username) {
                setError("Username is required to fetch posts.");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching posts for username:", username);

                // Fetch posts for the current user
                const response = await fetch(
                    `http://localhost:3000/api/posts/friends/${username}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch posts from friends.");
                }

                const friendsPosts = await response.json();

                const postsWithComments = await Promise.all(
                    friendsPosts.map(async (post) => {
                        const comments = await getCommentsByPostId(post._id);
                        return {
                            ...post,
                            comments: Array.isArray(comments) ? comments : [],
                        };
                    })
                );

                setPosts(postsWithComments);
            } catch (err) {
                console.error("Error fetching posts or comments:", err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [username]);

    if (loading)
        return (
            <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading posts...
                </Typography>
            </Container>
        );

    if (error)
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 4,
                borderRadius: 2,
                p: 4,
            }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Friends' Posts
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, color: "text.secondary" }}
                >
                    See what your friends are sharing!
                </Typography>
                <Box display="flex" justifyContent="center">
                    <PostsList posts={posts} setPosts={setPosts} />
                </Box>
            </Paper>
        </Container>
    );
};

export default HomePage;
