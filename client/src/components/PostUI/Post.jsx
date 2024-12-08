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
            <Card key={post._id} sx={{ maxWidth: 345 }}>
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

                <PostFooter post={post} comments={post.comments} />
            </Card>
        </>
    );
}
