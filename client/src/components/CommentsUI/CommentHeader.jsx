import React from "react";

import { CardHeader, Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/avatarStyler.js";
import { timeAgo } from "../../utils/timeAgo.js";

import { Link } from "react-router-dom";

export default function CommentHeader({ username, createdAt }) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    {...stringAvatar(username || "Unknown User")}
                    sx={{
                        cursor: "pointer",
                        ...stringAvatar(username).sx,
                    }}
                    component={Link}
                    to={`/user/${username}`}
                />
            }
            title={username || "Username not found"}
            subheader={timeAgo(createdAt)}
        />
    );
}
