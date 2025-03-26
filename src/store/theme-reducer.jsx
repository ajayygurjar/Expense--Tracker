import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
  isPremiumActive: false,
  isDarkMode: false ,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    
    togglePremium(state) {
      state.isPremiumActive = !state.isPremiumActive;
      console.log('Premium Active:', state.isPremiumActive); 
    },
    
    themeToggle(state) {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
