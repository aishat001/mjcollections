import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'theme-mode-dark',
  color: 'theme-mode-light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    getTheme: (state) => state // This function does nothing, just returns the current state
  }
});

export const { setMode, setColor, getTheme } = themeSlice.actions;

export default themeSlice.reducer;
