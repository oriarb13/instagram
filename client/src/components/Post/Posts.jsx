import React, { useEffect, useState } from "react";
import axios from "axios";

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
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

//the expand button for comments
const ExpandMore = styled(({ expand, ...other }) => <IconButton {...other} />)(
    ({ theme, expand }) => ({
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        transform: expand ? "rotate(180deg)" : "rotate(0deg)", // Use expand to control rotation
    })
);

//the actual post card
export default function PostCard() {
    //fetching posts
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/posts"); // Replace with your API endpoint
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // fetching comments
    const [postComments, setPostComments] = useState({}); // Map to hold comments by postId
    const [expandedPost, setExpandedPost] = useState(null); // Track the currently expanded post

    const fetchComments = async (postId) => {
        if (!postComments[postId]) {
            try {
                const response = await axios.get(
                    `/api/posts/${postId}/comments`
                );
                setPostComments((prev) => ({
                    ...prev,
                    [postId]: response.data,
                }));
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
    };

    const handleExpandClick = (postId) => {
        if (expandedPost === postId) {
            setExpandedPost(null); // Collapse
        } else {
            setExpandedPost(postId); // Expand
            fetchComments(postId); // Fetch comments for the specific post
        }
    };

    return (
        <>
            {posts.map((post) => (
                <Card key={post._id} sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                {...stringAvatar(
                                    posts.posterId?.name || "Unknown User"
                                )}
                            />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={posts.posterId?.name || "No Title Needed"}
                        subheader={new Date(
                            posts.createdAt
                        ).toLocaleDateString()}
                    />
                    {posts.photo && (
                        <CardMedia
                            component="img"
                            height="194"
                            image={posts.photo}
                            alt={
                                posts.posterId?.name
                                    ? `${posts.posterId.name}'s post image`
                                    : "Post image"
                            }
                        />
                    )}

                    <CardContent>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            {posts.content ||
                                "Somthing probably mildly interesting"}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expandedPost === post._id} // Pass the expand state dynamically
                            onClick={() => handleExpandClick(post._id)} // Handle expand toggle
                            aria-expanded={expandedPost === post._id} // Accessibility
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse
                        in={expandedPost === post._id}
                        timeout="auto"
                        unmountOnExit
                    >
                        {postComments[post._id]?.map((comment) => (
                            <CardContent key={comment._id}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            {...stringAvatar(
                                                comment.posterId?.name ||
                                                    "Unknown User"
                                            )}
                                        />
                                    }
                                    subheader={new Date(
                                        comment.createdAt
                                    ).toLocaleDateString()}
                                />
                                <Typography sx={{ marginBottom: 2 }}>
                                    {comment.comcontent ||
                                        "No content available"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    <FavoriteIcon />:{" "}
                                    {comment.likes?.length || 0}
                                </Typography>
                            </CardContent>
                        ))}
                    </Collapse>
                </Card>
            ))}
        </>
    );
}
