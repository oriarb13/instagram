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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";
// Utility functions
import { stringAvatar } from "../../utils/avatarStyler.js";

const ExpandMore = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "expand",
})(({ theme, expand }) => ({
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

//the expand button for comments
export default function PostCard({ post, comments = [] }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
