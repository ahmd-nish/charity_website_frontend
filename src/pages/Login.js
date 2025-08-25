import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginUser, clearError } from '../redux/authSlice';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  // Clear any previous errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is handled by Redux
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to get dashboard path based on user role
  const getDashboardPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'donor':
        return '/donor-dashboard';
      case 'needy':
        return '/needy-dashboard';
      default:
        return '/';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f5fa',
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 900,
          overflow: 'hidden',
          borderRadius: '10px',
        }}
      >
        <Grid container>
          {/* Left Side - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: 'url(https://www.communityforce.com/wp-content/uploads/2022/11/Blog-Article-Feature-Images-19.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Right Side - Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: 4,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#673ab7' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                Sign In
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form style={{ width: '100%' }}>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting || loading}
                      sx={{
                        marginTop: 3,
                        marginBottom: 2,
                        backgroundColor: '#673ab7',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        '&:hover': {
                          backgroundColor: '#5e35b1',
                        },
                      }}
                    >
                      {isSubmitting || loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#673ab7',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
