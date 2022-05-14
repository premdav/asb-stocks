import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean,
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const authSliceActions = authSlice.actions

export default authSlice;