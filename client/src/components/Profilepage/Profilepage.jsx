import React, { useEffect, useState } from 'react';
import { Grid, Card, Avatar, Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { useCheckIfUserValid } from '../../hooks/use-check-if-user-valid';
import { getUserByUsername } from '../../utils/userApi.js';
import { getPostsByUsername } from '../../../../server/controllers/postController.js';

const ProfileAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: 'auto',
  border: '4px solid pink',
});

const ProfilePage = () => {
  useCheckIfUserValid(); // token
  const [onlineUser, setOnlineUser] = useState(null); // state for the online user
  const [posts, setPosts] = useState([]); // רשימת הפוסטים של המשתמש השני


  const [loading, setLoading] = useState(true); // state for loading state
  const [error, setError] = useState(null); // state for error handling

  const onlineUserFromRedux = useSelector(state => state.user); // redux user data
console.log(onlineUserFromRedux.username);

  const Username ="aharon" ;

  // Fetch online user data on component mount
  useEffect(() => {
    const fetchOnlineUser = async () => {
      try {
        setLoading(true);
        const data = await getUserByUsername(Username); // pass username from redux
        console.log(data);
        
        if (data) {
          setOnlineUser(data); // Set the online user data
        } else {
          setError(data.error || 'Failed to load user data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (Username) {
      fetchOnlineUser();
    }
  }, [Username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{marginTop: 50, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            {/* profile page */}
            <ProfileAvatar alt={onlineUser.username} src={onlineUser.img} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              {onlineUser.username}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              @{onlineUser.username}
            </Typography>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                {/* posts number */}
                <Typography variant="h6">{11}</Typography>    //from posts call
                <Typography variant="body2" color="text.secondary">
                  Posts
                </Typography>
              </Box>

              <Box>
                {/* friends number */}
                <Typography variant="h6">{onlineUser.friends.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  friends
                </Typography>
              </Box>

              {/* add/remove friend */}
              {onlineUserFromRedux.username === onlineUser.username ? (
                <div></div> // if it's your own page don't show
              ) : (
                <Button variant="outlined" sx={{ marginTop: 3 }}>
                  {
                    onlineUser.friends.includes(user.username) ? 'Remove Friend' : 'Add Friend'
                  }
                </Button>
              )}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* תוכל להוסיף כאן גלריית פוסטים או תמונות */}
          <Grid container spacing={2}>
            {posts.map((post, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper sx={{ height: 200, backgroundColor: '#f0f0f0' }}>
                  {/* פה תוכל להציג את התמונה או הפוסט */}
                  <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                    {post}
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
