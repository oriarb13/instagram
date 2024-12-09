import React from "react";

import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo.js";
import { stringAvatar } from "../../utils/avatarStyler.js";
import DeleteButton from "./DeleteButton.jsx";

export default function PostHeader({ post, onDeletePost }) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    src={post.posterId?.img || undefined}
                    alt={post.posterId?.username || "Unknown User"}
                    sx={{
                        cursor: "pointer",
                        ...(post.posterId?.img
                            ? {}
                            : stringAvatar(
                                  post.posterId?.username || "Unknown User"
                              ).sx),
                    }}
                    component={Link}
                    to={`/userPage/${post.posterId?.username}`}
                />
            }
            title={post.posterId?.username || "Title not found"}
            subheader={timeAgo(post.createdAt)}
            action={
                <DeleteButton
                    type="post"
                    id={post._id}
                    onDeleteSuccess={onDeletePost}
                />
            }
        />
    );
}
