import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Card,
  Avatar,
  Typography,
  Box,
  Paper,
  Modal,
  Container
} from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { useCheckIfUserValid } from '../../hooks/use-check-if-user-valid';
import { getUserByUsername } from '../../utils/userApi.js';
import { getPostsByUsername } from '../../utils/postsApi.js';
import FriendListModal from './friendlist.jsx';
import PostsList from '../PostUI/Posts.jsx';
import EditProfile from './EditProfile.jsx';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: 'auto',
  border: '4px solid pink',
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '100px',
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

  const onlineUserFromRedux = useSelector(state => state.user);

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
          setPosts(postsData || []);
        } catch (err) {
          setError(err.message || 'Error fetching posts');
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <Box sx={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', marginTop: 1 }}>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Paper elevation={3} sx={{ bgcolor: 'grey', p: 12, borderRadius: 2 }}>
          <Grid container spacing={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ padding: 6, paddingInline: '2', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' ,bgcolor:"silver"}}>
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

                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-around', gap: 8 }}>
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
                        ':hover': {
                          backgroundColor: 'pink',
                          borderColor: 'pink',
                          color: 'green',
                          cursor: 'pointer',
                        },
                      }}
                      onClick={handleOpenFriendsModal}
                    >
                      Friends
                    </Typography>
                  </Box>

                  <Button
                    onClick={handleOpenEditModal}
                    variant="outlined"
                    sx={{
                      marginTop: 3,
                      ':hover': { backgroundColor: 'pink', borderColor: 'pink', color: 'green', cursor: 'pointer' },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Box marginLeft={8} display="flex" justifyContent="center">
                    <PostsList posts={posts} />
                </Box>
          </Grid>

          {/* Friends Modal */}
          <Modal open={openFriendsModal} onClose={handleCloseFriendsModal}>
            <Box sx={{ padding: 2, backgroundColor: 'black', margin: 'auto', marginTop: '20%', maxWidth: '300px' }}>
              <FriendListModal friends={clickedUser.friends || []} />
            </Box>
          </Modal>

          {/* Edit Profile Modal */}
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
            <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '20%', maxWidth: '200px' }}>
              <EditProfile currentUser={clickedUser} />
            </Box>
          </Modal>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
