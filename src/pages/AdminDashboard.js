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
  TextField,
  MenuItem,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { fetchRequests, reviewRequest } from '../redux/requestsSlice';
import { adminAPI } from '../services/apiService';
import Header from '../layouts/Header';
import Sidebar from '../components/Sidebar';

const statusOptions = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'all', label: 'All Requests' },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { requests, loading, error } = useSelector((state) => state.requests);
  
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reviewAction, setReviewAction] = useState('');
  const [reviewComments, setReviewComments] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [dashboardStats, setDashboardStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    totalUsers: 0,
    totalDonors: 0,
    totalNeedy: 0,
  });

  useEffect(() => {
    const params = filterStatus === 'all' ? {} : { status: filterStatus };
    dispatch(fetchRequests(params));
    loadDashboardStats();
  }, [dispatch, filterStatus]);

  const loadDashboardStats = async () => {
    try {
      const stats = await adminAPI.getDashboardStats();
      setDashboardStats(stats);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  const handleViewRequest = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  const handleReviewClick = (request, action) => {
    setSelectedRequest(request);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedRequest || !reviewAction) return;

    try {
      const reviewData = {
        status: reviewAction,
        adminComments: reviewComments,
        reviewedBy: user._id,
        reviewedAt: new Date().toISOString(),
      };

      await dispatch(reviewRequest({ 
        id: selectedRequest._id, 
        reviewData 
      })).unwrap();

      setReviewDialogOpen(false);
      setSelectedRequest(null);
      setReviewAction('');
      setReviewComments('');
      
      // Refresh data
      const params = filterStatus === 'all' ? {} : { status: filterStatus };
      dispatch(fetchRequests(params));
      loadDashboardStats();
    } catch (error) {
      console.error('Failed to review request:', error);
    }
  };

  const handleReviewCancel = () => {
    setReviewDialogOpen(false);
    setSelectedRequest(null);
    setReviewAction('');
    setReviewComments('');
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

  const getPriorityColor = (amount) => {
    if (amount > 100000) return 'error';
    if (amount > 50000) return 'warning';
    return 'info';
  };

  if (loading && requests.length === 0) {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Admin Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Review and manage help requests
            </Typography>
          </Box>
          <Tooltip title="Refresh Data">
            <IconButton 
              onClick={() => {
                const params = filterStatus === 'all' ? {} : { status: filterStatus };
                dispatch(fetchRequests(params));
                loadDashboardStats();
              }}
              sx={{ 
                bgcolor: '#673ab7',
                color: 'white',
                '&:hover': { bgcolor: '#5e35b1' }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  {dashboardStats.pendingRequests || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e8f5e8', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {dashboardStats.approvedRequests || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#ffebee', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
                  {dashboardStats.rejectedRequests || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                  {dashboardStats.totalRequests || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filter Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: '10px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Filter by Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" color="text.secondary">
                {requests.length} request(s) found
                {filterStatus !== 'all' && ` with status: ${statusOptions.find(opt => opt.value === filterStatus)?.label}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Requests Table */}
        <Paper sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Help Requests
            </Typography>
          </Box>

          {requests.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No requests found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {filterStatus === 'pending' 
                  ? 'No pending requests to review' 
                  : 'Try changing the filter status'
                }
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Requester</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Submitted</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 2, 
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
                              {request.requester?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200 }}>
                          {request.description?.substring(0, 80)}
                          {request.description?.length > 80 && '...'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.category}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`LKR ${request.neededAmount?.toLocaleString()}`}
                          color={getPriorityColor(request.neededAmount)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.status?.toUpperCase()}
                          color={getStatusColor(request.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewRequest(request._id)}
                              sx={{ color: '#673ab7' }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          
                          {request.status === 'pending' && (
                            <>
                              <Tooltip title="Approve Request">
                                <IconButton
                                  size="small"
                                  onClick={() => handleReviewClick(request, 'approved')}
                                  sx={{ color: '#2e7d32' }}
                                >
                                  <ApproveIcon />
                                </IconButton>
                              </Tooltip>
                              
                              <Tooltip title="Reject Request">
                                <IconButton
                                  size="small"
                                  onClick={() => handleReviewClick(request, 'rejected')}
                                  sx={{ color: '#c62828' }}
                                >
                                  <RejectIcon />
                                </IconButton>
                              </Tooltip>
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

        {/* Review Dialog */}
        <Dialog 
          open={reviewDialogOpen} 
          onClose={handleReviewCancel}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {reviewAction === 'approved' ? 'Approve Request' : 'Reject Request'}
          </DialogTitle>
          <DialogContent>
            {selectedRequest && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Request Details
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Requester: {selectedRequest.requester?.firstName} {selectedRequest.requester?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category: {selectedRequest.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Amount: LKR {selectedRequest.neededAmount?.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {selectedRequest.description}
                </Typography>
              </Box>
            )}
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Admin Comments"
              placeholder={
                reviewAction === 'approved' 
                  ? 'Optional: Add any comments or conditions for approval...'
                  : 'Please provide a reason for rejection...'
              }
              value={reviewComments}
              onChange={(e) => setReviewComments(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReviewCancel}>Cancel</Button>
            <Button
              onClick={handleReviewSubmit}
              variant="contained"
              color={reviewAction === 'approved' ? 'success' : 'error'}
              disabled={reviewAction === 'rejected' && !reviewComments.trim()}
            >
              {reviewAction === 'approved' ? 'Approve' : 'Reject'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
