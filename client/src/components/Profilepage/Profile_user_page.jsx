import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    Avatar,
    Typography,
    Button,
    Box,
    Paper,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../utils/userApi.js";
import { getPostsByUsername } from "../../utils/postsApi.js";
import { sendFriendRequest, removeFriend } from "../../utils/userApi.js";
import { useSelector } from "react-redux";
import FriendListModal from "./friendlist.jsx";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import PostCard from "../PostUI/Post.jsx";

const ProfileAvatar = styled(Avatar)({
    width: "120px",
    height: "120px",
    margin: "auto",
    border: "4px solid pink",
});

const ProfileUserPage = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [clickedUser, setClickedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [reduxUser, setReduxUser] = useState({});
    const [isFriends, setIsFriends] = useState(false);
    const [openFriendsModal, setOpenFriendsModal] = useState(false);

    const onlineUserFromRedux = useSelector((state) => state.user);

    if (username === onlineUserFromRedux.username) {
        navigate("/profile");
    }

    useEffect(() => {
        const fetchClickedUser = async () => {
            try {
                setLoading(true);
                const data = await getUserByUsername(username);
                const data2 = await getUserByUsername(
                    onlineUserFromRedux.username
                );
                if (data && data2) {
                    setClickedUser(data);
                    setReduxUser(data2);
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
                    const postsData = await getPostsByUsername(
                        clickedUser.username
                    );
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
                    friends: prevState.friends.filter(
                        (friend) => friend.username !== reduxUser.username
                    ),
                }));
                setReduxUser((prevState) => ({
                    ...prevState,
                    friends: prevState.friends.filter(
                        (friend) => friend.username !== clickedUser.username
                    ),
                }));
            } else {
                await sendFriendRequest(clickedUser._id);
                setClickedUser((prevState) => ({
                    ...prevState,
                    friends: [
                        ...prevState.friends,
                        { username: reduxUser.username, _id: reduxUser._id },
                    ],
                }));
                setReduxUser((prevState) => ({
                    ...prevState,
                    friends: [
                        ...prevState.friends,
                        {
                            username: clickedUser.username,
                            _id: clickedUser._id,
                        },
                    ],
                }));
            }
        } catch (err) {
            setError(err.message || "Error during friend request");
        }
    };

    const handleOpenFriendsModal = () => {
        setOpenFriendsModal(true);
    };

    const handleCloseFriendsModal = () => {
        setOpenFriendsModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{ marginTop: 50, padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: 2, textAlign: "center" }}>
                        <ProfileAvatar
                            alt={clickedUser.username}
                            src={clickedUser.img}
                        />
                        <Typography variant="h6" sx={{ marginTop: 1 }}>
                            {clickedUser.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            @{clickedUser.username}
                        </Typography>

                        <Box
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Box>
                                <Typography variant="h6">
                                    {posts.length}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Posts
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="h6">
                                    {clickedUser.friends.length}
                                </Typography>
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

                            {onlineUserFromRedux.username ===
                            clickedUser.username ? (
                                <div></div>
                            ) : (
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

                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <Grid item xs={6} sm={4} md={3} key={post._id}>
                                <Paper
                                    sx={{
                                        height: 200,
                                        backgroundColor: "#f0f0f0",
                                    }}
                                >
                                    <PostCard post={post}></PostCard>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Modal open={openFriendsModal} onClose={handleCloseFriendsModal}>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: "black",
                        margin: "auto",
                        marginTop: "50%",
                        maxWidth: "200px",
                    }}
                >
                    <FriendListModal friends={clickedUser.friends} />
                </Box>
            </Modal>
        </Box>
    );
};

export default ProfileUserPage;
