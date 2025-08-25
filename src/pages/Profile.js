import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Button, Divider } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const donor = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+123 456 7890',
  address: '123 Charity St, Help City, CA',
  profilePicture: 'https://via.placeholder.com/150', // Example placeholder image
  bio: 'A passionate donor committed to making a difference in the lives of those in need.',
  donations: [
    { amount: '$500', date: '2024-01-15', campaign: 'Education for All' },
    { amount: '$300', date: '2023-12-10', campaign: 'Health and Wellness' },
    { amount: '$200', date: '2023-11-05', campaign: 'Feeding the Hungry' },
  ],
  interests: ['Education', 'Health', 'Community Development'],
};

const UserProfile = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: 3,
          marginTop: '64px', // Adjust to leave space for the TopBar
          marginLeft: { md: '240px' }, // Adjust to leave space for the Sidebar
          backgroundColor: '#f4f5fa',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Donor Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 3,
                textAlign: 'center',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Avatar
                alt={donor.name}
                src={donor.profilePicture}
                sx={{ width: 150, height: 150, margin: 'auto', marginBottom: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {donor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Passionate Donor
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, backgroundColor: '#3b82f6' }}
              >
                Contact
              </Button>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                INTERESTS
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {donor.interests.join(', ')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                padding: 3,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                About Me
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {donor.bio}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Donation History
              </Typography>
              {donor.donations.map((donation, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {donation.campaign}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {donation.amount} &nbsp;|&nbsp; {donation.date}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                </Box>
              ))}
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: '#ff5722',
                  '&:hover': {
                    backgroundColor: '#e64a19',
                  },
                  marginTop: 2,
                }}
              >
                Make a New Donation
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserProfile;
