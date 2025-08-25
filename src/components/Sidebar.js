import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  ViewList as ViewListIcon,
  People as PeopleIcon,
  AccountCircle as ProfileIcon,
  AdminPanelSettings as AdminIcon,
  Favorite as DonateIcon,
  HelpOutline as HelpIcon,
  Assignment as RequestIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const getMenuItems = () => {
    const commonItems = [
      {
        text: 'Profile',
        icon: <ProfileIcon />,
        path: '/users',
        roles: ['admin', 'donor', 'needy'],
      },
    ];

    const roleSpecificItems = {
      admin: [
        {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/admin-dashboard',
        },
        {
          text: 'All Requests',
          icon: <ViewListIcon />,
          path: '/viewrequests',
        },
        {
          text: 'Users Management',
          icon: <PeopleIcon />,
          path: '/admin/users',
        },
      ],
      donor: [
        {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/donor-dashboard',
        },
        {
          text: 'Browse Requests',
          icon: <ViewListIcon />,
          path: '/viewrequests',
        },
        {
          text: 'My Donations',
          icon: <DonateIcon />,
          path: '/donations',
        },
        {
          text: 'Donors Community',
          icon: <PeopleIcon />,
          path: '/donors',
        },
      ],
      needy: [
        {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/needy-dashboard',
        },
        {
          text: 'Create Request',
          icon: <AddIcon />,
          path: '/requests',
        },
        {
          text: 'My Requests',
          icon: <RequestIcon />,
          path: '/my-requests',
        },
        {
          text: 'Help Center',
          icon: <HelpIcon />,
          path: '/help',
        },
      ],
    };

    const userRole = user?.role;
    const items = roleSpecificItems[userRole] || [];
    
    return [...items, ...commonItems];
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onDrawerToggle) {
      onDrawerToggle();
    }
  };

  const isActive = (path) => {
    if (path === '/needy-dashboard' && location.pathname === '/') return false;
    return location.pathname === path || 
           (path === '/needy-dashboard' && location.pathname.includes('needy-dashboard'));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#d32f2f';
      case 'donor':
        return '#1976d2';
      case 'needy':
        return '#388e3c';
      default:
        return '#673ab7';
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'donor':
        return 'Donor';
      case 'needy':
        return 'Requester';
      default:
        return 'User';
    }
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      {/* User Info Section */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: getRoleColor(user?.role),
              mr: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {getRoleDisplayName(user?.role)}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
          Charity Platform
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ pt: 1 }}>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isActive(item.path) ? 'rgba(103, 58, 183, 0.08)' : 'transparent',
                color: isActive(item.path) ? '#673ab7' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(103, 58, 183, 0.04)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? '#673ab7' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Role-specific Quick Actions */}
      {user?.role === 'needy' && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Quick Actions
          </Typography>
          <ListItemButton
            onClick={() => handleNavigation('/requests')}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(76, 175, 80, 0.08)',
              color: '#388e3c',
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#388e3c', minWidth: 40 }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Request" />
          </ListItemButton>
        </Box>
      )}

      {user?.role === 'donor' && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Quick Actions
          </Typography>
          <ListItemButton
            onClick={() => handleNavigation('/viewrequests')}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
              color: '#1976d2',
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#1976d2', minWidth: 40 }}>
              <DonateIcon />
            </ListItemIcon>
            <ListItemText primary="Find Ways to Help" />
          </ListItemButton>
        </Box>
      )}

      {user?.role === 'admin' && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Admin Tools
          </Typography>
          <ListItemButton
            onClick={() => handleNavigation('/admin-dashboard')}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
              color: '#d32f2f',
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#d32f2f', minWidth: 40 }}>
              <AdminIcon />
            </ListItemIcon>
            <ListItemText primary="Review Requests" />
          </ListItemButton>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#fafafa',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#fafafa',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
