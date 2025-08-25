import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  PlayArrow as TestIcon
} from '@mui/icons-material';
import api from '../../services/api';
import { authAPI, requestsAPI } from '../../services/apiService';
import TestRegistration from './TestRegistration';

const APITester = () => {
  const [tests, setTests] = useState({
    healthCheck: { status: 'pending', message: '', duration: 0 },
    authEndpoints: { status: 'pending', message: '', duration: 0 },
    requestsEndpoints: { status: 'pending', message: '', duration: 0 }
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState('pending');

  const updateTestStatus = (testName, status, message, duration = 0) => {
    setTests(prev => ({
      ...prev,
      [testName]: { status, message, duration }
    }));
  };

  const testHealthCheck = async () => {
    const startTime = Date.now();
    try {
      const response = await api.get('/health');
      const duration = Date.now() - startTime;
      
      if (response.data.success) {
        updateTestStatus('healthCheck', 'success', 
          `✅ Server is healthy! Response time: ${duration}ms`, duration);
        return true;
      } else {
        updateTestStatus('healthCheck', 'error', 
          '❌ Health check returned unsuccessful response', duration);
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestStatus('healthCheck', 'error', 
        `❌ Health check failed: ${error.message}`, duration);
      return false;
    }
  };

  const testAuthEndpoints = async () => {
    const startTime = Date.now();
    try {
      // Test registration endpoint (without actually registering)
      // We'll just test that the endpoint exists and validates properly
      await api.post('/auth/register', {});
    } catch (error) {
      const duration = Date.now() - startTime;
      if (error.response?.status === 400) {
        // This is expected - validation errors mean the endpoint exists
        updateTestStatus('authEndpoints', 'success', 
          `✅ Auth endpoints accessible. Validation working properly.`, duration);
        return true;
      } else if (error.response?.status === 404) {
        updateTestStatus('authEndpoints', 'error', 
          '❌ Auth endpoints not found (404)', duration);
        return false;
      } else {
        updateTestStatus('authEndpoints', 'warning', 
          `⚠️ Auth endpoints respond but with unexpected error: ${error.message}`, duration);
        return true; // Still accessible, just unexpected response
      }
    }
  };

  const testRequestsEndpoints = async () => {
    const startTime = Date.now();
    try {
      // Test requests endpoint (should require auth)
      await api.get('/requests');
    } catch (error) {
      const duration = Date.now() - startTime;
      if (error.response?.status === 401) {
        // This is expected - unauthorized means the endpoint exists
        updateTestStatus('requestsEndpoints', 'success', 
          `✅ Requests endpoints accessible. Auth protection working.`, duration);
        return true;
      } else if (error.response?.status === 404) {
        updateTestStatus('requestsEndpoints', 'error', 
          '❌ Requests endpoints not found (404)', duration);
        return false;
      } else {
        updateTestStatus('requestsEndpoints', 'warning', 
          `⚠️ Requests endpoints respond but with unexpected error: ${error.message}`, duration);
        return true;
      }
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setOverallStatus('running');
    
    // Reset all tests
    setTests({
      healthCheck: { status: 'running', message: 'Testing...', duration: 0 },
      authEndpoints: { status: 'pending', message: 'Waiting...', duration: 0 },
      requestsEndpoints: { status: 'pending', message: 'Waiting...', duration: 0 }
    });

    const results = [];
    
    // Test 1: Health Check
    const healthResult = await testHealthCheck();
    results.push(healthResult);
    
    // Test 2: Auth Endpoints
    setTests(prev => ({
      ...prev,
      authEndpoints: { status: 'running', message: 'Testing...', duration: 0 }
    }));
    const authResult = await testAuthEndpoints();
    results.push(authResult);
    
    // Test 3: Requests Endpoints
    setTests(prev => ({
      ...prev,
      requestsEndpoints: { status: 'running', message: 'Testing...', duration: 0 }
    }));
    const requestsResult = await testRequestsEndpoints();
    results.push(requestsResult);
    
    // Determine overall status
    const allPassed = results.every(result => result === true);
    const someWarnings = Object.values(tests).some(test => test.status === 'warning');
    
    if (allPassed && !someWarnings) {
      setOverallStatus('success');
    } else if (results.some(result => result === true)) {
      setOverallStatus('warning');
    } else {
      setOverallStatus('error');
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckIcon color="success" />;
      case 'error': return <ErrorIcon color="error" />;
      case 'warning': return <ErrorIcon color="warning" />;
      case 'running': return <CircularProgress size={24} />;
      default: return <InfoIcon color="info" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'running': return 'info';
      default: return 'default';
    }
  };

  // Auto-run tests on component mount
  useEffect(() => {
    runAllTests();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          🔧 API Connection Tester
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          Testing connection between frontend and backend
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Chip 
            icon={getStatusIcon(overallStatus)}
            label={`Overall Status: ${overallStatus.toUpperCase()}`}
            color={getStatusColor(overallStatus)}
            variant="outlined"
            size="large"
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<TestIcon />}
            onClick={runAllTests}
            disabled={isRunning}
            size="large"
          >
            {isRunning ? 'Running Tests...' : 'Run Tests Again'}
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {Object.entries(tests).map(([testName, test]) => (
          <Grid item xs={12} md={4} key={testName}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getStatusIcon(test.status)}
                  <Typography variant="h6" sx={{ ml: 1, textTransform: 'capitalize' }}>
                    {testName.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  {test.message || 'Waiting to run...'}
                </Typography>
                
                {test.duration > 0 && (
                  <Typography variant="caption" color="textSecondary">
                    Duration: {test.duration}ms
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          📋 Test Details
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Health Check:</strong> Tests if the backend server is running and responsive
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Auth Endpoints:</strong> Verifies authentication endpoints are accessible
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Requests Endpoints:</strong> Checks if request management endpoints are working
        </Typography>
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Current Configuration:</strong><br />
          Frontend: http://localhost:3000<br />
          Backend: http://localhost:8080/api<br />
          <br />
          <strong>Quick Testing:</strong><br />
          🧪 <a href="/quick-login" style={{color: 'inherit'}}>Quick Login with Test Users</a>
        </Alert>
      </Paper>

      <TestRegistration />
    </Box>
  );
};

export default APITester;
