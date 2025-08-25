import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Input = styled('input')({
  display: 'none',
});

const categories = [
  'Medical Assistance',
  'Educational Support',
  'Food Supplies',
  'Housing Assistance',
  'Other',
];

const RequestHelp = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    category: '',
    neededAmount: '',
    description: '',
    telephone: '',
    dateNeededBy: '',
    requestLetter: null,
    supportingDocument1: null,
    supportingDocument2: null,
  });

  const [uploadMessage, setUploadMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormValues({ ...formValues, [name]: e.target.files[0] });
    setUploadMessage('Files uploaded successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to an API
    console.log(formValues);
  };

  return (
    <>
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
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: { xs: '100%', md: '75%' },
              maxWidth: '600px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#3b3b3b', mb: 3 }}
              align="center"
            >
              Create a Request
            </Typography>

            {uploadMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {uploadMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="ID"
                    name="id"
                    value={formValues.id}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Cause Category"
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Needed Amount"
                    name="neededAmount"
                    type="number"
                    value={formValues.neededAmount}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Telephone Number"
                    name="telephone"
                    value={formValues.telephone}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Date Needed By"
                    name="dateNeededBy"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formValues.dateNeededBy}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formValues.description}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="requestLetter">
                    <Input
                      accept="application/pdf"
                      id="requestLetter"
                      type="file"
                      name="requestLetter"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: '#673ab7',
                        '&:hover': {
                          backgroundColor: '#5e35b1',
                        },
                      }}
                    >
                      Upload Request Letter
                    </Button>
                    {formValues.requestLetter && (
                      <Typography sx={{ mt: 1, textAlign: 'center', color: '#555' }}>
                        {formValues.requestLetter.name}
                      </Typography>
                    )}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="supportingDocument1">
                    <Input
                      accept="application/pdf"
                      id="supportingDocument1"
                      type="file"
                      name="supportingDocument1"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: '#673ab7',
                        '&:hover': {
                          backgroundColor: '#5e35b1',
                        },
                      }}
                    >
                      Upload Supporting Document 1
                    </Button>
                    {formValues.supportingDocument1 && (
                      <Typography sx={{ mt: 1, textAlign: 'center', color: '#555' }}>
                        {formValues.supportingDocument1.name}
                      </Typography>
                    )}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="supportingDocument2">
                    <Input
                      accept="application/pdf"
                      id="supportingDocument2"
                      type="file"
                      name="supportingDocument2"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: '#673ab7',
                        '&:hover': {
                          backgroundColor: '#5e35b1',
                        },
                      }}
                    >
                      Upload Supporting Document 2
                    </Button>
                    {formValues.supportingDocument2 && (
                      <Typography sx={{ mt: 1, textAlign: 'center', color: '#555' }}>
                        {formValues.supportingDocument2.name}
                      </Typography>
                    )}
                  </label>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: '#673ab7',
                    '&:hover': {
                      backgroundColor: '#5e35b1',
                    },
                    padding: '12px 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Submit Request
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default RequestHelp;
