import React, { useEffect, useState } from 'react';
import {Button, Grid, Card, Avatar, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { useCheckIfUserValid } from '../../hooks/use-check-if-user-valid';
import { getUserByUsername } from '../../utils/userApi.js';
import { getPostsByUsername } from '../../utils/postsApi.js';
import FriendListModal from './friendlist.jsx';
import Modal from '@mui/material/Modal';
import PostCard from '../PostUI/Post.jsx';

const ProfileAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: 'auto',
  border: '4px solid pink',
});

const ProfilePage = () => {
  useCheckIfUserValid();

  const [clickedUser, setClickedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);

  const onlineUserFromRedux = useSelector(state => state.user); //redux

  useEffect(() => {
    const fetchClickedUser = async () => {
      try {
        setLoading(true);
        const data = await getUserByUsername(onlineUserFromRedux.username);
        if (data) {
          setClickedUser(data);
        } else {
          setError(data.error || 'Unable to load user data');
        }
      } catch (err) {
        setError(err.message || 'Error during fetch');
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
          const postsData = await getPostsByUsername(clickedUser.username);
          setPosts(postsData);
        } catch (err) {
          setError(err.message || 'Error fetching posts');
        }
      };
      fetchPosts();
    }
  }, [clickedUser]);

  // modal
  const handleOpenFriendsModal = () => setOpenFriendsModal(true);
  const handleCloseFriendsModal = () => setOpenFriendsModal(false);

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
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            <ProfileAvatar alt={clickedUser.username} src={clickedUser.img} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              {clickedUser.username}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              @{clickedUser.username}
            </Typography>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="h6">{posts.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6">{clickedUser.friends.length}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ":hover": { backgroundColor: "pink", borderColor: "pink", color: "green", cursor: "pointer" } }} onClick={handleOpenFriendsModal}>
                  Friends
                </Typography>
              </Box>

                <Button variant="outlined" sx={{ marginTop: 3, ":hover": { backgroundColor: "pink", borderColor: "pink", color: "green" } }} >
                  edit profile
                </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={6} sm={4} md={3} key={post._id}>
                <Paper sx={{ height: 200, backgroundColor: '#f0f0f0' }}>
                <PostCard post={post}></PostCard> 
              </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Modal open={openFriendsModal} onClose={handleCloseFriendsModal}>
        <Box sx={{ padding: 2, backgroundColor: 'black', margin: 'auto', marginTop: '50%', maxWidth: "200px" }}>
          <FriendListModal friends={clickedUser.friends} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
