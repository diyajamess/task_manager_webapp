import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Avatar, Grid, CircularProgress } from '@mui/material';

const ProfilePage = ({ user, onSaveChanges }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  // Handle file input change to update avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create an object URL for the image
      setAvatar(fileURL); // Update avatar with the file URL
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate saving changes (you can replace this with actual logic)
    setTimeout(() => {
      setLoading(false);
      onSaveChanges({ name, avatar });
    }, 1500);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Profile
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt={name} src={avatar} sx={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item>
          <Button variant="contained" component="label">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange} // Handle avatar change
            />
          </Button>
        </Grid>
      </Grid>

      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginTop: 2 }}
      />
      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;