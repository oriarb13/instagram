import React from "react";

import { CardHeader, Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/avatarStyler.js";
import { timeAgo } from "../../utils/timeAgo.js";
import DeleteButton from "../PostUI/DeleteButton.jsx";

import { Link } from "react-router-dom";

export default function CommentHeader({
    username,
    createdAt,
    img,
    commentId,
    onDeleteComment,
}) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    src={img || undefined}
                    alt={username || "Unknown User"}
                    sx={{
                        cursor: "pointer",
                        ...(img
                            ? {}
                            : stringAvatar(username || "Unknown User").sx),
                    }}
                    component={Link}
                    to={`/userPage/${username}`}
                />
            }
            title={username || "Username not found"}
            subheader={timeAgo(createdAt)}
            action={
                <DeleteButton
                    type="comment"
                    id={commentId}
                    onDeleteSuccess={onDeleteComment}
                />
            }
        />
    );
}
