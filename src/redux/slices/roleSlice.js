import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRole: 'member', // 'lead' or 'member'
  currentUser: { id: 'u1', name: 'You (John Doe)' }, // default logged in user
  darkMode: false, // optional bonus
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole(state, action) {
      state.currentRole = action.payload; // 'lead' or 'member'
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchRole, setUser, toggleDarkMode } = roleSlice.actions;
export default roleSlice.reducer;
