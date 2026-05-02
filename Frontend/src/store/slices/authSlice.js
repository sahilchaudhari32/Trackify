import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem, removeItem } from '../../utils/storage';

const initialState = {
  user: getItem('user', null),
  token: getItem('token', null),
  isAuthenticated: !!getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      setItem('user', action.payload.user);
      setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeItem('user');
      removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      setItem('user', state.user);
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
