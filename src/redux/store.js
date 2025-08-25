import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import requestsReducer from './requestsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
