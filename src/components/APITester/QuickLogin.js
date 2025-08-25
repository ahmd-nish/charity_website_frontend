import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  VolunteerActivism as DonorIcon,
  HelpOutline as NeedyIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { authAPI } from '../../services/apiService';

const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@charity.com',
    password: 'Admin123',
    role: 'admin',
    location: 'Colombo, Sri Lanka',
    icon: AdminIcon,
    color: 'error',
    description: 'Full platform access, user management, request approval'
  },
  {
    name: 'John Donor',
    email: 'donor@charity.com',
    password: 'Donor123',
    role: 'donor',
    location: 'Kandy, Sri Lanka',
    icon: DonorIcon,
    color: 'primary',
    description: 'Make donations, view requests, donation history'
  },
  {
    name: 'Emma Generous',
    email: 'donor2@charity.com',
    password: 'Generous123',
    role: 'donor',
    location: 'Negombo, Sri Lanka',
    icon: DonorIcon,
    color: 'primary',
    description: 'Make donations, view requests, donation history'
  },
  {
    name: 'Sarah Needy',
    email: 'needy1@charity.com',
    password: 'Needy123',
    role: 'needy',
    location: 'Galle, Sri Lanka',
    icon: NeedyIcon,
    color: 'warning',
    description: 'Create requests, manage own requests, view donations'
  },
  {
    name: 'Michael RequestHelp',
    email: 'needy2@charity.com',
    password: 'Help123',
    role: 'needy',
    location: 'Jaffna, Sri Lanka',
    icon: NeedyIcon,
    color: 'warning',
    description: 'Create requests, manage own requests, view donations'
  }
];

const QuickLogin = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async (user) => {
    setLoading(user.email);
    setMessage(null);

    try {
      const response = await authAPI.login({
        email: user.email,
        password: user.password
      });

      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        setMessage({
          type: 'success',
          text: `✅ Successfully logged in as ${user.name}! Redirecting...`
        });

        // Redirect based on role
        setTimeout(() => {
          switch (user.role) {
            case 'admin':
              window.location.href = '/admin-dashboard';
              break;
            case 'donor':
              window.location.href = '/donor-dashboard';
              break;
            case 'needy':
              window.location.href = '/needy-dashboard';
              break;
            default:
              window.location.href = '/';
          }
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Login failed: ${error.response?.data?.message || error.message}`
      });
    } finally {
      setLoading(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return AdminIcon;
      case 'donor': return DonorIcon;
      case 'needy': return NeedyIcon;
      default: return PersonIcon;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            🧪 Quick Login - Test Users
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center">
            Click any user below to instantly login and test their role permissions
          </Typography>
        </CardContent>
      </Card>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {testUsers.map((user, index) => {
          const IconComponent = getRoleIcon(user.role);
          const isLoading = loading === user.email;
          
          return (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent 
                      color={user.color} 
                      sx={{ fontSize: 30, mr: 1 }} 
                    />
                    <Box>
                      <Typography variant="h6">
                        {user.name}
                      </Typography>
                      <Chip 
                        label={user.role.toUpperCase()} 
                        color={user.color}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  <Typography variant="body2" color="textSecondary" paragraph>
                    📍 {user.location}
                  </Typography>

                  <Typography variant="body2" paragraph>
                    {user.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="caption" color="textSecondary">
                    📧 {user.email}<br />
                    🔑 {user.password}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color={user.color}
                    startIcon={isLoading ? null : <LoginIcon />}
                    onClick={() => handleLogin(user)}
                    disabled={isLoading}
                    size="large"
                  >
                    {isLoading ? 'Logging in...' : `Login as ${user.role.toUpperCase()}`}
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔍 Testing Guide
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="error">
                👨‍💼 Admin Testing:
              </Typography>
              <Typography variant="body2">
                • View all users and requests<br />
                • Approve/reject charity requests<br />
                • Access platform statistics<br />
                • Manage user accounts
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="primary">
                💰 Donor Testing:
              </Typography>
              <Typography variant="body2">
                • Browse charity requests<br />
                • Make donations<br />
                • View donation history<br />
                • Contact needy individuals
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="warning.main">
                🤲 Needy Testing:
              </Typography>
              <Typography variant="body2">
                • Create charity requests<br />
                • Update own requests<br />
                • View received donations<br />
                • Communicate with donors
              </Typography>
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 2 }}>
            💡 <strong>Tip:</strong> After login, you'll be redirected to the appropriate dashboard for that role. 
            Test different workflows by logging in with different user types!
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickLogin;
