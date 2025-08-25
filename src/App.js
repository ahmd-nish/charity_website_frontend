import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './layouts/Header';
import Sidebar from './components/Sidebar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestHelp from './pages/RequestHelp';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NeedyDashboard from './pages/NeedyDashboard';
import DonorsList from './pages/Donors';
import UserProfile from './pages/Profile';
import RequestView from './pages/Request';
import RequestDetail from './pages/RequestDetail';
import UserRequestDetail from './pages/UserRequestDetail';
import APITester from './components/APITester'
import QuickLogin from './components/APITester/QuickLogin';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes with Layout */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <AdminDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/donor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <DonorDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/needy-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <NeedyDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* Request Management Routes */}
          <Route 
            path="/requests" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <RequestHelp />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/requests/edit/:id" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <RequestHelp />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/viewrequests" 
            element={
              <ProtectedRoute allowedRoles={['donor', 'admin']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <RequestView />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* Request Detail Routes */}
          <Route 
            path="/request/:id" 
            element={
              <ProtectedRoute allowedRoles={['donor', 'admin']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <RequestDetail />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/user-request/:id" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <UserRequestDetail />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* User Management Routes */}
          <Route 
            path="/donors" 
            element={
              <ProtectedRoute allowedRoles={['needy', 'admin']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <DonorsList />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <UserProfile />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* Additional Routes */}
          <Route 
            path="/my-requests" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <NeedyDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/donations" 
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <DonorDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <AdminDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* Donation Routes */}
          <Route 
            path="/donate/:id" 
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <RequestDetail />
                </Box>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/help" 
            element={
              <ProtectedRoute allowedRoles={['needy']}>
                <Box sx={{ display: 'flex' }}>
                  <Header onDrawerToggle={handleDrawerToggle} />
                  <Sidebar 
                    mobileOpen={mobileOpen} 
                    onDrawerToggle={handleDrawerToggle} 
                  />
                  <NeedyDashboard />
                </Box>
              </ProtectedRoute>
            } 
          />

          {/* API Tester Route (Development only) */}
          <Route 
            path="/api-test" 
            element={<APITester />} 
          />

          {/* Quick Login Route (Development only) */}
          <Route 
            path="/quick-login" 
            element={<QuickLogin />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
