import React, { useEffect } from 'react';
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { registerUser, clearError } from '../redux/authSlice';

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string()
    .oneOf(['donor', 'needy', 'admin'], 'Please select a valid role')
    .required('Role is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
  nationalId: Yup.string()
    .matches(/^[0-9V]+$/, 'Invalid National ID format')
    .required('National ID is required'),
});

const userRoles = [
  { value: 'needy', label: 'Request Help (Needy Person)' },
  { value: 'donor', label: 'Donate & Help (Donor)' },
  { value: 'admin', label: 'Administrator' },
];

const Register = () => {
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
      const { confirmPassword, ...userData } = values;
      await dispatch(registerUser(userData)).unwrap();
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
          maxWidth: 1200,
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Grid container>
          {/* Left Side - Image */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              backgroundImage: 'url(https://www.rigbycooke.com.au/app/uploads/2019/09/bigstock-Charity-Glass-Jar-With-Coins-245191120-1024x683.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Right Side - Form */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              padding: { xs: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#673ab7' }}>
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                Create Account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                phoneNumber: '',
                address: '',
                nationalId: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, values, setFieldValue }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="given-name"
                        autoFocus
                        error={touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        error={touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl 
                        fullWidth 
                        margin="normal"
                        error={touched.role && !!errors.role}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      >
                        <InputLabel id="role-label">I want to</InputLabel>
                        <Select
                          labelId="role-label"
                          id="role"
                          value={values.role}
                          label="I want to"
                          onChange={(e) => setFieldValue('role', e.target.value)}
                        >
                          {userRoles.map((role) => (
                            <MenuItem key={role.value} value={role.value}>
                              {role.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.role && errors.role && (
                          <FormHelperText>{errors.role}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="nationalId"
                        label="National ID"
                        name="nationalId"
                        error={touched.nationalId && !!errors.nationalId}
                        helperText={touched.nationalId && errors.nationalId}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="tel"
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address-line1"
                        error={touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        error={touched.confirmPassword && !!errors.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
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
                      'Create Account'
                    )}
                  </Button>
                </Form>
              )}
            </Formik>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#673ab7',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;
