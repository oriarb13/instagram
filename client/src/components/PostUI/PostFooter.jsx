import React from "react";

import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material/";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CommentHeader from "../CommentsUI/CommentHeader.jsx";
import AddComment from "../CommentsUI/AddComment.jsx";
import LikeButton from "./LikeButton.jsx";

const ExpandMore = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "expand",
})(({ theme, expand }) => ({
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostFooter({ post, comments = [] }) {
    const [likedBy, setLikedBy] = React.useState(post.likedBy || []);
    const [expanded, setExpanded] = React.useState(false);
    const [localComments, setLocalComments] = React.useState(comments);

    const handleLikesUpdate = (updatedLikes) => {
        setLikedBy(updatedLikes);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <CardActions disableSpacing>
                <LikeButton
                    postId={post._id}
                    initialLikedBy={likedBy}
                    onUpdate={handleLikesUpdate}
                />
                {post.likedBy?.length || 0}
                <CommentIcon sx={{ marginLeft: "3px" }} />
                {localComments.length || 0}
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
                <AddComment
                    postId={post._id}
                    onCommentAdded={(newComment) =>
                        setLocalComments((prev) => [...prev, newComment])
                    }
                />
                {localComments && localComments.length > 0 ? (
                    localComments.map((comment) => (
                        <CardContent key={comment._id}>
                            <CommentHeader
                                username={comment.userId?.username}
                                createdAt={comment.createdAt}
                            />
                            <Typography sx={{ marginBottom: 2 }}>
                                {comment.comContent || "No content available"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FavoriteIcon /> {comment.likedBy?.length || 0}
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
        </Box>
    );
}
