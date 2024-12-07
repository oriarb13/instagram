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
                <CardHeader
                    avatar={
                        <Avatar
                            {...stringAvatar(
                                post.posterId?.username || "Unknown User"
                            )}
                        />
                    }
                    title={post.posterId?.username || "Title not found"}
                    subheader={new Date(post.createdAt).toLocaleDateString()}
                />
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
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {comments && comments.length > 0 ? (
                        comments.map((comment) => (
                            <CardContent key={comment._id}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            {...stringAvatar(
                                                comment.userId?.username ||
                                                    "Unknown User"
                                            )}
                                        />
                                    }
                                    subheader={new Date(
                                        comment.createdAt
                                    ).toLocaleDateString()}
                                />
                                <Typography sx={{ marginBottom: 2 }}>
                                    {comment.comContent ||
                                        "No content available"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    <FavoriteIcon />:{" "}
                                    {comment.likedBy?.length || 0}
                                </Typography>
                            </CardContent>
                        ))
                    ) : (
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                No comments available.
                            </Typography>
                        </CardContent>
                    )}
                </Collapse>
            </Card>
        </>
    );
}
