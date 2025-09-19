import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './slices/roleSlice';
import membersReducer from './slices/membersSlice';

// optional: enable serializable check off for Date usage if needed
export const store = configureStore({
  reducer: {
    role: roleReducer,
    members: membersReducer,
  },
});

export default store;
