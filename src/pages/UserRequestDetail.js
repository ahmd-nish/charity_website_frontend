import React from 'react';
import { Box, Typography, Grid, Button, IconButton, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import DownloadIcon from '@mui/icons-material/Download';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const request = {
  id: 1,
  name: 'John Doe',
  category: 'Medical Assistance',
  amount: 500, // Total needed amount
  description: 'Request for financial assistance for medical surgery.',
  date: '2024-01-15',
  amountCollected: 300, // Amount already collected
  status: 'Approved',
  donations: [
    { donorName: 'Jane Smith', amount: '$200', date: '2024-01-20' },
    { donorName: 'Alice Johnson', amount: '$100', date: '2024-01-22' },
  ],
  documents: [
    { name: 'ID Proof', url: '#' },
    { name: 'Request Letter', url: '#' },
    { name: 'Supporting Document 1', url: '#' },
    { name: 'Supporting Document 2', url: '#' },
  ],
};

const UserRequestDetail = () => {
  const handleViewContactDetails = (donorName) => {
    console.log(`View contact details of donor: ${donorName}`);
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
          My Request Details
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Donations Received
                </Typography>
                {request.donations.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table aria-label="donations table">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Donor Name</strong></TableCell>
                          <TableCell><strong>Amount</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {request.donations.map((donation, index) => (
                          <TableRow key={index}>
                            <TableCell>{donation.donorName}</TableCell>
                            <TableCell>{donation.amount}</TableCell>
                            <TableCell>{donation.date}</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                startIcon={<ContactMailIcon />}
                                sx={{
                                  backgroundColor: '#4caf50',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  padding: '6px 16px',
                                  borderRadius: '10px',
                                  '&:hover': {
                                    backgroundColor: '#388e3c',
                                  },
                                }}
                                onClick={() => handleViewContactDetails(donation.donorName)}
                              >
                                View Contact Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1">No donations received yet.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserRequestDetail;
