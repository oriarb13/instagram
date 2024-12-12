import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/userApi";
import { getAllPosts } from "../../utils/postsApi";
import { Link } from "react-router-dom";
import {
    TextField,
    Select,
    MenuItem,
    Paper,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Grid,
    useMediaQuery,
    Container,
    Avatar,
} from "@mui/material";
import { stringAvatar } from "../../utils/avatarStyler";
import PostCard from "../../components/PostUI/Post";

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("users");

    // Get users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Get posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    // Input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = searchQuery
        ? users.filter((user) =>
              user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    const filteredPosts = searchQuery
        ? posts.filter((post) =>
              post.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // Media query from MUI
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Container maxWidth="md">
            <Paper
                elevation={6}
                sx={{
                    bgcolor: "#f9f9f9",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ padding: 3 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        sx={{ fontWeight: "bold", color: "#333" }}
                    >
                        Search Page
                    </Typography>

                    {/* Search Type and Input */}
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ marginBottom: 3 }}
                    >
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Search Type</InputLabel>
                                <Select
                                    value={searchType}
                                    onChange={(e) =>
                                        setSearchType(e.target.value)
                                    }
                                    label="Search Type"
                                    sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                >
                                    <MenuItem value="users">
                                        Search Users
                                    </MenuItem>
                                    <MenuItem value="posts">
                                        Search Posts
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                sx={{ bgcolor: "#fff", borderRadius: 2 }}
                            />
                        </Grid>
                    </Grid>

                    {/* Users or Posts Results */}
                    {searchQuery &&
                        (searchType === "users" ? (
                            <Box>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ color: "#555" }}
                                >
                                    Users
                                </Typography>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <Box
                                            key={user._id}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: 2,
                                                borderBottom: "1px solid #ddd",
                                                "&:hover": {
                                                    bgcolor: "#f0f0f0",
                                                },
                                            }}
                                        >
                                            <Avatar
                                                sx={{ marginRight: 2 }}
                                                {...(user.img
                                                    ? { src: user.img }
                                                    : stringAvatar(
                                                          user.username
                                                      ))}
                                            />
                                            <Link
                                                to={`/userpage/${user.username}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#007bff",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        marginLeft: "15px",
                                                        fontWeight: 500,
                                                    }}
                                                    variant={
                                                        isMobile
                                                            ? "body2"
                                                            : "body1"
                                                    }
                                                >
                                                    {user.username}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography sx={{ color: "#999" }}>
                                        No users found
                                    </Typography>
                                )}
                            </Box>
                        ) : (
                            <Box>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ color: "#555" }}
                                >
                                    Posts
                                </Typography>
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post) => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            comments={post.comments || []}
                                            sx={{
                                                boxShadow:
                                                    "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                                borderRadius: 2,
                                            }}
                                        />
                                    ))
                                ) : (
                                    <Typography sx={{ color: "#999" }}>
                                        No posts found
                                    </Typography>
                                )}
                            </Box>
                        ))}
                </Box>
            </Paper>
        </Container>
    );
};

export default SearchPage;
