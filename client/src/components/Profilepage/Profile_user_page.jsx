import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    Avatar,
    Typography,
    Button,
    Box,
    Modal,
    useMediaQuery,
    Container,
    Paper
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../utils/userApi.js";
import { getPostsByUsername } from "../../utils/postsApi.js";
import { sendFriendRequest, removeFriend } from "../../utils/userApi.js";
import { useSelector } from "react-redux";
import FriendListModal from "./friendlist.jsx";
import { styled } from "@mui/system";
import PostsList from "../PostUI/Posts.jsx";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: "120px",
    height: "120px",
    margin: "auto",
    border: "4px solid pink",
    [theme.breakpoints.down("sm")]: {
        width: "100px",
        height: "100px",
    },
}));

const ProfileUserPage = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [clickedUser, setClickedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [reduxUser, setReduxUser] = useState({ friends: [] });
    const [isFriends, setIsFriends] = useState(false);
    const [openFriendsModal, setOpenFriendsModal] = useState(false);

    const onlineUserFromRedux = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width:600px)");

    if (username === onlineUserFromRedux.username) {
        navigate("/profile");
    }

    useEffect(() => {
        const fetchClickedUser = async () => {
            try {
                setLoading(true);
                const data = await getUserByUsername(username);
                const data2 = await getUserByUsername(onlineUserFromRedux.username);
                if (data && data2) {
                    setClickedUser(data);
                    setReduxUser({ friends: data2.friends || [] });
                } else {
                    setError("Unable to load user data");
                }
            } catch (err) {
                setError(err.message || "Error during fetch");
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchClickedUser();
        }
    }, [username, onlineUserFromRedux.username]);

    useEffect(() => {
        if (reduxUser && reduxUser.friends && clickedUser) {
            const isFriend = reduxUser.friends.some(
                (friend) => friend.username === clickedUser.username
            );
            setIsFriends(isFriend);
        }
    }, [reduxUser, clickedUser]);

    useEffect(() => {
        if (clickedUser) {
            const fetchPosts = async () => {
                try {
                    const postsData = await getPostsByUsername(clickedUser.username);
                    setPosts(postsData);
                } catch (err) {
                    setError(err.message || "Error fetching posts");
                }
            };
            fetchPosts();
        }
    }, [clickedUser]);

    const handleOnClick = async () => {
        try {
            if (isFriends) {
                await removeFriend(clickedUser._id);
                setClickedUser((prevState) => ({
                    ...prevState,
                    friends: Array.isArray(prevState.friends)
                        ? prevState.friends.filter((friend) => friend.username !== reduxUser.username)
                        : [], 
                }));
                setReduxUser((prevState) => ({
                    ...prevState,
                    friends: Array.isArray(prevState.friends)
                        ? prevState.friends.filter((friend) => friend.username !== clickedUser.username)
                        : [], 
                }));
            } else {
                await sendFriendRequest(clickedUser._id);
                setClickedUser((prevState) => ({
                    ...prevState,
                    friends: Array.isArray(prevState.friends)
                        ? [...prevState.friends, { username: reduxUser.username, _id: reduxUser._id }]
                        : [{ username: reduxUser.username, _id: reduxUser._id }],
                }));
                setReduxUser((prevState) => ({
                    ...prevState,
                    friends: Array.isArray(prevState.friends)
                        ? [...prevState.friends, { username: clickedUser.username, _id: clickedUser._id }]
                        : [{ username: clickedUser.username, _id: clickedUser._id }], 
                }));
            }
        } catch (err) {
            setError(err.message || "Error during friend request");
        }
    };

    const handleOpenFriendsModal = () => setOpenFriendsModal(true);
    const handleCloseFriendsModal = () => setOpenFriendsModal(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        
        <Box sx={{ marginTop: 1, }}>

<Container
            maxWidth="lg"
            sx={{
                mt: 4,
                borderRadius: 2,
                p: 4,
            }}
        >
            <Paper elevation={3} sx={{bgcolor:"grey", p: 12, borderRadius: 2 }}>

            <Grid container spacing={12} sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={12} md={12}>
                    <Card sx={{bgcolor:"silver", padding: 6, paddingInline: "2", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <ProfileAvatar alt={clickedUser.username} src={clickedUser.img} />
                        <Typography variant="h4" sx={{ marginTop: 2 }}>
                            {clickedUser.username}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
                            @{clickedUser.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                            bio: {clickedUser.bio || 'hey'}
                        </Typography>

                        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-around", gap: 8 }}>
                            <Box>
                                <Typography variant="h5">{posts.length}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Posts
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5">{clickedUser.friends.length}</Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        ":hover": {
                                            backgroundColor: "pink",
                                            borderColor: "pink",
                                            color: "green",
                                            cursor: "pointer",
                                        },
                                    }}
                                    onClick={handleOpenFriendsModal}
                                >
                                    Friends
                                </Typography>
                            </Box>
                            {onlineUserFromRedux.username !== clickedUser.username && (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        marginTop: 3,
                                        ":hover": {
                                            backgroundColor: "pink",
                                            borderColor: "pink",
                                            color: "green",
                                        },
                                    }}
                                    onClick={handleOnClick}
                                >
                                    {isFriends ? "Remove Friend" : "Add Friend"}
                                </Button>
                            )}
                        </Box>
                    </Card>
                </Grid>

                <Box marginLeft={8} display="flex" justifyContent="center">
                    <PostsList posts={posts} />
                </Box>
            </Grid>

            <Modal open={openFriendsModal} onClose={handleCloseFriendsModal}>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: "black",
                        margin: "auto",
                        marginTop: "20%",
                        maxWidth: "300px",
                    }}
                >
                    <FriendListModal friends={clickedUser.friends} />
                </Box>
            </Modal>

            </Paper>
            </Container>
        </Box>
    );
};

export default ProfileUserPage;
