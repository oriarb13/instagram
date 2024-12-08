import React from "react";

import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo.js";
import { stringAvatar } from "../../utils/avatarStyler.js";

export default function PostHeader({ post }) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    {...stringAvatar(post.posterId?.username || "Unknown User")}
                    sx={{
                        cursor: "pointer",
                        ...stringAvatar(post.posterId?.username).sx,
                    }}
                    component={Link}
                    to={`/userPage/${post.posterId?.username}`}
                />
            }
            title={post.posterId?.username || "Title not found"}
            subheader={timeAgo(post.createdAt)}
        />
    );
}
