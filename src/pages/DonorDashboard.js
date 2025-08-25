import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Alert,
  CircularProgress,
  TextField,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { fetchRequests } from '../redux/requestsSlice';
import { donationsAPI } from '../services/apiService';
import Header from '../layouts/Header';
import Sidebar from '../components/Sidebar';

const categories = [
  'All Categories',
  'Medical Assistance',
  'Educational Support',
  'Food Supplies',
  'Housing Assistance',
  'Other',
];

const DonorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { requests, loading, error } = useSelector((state) => state.requests);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch only approved requests for donors
    dispatch(fetchRequests({ status: 'approved' }));
  }, [dispatch]);

  const handleViewDetails = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  const handleContactRequester = (request) => {
    setSelectedRequest(request);
    setContactDialogOpen(true);
  };

  const handleDonate = (requestId) => {
    navigate(`/donate/${requestId}`);
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || request.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginTop: '64px',
          marginLeft: { md: '240px' },
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome back, {user?.firstName}!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Find meaningful ways to help those in need
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e8f5e8' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {filteredRequests.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                  {requests.reduce((sum, req) => sum + (req.neededAmount || 0), 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Amount Needed (LKR)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  {new Set(requests.map(req => req.category)).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Categories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fce4ec' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#c2185b', fontWeight: 'bold' }}>
                  {requests.filter(req => req.urgent).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Urgent Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: '10px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                sx={{
                  height: 56,
                  borderRadius: '10px',
                  borderColor: '#673ab7',
                  color: '#673ab7',
                  '&:hover': {
                    borderColor: '#5e35b1',
                    backgroundColor: 'rgba(103, 58, 183, 0.04)',
                  },
                }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Requests Grid */}
        {filteredRequests.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '10px' }}>
            <Typography variant="h6" color="text.secondary">
              No requests found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search criteria
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredRequests.map((request) => (
              <Grid item xs={12} md={6} lg={4} key={request._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Chip
                        label={request.category}
                        color="primary"
                        size="small"
                        sx={{ backgroundColor: '#673ab7' }}
                      />
                      {request.urgent && (
                        <Chip
                          label="URGENT"
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {request.title || request.description?.substring(0, 60) + '...'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {request.description?.substring(0, 120)}
                      {request.description?.length > 120 && '...'}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1, 
                          bgcolor: '#673ab7',
                          fontSize: '0.875rem'
                        }}
                      >
                        {request.requester?.firstName?.[0]}{request.requester?.lastName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {request.requester?.firstName} {request.requester?.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.requester?.location || 'Location not specified'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Needed Amount:
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#673ab7', fontWeight: 'bold' }}>
                        LKR {request.neededAmount?.toLocaleString()}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Deadline:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {new Date(request.dateNeededBy).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleDonate(request._id)}
                          sx={{
                            backgroundColor: '#673ab7',
                            '&:hover': { backgroundColor: '#5e35b1' },
                            borderRadius: '8px',
                            mb: 1,
                          }}
                        >
                          Donate Now
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(request._id)}
                          sx={{ borderRadius: '8px' }}
                        >
                          View Details
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          startIcon={<PhoneIcon />}
                          onClick={() => handleContactRequester(request)}
                          sx={{ borderRadius: '8px' }}
                        >
                          Contact
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Contact Dialog */}
        <Dialog 
          open={contactDialogOpen} 
          onClose={() => setContactDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Contact Information</DialogTitle>
          <DialogContent>
            {selectedRequest && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedRequest.requester?.firstName} {selectedRequest.requester?.lastName}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>
                    {selectedRequest.telephone || selectedRequest.requester?.phoneNumber || 'Not provided'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>
                    {selectedRequest.requester?.email || 'Not provided'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                  <Typography>
                    {selectedRequest.requester?.address || 'Address not provided'}
                  </Typography>
                </Box>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  Please be respectful when contacting the requester. Your help can make a real difference in their life.
                </Alert>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DonorDashboard;
