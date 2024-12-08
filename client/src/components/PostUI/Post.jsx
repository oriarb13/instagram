import React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";
// Utility functions

//the expand button for comments
export default function PostCard({ post, comments = [] }) {
    return (
        <>
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
                <PostHeader post={post} />
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
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
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
        </>
    );
}
