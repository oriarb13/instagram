import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";


export default function PostCard({ post, comments = [], onDeletePost }) {
    return (
        <Card
            key={post._id}
            sx={{
                maxWidth: 500,
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                marginBottom: 4,
            }}
        >
            {/* Pass onDeletePost to PostHeader */}
            <PostHeader post={post} onDeletePost={onDeletePost} />
            {post.photo && (
                <CardMedia
                    component="img"
                    height="194"
                    image={post.photo}
                    alt={
                        post.posterId?.name
                            ? `${post.posterId.name}'s post image`
                            : "Post image"
                    }
                />
            )}
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {post.content || "Post content Error"}
                </Typography>
            </CardContent>
            <PostFooter
                post={post}
                comments={post.comments}
                sx={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    padding: "8px 16px",
                }}
            />
        </Card>
    );
}



