import React from "react";
import { Typography } from "@mui/material";
import PostCard from "./Post";

// inline comment: This component receives an array of posts as a prop and simply displays them.
// It does not do any fetching on its own. It also accepts an optional filterFn if you ever need it.
export default function PostsList({ posts = [], filterFn }) {
    // inline comment: If a filter function is provided, apply it to the posts. Otherwise, just use all posts.
    const filteredPosts = filterFn ? posts.filter(filterFn) : posts;

    // inline comment: If no posts after filtering, show a friendly message.
    if (filteredPosts.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                No posts available.
            </Typography>
        );
    }

    // inline comment: Map over the posts and render a PostCard for each one.
    // Assuming PostCard expects `post` and possibly `comments` if you need them.
    return (
        <>
            {filteredPosts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    comments={post.comments || []} // Provide comments if your data includes them
                />
            ))}
        </>
    );
}
