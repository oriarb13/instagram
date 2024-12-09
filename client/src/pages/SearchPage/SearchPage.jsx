import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/userApi";
import { getAllPosts } from "../../utils/postsApi";
import { Link } from "react-router-dom";
import { TextField, Select, MenuItem,Paper, FormControl, InputLabel, Box, Typography, Grid, useMediaQuery, Container, Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/avatarStyler";
import PostCard from "../../components/PostUI/Post";

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("users");


    //get users
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

        //get posts
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

    //input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = searchQuery
        ? users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const filteredPosts = searchQuery
        ? posts.filter(post =>
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

        //media query from mui
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Container maxWidth="md">
                        <Paper  elevation={3} sx={{bgcolor: 'grey', p: 4, borderRadius: 2 }}>

            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom align="center" color="silver">
                    Search Page
                </Typography>

{/* select */}
                <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Search Type</InputLabel>
                            <Select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                label="Search Type"
                            >
                                <MenuItem value="users">Search users</MenuItem>
                                <MenuItem value="posts">Search posts</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

{/* input */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>

{/* users */}
                {searchQuery && (
                    searchType === "users" ? (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Users
                            </Typography>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <Box key={user._id} sx={{ display: 'flex', alignItems: 'center', padding: 1, borderBottom: "1px solid #ddd" }}>
                                        <Avatar sx={{ marginRight: 2 }} {...(user.img ? { src: user.img } : stringAvatar(user.username))} />
                                        <Link to={`/userpage/${user.username}`} style={{ textDecoration: "none", color: "blue" }}>
                                            <Typography sx={{marginLeft:"15px"}} variant={isMobile ? "body2" : "body1"} >
                                                {user.username} 
                                            </Typography>
                                        </Link>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No users found</Typography>
                            )}
                        </Box>
                    ) : 
                    
// posts
                    (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Posts
                            </Typography>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    // post comp
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    comments={post.comments || []}
                                />
                                ))
                            ) : (
                                <Typography>No posts found</Typography>
                            )}
                        </Box>
                    )
                )}
            </Box>
            </Paper>
        </Container>
    );
};

export default SearchPage;
