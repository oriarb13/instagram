import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import ProfilePage from './Profilepage.jsx';

export default function FriendListModal({friends}) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'black' }}>
            <Typography  color='white' variant="h6" sx={{textAlign:'center', marginTop: 1 }}>
                friend list
            </Typography>
            {friends.map((friend)=>(
            <Link to={`/userPage/${friend.username.toLowerCase()}`} key={friend._id}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    {/*  inage */}
                        <Avatar alt={friend.username} src={friend.image} /> 
                    </ListItemAvatar>
                    {/* name */}
                    <ListItemText primary={friend.username}/>
                </ListItem>
            </Link>
        ))}
    </List>
  );
}