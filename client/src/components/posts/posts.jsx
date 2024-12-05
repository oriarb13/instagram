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

const ExpandMore = styled(({ expand, ...other }) => <IconButton {...other} />)(
  ({ theme, expand }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  })
);

export default function PostCard() {
  const [posts, setPosts] = useState([]); // Always initialize as an array
  const [users, setUsers] = useState({});
  const [postComments, setPostComments] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);

  // Fetching posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts"); // Replace with your API endpoint
        setPosts(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Fetching user data for posts
  useEffect(() => {
    const fetchUsers = async (userIds) => {
      try {
        const response = await axios.get("/api/users", {
          params: { ids: userIds.join(",") }, // Assuming API supports getting users by ids
        });
        const usersData = response.data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const userIds = [...new Set(posts.map((post) => post.posterId))];
    if (userIds.length > 0) {
      fetchUsers(userIds);
    }
  }, [posts]);

  const fetchComments = async (postId) => {
    if (!postComments[postId]) {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments`);
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
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      fetchComments(postId);
    }
  };

  const stringAvatar = (name) => {
    if (!name) return { children: "?" };
    const nameParts = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${nameParts[0][0]}${nameParts[1]?.[0] || ""}`.toUpperCase(),
    };
  };

  const stringToColor = (string) => {
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
  };

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => {
          const poster = users[post.posterId]; // Get the user data for the post
          return (
            <Card key={post._id} sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={<Avatar {...stringAvatar(poster?.name || "Unknown User")} />}
                action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                title={poster?.name || "Unknown User"}
                subheader={new Date(post.createdAt).toLocaleDateString()}
              />
              {post.photo && (
                <CardMedia
                  component="img"
                  height="194"
                  image={post.photo}
                  alt={`${poster?.name || "Post"}'s image`}
                />
              )}
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {post.content || "Something probably mildly interesting"}
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
                  expand={expandedPost === post._id}
                  onClick={() => handleExpandClick(post._id)}
                  aria-expanded={expandedPost === post._id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedPost === post._id} timeout="auto" unmountOnExit>
                {postComments[post._id]?.map((comment) => (
                  <CardContent key={comment._id}>
                    <CardHeader
                      avatar={<Avatar {...stringAvatar(comment.posterId?.name || "Unknown User")} />}
                      subheader={new Date(comment.createdAt).toLocaleDateString()}
                    />
                    <Typography sx={{ marginBottom: 2 }}>
                      {comment.comcontent || "No content available"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <FavoriteIcon />: {comment.likes?.length || 0}
                    </Typography>
                  </CardContent>
                ))}
              </Collapse>
            </Card>
          );
        })
      ) : (
        <Typography variant="body2" color="text.secondary">
          No posts available.
        </Typography>
      )}
    </>
  );
}
