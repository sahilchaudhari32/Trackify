import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../utils/storage';

const initialState = {
  theme: getItem('theme', 'dark'),
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      setItem('theme', state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
