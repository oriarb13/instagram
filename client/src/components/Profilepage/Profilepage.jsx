import React, { useEffect, useState } from 'react';
import { Grid, Card, Avatar, Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { useCheckIfUserValid } from '../../hooks/use-check-if-user-valid';
import { getUserByUsername } from '../../utils/userApi.js';
import { getPostsByUsername } from '../../utils/postsApi.js';
import { sendFriendRequest, removeFriend } from '../../utils/userApi.js';

const ProfileAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: 'auto',
  border: '4px solid pink',
});

const userName = "user1"; //להחליף לפרופס 
const ProfilePage = () => {
  useCheckIfUserValid();

  const [clickedUser, setClickedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reduxUser, setReduxUser] = useState({});
  const [isFriends, setIsFriends] = useState(false);

  const onlineUserFromRedux = useSelector(state => state.user); //redux

  useEffect(() => {
    const fetchClickedUser = async () => { //onpage user
      try {
        setLoading(true);
        const data = await getUserByUsername(userName);
        const data2 = await getUserByUsername(onlineUserFromRedux.username);
        console.log(data);
        console.log(data2);

        if (data && data2) {
          setClickedUser(data);
          setReduxUser(data2);
          console.log(data);
          console.log(data2);
        } else {
          setError(data.error || 'Unable to load user data');
        }
      } catch (err) {
        setError(err.message || 'Error during fetch');
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchClickedUser();
    }
  }, [userName, onlineUserFromRedux.username]); 

  //check if they are friends
  useEffect(() => {
    if (reduxUser && reduxUser.friends && clickedUser) {
      const isFriend = reduxUser.friends.some(friend => friend.username === clickedUser.username);
      setIsFriends(isFriend);
    }
  }, [reduxUser, clickedUser]);


  //posts list
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

  //add/remove
  const handleOnClick = async () => {
    try {
      if (isFriends) {
        //remove
        await removeFriend(clickedUser._id);
        setClickedUser(prevState => ({
          ...prevState,
          friends: prevState.friends.filter(friend => friend.username !== reduxUser.username),
        }));
        setReduxUser(prevState => ({
          ...prevState,
          friends: prevState.friends.filter(friend => friend.username !== clickedUser.username),
        }));
      } else {
        //add friend
        await sendFriendRequest(clickedUser._id);
        setClickedUser(prevState => ({
          ...prevState,
          friends: [...prevState.friends, { username: reduxUser.username, _id: reduxUser._id }],
        }));
        setReduxUser(prevState => ({
          ...prevState,
          friends: [...prevState.friends, { username: clickedUser.username, _id: clickedUser._id }],
        }));
      }
    } catch (err) {
      setError(err.message || 'Error during friend request');
    }
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
                <Typography variant="body2" color="text.secondary">
                  Friends
                </Typography>
              </Box>

              {onlineUserFromRedux.username === clickedUser.username ? (
                <div></div> // user own profile
              ) : (
                <Button variant="outlined" sx={{ marginTop: 3 }} onClick={handleOnClick}>
                  {isFriends ? 'Remove Friend' : 'Add Friend'}
                </Button>
              )}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {posts.map((post, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper sx={{ height: 200, backgroundColor: '#f0f0f0' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                    {post._id}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
