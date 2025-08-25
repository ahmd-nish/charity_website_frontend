import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { authAPI } from '../../services/apiService';

const TestRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Test123',
    role: 'donor',
    phoneNumber: '1234567890',
    nationalId: '123456789V',
    address: '123 Test Street, Test City'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await authAPI.register(formData);
      setResult({
        type: 'success',
        message: 'Registration successful!',
        data: response
      });
    } catch (error) {
      setResult({
        type: 'error',
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Test User Registration
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Test the API connection by registering a new user
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="needy">Needy</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="nationalId"
              label="National ID"
              value={formData.nationalId}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="address"
              label="Address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Box sx={{ mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? 'Registering...' : 'Test Registration'}
              </Button>
            </Box>
          </form>

          {result && (
            <Alert 
              severity={result.type} 
              sx={{ mt: 2 }}
              variant="outlined"
            >
              <Typography variant="body2">
                <strong>Status:</strong> {result.message}
              </Typography>
              {result.data && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" component="pre">
                    {JSON.stringify(result.data, null, 2)}
                  </Typography>
                </Box>
              )}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestRegistration;
