import React, { useState, useEffect } from "react";
import {
    Box,
    CardActions,
    Collapse,
    CardContent,
    Typography,
} from "@mui/material/";
import { getCommentsByPostId } from "../../utils/commentsApi";
import CommentHeader from "../CommentsUI/CommentHeader.jsx";
import AddComment from "../CommentsUI/AddComment.jsx";
import LikeButton from "./LikeButton.jsx";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";


export default function PostFooter({ post, comments = [] }) {
    const [likedBy, setLikedBy] = useState(post.likedBy || []);
    const [expanded, setExpanded] = useState(false);
    const [localComments, setLocalComments] = useState(comments);


    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsByPostId(post._id);


            if (data.success) {
                console.log("Fetched comments:", data.comments);
                setLocalComments(data.comments);
            } else {
                console.error("Failed to load comments:", data?.error);
            }
        };


        if (comments.length === 0) {
            fetchComments();
        } else {
            setLocalComments(comments);
        }
    }, [post._id]);


    const handleLikesUpdate = (updatedLikes) => {
        setLikedBy(updatedLikes);
    };
    const handleDeleteComment = (commentId) => {
        setLocalComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId)
        );
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
                    currentUserId={post.currentUserId}
                    onUpdate={handleLikesUpdate}
                />
                {likedBy.length || 0}
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
                    onCommentAdded={(newComment) => {
                        const enrichedComment = {
                            ...newComment,
                            userId: {
                                username: post.posterId?.username, // Add username
                                img: post.posterId?.img, // Add profile image
                            },
                        };
                        setLocalComments((prev) => [...prev, enrichedComment]);
                    }}
                />


                {localComments && localComments.length > 0 ? (
                    localComments.map((comment) => (
                        <CardContent key={comment._id}>
                            <CommentHeader
                                username={comment.userId?.username}
                                createdAt={comment.createdAt}
                                img={comment.userId?.img}
                                commentId={comment._id}
                                onDeleteComment={handleDeleteComment}
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



