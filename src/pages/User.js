import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', role: 'User', status: 'Active' },
];

const UsersList = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: 3,
          marginTop: '64px', // Adjust to leave space for the TopBar
          marginLeft: '240px', // Adjust to leave space for the Sidebar
        }}
      >
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>

        <TableContainer component={Paper} sx={{ flexGrow: 1, mb: 3 }}>
          <Table aria-label="Users List Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">{user.status}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                      View
                    </Button>
                    <Button variant="contained" color="secondary">
                      Edit
                    </Button>
                    <Button variant="contained" color="error" sx={{ ml: 1 }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
  );
};

export default UsersList;
