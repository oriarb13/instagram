import React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Utility functions

//initials for avatars
function stringAvatar(name) {
    if (!name) return { children: "?" };
    const nameParts = name.split(" ");
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${nameParts[0][0]}${nameParts[1]?.[0] || ""}`.toUpperCase(),
    };
}
//avatar color
function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

export default function PostHeader({ post }) {
    return (
        <CardHeader
            avatar={
                <Avatar
                    {...stringAvatar(post.posterId?.username || "Unknown User")}
                />
            }
            title={post.posterId?.username || "Title not found"}
            subheader={new Date(post.createdAt).toLocaleDateString()}
            <Box>
            
            </Box>
        />
    );
}
