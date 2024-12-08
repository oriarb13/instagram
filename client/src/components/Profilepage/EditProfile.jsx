import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { updateUser } from '../../utils/userApi'; 

export default function EditProfile({ currentUser }) {
  const [email, setEmail] = useState(currentUser.email || '');
  const [image, setImage] = useState(null); 
  const [bio, setBio] = useState(currentUser.bio || '');

  useEffect(() => {
    setEmail(currentUser.email || '');
    setBio(currentUser.bio || '');
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      newEmail: email || currentUser.email,
      newBio: bio || currentUser.bio,
    };

    if (image) {
      updatedUser.newImg = image;
    }

    try {
      const response = await updateUser(updatedUser);
      console.log('User updated:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }

    setEmail('');
    setBio('');
    setImage(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Profile</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: '100%' }}
                />
              </Grid>

              <Grid item>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
