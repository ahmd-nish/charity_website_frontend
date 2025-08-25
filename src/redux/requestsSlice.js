import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestsAPI } from '../services/apiService';

// Async thunks for requests
export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await requestsAPI.getRequests(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch requests');
    }
  }
);

export const fetchUserRequests = createAsyncThunk(
  'requests/fetchUserRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestsAPI.getUserRequests();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user requests');
    }
  }
);

export const createRequest = createAsyncThunk(
  'requests/createRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await requestsAPI.createRequest(requestData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create request');
    }
  }
);

export const updateRequest = createAsyncThunk(
  'requests/updateRequest',
  async ({ id, requestData }, { rejectWithValue }) => {
    try {
      const response = await requestsAPI.updateRequest(id, requestData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update request');
    }
  }
);

export const reviewRequest = createAsyncThunk(
  'requests/reviewRequest',
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const response = await requestsAPI.reviewRequest(id, reviewData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to review request');
    }
  }
);

export const deleteRequest = createAsyncThunk(
  'requests/deleteRequest',
  async (id, { rejectWithValue }) => {
    try {
      await requestsAPI.deleteRequest(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete request');
    }
  }
);

// Initial state
const initialState = {
  requests: [],
  userRequests: [],
  currentRequest: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

// Requests slice
const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch requests cases
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests || action.payload;
        state.totalCount = action.payload.totalCount || action.payload.length;
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.error = null;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch user requests cases
    builder
      .addCase(fetchUserRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.userRequests = action.payload.requests || action.payload;
        state.error = null;
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create request cases
    builder
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.userRequests.unshift(action.payload.request || action.payload);
        state.error = null;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update request cases
    builder
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRequest = action.payload.request || action.payload;
        
        // Update in requests array
        const requestIndex = state.requests.findIndex(req => req._id === updatedRequest._id);
        if (requestIndex !== -1) {
          state.requests[requestIndex] = updatedRequest;
        }
        
        // Update in userRequests array
        const userRequestIndex = state.userRequests.findIndex(req => req._id === updatedRequest._id);
        if (userRequestIndex !== -1) {
          state.userRequests[userRequestIndex] = updatedRequest;
        }
        
        // Update current request if it's the same
        if (state.currentRequest && state.currentRequest._id === updatedRequest._id) {
          state.currentRequest = updatedRequest;
        }
        
        state.error = null;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Review request cases (for admin)
    builder
      .addCase(reviewRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewRequest.fulfilled, (state, action) => {
        state.loading = false;
        const reviewedRequest = action.payload.request || action.payload;
        
        // Update in requests array
        const requestIndex = state.requests.findIndex(req => req._id === reviewedRequest._id);
        if (requestIndex !== -1) {
          state.requests[requestIndex] = reviewedRequest;
        }
        
        state.error = null;
      })
      .addCase(reviewRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete request cases
    builder
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        
        // Remove from requests array
        state.requests = state.requests.filter(req => req._id !== deletedId);
        
        // Remove from userRequests array
        state.userRequests = state.userRequests.filter(req => req._id !== deletedId);
        
        // Clear current request if it's the deleted one
        if (state.currentRequest && state.currentRequest._id === deletedId) {
          state.currentRequest = null;
        }
        
        state.error = null;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentRequest, clearCurrentRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
