import React, { useEffect, useState } from "react";
import {
    Button,
    Grid,
    Card,
    Avatar,
    Typography,
    Box,
    Paper,
    Modal,
    Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useCheckIfUserValid } from "../../hooks/use-check-if-user-valid";
import { getUserByUsername } from "../../utils/userApi.js";
import { getPostsByUsername } from "../../utils/postsApi.js";
import FriendListModal from "./friendlist.jsx";
import PostsList from "../PostUI/Posts.jsx";
import EditProfile from "./EditProfile.jsx";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: "120px",
    height: "120px",
    margin: "auto",
    border: "4px solid #4caf50",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    [theme.breakpoints.down("sm")]: {
        width: "100px",
        height: "100px",
    },
}));

const ProfilePage = () => {
    useCheckIfUserValid();

    const [clickedUser, setClickedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [openFriendsModal, setOpenFriendsModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const onlineUserFromRedux = useSelector((state) => state.user);

    useEffect(() => {
        const fetchClickedUser = async () => {
            try {
                setLoading(true);
                const data = await getUserByUsername(
                    onlineUserFromRedux.username
                );
                if (data) {
                    setClickedUser(data);
                } else {
                    setError(data.error || "Unable to load user data");
                }
            } catch (err) {
                setError(err.message || "Error during fetch");
            } finally {
                setLoading(false);
            }
        };

        if (onlineUserFromRedux.username) {
            fetchClickedUser();
        }
    }, [onlineUserFromRedux]);

    useEffect(() => {
        if (clickedUser) {
            const fetchPosts = async () => {
                try {
                    const postsData = await getPostsByUsername(
                        clickedUser.username
                    );
                    setPosts(postsData || []);
                } catch (err) {
                    setError(err.message || "Error fetching posts");
                }
            };
            fetchPosts();
        }
    }, [clickedUser]);

    // modal friends
    const handleOpenFriendsModal = () => setOpenFriendsModal(true);
    const handleCloseFriendsModal = () => setOpenFriendsModal(false);

    // modal edit
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6" color="primary">
                    Loading...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #f0f4c3, #b2dfdb)",
                marginTop: 2,
                paddingBottom: 4,
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={6}
                    sx={{
                        borderRadius: 3,
                        padding: 4,
                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                        background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <ProfileAvatar
                                alt={clickedUser.username}
                                src={clickedUser.img}
                            />
                            <Typography
                                variant="h5"
                                align="center"
                                sx={{ marginTop: 2, fontWeight: "bold" }}
                            >
                                {clickedUser.username}
                            </Typography>
                            <Typography
                                variant="body1"
                                align="center"
                                color="text.secondary"
                            >
                                @{clickedUser.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                color="text.secondary"
                                sx={{ marginTop: 1 }}
                            >
                                {clickedUser.bio || "This user has no bio yet."}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card
                                sx={{
                                    padding: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    boxShadow:
                                        "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Statistics
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="space-around"
                                >
                                    <Box>
                                        <Typography variant="h5" align="center">
                                            {posts.length}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            align="center"
                                            color="text.secondary"
                                        >
                                            Posts
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" align="center">
                                            {clickedUser.friends.length}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            align="center"
                                            color="text.secondary"
                                            sx={{
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                            }}
                                            onClick={handleOpenFriendsModal}
                                        >
                                            Friends
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenEditModal}
                                    sx={{
                                        alignSelf: "center",
                                        bgcolor: "#4caf50",
                                        "&:hover": { bgcolor: "#388e3c" },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Friends Modal */}
                    <Modal
                        open={openFriendsModal}
                        onClose={handleCloseFriendsModal}
                    >
                        <Box
                            sx={{
                                padding: 3,
                                backgroundColor: "#fff",
                                margin: "auto",
                                marginTop: "15%",
                                maxWidth: "400px",
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                borderRadius: 2,
                            }}
                        >
                            <FriendListModal
                                friends={clickedUser.friends || []}
                            />
                        </Box>
                    </Modal>

                    {/* Edit Profile Modal */}
                    <Modal open={openEditModal} onClose={handleCloseEditModal}>
                        <Box
                            sx={{
                                padding: 3,
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                maxWidth: "400px",
                                maxHeight: "80vh",
                                overflowY: "auto",
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                borderRadius: 2,
                            }}
                        >
                            <EditProfile currentUser={clickedUser} />
                        </Box>
                    </Modal>

                    <Box marginTop={4} display="flex" justifyContent="center">
                        <PostsList posts={posts} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
