import React from 'react';
import {
  Box,
  Paper,
  ButtonGroup,
  Button,
  Typography
} from '@mui/material';
import {
  Api as ApiIcon,
  Login as LoginIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const DevNavigation = () => {
  const currentPath = window.location.pathname;

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: HomeIcon,
      color: 'inherit'
    },
    {
      label: 'API Test',
      path: '/api-test',
      icon: ApiIcon,
      color: 'primary'
    },
    {
      label: 'Quick Login',
      path: '/quick-login',
      icon: LoginIcon,
      color: 'secondary'
    }
  ];

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        position: 'fixed',
        top: 20,
        right: 20,
        p: 2,
        zIndex: 1000,
        minWidth: 300
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        🔧 Development Tools
      </Typography>
      
      <ButtonGroup variant="outlined" size="small" fullWidth>
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Button
              key={index}
              startIcon={<IconComponent />}
              variant={isActive ? 'contained' : 'outlined'}
              color={isActive ? item.color : 'inherit'}
              onClick={() => window.location.href = item.path}
              sx={{ minWidth: 90 }}
            >
              {item.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </Paper>
  );
};

export default DevNavigation;
