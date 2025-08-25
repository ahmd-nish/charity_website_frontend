import api from './api';

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
};

// Requests API calls
export const requestsAPI = {
  // Get all requests (with filtering by status)
  getRequests: async (params = {}) => {
    const response = await api.get('/requests', { params });
    return response.data;
  },

  // Get single request by ID
  getRequest: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  // Create new request (for needy users)
  createRequest: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  // Update request
  updateRequest: async (id, requestData) => {
    const response = await api.put(`/requests/${id}`, requestData);
    return response.data;
  },

  // Delete request
  deleteRequest: async (id) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },

  // Admin approve/reject request
  reviewRequest: async (id, reviewData) => {
    const response = await api.put(`/requests/${id}/review`, reviewData);
    return response.data;
  },

  // Get requests by user (for needy users to see their own requests)
  getUserRequests: async () => {
    const response = await api.get('/requests/my-requests');
    return response.data;
  }
};

// Donations API calls
export const donationsAPI = {
  // Create donation
  createDonation: async (donationData) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },

  // Get donations by user
  getUserDonations: async () => {
    const response = await api.get('/donations/my-donations');
    return response.data;
  },

  // Get donations for a specific request
  getRequestDonations: async (requestId) => {
    const response = await api.get(`/donations/request/${requestId}`);
    return response.data;
  }
};

// Admin API calls
export const adminAPI = {
  // Get all users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Update user status/role
  updateUserStatus: async (userId, statusData) => {
    const response = await api.put(`/admin/users/${userId}/status`, statusData);
    return response.data;
  }
};
