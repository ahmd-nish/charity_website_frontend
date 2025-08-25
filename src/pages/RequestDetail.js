import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, IconButton, Card, CardContent } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import DownloadIcon from '@mui/icons-material/Download';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CancelIcon from '@mui/icons-material/Cancel';

const request = {
  id: 1,
  name: 'John Doe',
  category: 'Medical Assistance',
  amount: 500, // Total needed amount
  description: 'Request for financial assistance for medical surgery.',
  date: '2024-01-15',
  amountCollected: 300, // Amount already collected
  status: 'Approved',
  documents: [
    { name: 'ID Proof', url: '#' },
    { name: 'Request Letter', url: '#' },
    { name: 'Supporting Document 1', url: '#' },
    { name: 'Supporting Document 2', url: '#' },
  ],
};

const RequestDetail = () => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = () => {
    const donation = parseFloat(donationAmount);
    if (isNaN(donation) || donation <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    console.log(`Donated: $${donation} to request ID: ${request.id}`);
    // Logic to process the donation can be added here
  };

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
          marginTop: '64px',
          marginLeft: { md: '240px' },
          backgroundColor: '#f4f5fa',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Request Details
        </Typography>
        <Card sx={{ borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Request Information
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Name:</strong> {request.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Category:</strong> {request.category}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Needed Amount:</strong> ${request.amount}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Amount Collected:</strong> ${request.amountCollected}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Description:</strong> {request.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {request.status}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Uploaded Documents
                </Typography>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                  {request.documents.map((doc, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {doc.name}
                        </Typography>
                        <IconButton href={doc.url} download sx={{ color: '#673ab7' }}>
                          <DownloadIcon />
                        </IconButton>
                      </Box>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <TextField
                  label="Donation Amount"
                  type="number"
                  fullWidth
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<MonetizationOnIcon />}
                    sx={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                      mr: 2,
                    }}
                    onClick={handleDonate}
                  >
                    Donate
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    sx={{
                      borderColor: '#f44336',
                      color: '#f44336',
                      fontWeight: 'bold',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      '&:hover': {
                        borderColor: '#d32f2f',
                        color: '#d32f2f',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
};

export default RequestDetail;
