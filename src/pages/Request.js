import React from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, IconButton } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import DownloadIcon from '@mui/icons-material/Download';

const request = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+123 456 7890',
  category: 'Medical Assistance',
  amount: '$500',
  description: 'Request for financial assistance for medical surgery.',
  status: 'Pending',
  documents: [
    { name: 'ID Proof', url: '#' },
    { name: 'Request Letter', url: '#' },
    { name: 'Supporting Document 1', url: '#' },
    { name: 'Supporting Document 2', url: '#' },
  ],
};

const RequestView = () => {
  const handleVerify = () => {
    console.log('Request verified');
  };

  const handleReject = () => {
    console.log('Request rejected');
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
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          marginTop: '64px', 
          marginLeft: { md: '240px' }, 
          backgroundColor: '#f4f5fa',
        }}
      >
        <Paper sx={{ width: '100%', maxWidth: 600, padding: 3, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
            Request Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={request.name}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={request.email}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={request.phone}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                value={request.category}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Needed Amount"
                value={request.amount}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={request.description}
                multiline
                rows={4}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Status"
                value={request.status}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Uploaded Documents
              </Typography>
              <Grid container spacing={1}>
                {request.documents.map((doc, index) => (
                  <Grid item xs={12} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ justifyContent: 'space-between', padding: '10px 15px', textTransform: 'none' }}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={
                        <IconButton href={doc.url} download>
                          <DownloadIcon />
                        </IconButton>
                      }
                    >
                      {doc.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ marginTop: 3, padding: '12px 0', fontWeight: 'bold', backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleVerify}
              >
                Verify Request
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ marginTop: 1, padding: '12px 0', fontWeight: 'bold', backgroundColor: '#f44336', color: '#fff' }}
                onClick={handleReject}
              >
                Reject Request
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
};

export default RequestView;
