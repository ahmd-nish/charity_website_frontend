import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material';
import { 
  Favorite as HeartIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon 
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#673ab7',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Charity Platform
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Connecting hearts, changing lives. Our platform brings together those who need help 
              and those who want to help, creating a community of compassion and support.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Made with
              </Typography>
              <HeartIcon sx={{ color: '#ff4081', mx: 0.5, fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                for humanity
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Home
              </Link>
              <Link href="/login" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Sign In
              </Link>
              <Link href="/register" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Register
              </Link>
              <Link href="/about" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                About Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              For Users
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/help" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Help Center
              </Link>
              <Link href="/faq" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                FAQ
              </Link>
              <Link href="/terms" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Terms of Service
              </Link>
              <Link href="/privacy" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: '1rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  support@charityplatform.lk
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: '1rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +94 11 234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ fontSize: '1rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Colombo, Sri Lanka
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 Charity Platform. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Empowering communities through compassion
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
