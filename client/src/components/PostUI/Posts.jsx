import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import PostCard from "./Post.jsx";

export default function PostsList({ posts = [], setPosts }) {
    const handleDeletePost = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
        );
    };

    if (posts.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                No posts available.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginBlock: 2,
            }}
        >
            <Stack spacing={2}>
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        comments={post.comments || []}
                        onDeletePost={handleDeletePost} // Pass delete handler
                    />
                ))}
            </Stack>
        </Box>
    );
}
