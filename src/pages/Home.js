import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Charity Platform
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 4, color: 'text.secondary' }}>
          Connecting hearts, changing lives
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            size="large" 
            href="/register"
            sx={{ 
              px: 4, 
              py: 1.5,
              backgroundColor: '#673ab7',
              '&:hover': { backgroundColor: '#5e35b1' }
            }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            href="/login"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderColor: '#673ab7',
              color: '#673ab7',
              '&:hover': { borderColor: '#5e35b1', color: '#5e35b1' }
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
