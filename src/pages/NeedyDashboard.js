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
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { fetchUserRequests, deleteRequest } from '../redux/requestsSlice';
import Header from '../layouts/Header';
import Sidebar from '../components/Sidebar';

const NeedyDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userRequests, loading, error } = useSelector((state) => state.requests);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUserRequests());
  }, [dispatch]);

  const handleCreateRequest = () => {
    navigate('/requests');
  };

  const handleViewRequest = (requestId) => {
    navigate(`/user-request/${requestId}`);
  };

  const handleEditRequest = (requestId) => {
    navigate(`/requests/edit/${requestId}`);
  };

  const handleDeleteClick = (request) => {
    setRequestToDelete(request);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (requestToDelete) {
      try {
        await dispatch(deleteRequest(requestToDelete._id)).unwrap();
        setDeleteDialogOpen(false);
        setRequestToDelete(null);
      } catch (error) {
        console.error('Failed to delete request:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRequestToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
    };

    userRequests.forEach((request) => {
      counts[request.status] = (counts[request.status] || 0) + 1;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

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
            Manage your help requests and track their progress
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff3e0' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  {statusCounts.pending}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e8f5e8' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {statusCounts.approved}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#ffebee' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
                  {statusCounts.rejected}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                  {statusCounts.completed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Create New Request Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateRequest}
            sx={{
              backgroundColor: '#673ab7',
              '&:hover': { backgroundColor: '#5e35b1' },
              borderRadius: '10px',
              px: 3,
            }}
          >
            Create New Request
          </Button>
        </Box>

        {/* Requests Table */}
        <Paper sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              My Requests
            </Typography>
          </Box>

          {userRequests.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No requests found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Create your first request to get started
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date Created</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userRequests.map((request) => (
                    <TableRow key={request._id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {request.title || request.description?.substring(0, 50) + '...'}
                        </Typography>
                      </TableCell>
                      <TableCell>{request.category}</TableCell>
                      <TableCell>LKR {request.neededAmount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status?.toUpperCase()}
                          color={getStatusColor(request.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ViewIcon />}
                            onClick={() => handleViewRequest(request._id)}
                          >
                            View
                          </Button>
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => handleEditRequest(request._id)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteClick(request)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Request</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this request? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default NeedyDashboard;
