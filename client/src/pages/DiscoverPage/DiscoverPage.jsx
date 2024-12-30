import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../utils/postsApi.js";
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

export default function DiscoveryPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const allPosts = await getAllPosts();

                const postsWithComments = await Promise.all(
                    allPosts.map(async (post) => {
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
    }, []);

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
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(to bottom, #f5f7fa, #e2eafc)",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    background: "linear-gradient(to bottom, #d6e4f0, #aecde8)",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                >
                    Discover New Posts
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, color: "text.secondary" }}
                >
                    Explore the latest posts and join the conversation!
                </Typography>
                {posts.length === 0 ? (
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ color: "text.secondary", mt: 4 }}
                    >
                        No posts available at the moment. Check back later!
                    </Typography>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={3}
                    >
                        <PostsList posts={posts} setPosts={setPosts} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
