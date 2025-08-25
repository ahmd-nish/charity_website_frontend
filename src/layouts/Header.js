import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { logoutUser } from '../redux/authSlice';

const Header = ({ onDrawerToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleProfileMenuClose();
  };

  const handleProfile = () => {
    navigate('/users');
    handleProfileMenuClose();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('admin-dashboard')) return 'Admin Dashboard';
    if (path.includes('donor-dashboard')) return 'Donor Dashboard';
    if (path.includes('needy-dashboard')) return 'My Dashboard';
    if (path.includes('requests')) return 'Create Request';
    if (path.includes('viewrequests')) return 'Browse Requests';
    if (path.includes('donors')) return 'Donors';
    if (path.includes('users')) return 'Profile';
    return 'Charity Platform';
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

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#673ab7',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          {getPageTitle()}
        </Typography>

        {isAuthenticated && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {getRoleDisplayName(user.role)}
                </Typography>
              </Box>

              <Tooltip title="Account menu">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      fontSize: '1rem',
                    }}
                  >
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: '10px',
                },
              }}
            >
              <MenuItem onClick={handleProfile}>
                <AccountIcon sx={{ mr: 2 }} />
                My Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <SettingsIcon sx={{ mr: 2 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogoutIcon sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
