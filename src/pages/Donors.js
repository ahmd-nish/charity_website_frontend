import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const donors = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', amount: '$100', date: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', amount: '$200', date: '2024-01-20' },
  { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', amount: '$150', date: '2024-01-25' },
];

const DonorsList = () => {
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
        }}
      >
        <Typography variant="h4" gutterBottom>
          Donors List
        </Typography>

        <Grid container spacing={3} direction="column">
          {donors.map((donor) => (
            <Grid item xs={12} key={donor.id}>
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: '#673ab7',
                      width: 56,
                      height: 56,
                      fontSize: '1.25rem',
                      marginRight: 2,
                    }}
                  >
                    {donor.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {donor.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {donor.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', color: '#ff5722' }}>
                      {donor.amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {donor.date}
                    </Typography>
                  </Box>
                </Box>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginRight: 2,
                      backgroundColor: '#673ab7',
                      '&:hover': {
                        backgroundColor: '#5e35b1',
                      },
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      backgroundColor: '#ff5722',
                      '&:hover': {
                        backgroundColor: '#e64a19',
                      },
                    }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DonorsList;
